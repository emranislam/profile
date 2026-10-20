/**
 * Content + payment backend for 10takaschool.com (Google Apps Script).
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet, set the script
 * properties (docs/ADMIN.md, docs/PAYMENTS.md) and deploy as a web app.
 *
 * Tabs, created automatically:
 *   lectures – key, youtube, pdf, live, updated
 *   quiz     – chapter, question, a, b, c, d, answer (1-4), explain
 *   slots    – day, time, for, mode, status
 *   payments – trxId, amount, sender, received, status, usedBy, usedFor, usedAt, raw
 *
 * GET  → public content as JSON (only the free first lecture of each chapter).
 * POST → by action:
 *   sms      (secret)   a bKash "received" SMS forwarded from the owner's phone
 *   unlock   (public)   student proves a payment with Transaction ID + sender number
 *   access   (public)   student's saved unlocks → current links
 *   others   (password) admin: content, prices and payments
 *
 * Script properties:
 *   ADMIN_PASSWORD        admin login
 *   SMS_SECRET            secret the SMS forwarder app sends
 *   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID   optional: instant unlock notifications
 *   RELEASE_ALL_LECTURES  'yes' publishes every lecture's links (only if payments are checked elsewhere)
 */

const SHEETS = {
  lectures: ['key', 'youtube', 'pdf', 'live', 'updated'],
  quiz: ['chapter', 'question', 'a', 'b', 'c', 'd', 'answer', 'explain'],
  slots: ['day', 'time', 'for', 'mode', 'status'],
  payments: ['trxId', 'amount', 'sender', 'received', 'status', 'usedBy', 'usedFor', 'usedAt', 'raw']
};

