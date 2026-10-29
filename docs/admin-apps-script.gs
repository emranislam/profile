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
 *   exams, examq, attempts – paid live MCQ exams (questions are never in the public GET)
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
  counts: ['chapter', 'lectures'],
  titles: ['key', 'title'],
  outline: ['group', 'id', 'num', 'title', 'eng'],
  exams: ['id', 'title', 'subject', 'minutes', 'price', 'status', 'updated'],
  examq: ['exam', 'question', 'a', 'b', 'c', 'd', 'answer', 'explain'],
  attempts: ['exam', 'trxId', 'name', 'phone', 'startedAt', 'submittedAt', 'score', 'total', 'seconds', 'answers'],
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

// How many lecture slots each chapter shows (set on the admin page); chapters not listed use the site default.
function counts_() {
  const out = {};
  rows_('counts').forEach((r) => {
    const n = Math.floor(Number(r[1]));
    if (r[0] && n >= 1 && n <= 30) out[String(r[0])] = n;
  });
  return out;
}

// Lecture headings written on the admin page (public, shown above each lecture).
function titles_() {
  const out = {};
  rows_('titles').forEach((r) => {
    if (r[0] && r[1]) out[String(r[0])] = String(r[1]);
  });
  return out;
}

// The chapter list of a paper / course / module as arranged on the admin page (public).
// Groups not listed here use the chapters built into the site.
function outline_() {
  const out = {};
  rows_('outline').forEach((r) => {
    if (!r[0] || !r[1]) return;
    (out[String(r[0])] = out[String(r[0])] || []).push({ id: String(r[1]), num: String(r[2] || ''), title: String(r[3] || ''), eng: String(r[4] || '') });
  });
  return out;
}

function doGet() {
  const out = { lectures: lectures_(true), quiz: {}, slots: [], counts: counts_(), titles: titles_(), outline: outline_(), exams: publicExams_() };
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

// ---------------------------------------------------------------- live exams
// MCQ exams a student pays for (৳ price set on the admin page). Questions and answers stay in the
// sheet: 'examStart' sends the questions without answers once the payment is verified, and
// 'examSubmit' grades on the server and then returns the answers.

const EXAM_ATTEMPT = { EXAM: 0, TRX: 1, NAME: 2, PHONE: 3, STARTED: 4, SUBMITTED: 5, SCORE: 6, TOTAL: 7, SECONDS: 8, ANSWERS: 9 };
const EXAM_GRACE_MS = 120000;

function examRows_() {
  return rows_('exams').filter((r) => r[0] && r[1]);
}

function examQuestions_(examId) {
  return rows_('examq')
    .filter((r) => String(r[0]) === examId && r[1])
    .map((r) => ({
      q: String(r[1]),
      options: [r[2], r[3], r[4], r[5]].map(String),
      answer: Number(r[6]) - 1,
      explain: String(r[7] || '')
    }));
}

function examMeta_(r, count) {
  return { id: String(r[0]), title: String(r[1]), subject: String(r[2] || ''), minutes: Number(r[3]) || 30, price: Number(r[4]) || 10, status: String(r[5] || 'draft'), count: count };
}

function publicExams_() {
  const counts = {};
  rows_('examq').forEach((r) => {
    if (r[0] && r[1]) counts[r[0]] = (counts[r[0]] || 0) + 1;
  });
  return examRows_()
    .filter((r) => String(r[5]) === 'published' && counts[r[0]])
    .map((r) => examMeta_(r, counts[r[0]]));
}

function findExam_(id) {
  const r = examRows_().find((x) => String(x[0]) === String(id));
  return r && String(r[5]) === 'published' ? examMeta_(r, 0) : null;
}

function findAttempt_(examId, trxId) {
  const sh = sheet_('attempts');
  const values = sh.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][EXAM_ATTEMPT.EXAM]) === examId && trx_(values[i][EXAM_ATTEMPT.TRX]) === trxId) return { sh: sh, rowNum: i + 1, row: values[i] };
  }
  return null;
}

function toMillis_(v) {
  return v ? new Date(v).getTime() : 0;
}

