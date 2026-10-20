/**
 * Content backend for 10takaschool.com (Google Apps Script).
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet, set the
 * ADMIN_PASSWORD script property, and deploy as a web app (see docs/ADMIN.md).
 *
 * The sheet gets three tabs, created automatically:
 *   lectures – key, youtube, pdf, live, updated
 *   quiz     – chapter, question, a, b, c, d, answer (1-4), explain
 *   slots    – day, time, for, mode, status
 *
 * GET  → everything as JSON (public: the site reads it).
 * POST → changes; every request must carry the admin password.
 */

const SHEETS = {
  lectures: ['key', 'youtube', 'pdf', 'live', 'updated'],
  quiz: ['chapter', 'question', 'a', 'b', 'c', 'd', 'answer', 'explain'],
  slots: ['day', 'time', 'for', 'mode', 'status']
};

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

// Keep text from being read as a formula.
function safe_(v) {
  const s = String(v == null ? '' : v).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doGet() {
  const out = { lectures: {}, quiz: {}, slots: [] };
  rows_('lectures').forEach((r) => {
    if (r[0]) out.lectures[r[0]] = { youtube: String(r[1] || ''), pdf: String(r[2] || ''), live: String(r[3] || '') };
  });
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

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad-request' });
  }
  const password = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!password || body.password !== password) return json_({ ok: false, error: 'wrong-password' });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    if (body.action === 'check') return json_({ ok: true });

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
      return json_({ ok: true });
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
      return json_({ ok: true });
    }

    if (body.action === 'saveSlots') {
      const sh = sheet_('slots');
      if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, SHEETS.slots.length).clearContent();
      const rows = (body.slots || []).map((s) => [safe_(s.day), safe_(s.time), safe_(s.for), safe_(s.mode), safe_(s.status)]);
      if (rows.length) sh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      return json_({ ok: true });
    }

    return json_({ ok: false, error: 'unknown-action' });
  } finally {
    lock.releaseLock();
  }
}