// payments columns (0-based)
const P = { TRX: 0, AMOUNT: 1, SENDER: 2, RECEIVED: 3, STATUS: 4, USED_BY: 5, USED_FOR: 6, USED_AT: 7, RAW: 8 };

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(SHEETS[name]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function rows_(name) {
  return sheet_(name).getDataRange().getValues().slice(1);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function prop_(name) {
  return PropertiesService.getScriptProperties().getProperty(name);
}

// Keep text from being read as a formula.
function safe_(v) {
  const s = String(v == null ? '' : v).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Last 10 digits of a phone number: 01712345678, +8801712345678 and 1712345678 all match
// (a sheet may drop the leading zero of a number it turns into a numeric cell).
function phone10_(v) {
  return String(v == null ? '' : v).replace(/\D/g, '').slice(-10);
}

function trx_(v) {
  return String(v == null ? '' : v).toUpperCase().replace(/[^A-Z0-9]/g, '');
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
function asciiDigits_(s) {
  return String(s == null ? '' : s).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

// ---------------------------------------------------------------- public content

// Until payments are verified here, only the free first lecture of each chapter is public.
// Paid lectures' links stay in the sheet and are returned only to the admin ('getAll') or to a
// student whose payment was verified ('unlock' / 'access').
function isPublicLecture_(key) {
  if (prop_('RELEASE_ALL_LECTURES') === 'yes') return true;
  return /-lec-1$/.test(String(key));
}

function lectures_(onlyPublic) {
  const out = {};
  rows_('lectures').forEach((r) => {
    if (r[0] && (!onlyPublic || isPublicLecture_(r[0]))) {
      out[r[0]] = { youtube: String(r[1] || ''), pdf: String(r[2] || ''), live: String(r[3] || '') };
    }
  });
  return out;
}

function doGet() {
  const out = { lectures: lectures_(true), quiz: {}, slots: [] };
  rows_('quiz').forEach((r) => {
    if (!r[0] || !r[1]) return;
    (out.quiz[r[0]] = out.quiz[r[0]] || []).push({
      q: String(r[1]),
      options: [r[2], r[3], r[4], r[5]].map(String),
      answer: Number(r[6]) - 1,
      explain: String(r[7] || '')
    });
  });
  rows_('slots').forEach((r) => {
    const status = String(r[4] || '').trim().toLowerCase();
    if (r[0] && r[1] && (status === 'available' || status === 'booked')) {
      out.slots.push({ day: String(r[0]), time: String(r[1]), for: String(r[2] || 'all').toLowerCase(), mode: String(r[3] || 'Both'), status });
    }
  });
  return json_(out);
}

// ---------------------------------------------------------------- bKash SMS

// Reads a bKash "received" SMS. Returns null for anything else (sent money, OTPs, balance...),
// so unrelated messages are never stored. Missing fields come back empty and the message is
// kept for review instead of being guessed.
function parseSms_(text) {
  const t = asciiDigits_(text);
  if (!/received|পেয়েছেন/i.test(t)) return null;
  const trx = (/Trx\s*ID\s*[:\-]?\s*([A-Za-z0-9]{6,14})/i.exec(t) || [])[1] || '';
  const amount =
    (/(?:received|পেয়েছেন)[^0-9]{0,24}([\d,]+(?:\.\d+)?)/i.exec(t) || /(?:Tk|৳)\.?\s*([\d,]+(?:\.\d+)?)/i.exec(t) || [])[1] || '';
  const sender = (/(?:from|থেকে)\s*:?\s*(\+?(?:88)?01\d{9})/i.exec(t) || /(\+?(?:88)?01\d{9})/.exec(t) || [])[1] || '';
  return { trxId: trx.toUpperCase(), amount: amount ? parseFloat(amount.replace(/,/g, '')) : '', sender: sender };
}

function ingestSms_(from, text) {
  if (!/bkash/i.test(String(from || ''))) return { ok: true, ignored: 'not-bkash' };
  const p = parseSms_(text);
  if (!p) return { ok: true, ignored: 'not-received' };
  const sh = sheet_('payments');
  if (p.trxId) {
    const dup = sh.getDataRange().getValues().some((r, i) => i > 0 && trx_(r[P.TRX]) === p.trxId);
    if (dup) return { ok: true, ignored: 'duplicate' };
  }
  const complete = p.trxId && p.amount !== '' && p.sender;
  // Keep the message but drop the account balance.
  const raw = String(text).replace(/Balance[^.]*\.?\d*/i, 'Balance ***').slice(0, 400);
  sh.appendRow([p.trxId, p.amount, p.sender, new Date(), complete ? 'unused' : 'review', '', '', '', safe_(raw)]);
  return { ok: true, stored: complete ? 'unused' : 'review' };
}

// ---------------------------------------------------------------- unlock

// Prices are synced from the site by the admin page: { lecture: [{prefix, price}], course: {id: price} }.
function priceFor_(scope, key) {
  let rules;
  try {
    rules = JSON.parse(prop_('PRICE_RULES') || 'null');
  } catch (err) {
    rules = null;
  }
  if (!rules) return null;
  key = String(key || '');
  if (scope === 'course') return rules.course && Number(rules.course[key]) > 0 ? Number(rules.course[key]) : null;
  if (scope === 'lecture') {
    if (!/-lec-\d+$/.test(key) || /-lec-1$/.test(key)) return null;
    let best = null;
    (rules.lecture || []).forEach((r) => {
      if (key.indexOf(r.prefix) === 0 && (!best || r.prefix.length > best.prefix.length) && Number(r.price) > 0) best = r;
    });
    return best ? Number(best.price) : null;
  }
  return null;
}

function linksFor_(scope, key) {
  const all = lectures_(false);
  const out = {};
  Object.keys(all).forEach((k) => {
    if (scope === 'lecture' ? k === key : k.indexOf(key + '-') === 0) out[k] = all[k];
  });
  return out;
}

function throttled_(phone) {
  const c = CacheService.getScriptCache();
  return Number(c.get('f:' + phone) || 0) >= 8 || Number(c.get('f:*') || 0) >= 80;
}

function recordFailure_(phone) {
  const c = CacheService.getScriptCache();
  ['f:' + phone, 'f:*'].forEach((k) => c.put(k, String(Number(c.get(k) || 0) + 1), 3600));
}

function notify_(text) {
  let sent = false;
  const token = prop_('TELEGRAM_BOT_TOKEN');
  const chat = prop_('TELEGRAM_CHAT_ID');
  if (token && chat) {
    try {
      UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
        method: 'post',
        payload: { chat_id: chat, text: text },
        muteHttpExceptions: true
      });
      sent = true;
    } catch (err) {
      sent = false;
    }
  }
  if (!sent) {
    try {
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'আনলক: ' + text.slice(0, 50), text);
    } catch (err) {
      // No notification channel worked; the payments tab still shows the unlock.
    }
  }
}

function findPayment_(trxId) {
  const sh = sheet_('payments');
  const values = sh.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (trx_(values[i][P.TRX]) === trxId) return { sh: sh, rowNum: i + 1, row: values[i] };
  }
  return null;
}

function unlock_(body) {
  const id = trx_(body.trxId);
  const phone = phone10_(body.phone);
  const scope = body.scope === 'course' ? 'course' : 'lecture';
  const key = String(body.key || '');
  if (id.length < 6 || phone.length < 10) return { ok: false, error: 'bad-input' };
  if (throttled_(phone)) return { ok: false, error: 'too-many' };

  const price = priceFor_(scope, key);
  if (!price) return { ok: false, error: 'no-price' };

  const hit = findPayment_(id);
  if (!hit) {
    recordFailure_(phone);
    return { ok: false, error: 'not-found' };
  }
  const status = String(hit.row[P.STATUS]);
  const usedFor = scope + '|' + key;

  if (status === 'void') return { ok: false, error: 'void' };
  if (status === 'review') return { ok: false, error: 'review' };

  if (status === 'used') {
    // The same student can restore the same unlock (new phone, cleared browser).
    if (phone10_(hit.row[P.SENDER]) === phone && String(hit.row[P.USED_FOR]) === usedFor) {
      return { ok: true, grants: [{ scope: scope, key: key }], links: linksFor_(scope, key), again: true };
    }
    return { ok: false, error: 'used' };
  }

  if (phone10_(hit.row[P.SENDER]) !== phone) {
    recordFailure_(phone);
    return { ok: false, error: 'phone-mismatch' };
  }
  const paid = Number(hit.row[P.AMOUNT]);
  if (!(paid >= price)) return { ok: false, error: 'amount-low', paid: paid, price: price };

  hit.sh.getRange(hit.rowNum, P.STATUS + 1, 1, 4).setValues([['used', phone, usedFor, new Date()]]);
  notify_(
    'আনলক হয়েছে ✅\n' + (scope === 'course' ? 'কোর্স: ' : 'লেকচার: ') + key + '\nনম্বর: 0' + phone + '\nটাকা: ' + paid + ' (দাম ' + price + ')\nTrxID: ' + id +
      (paid > price ? '\n⚠ বেশি পাঠিয়েছে' : '')
  );
  return { ok: true, grants: [{ scope: scope, key: key }], links: linksFor_(scope, key) };
}

// A student's saved unlocks (kept in their browser) → what is currently unlocked, with links.
function access_(body) {
  const grants = [];
  let links = {};
  (Array.isArray(body.grants) ? body.grants : []).slice(0, 40).forEach((g) => {
    const hit = findPayment_(trx_(g && g.trx));
    if (!hit || String(hit.row[P.STATUS]) !== 'used') return;
    if (phone10_(hit.row[P.SENDER]) !== phone10_(g.phone)) return;
    const parts = String(hit.row[P.USED_FOR]).split('|');
    if (parts.length !== 2) return;
    grants.push({ scope: parts[0], key: parts[1], trx: trx_(g.trx) });
    links = Object.assign(links, linksFor_(parts[0], parts[1]));
  });
  return { ok: true, grants: grants, links: links };
}

// ---------------------------------------------------------------- admin

function listPayments_() {
  const out = [];
  sheet_('payments').getDataRange().getValues().forEach((r, i) => {
    if (i === 0 || (!r[P.TRX] && !r[P.RAW])) return;
    out.push({
      row: i + 1,
      trxId: String(r[P.TRX]),
      amount: r[P.AMOUNT] === '' ? '' : Number(r[P.AMOUNT]),
      sender: r[P.SENDER] === '' ? '' : '0' + phone10_(r[P.SENDER]),
      received: r[P.RECEIVED] ? new Date(r[P.RECEIVED]).toISOString() : '',
      status: String(r[P.STATUS]),
      usedBy: r[P.USED_BY] === '' ? '' : '0' + phone10_(r[P.USED_BY]),
      usedFor: String(r[P.USED_FOR] || ''),
      raw: String(r[P.RAW] || '')
    });
  });
  return out.reverse().slice(0, 300);
}

function adminAction_(body) {
  if (body.action === 'check') return { ok: true };
  if (body.action === 'getAll') return { ok: true, lectures: lectures_(false) };

  if (body.action === 'saveLecture') {
    const sh = sheet_('lectures');
    const values = sh.getDataRange().getValues();
    const row = [safe_(body.key), safe_(body.youtube), safe_(body.pdf), safe_(body.live), new Date()];
    const empty = !row[1] && !row[2] && !row[3];
    const i = values.findIndex((r, ix) => ix > 0 && r[0] === body.key);
    if (i > 0) {
      if (empty) sh.deleteRow(i + 1);
      else sh.getRange(i + 1, 1, 1, row.length).setValues([row]);
    } else if (!empty) {
      sh.appendRow(row);
    }
    return { ok: true };
  }

  if (body.action === 'saveQuiz') {
    const sh = sheet_('quiz');
    const values = sh.getDataRange().getValues();
    for (let i = values.length - 1; i >= 1; i--) if (values[i][0] === body.chapter) sh.deleteRow(i + 1);
    const rows = (body.questions || []).map((q) => [
      safe_(body.chapter), safe_(q.q), safe_(q.options[0]), safe_(q.options[1]), safe_(q.options[2]), safe_(q.options[3]),
      Number(q.answer) + 1, safe_(q.explain)
    ]);
    if (rows.length) sh.getRange(sh.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    return { ok: true };
  }

  if (body.action === 'saveSlots') {
    const sh = sheet_('slots');
    if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, SHEETS.slots.length).clearContent();
    const rows = (body.slots || []).map((s) => [safe_(s.day), safe_(s.time), safe_(s.for), safe_(s.mode), safe_(s.status)]);
    if (rows.length) sh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    return { ok: true };
  }

  if (body.action === 'savePrices') {
    const r = body.rules || {};
    const rules = {
      lecture: (r.lecture || []).filter((x) => x && x.prefix && Number(x.price) > 0).map((x) => ({ prefix: String(x.prefix), price: Number(x.price) })),
      course: {}
    };
    Object.keys(r.course || {}).forEach((k) => {
      if (Number(r.course[k]) > 0) rules.course[String(k)] = Number(r.course[k]);
    });
    PropertiesService.getScriptProperties().setProperty('PRICE_RULES', JSON.stringify(rules));
    return { ok: true, lectures: rules.lecture.length, courses: Object.keys(rules.course).length };
  }

  if (body.action === 'listPayments') return { ok: true, payments: listPayments_(), pricesSynced: !!prop_('PRICE_RULES') };

  if (body.action === 'addPayment') {
    const id = trx_(body.trxId);
    const amount = parseFloat(asciiDigits_(body.amount));
    const sender = phone10_(body.sender);
    if (id.length < 6 || !(amount > 0) || sender.length < 10) return { ok: false, error: 'bad-input' };
    if (findPayment_(id)) return { ok: false, error: 'duplicate' };
    sheet_('payments').appendRow([id, amount, '0' + sender, new Date(), 'unused', '', '', '', 'হাতে যোগ করা']);
    return { ok: true };
  }

  if (body.action === 'fixPayment') {
    const sh = sheet_('payments');
    const rowNum = Number(body.row);
    if (!(rowNum > 1 && rowNum <= sh.getLastRow())) return { ok: false, error: 'bad-input' };
    const id = trx_(body.trxId);
    const amount = parseFloat(asciiDigits_(body.amount));
    const sender = phone10_(body.sender);
    if (id.length < 6 || !(amount > 0) || sender.length < 10) return { ok: false, error: 'bad-input' };
    const existing = findPayment_(id);
    if (existing && existing.rowNum !== rowNum) return { ok: false, error: 'duplicate' };
    sh.getRange(rowNum, P.TRX + 1, 1, 3).setValues([[id, amount, '0' + sender]]);
    sh.getRange(rowNum, P.STATUS + 1).setValue('unused');
    return { ok: true };
  }

  if (body.action === 'voidPayment') {
    const hit = findPayment_(trx_(body.trxId));
    if (!hit) return { ok: false, error: 'not-found' };
    hit.sh.getRange(hit.rowNum, P.STATUS + 1).setValue('void');
    return { ok: true };
  }

  return { ok: false, error: 'unknown-action' };
}

// ---------------------------------------------------------------- POST router

function doPost(e) {
  const raw = e && e.postData ? e.postData.contents : '';
  let body = {};
  try {
    body = raw && /^\s*[{\[]/.test(raw) ? JSON.parse(raw) : {};
  } catch (err) {
    return json_({ ok: false, error: 'bad-request' });
  }
  if (Array.isArray(body)) body = body[0] || {};
  // Form-encoded bodies and query parameters (SMS forwarder apps often send these).
  const params = (e && e.parameter) || {};
  Object.keys(params).forEach((k) => {
    if (body[k] === undefined) body[k] = params[k];
  });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    if (body.action === 'sms') {
      const secret = prop_('SMS_SECRET');
      if (!secret || body.secret !== secret) return json_({ ok: false, error: 'wrong-secret' });
      const from = body.from || body.sender || body.address || body.number || '';
      const text = body.text || body.message || body.body || body.content || '';
      return json_(ingestSms_(from, text));
    }
    if (body.action === 'unlock') return json_(unlock_(body));
    if (body.action === 'access') return json_(access_(body));

    const password = prop_('ADMIN_PASSWORD');
    if (!password || body.password !== password) return json_({ ok: false, error: 'wrong-password' });
    return json_(adminAction_(body));
  } finally {
    lock.releaseLock();
  }
}