// Best first: higher score, then faster. Late submissions are not ranked.
function examBoard_(examId) {
  const list = [];
  sheet_('attempts').getDataRange().getValues().forEach((r, i) => {
    if (i === 0 || String(r[EXAM_ATTEMPT.EXAM]) !== examId || !r[EXAM_ATTEMPT.SUBMITTED] || String(r[EXAM_ATTEMPT.ANSWERS]).indexOf('late;') === 0) return;
    list.push({ trx: trx_(r[EXAM_ATTEMPT.TRX]), name: String(r[EXAM_ATTEMPT.NAME] || 'শিক্ষার্থী'), score: Number(r[EXAM_ATTEMPT.SCORE]), total: Number(r[EXAM_ATTEMPT.TOTAL]), seconds: Number(r[EXAM_ATTEMPT.SECONDS]), at: toMillis_(r[EXAM_ATTEMPT.SUBMITTED]) });
  });
  list.sort((a, b) => b.score - a.score || a.seconds - b.seconds || a.at - b.at);
  return list;
}

function boardView_(list, myTrx) {
  const mine = myTrx ? list.findIndex((x) => x.trx === myTrx) : -1;
  return {
    top: list.slice(0, 20).map((x, i) => ({ rank: i + 1, name: x.name, score: x.score, total: x.total, seconds: x.seconds, me: x.trx === myTrx })),
    rank: mine >= 0 ? mine + 1 : null,
    count: list.length
  };
}

// The payment must be a verified, used one for this exam and this sender number.
function examPayment_(exam, trxId, phone) {
  const hit = findPayment_(trxId);
  if (!hit) return null;
  if (String(hit.row[P.STATUS]) !== 'used') return null;
  if (phone10_(hit.row[P.SENDER]) !== phone) return null;
  if (String(hit.row[P.USED_FOR]) !== 'exam|' + exam.id) return null;
  return hit;
}

function examStart_(body) {
  const id = trx_(body.trxId);
  const phone = phone10_(body.phone);
  const exam = findExam_(body.examId);
  if (!exam) return { ok: false, error: 'no-exam' };
  if (id.length < 6 || phone.length < 10) return { ok: false, error: 'bad-input' };
  if (throttled_(phone)) return { ok: false, error: 'too-many' };

  const questions = examQuestions_(exam.id);
  if (!questions.length) return { ok: false, error: 'no-exam' };
  const hit = findPayment_(id);
  if (!hit) {
    recordFailure_(phone);
    return { ok: false, error: 'not-found' };
  }
  const status = String(hit.row[P.STATUS]);
  const usedFor = 'exam|' + exam.id;
  if (status === 'void') return { ok: false, error: 'void' };
  if (status === 'review') return { ok: false, error: 'review' };
  if (phone10_(hit.row[P.SENDER]) !== phone) {
    recordFailure_(phone);
    return { ok: false, error: 'phone-mismatch' };
  }

  const now = Date.now();
  let attempt = null;
  if (status === 'used') {
    if (String(hit.row[P.USED_FOR]) !== usedFor) return { ok: false, error: 'used' };
    attempt = findAttempt_(exam.id, id);
  } else {
    const paid = Number(hit.row[P.AMOUNT]);
    if (!(paid >= exam.price)) return { ok: false, error: 'amount-low', paid: paid, price: exam.price };
    hit.sh.getRange(hit.rowNum, P.STATUS + 1, 1, 4).setValues([['used', phone, usedFor, new Date()]]);
  }

  let name = String(body.name || '').replace(/[\r\n]/g, ' ').trim().slice(0, 30);
  if (!attempt) {
    name = safe_(name || 'শিক্ষার্থী');
    sheet_('attempts').appendRow([exam.id, id, name, '0' + phone, new Date(now), '', '', questions.length, '', '']);
    attempt = findAttempt_(exam.id, id);
    notify_('পরীক্ষা শুরু 📝\n' + exam.title + '\nনাম: ' + name + '\nনম্বর: 0' + phone + '\nTrxID: ' + id);
  }

  if (attempt.row[EXAM_ATTEMPT.SUBMITTED]) return Object.assign({ ok: true, finished: true }, examResult_(exam, questions, attempt));
  const started = toMillis_(attempt.row[EXAM_ATTEMPT.STARTED]);
  return {
    ok: true,
    exam: { id: exam.id, title: exam.title, minutes: exam.minutes },
    questions: questions.map((q) => ({ q: q.q, options: q.options })),
    now: now,
    deadline: started + exam.minutes * 60000
  };
}

// Grade on the server. Submitting twice returns the saved result.
function examSubmit_(body) {
  const id = trx_(body.trxId);
  const phone = phone10_(body.phone);
  const exam = findExam_(body.examId);
  if (!exam) return { ok: false, error: 'no-exam' };
  if (!examPayment_(exam, id, phone)) return { ok: false, error: 'not-allowed' };
  const attempt = findAttempt_(exam.id, id);
  if (!attempt) return { ok: false, error: 'not-started' };
  const questions = examQuestions_(exam.id);
  if (!attempt.row[EXAM_ATTEMPT.SUBMITTED]) {
    const now = Date.now();
    const started = toMillis_(attempt.row[EXAM_ATTEMPT.STARTED]);
    const late = now > started + exam.minutes * 60000 + EXAM_GRACE_MS;
    const given = Array.isArray(body.answers) ? body.answers : [];
    const picked = questions.map((q, i) => {
      const a = Number(given[i]);
      return a >= 0 && a <= 3 ? a : -1;
    });
    const score = picked.reduce((n, a, i) => n + (a === questions[i].answer ? 1 : 0), 0);
    const seconds = Math.min(Math.round((now - started) / 1000), exam.minutes * 60);
    attempt.sh.getRange(attempt.rowNum, EXAM_ATTEMPT.SUBMITTED + 1, 1, 5).setValues([[new Date(now), score, questions.length, seconds, (late ? 'late;' : 'ok;') + picked.join(',')]]);
    attempt.row = attempt.sh.getRange(attempt.rowNum, 1, 1, 10).getValues()[0];
  }
  return Object.assign({ ok: true }, examResult_(exam, questions, attempt));
}

function examResult_(exam, questions, attempt) {
  const stored = String(attempt.row[EXAM_ATTEMPT.ANSWERS] || '');
  const late = stored.indexOf('late;') === 0;
  const picked = stored.replace(/^(late|ok);/, '').split(',').map((x) => (x === '' ? -1 : Number(x)));
  const board = boardView_(examBoard_(exam.id), trx_(attempt.row[EXAM_ATTEMPT.TRX]));
  return {
    title: exam.title,
    score: Number(attempt.row[EXAM_ATTEMPT.SCORE]),
    total: Number(attempt.row[EXAM_ATTEMPT.TOTAL]),
    seconds: Number(attempt.row[EXAM_ATTEMPT.SECONDS]),
    late: late,
    review: questions.map((q, i) => ({ q: q.q, options: q.options, answer: q.answer, explain: q.explain, yours: picked[i] === undefined ? -1 : picked[i] })),
    board: board
  };
}

// ---------------------------------------------------------------- bKash SMS

// Reads a bKash "received" SMS, checked against a real one:
//   You have received Tk 1,500.00 from 01XXXXXXXXX. Fee Tk 0.00. Balance Tk X,XXX.XX. TrxID XXXXXXXXXX at 13/10/2026 17:59
// Returns null for anything else (sent money, OTPs, balance...),
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

  if (body.action === 'saveOutline') {
    const group = String(body.group || '');
    if (!group) return { ok: false, error: 'no-group' };
    const sh = sheet_('outline');
    const values = sh.getDataRange().getValues();
    for (let i = values.length - 1; i >= 1; i--) if (values[i][0] === group) sh.deleteRow(i + 1);
    const seen = {};
    const rows = (body.chapters || [])
      .filter((c) => c && c.id && String(c.title || '').trim() && !seen[c.id] && (seen[c.id] = true))
      .slice(0, 60)
      .map((c) => [safe_(group), safe_(String(c.id)), safe_(c.num), safe_(c.title), safe_(c.eng)]);
    if (rows.length) sh.getRange(sh.getLastRow() + 1, 1, rows.length, 5).setValues(rows);
    return { ok: true };
  }

  if (body.action === 'getExams') {
    return {
      ok: true,
      exams: examRows_().map((r) => Object.assign(examMeta_(r, 0), { questions: examQuestions_(String(r[0])) }))
    };
  }

  if (body.action === 'saveExam') {
    const e = body.exam || {};
    const title = String(e.title || '').trim();
    const minutes = Math.floor(Number(e.minutes));
    const price = Number(e.price);
    const questions = (Array.isArray(e.questions) ? e.questions : []).slice(0, 200);
    const status = e.status === 'published' ? 'published' : 'draft';
    if (!title || !(minutes >= 1 && minutes <= 300) || !(price >= 1 && price <= 5000)) return { ok: false, error: 'bad-input' };
    const bad = questions.some((q) => !q || !String(q.q || '').trim() || !Array.isArray(q.options) || q.options.length !== 4 || q.options.some((o) => !String(o || '').trim()) || !(Number(q.answer) >= 0 && Number(q.answer) <= 3));
    if (bad) return { ok: false, error: 'bad-question' };
    if (status === 'published' && !questions.length) return { ok: false, error: 'no-questions' };
    const examId = String(e.id || '').replace(/[^A-Za-z0-9_-]/g, '') || 'ex' + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36);

    const sh = sheet_('exams');
    const values = sh.getDataRange().getValues();
    const row = [examId, safe_(title), safe_(e.subject), minutes, price, status, new Date()];
    const i = values.findIndex((r, ix) => ix > 0 && String(r[0]) === examId);
    if (i > 0) sh.getRange(i + 1, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);

    const qs = sheet_('examq');
    const all = qs.getDataRange().getValues();
    for (let k = all.length - 1; k >= 1; k--) if (String(all[k][0]) === examId) qs.deleteRow(k + 1);
    const rows = questions.map((q) => [examId, safe_(q.q), safe_(q.options[0]), safe_(q.options[1]), safe_(q.options[2]), safe_(q.options[3]), Number(q.answer) + 1, safe_(q.explain)]);
    if (rows.length) qs.getRange(qs.getLastRow() + 1, 1, rows.length, 8).setValues(rows);
    return { ok: true, id: examId };
  }

  if (body.action === 'deleteExam') {
    const examId = String(body.id || '');
    [['exams', 0], ['examq', 0]].forEach((pair) => {
      const sh = sheet_(pair[0]);
      const v = sh.getDataRange().getValues();
      for (let k = v.length - 1; k >= 1; k--) if (String(v[k][pair[1]]) === examId) sh.deleteRow(k + 1);
    });
    return { ok: true };
  }

  if (body.action === 'saveTitle') {
    const sh = sheet_('titles');
    const values = sh.getDataRange().getValues();
    const title = safe_(String(body.title || '').trim().slice(0, 200));
    const i = values.findIndex((r, ix) => ix > 0 && r[0] === body.key);
    if (i > 0) {
      if (!title) sh.deleteRow(i + 1);
      else sh.getRange(i + 1, 2).setValue(title);
    } else if (title) {
      sh.appendRow([safe_(body.key), title]);
    }
    return { ok: true };
  }

  if (body.action === 'saveCounts') {
    const sh = sheet_('counts');
    if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, SHEETS.counts.length).clearContent();
    const counts = body.counts || {};
    const rows = Object.keys(counts)
      .filter((k) => Math.floor(Number(counts[k])) >= 1 && Math.floor(Number(counts[k])) <= 30)
      .map((k) => [safe_(k), Math.floor(Number(counts[k]))]);
    if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows);
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
    if (body.action === 'examStart') return json_(examStart_(body));
    if (body.action === 'examSubmit') return json_(examSubmit_(body));
    if (body.action === 'examBoard') return json_({ ok: true, board: boardView_(examBoard_(String(body.examId || '')), '') });

    const password = prop_('ADMIN_PASSWORD');
    if (!password || body.password !== password) return json_({ ok: false, error: 'wrong-password' });
    return json_(adminAction_(body));
  } finally {
    lock.releaseLock();
  }
}
