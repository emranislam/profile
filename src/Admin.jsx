import React, { useState, useMemo, useEffect } from 'react';
import MathText, { hasMath } from './MathText.jsx';
import { parseQuestions, readDocxText } from './quizTools.js';
import { ExternalLink, Facebook } from 'lucide-react';
import { BOOK_GRADS, BV_LECTURES, BookCover, COURSE_BOOK_ORIGINAL, COURSE_LECTURES, CV_SHOP_BOOKS, ChoiceChips, EXTRA_TOPIC, FB_LINK_RE, HSC_BV_PAPERS, PART3_ACADEMIC_TRACKS, SITE_LINKS, SPECIAL_COURSES_WITH_BOOKS, contentCache, currentOutline, demoVideoId, dhakaDay, lectureCountFor, loadContent, outlineDefaults, priceNumber, priceRules, toBnDigits, useContent, youtubeId } from './App.jsx';

// Every course → chapter → lecture key the site uses, for the admin page.
const adminCatalog = (content) => {
  const list = [];
  Object.values(HSC_BV_PAPERS).forEach((p) =>
    list.push({
      id: `bv-${p.id}`,
      label: `HSC বাংলা — ${p.title}`,
      chapters: p.chapters.map((ch) => ({
        id: ch.id,
        label: `${ch.num}: ${ch.title}`,
        quizKey: ch.id,
        countKey: ch.id,
        count: lectureCountFor(content, ch.id, BV_LECTURES),
        lectures: Array.from({ length: lectureCountFor(content, ch.id, BV_LECTURES) }, (_, i) => ({ key: `${ch.id}-lec-${i + 1}`, label: `লেকচার ${i + 1}` }))
      }))
    })
  );
  SPECIAL_COURSES_WITH_BOOKS.forEach((c) =>
    list.push({
      id: c.id,
      label: `স্পেশাল কোর্স — ${c.courseTitle}`,
      chapters: c.syllabusChapters.map((ch) => ({
        id: ch.chId,
        label: `${ch.paper} ${ch.num}: ${ch.title}`,
        quizKey: ch.chId,
        countKey: `${c.id}-${ch.chId}`,
        count: lectureCountFor(content, `${c.id}-${ch.chId}`, COURSE_LECTURES),
        lectures: Array.from({ length: lectureCountFor(content, `${c.id}-${ch.chId}`, COURSE_LECTURES) }, (_, i) => ({ key: `${c.id}-${ch.chId}-lec-${i + 1}`, label: `লেকচার ${i + 1}` }))
      }))
    })
  );
  Object.values(PART3_ACADEMIC_TRACKS).forEach((t) =>
    t.modules.forEach((m) =>
      list.push({
        id: `p3-${m.id}`,
        label: `${t.id} — ${m.name}`,
        chapters: m.chapters.map((ch) => ({
          id: ch.id,
          label: `${ch.num} — ${ch.title}`,
          quizKey: ch.id,
          countKey: `p3-${m.id}-${ch.id}`,
          count: lectureCountFor(content, `p3-${m.id}-${ch.id}`, (ch.topics || m.lectureBlueprint).length),
          lectures: Array.from({ length: lectureCountFor(content, `p3-${m.id}-${ch.id}`, (ch.topics || m.lectureBlueprint).length) }, (_, i) => ({
            key: `p3-${m.id}-${ch.id}-lec-${i + 1}`,
            label: `Lecture ${i + 1} — ${(ch.topics || m.lectureBlueprint)[i] || EXTRA_TOPIC}`
          }))
        }))
      })
    )
  );
  return list;
};

const adminPost = (password, payload) =>
  fetch(SITE_LINKS.contentApi, { method: 'POST', body: JSON.stringify({ password, ...payload }) })
    .then((r) => r.json())
    .catch(() => ({ ok: false, error: 'network' }));

const adminInput =
  'w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none';

function AdminSaveButton({ state, onClick, label = 'Save' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'saving'}
      className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-extrabold transition disabled:opacity-60 ${
        state === 'saved'
          ? 'bg-emerald-500 text-slate-950'
          : state === 'error'
          ? 'bg-rose-500 text-white'
          : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
      }`}
    >
      {state === 'saving' ? 'Saving…' : state === 'saved' ? '✓ Saved' : state === 'error' ? 'আবার চেষ্টা করুন' : label}
    </button>
  );
}

// Extra videos / PDFs for one lecture: rows of (label, link) that can be added and removed.
function ExtraLinks({ kind, placeholder, list, onChange, check }) {
  const upd = (i, patch) => onChange(list.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  return (
    <div className="space-y-2">
      {list.map((x, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[10rem_1fr_auto]">
          <input
            className={`${adminInput} col-span-2 sm:col-span-1`}
            placeholder={`${kind} ${toBnDigits(i + 2)} এর নাম (ঐচ্ছিক)`}
            value={x.t}
            maxLength={120}
            onChange={(e) => upd(i, { t: e.target.value })}
          />
          <div>
            <input className={adminInput} placeholder={placeholder} value={x.u} onChange={(e) => upd(i, { u: e.target.value })} />
            {check && !check(x.u) && <div className="mt-1 text-[11px] text-rose-300">এটা YouTube ভিডিওর লিংক মনে হচ্ছে না</div>}
          </div>
          <button
            type="button"
            aria-label={`${kind} সরান`}
            onClick={() => onChange(list.filter((_, j) => j !== i))}
            className="rounded-xl bg-slate-800 px-3 text-xs font-bold text-rose-300 hover:bg-slate-700"
          >
            ✕
          </button>
        </div>
      ))}
      {list.length < 20 && (
        <button
          type="button"
          onClick={() => onChange([...list, { t: '', u: '' }])}
          className="rounded-xl border border-dashed border-slate-700 px-3 py-1.5 text-xs font-bold text-teal-300 hover:border-teal-400"
        >
          + আরেকটি {kind} যোগ করুন
        </button>
      )}
    </div>
  );
}

// The site's default price for a lecture when the admin sets none (from the price rules the page syncs).
const defaultLecturePrice = (key) => {
  let best = null;
  priceRules().lecture.forEach((r) => {
    if (key.indexOf(r.prefix) === 0 && (!best || r.prefix.length > best.prefix.length)) best = r;
  });
  return best ? best.price : 0;
};

// Locks or opens every lecture of the chosen chapter at once.
function AdminLockBar({ lectures, locks, password, onDone }) {
  const [price, setPrice] = useState('');
  const [state, setState] = useState('idle');
  const isCourse = lectures.length > 0 && lectures[0].key.indexOf('course-') === 0;
  const run = (pick) => {
    setState('saving');
    adminPost(password, {
      action: 'saveLocks',
      items: lectures.map((l, i) => ({ key: l.key, locked: pick(i), price: isCourse ? 0 : price }))
    }).then((r) => {
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) onDone();
    });
  };
  const lockedCount = lectures.filter((l) => locks && Object.prototype.hasOwnProperty.call(locks, l.key)).length;
  return (
    <div className="space-y-2 rounded-2xl border border-amber-400/30 bg-amber-500/5 p-4">
      <div className="text-sm font-bold text-white">
        এই অধ্যায়ের সবগুলো একসাথে <span className="text-xs font-normal text-slate-400">({toBnDigits(lockedCount)}টি পেইড, {toBnDigits(lectures.length - lockedCount)}টি ফ্রি)</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {!isCourse && (
          <input
            className={`${adminInput} w-28`}
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="দাম ৳ (ঐচ্ছিক)"
            aria-label="সবার দাম"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        )}
        <button type="button" disabled={state === 'saving'} onClick={() => run((i) => i > 0)} className="rounded-xl bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300 disabled:opacity-60">
          🔒 ১ম বাদে সব লক
        </button>
        <button type="button" disabled={state === 'saving'} onClick={() => run(() => true)} className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-extrabold text-amber-300 hover:bg-slate-700 disabled:opacity-60">
          🔒 সব লক
        </button>
        <button type="button" disabled={state === 'saving'} onClick={() => run(() => false)} className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 disabled:opacity-60">
          🔓 সব খুলে দিন
        </button>
        {state === 'saved' && <span className="text-xs font-bold text-emerald-300">✓ হয়েছে</span>}
        {state === 'error' && <span className="text-xs font-bold text-rose-300">হয়নি, আবার চেষ্টা করুন</span>}
      </div>
    </div>
  );
}

function AdminLectureRow({ lecture, saved, title, minutes, password, onSaved, lock }) {
  const isCourseLecture = lecture.key.indexOf('course-') === 0;
  const [locked, setLocked] = useState(lock !== undefined);
  const [lockPrice, setLockPrice] = useState(lock > 0 ? String(lock) : '');
  const [form, setForm] = useState({ youtube: saved.youtube || '', pdf: saved.pdf || '', live: saved.live || '' });
  const [heading, setHeading] = useState(title || '');
  const [mins, setMins] = useState(minutes ? String(minutes) : '');
  const [videos, setVideos] = useState(saved.videos || []);
  const [pdfs, setPdfs] = useState(saved.pdfs || []);
  const [state, setState] = useState('idle');
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setState('idle');
  };
  const badYoutube = form.youtube.trim() && !youtubeId(form.youtube);
  const save = () => {
    setState('saving');
    Promise.all([
      adminPost(password, { action: 'saveLecture', key: lecture.key, ...form, videos: videos.filter((x) => x.u.trim()), pdfs: pdfs.filter((x) => x.u.trim()) }),
      adminPost(password, { action: 'saveTitle', key: lecture.key, title: heading }),
      adminPost(password, { action: 'saveDuration', key: lecture.key, minutes: mins }),
      adminPost(password, { action: 'saveLocks', items: [{ key: lecture.key, locked, price: lockPrice }] })
    ]).then(([r, t, d, k]) => {
      r = { ok: r.ok && t.ok && d.ok && k.ok };
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) {
        loadContent();
        onSaved();
      }
    });
  };
  return (
    <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-bold text-white">{lecture.label}</div>
        <div className="flex gap-1.5 text-[10px] font-bold">
          <span className={`rounded px-1.5 py-0.5 ${saved.youtube ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>ভিডিও</span>
          <span className={`rounded px-1.5 py-0.5 ${saved.pdf ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>PDF</span>
          <span className={`rounded px-1.5 py-0.5 ${saved.live ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>Live</span>
          <span className={`rounded px-1.5 py-0.5 ${lock !== undefined ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>{lock !== undefined ? '🔒 পেইড' : '🔓 ফ্রি'}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-950/60 px-3 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-white">
          <input
            type="checkbox"
            className="h-4 w-4 accent-amber-400"
            checked={locked}
            onChange={(e) => {
              setLocked(e.target.checked);
              setState('idle');
            }}
          />
          🔒 পেইড (লক করুন)
        </label>
        {locked && !isCourseLecture && (
          <label className="flex items-center gap-2 text-xs text-slate-300">
            দাম ৳
            <input
              className={`${adminInput} w-24`}
              type="number"
              min="1"
              inputMode="numeric"
              placeholder={`ডিফল্ট ${defaultLecturePrice(lecture.key) || ''}`}
              aria-label="লেকচারের দাম (টাকা)"
              value={lockPrice}
              onChange={(e) => {
                setLockPrice(e.target.value);
                setState('idle');
              }}
            />
          </label>
        )}
        <span className="text-[11px] text-slate-500">
          {!locked ? 'সবার জন্য খোলা' : isCourseLecture ? 'কোর্সে Enroll করলে খুলবে' : 'ফাঁকা রাখলে ডিফল্ট দাম'}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_7.5rem] gap-2">
        <input
          className={adminInput}
          placeholder="লেকচারের হেডিং (ঐচ্ছিক), যেমন: সংজ্ঞা ও মৌলিক সূত্র"
          value={heading}
          maxLength={200}
          onChange={(e) => {
            setHeading(e.target.value);
            setState('idle');
          }}
        />
        <input
          className={adminInput}
          type="number"
          min="1"
          max="600"
          inputMode="numeric"
          placeholder="সময় (মিনিট)"
          aria-label="ক্লাসের সময় (মিনিট)"
          value={mins}
          onChange={(e) => {
            setMins(e.target.value);
            setState('idle');
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <div>
          <input className={adminInput} placeholder="YouTube লিংক" value={form.youtube} onChange={set('youtube')} />
          {badYoutube && <div className="mt-1 text-[11px] text-rose-300">এটা YouTube ভিডিওর লিংক মনে হচ্ছে না</div>}
        </div>
        <input className={adminInput} placeholder="PDF লিংক (Google Drive)" value={form.pdf} onChange={set('pdf')} />
        <input className={adminInput} placeholder="লাইভ ক্লাস লিংক (ঐচ্ছিক)" value={form.live} onChange={set('live')} />
      </div>
      <ExtraLinks
        kind="ভিডিও"
        placeholder="YouTube লিংক"
        list={videos}
        onChange={(l) => {
          setVideos(l);
          setState('idle');
        }}
        check={(u) => !u.trim() || !!youtubeId(u)}
      />
      <ExtraLinks
        kind="PDF"
        placeholder="PDF লিংক (Google Drive)"
        list={pdfs}
        onChange={(l) => {
          setPdfs(l);
          setState('idle');
        }}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-slate-500">{lecture.key}</span>
        <AdminSaveButton state={state} onClick={save} />
      </div>
    </div>
  );
}

// Reads questions from a Word (.docx) file or pasted text and shows them as the site will, before they are added.
function AdminQuizImport({ onAdd, hasQuestions }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState('');
  const pickFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setMsg('');
    setResult(null);
    if (/\.pdf$/i.test(file.name)) {
      setMsg('PDF থেকে সমীকরণ নির্ভুলভাবে পড়া যায় না। প্রশ্নগুলো Word (.docx) এ নিয়ে আসুন, অথবা Claude কে দিয়ে LaTeX করিয়ে নিচের ঘরে পেস্ট করুন।');
      return;
    }
    if (/\.doc$/i.test(file.name)) {
      setMsg('এটা পুরনো .doc ফাইল। Word এ খুলে Save As করে .docx বানিয়ে দিন।');
      return;
    }
    try {
      const body = /\.docx$/i.test(file.name) ? await readDocxText(await file.arrayBuffer()) : await file.text();
      setText(body);
      setResult(parseQuestions(body));
    } catch {
      setMsg('ফাইলটি পড়া যায়নি। .docx (Word) বা .txt ফাইল দিন।');
    }
  };
  const done = () => {
    setOpen(false);
    setText('');
    setResult(null);
  };
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-4">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left text-sm font-extrabold text-white">
        <span>📄 Word ফাইল বা লেখা থেকে প্রশ্ন আনুন</span>
        <span className="text-xs text-amber-300">{open ? 'বন্ধ করুন' : 'খুলুন'}</span>
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          <p className="text-[11px] leading-relaxed text-slate-400">
            Word এ প্রশ্ন এই ছাঁচে লিখুন: প্রশ্ন নম্বর (১. বা 1.), অপশন ক) খ) গ) ঘ) (বা a) b) c) d)), তারপর <b>উত্তর: খ</b> আর ঐচ্ছিক <b>ব্যাখ্যা: ...</b>।
            সমীকরণ Word এর নিজস্ব <b>Insert → Equation</b> দিয়ে লিখলে নিজে থেকে বদলে যাবে। MathType বা ছবি করা সমীকরণ পড়া যায় না।
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
              📎 .docx ফাইল বাছুন
              <input type="file" accept=".docx,.doc,.txt,.pdf" className="hidden" onChange={pickFile} />
            </label>
            <span className="text-[11px] text-slate-500">অথবা নিচে পেস্ট করুন</span>
          </div>
          <textarea
            className={`${adminInput} h-32 font-mono text-xs`}
            placeholder={"১. $f(x)=x^2$ হলে $f'(x)$ কত?\nক) $x$  খ) $2x$  গ) $x^2$  ঘ) $2$\nউত্তর: খ\nব্যাখ্যা: $\\frac{d}{dx}x^2=2x$"}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setResult(null);
            }}
          />
          {msg && <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-2.5 text-xs text-rose-200">{msg}</div>}
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => setResult(parseQuestions(text))}
            className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            প্রশ্নগুলো পড়ুন
          </button>
          {result && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-white">
                {toBnDigits(result.found)}টি প্রশ্ন পাওয়া গেছে: <span className="text-emerald-300">{toBnDigits(result.questions.length)}টি ঠিক আছে</span>
                {result.skipped.length > 0 && <span className="text-rose-300">, {toBnDigits(result.skipped.length)}টি বাদ</span>}
              </div>
              {result.skipped.map((s, i) => (
                <div key={i} className="rounded-lg bg-rose-500/10 px-3 py-1.5 text-[11px] text-rose-200">
                  প্রশ্ন {s.n}: {s.why}
                </div>
              ))}
              <div className="max-h-96 space-y-2 overflow-y-auto rounded-xl bg-slate-950/70 p-3">
                {result.questions.map((q, i) => (
                  <div key={i} className="space-y-1 border-b border-slate-800 pb-2 text-xs text-slate-200 last:border-0">
                    <div className="font-bold">
                      {toBnDigits(i + 1)}. <MathText text={q.q} />
                    </div>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {q.options.map((o, oi) => (
                        <div key={oi} className={q.answer === oi ? 'font-bold text-emerald-300' : ''}>
                          {['ক', 'খ', 'গ', 'ঘ'][oi]}) <MathText text={o} />
                        </div>
                      ))}
                    </div>
                    {q.explain && (
                      <div className="text-slate-400">
                        💡 <MathText text={q.explain} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {result.questions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAdd(result.questions, false);
                      done();
                    }}
                    className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400"
                  >
                    ✓ এই {toBnDigits(result.questions.length)}টি প্রশ্ন যোগ করুন
                  </button>
                  {hasQuestions && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!window.confirm('এই কুইজের আগের সব প্রশ্ন মুছে এগুলো বসাবেন?')) return;
                        onAdd(result.questions, true);
                        done();
                      }}
                      className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-extrabold text-amber-300 hover:bg-slate-700"
                    >
                      আগেরগুলো মুছে এগুলো বসান
                    </button>
                  )}
                  <span className="self-center text-[11px] text-slate-500">যোগ করার পর নিচে দেখে নিয়ে "কুইজ Save করুন" চাপুন।</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const emptyQuestion = () => ({ q: '', options: ['', '', '', ''], answer: 0, explain: '' });

function AdminQuizEditor({ quizKey, saved, password }) {
  const [questions, setQuestions] = useState(saved.length ? saved : [emptyQuestion()]);
  const [state, setState] = useState('idle');
  const update = (i, patch) => {
    setQuestions((qs) => qs.map((q, j) => (j === i ? { ...q, ...patch } : q)));
    setState('idle');
  };
  const complete = questions.filter((q) => q.q.trim() && q.options.every((o) => o.trim()));
  const save = () => {
    setState('saving');
    adminPost(password, { action: 'saveQuiz', chapter: quizKey, questions: complete }).then((r) => {
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) loadContent();
    });
  };
  const filled = (list) => list.filter((q) => q.q.trim() || q.options.some((o) => o.trim()));
  const addImported = (list, replaceAll) => {
    setQuestions((qs) => {
      const next = [...(replaceAll ? [] : filled(qs)), ...list];
      return next.length ? next : [emptyQuestion()];
    });
    setState('idle');
  };
  return (
    <div className="space-y-4">
      <AdminQuizImport onAdd={addImported} hasQuestions={filled(questions).length > 0} />
      {questions.map((q, i) => (
        <div key={i} className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">প্রশ্ন {toBnDigits(i + 1)}</span>
            <button
              type="button"
              onClick={() => setQuestions((qs) => qs.filter((_, j) => j !== i))}
              className="text-xs font-bold text-rose-300 hover:underline"
            >
              মুছুন
            </button>
          </div>
          <input className={adminInput} placeholder="প্রশ্ন (সমীকরণ লিখতে $x^2$ এভাবে)" value={q.q} onChange={(e) => update(i, { q: e.target.value })} />
          {(hasMath(q.q) || q.options.some(hasMath) || hasMath(q.explain)) && (
            <div className="space-y-1 rounded-xl bg-slate-950/70 p-3 text-xs text-slate-200">
              <div className="text-[10px] font-bold text-slate-500">সাইটে যেমন দেখাবে</div>
              <div className="font-bold"><MathText text={q.q} /></div>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {q.options.map((o, oi) => (
                  <div key={oi} className={q.answer === oi ? 'text-emerald-300' : ''}>
                    {['ক', 'খ', 'গ', 'ঘ'][oi]}) <MathText text={o} />
                  </div>
                ))}
              </div>
              {q.explain && <div className="text-slate-400">💡 <MathText text={q.explain} /></div>}
            </div>
          )}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {q.options.map((o, oi) => (
              <label key={oi} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`ans-${quizKey}-${i}`}
                  checked={q.answer === oi}
                  onChange={() => update(i, { answer: oi })}
                  className="h-4 w-4 accent-emerald-400"
                />
                <input
                  className={adminInput}
                  placeholder={`অপশন ${['ক', 'খ', 'গ', 'ঘ'][oi]}`}
                  value={o}
                  onChange={(e) => update(i, { options: q.options.map((x, xi) => (xi === oi ? e.target.value : x)) })}
                />
              </label>
            ))}
          </div>
          <div className="text-[11px] text-slate-400">সঠিক উত্তরের পাশের গোল বাটনটা বেছে নিন।</div>
          <input className={adminInput} placeholder="ব্যাখ্যা (ঐচ্ছিক)" value={q.explain} onChange={(e) => update(i, { explain: e.target.value })} />
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setQuestions((qs) => [...qs, emptyQuestion()])}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:border-slate-500"
        >
          + নতুন প্রশ্ন
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">সম্পূর্ণ প্রশ্ন: {toBnDigits(complete.length)}</span>
          <AdminSaveButton state={state} onClick={save} label="কুইজ Save করুন" />
        </div>
      </div>
    </div>
  );
}

// Add, remove, rename and reorder the chapters of a paper / course / module.
function AdminOutlineEditor({ group, label, password }) {
  const [rows, setRows] = useState(() => currentOutline(group));
  const [state, setState] = useState('idle');
  useEffect(() => {
    setRows(currentOutline(group));
    setState('idle');
  }, [group]);
  const update = (i, patch) => {
    setRows((all) => all.map((r, j) => (j === i ? { ...r, ...patch } : r)));
    setState('idle');
  };
  const move = (i, d) => {
    setRows((all) => {
      const next = all.slice();
      const j = i + d;
      if (j < 0 || j >= next.length) return all;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setState('idle');
  };
  const add = () => {
    const last = rows[rows.length - 1];
    const num = last ? last.num.replace(/[\d০-৯]+/, (m) => {
      const n = parseInt(m.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d)), 10) + 1;
      return /[০-৯]/.test(m) ? toBnDigits(n) : String(n).padStart(m.length, '0');
    }) : '';
    const prefix = rows.length ? String(rows[0].id).split('-')[0] : group;
    setRows([...rows, { id: `${prefix}-n${Date.now().toString(36)}`, num, title: '', eng: '' }]);
    setState('idle');
  };
  const save = (list) => {
    setState('saving');
    adminPost(password, { action: 'saveOutline', group, chapters: list }).then((r) => {
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) loadContent();
    });
  };
  const resetToDefault = () => {
    if (!window.confirm('এই তালিকা সাইটের মূল (ডিফল্ট) অধ্যায়ে ফিরে যাবে। নিশ্চিত?')) return;
    save([]);
    const d = outlineDefaults[group];
    if (d) setRows(d.map((c) => ({ id: c.id || c.chId, num: c.num, title: c.title, eng: c.eng })));
  };
  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-slate-400">
        <b className="text-slate-200">{label}</b> এর অধ্যায়ের তালিকা। ↑ ↓ দিয়ে সাজান, ✕ দিয়ে বাদ দিন, নিচে নতুন অধ্যায় যোগ করুন।
        অধ্যায় বাদ দিলেও তার লেকচারের লিংক ও কুইজ Sheet এ থেকে যায়। নাম বদলালে বা জায়গা পাল্টালে লিংক ঠিক থাকে।
      </p>
      {rows.map((r, i) => (
        <div key={r.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-3 lg:grid-cols-[7rem_2fr_2fr_auto]">
          <input className={adminInput} placeholder="নম্বর" value={r.num} onChange={(e) => update(i, { num: e.target.value })} />
          <input className={adminInput} placeholder="অধ্যায়ের নাম" value={r.title} onChange={(e) => update(i, { title: e.target.value })} />
          <input className={`${adminInput} col-span-2 lg:col-span-1`} placeholder="ইংরেজি নাম / সংক্ষিপ্ত বর্ণনা (ঐচ্ছিক)" value={r.eng} onChange={(e) => update(i, { eng: e.target.value })} />
          <div className="col-span-3 flex justify-end gap-1.5 lg:col-span-1">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="h-9 w-9 rounded-xl bg-slate-800 font-black text-white disabled:opacity-30" aria-label="ওপরে">↑</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="h-9 w-9 rounded-xl bg-slate-800 font-black text-white disabled:opacity-30" aria-label="নিচে">↓</button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`"${r.title || 'এই অধ্যায়'}" তালিকা থেকে বাদ দেবেন?`)) {
                  setRows((all) => all.filter((_, j) => j !== i));
                  setState('idle');
                }
              }}
              className="h-9 w-9 rounded-xl bg-slate-800 font-black text-rose-300 hover:bg-slate-700"
              aria-label="বাদ দিন"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" onClick={add} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:border-slate-500">
            + নতুন অধ্যায়
          </button>
          <button type="button" onClick={resetToDefault} className="rounded-xl px-3 py-2.5 text-xs font-bold text-slate-400 hover:text-white">
            ডিফল্টে ফেরান
          </button>
        </div>
        <AdminSaveButton state={state} onClick={() => save(rows.filter((r) => r.title.trim()))} label="অধ্যায়ের তালিকা Save করুন" />
      </div>
    </div>
  );
}

// How many lecture slots a chapter shows; the other lectures' links stay saved if the number is lowered.
function AdminCountEditor({ chapter, content, password }) {
  const [n, setN] = useState(chapter.count);
  const [state, setState] = useState('idle');
  useEffect(() => {
    setN(chapter.count);
    setState('idle');
  }, [chapter.countKey, chapter.count]);
  const save = () => {
    setState('saving');
    const counts = { ...((content && content.counts) || {}), [chapter.countKey]: n };
    adminPost(password, { action: 'saveCounts', counts }).then((r) => {
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) loadContent();
    });
  };
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <span className="text-xs font-bold text-slate-300">এই অধ্যায়ে লেকচার স্লট</span>
      <button
        type="button"
        onClick={() => {
          setN(Math.max(1, n - 1));
          setState('idle');
        }}
        className="h-9 w-9 rounded-xl bg-slate-800 text-lg font-black text-white hover:bg-slate-700"
        aria-label="কমান"
      >
        −
      </button>
      <span className="w-8 text-center text-lg font-black text-white">{n}</span>
      <button
        type="button"
        onClick={() => {
          setN(Math.min(30, n + 1));
          setState('idle');
        }}
        className="h-9 w-9 rounded-xl bg-slate-800 text-lg font-black text-white hover:bg-slate-700"
        aria-label="বাড়ান"
      >
        +
      </button>
      {n !== chapter.count && <span className="text-[11px] text-amber-300">Save না করা পর্যন্ত সাইটে বদলাবে না</span>}
      <div className="ml-auto">
        <AdminSaveButton state={state} onClick={save} label="সংখ্যা Save করুন" />
      </div>
    </div>
  );
}

function AdminSlotsEditor({ saved, password }) {
  const [slots, setSlots] = useState(saved.map((s) => ({ ...s })));
  const [state, setState] = useState('idle');
  const update = (i, patch) => {
    setSlots((all) => all.map((s, j) => (j === i ? { ...s, ...patch } : s)));
    setState('idle');
  };
  const save = () => {
    setState('saving');
    adminPost(password, { action: 'saveSlots', slots: slots.filter((s) => s.day && s.time.trim()) }).then((r) => {
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) loadContent();
    });
  };
  const select = (value, options, onChange) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={adminInput}>
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  );
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        শুধু খালি (available) স্লট শিক্ষার্থীরা বেছে নিতে পারবে। বুকিং কনফার্ম হলে স্ট্যাটাস "বুকড" করে Save করুন।
      </p>
      {slots.map((s, i) => (
        <div key={i} className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-3 lg:grid-cols-[1fr_2fr_1.4fr_1fr_auto_auto]">
          {select(s.day, ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র'].map((d) => [d, d]), (v) => update(i, { day: v }))}
          <input className={adminInput} placeholder="সময়, যেমন বিকাল ৪:০০ – ৫:৩০" value={s.time} onChange={(e) => update(i, { time: e.target.value })} />
          {select(s.for, [['all', '১-টু-১ ও কাস্টম'], ['one', 'শুধু ১-টু-১'], ['custom', 'শুধু কাস্টম ব্যাচ']], (v) => update(i, { for: v }))}
          {select(s.mode, [['Both', 'Online ও Offline'], ['Online', 'Online'], ['Offline', 'Offline']], (v) => update(i, { mode: v }))}
          <button
            type="button"
            onClick={() => update(i, { status: s.status === 'booked' ? 'available' : 'booked' })}
            className={`rounded-xl px-3 py-2.5 text-xs font-extrabold ${
              s.status === 'booked' ? 'bg-slate-700 text-slate-200' : 'bg-emerald-500 text-slate-950'
            }`}
          >
            {s.status === 'booked' ? '🔒 বুকড' : '✓ খালি'}
          </button>
          <button
            type="button"
            onClick={() => setSlots((all) => all.filter((_, j) => j !== i))}
            className="rounded-xl bg-slate-800 px-3 py-2.5 text-xs font-bold text-rose-300 hover:bg-slate-700"
          >
            মুছুন
          </button>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setSlots((all) => [...all, { day: 'শনি', time: '', for: 'all', mode: 'Both', status: 'available' }])}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:border-slate-500"
        >
          + নতুন স্লট
        </button>
        <AdminSaveButton state={state} onClick={save} label="সব স্লট Save করুন" />
      </div>
    </div>
  );
}

function AdminPage() {
  const content = useContent();
  const catalog = useMemo(() => adminCatalog(content), [content]);
  const [password, setPassword] = useState(() => {
    try {
      return sessionStorage.getItem('adminPassword') || '';
    } catch {
      return '';
    }
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginState, setLoginState] = useState('idle');
  const [tab, setTab] = useState('lectures');
  const [quizLecture, setQuizLecture] = useState('');
  // The public feed only has free lectures; the admin loads every lecture's links after logging in.
  const [allLectures, setAllLectures] = useState(null);
  const [scriptOutdated, setScriptOutdated] = useState(false);
  const refreshLectures = (pw = password) =>
    adminPost(pw, { action: 'getAll' }).then((r) => {
      if (r.ok) {
        setScriptOutdated(false);
        setAllLectures(r.lectures || {});
      } else {
        // An older deployed script doesn't know getAll; fall back to the public lectures.
        setScriptOutdated(r.error === 'unknown-action');
        setAllLectures((contentCache && contentCache.lectures) || {});
      }
    });
  const [courseId, setCourseId] = useState(catalog[0].id);
  const [chapterId, setChapterId] = useState(catalog[0].chapters[0].id);
  const course = catalog.find((c) => c.id === courseId) || catalog[0];
  const chapter = course.chapters.find((c) => c.id === chapterId) || course.chapters[0];

  const login = (pw) => {
    setLoginState('saving');
    adminPost(pw, { action: 'check' }).then((r) => {
      if (r.ok) {
        setLoggedIn(true);
        refreshLectures(pw);
        // Keep the script's price list in step with the site (used to check payments).
        adminPost(pw, { action: 'savePrices', rules: priceRules() });
        try {
          sessionStorage.setItem('adminPassword', pw);
        } catch {
          // Session storage unavailable; the password just won't be remembered.
        }
      }
      setLoginState(r.ok ? 'idle' : r.error === 'network' ? 'network' : 'wrong');
    });
  };
  useEffect(() => {
    if (SITE_LINKS.contentApi && password) login(password);
  }, []);

  const shell = (children) => (
    <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl">⚙️</span>
        <div>
          <h2 className="text-2xl font-black text-white">কন্ট্রোল প্যানেল</h2>
          <p className="text-xs text-slate-400">লেকচারের ভিডিও/PDF, MCQ কুইজ আর প্রাইভেট স্লট</p>
        </div>
      </div>
      {children}
    </main>
  );

  if (!SITE_LINKS.contentApi) {
    return shell(
      <div className="space-y-3 rounded-3xl border border-amber-400/40 bg-slate-900/80 p-6 text-sm leading-relaxed text-slate-300">
        <div className="text-base font-extrabold text-amber-300">প্রথমবার সেটআপ বাকি</div>
        <p>
          কন্ট্রোল প্যানেল আপনার Google Sheet এ তথ্য রাখে। একবার সেটআপ করে Apps Script এর লিংকটা{' '}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-amber-200">SITE_LINKS.contentApi</code> এ বসালেই এই পেজ চালু হবে।
        </p>
        <a
          href="https://github.com/emranislam/profile/blob/main/docs/ADMIN.md"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
        >
          সেটআপ গাইড দেখুন <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  if (!loggedIn) {
    return shell(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(password);
        }}
        className="max-w-sm space-y-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
      >
        <label className="block text-sm font-bold text-white">পাসওয়ার্ড</label>
        <input type="password" className={adminInput} value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
        {loginState === 'wrong' && <div className="text-xs text-rose-300">পাসওয়ার্ড মেলেনি।</div>}
        {loginState === 'network' && <div className="text-xs text-rose-300">সংযোগ করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।</div>}
        <button
          type="submit"
          disabled={!password || loginState === 'saving'}
          className="w-full rounded-xl bg-amber-400 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-300 disabled:opacity-50"
        >
          {loginState === 'saving' ? 'যাচাই হচ্ছে…' : 'লগইন'}
        </button>
      </form>
    );
  }

  if (!content || !allLectures) return shell(<div className="text-sm text-slate-400">তথ্য লোড হচ্ছে…</div>);

  const pickers = (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:grid-cols-2">
      <select
        className={adminInput}
        value={course.id}
        onChange={(e) => {
          const next = catalog.find((c) => c.id === e.target.value);
          setCourseId(next.id);
          setChapterId(next.chapters[0].id);
        }}
      >
        {catalog.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <select className={adminInput} value={chapter.id} onChange={(e) => setChapterId(e.target.value)}>
        {course.chapters.map((ch) => (
          <option key={ch.id} value={ch.id}>
            {ch.label}
          </option>
        ))}
      </select>
    </div>
  );

  return shell(
    <>
      {content.error && (
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs text-rose-200">
          Sheet থেকে তথ্য পড়া যায়নি। পেজ রিলোড করে দেখুন।
        </div>
      )}
      {scriptOutdated && (
        <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100">
          আপনার Apps Script এর ভার্সন পুরনো। এই অবস্থায় পেইড লেকচারের সংরক্ষিত লিংক এখানে দেখা যাবে না আর সাইটের পাবলিক তথ্যে
          সব লিংক চলে যাবে। Apps Script এ নতুন <code>admin-apps-script.gs</code> পেস্ট করে <b>Deploy → Manage deployments → ✏️ →
          New version → Deploy</b> করুন।
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ChoiceChips
          options={['🎥 লেকচার', '📚 অধ্যায়', '📝 MCQ কুইজ', '🏁 লাইভ এক্সাম', '📅 প্রাইভেট স্লট', '💳 পেমেন্ট', '📦 বই অর্ডার', '📖 বই', '⭐ মতামত', '🏠 হোম']}
          value={{ lectures: '🎥 লেকচার', outline: '📚 অধ্যায়', quiz: '📝 MCQ কুইজ', exams: '🏁 লাইভ এক্সাম', slots: '📅 প্রাইভেট স্লট', payments: '💳 পেমেন্ট', orders: '📦 বই অর্ডার', books: '📖 বই', reviews: '⭐ মতামত', home: '🏠 হোম' }[tab]}
          onChange={(v) => setTab({ '🎥 লেকচার': 'lectures', '📚 অধ্যায়': 'outline', '📝 MCQ কুইজ': 'quiz', '🏁 লাইভ এক্সাম': 'exams', '📅 প্রাইভেট স্লট': 'slots', '💳 পেমেন্ট': 'payments', '📦 বই অর্ডার': 'orders', '📖 বই': 'books', '⭐ মতামত': 'reviews', '🏠 হোম': 'home' }[v])}
        />
        <button
          type="button"
          onClick={() => {
            setLoggedIn(false);
            setPassword('');
            try {
              sessionStorage.removeItem('adminPassword');
            } catch {
              // ignore
            }
          }}
          className="text-xs font-bold text-slate-400 hover:text-white"
        >
          লগআউট
        </button>
      </div>

      {tab === 'lectures' && (
        <div className="space-y-4">
          {pickers}
          <p className="text-xs text-slate-400">
            YouTube এর পুরো লিংক পেস্ট করুন। PDF Google Drive এ রেখে "Anyone with the link" করে শেয়ার লিংক দিন। ঘর খালি করে Save করলে লিংক মুছে যাবে।
          </p>
          <AdminCountEditor chapter={chapter} content={content} password={password} />
          <AdminLockBar lectures={chapter.lectures} locks={content.locks || {}} password={password} onDone={() => loadContent()} />
          {chapter.lectures.map((l) => (
            <AdminLectureRow
              key={`${l.key}:${content.locks && l.key in content.locks ? content.locks[l.key] : 'open'}`}
              lecture={l}
              lock={content.locks && Object.prototype.hasOwnProperty.call(content.locks, l.key) ? content.locks[l.key] : undefined}
              saved={allLectures[l.key] || {}}
              title={(content.titles && content.titles[l.key]) || ''}
              minutes={(content.durations && content.durations[l.key]) || ''}
              password={password}
              onSaved={() => refreshLectures()}
            />
          ))}
        </div>
      )}

      {tab === 'outline' && (
        <div className="space-y-4">
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className={adminInput}>
            {catalog.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <AdminOutlineEditor group={course.id} label={course.label} password={password} />
        </div>
      )}

      {tab === 'quiz' && (
        <div className="space-y-4">
          {pickers}
          {(() => {
            const target = chapter.lectures.some((l) => l.key === quizLecture) ? quizLecture : chapter.quizKey;
            const count = (k) => ((content.quiz && content.quiz[k]) || []).length;
            return (
              <>
                <select className={adminInput} value={target} onChange={(e) => setQuizLecture(e.target.value === chapter.quizKey ? '' : e.target.value)}>
                  <option value={chapter.quizKey}>
                    পুরো অধ্যায়ের কুইজ{count(chapter.quizKey) ? ` ✓ (${toBnDigits(count(chapter.quizKey))}টি)` : ''}, যে লেকচারে আলাদা কুইজ নেই সেখানে এটা দেখায়
                  </option>
                  {chapter.lectures.map((l) => (
                    <option key={l.key} value={l.key}>
                      {l.label}{count(l.key) ? ` ✓ (${toBnDigits(count(l.key))}টি)` : ' — কুইজ নেই'}
                    </option>
                  ))}
                </select>
                <AdminQuizEditor key={target} quizKey={target} saved={(content.quiz && content.quiz[target]) || []} password={password} />
              </>
            );
          })()}
        </div>
      )}

      {tab === 'exams' && <AdminExamsTab password={password} />}

      {tab === 'slots' && <AdminSlotsEditor saved={content.slots || []} password={password} />}

      {tab === 'payments' && <AdminPaymentsTab password={password} content={content} />}

      {tab === 'orders' && <AdminOrdersTab password={password} />}

      {tab === 'books' && <AdminBooksTab password={password} content={content} />}

      {tab === 'reviews' && <AdminReviewsTab password={password} content={content} />}

      {tab === 'home' && <AdminHomeTab password={password} content={content} />}
    </>
  );
}

// Admin: book orders and their delivery status.
const ORDER_STATUS = { new: ['নতুন', 'bg-amber-500/20 text-amber-300'], delivered: ['ডেলিভারি হয়েছে', 'bg-emerald-500/20 text-emerald-300'], cancelled: ['বাতিল', 'bg-slate-700 text-slate-300'] };
function AdminOrdersTab({ password }) {
  const [orders, setOrders] = useState(null); // null loading, false old script
  const load = () => adminPost(password, { action: 'listOrders' }).then((r) => setOrders(r.ok ? r.orders : false));
  useEffect(() => {
    load();
  }, []);
  const mark = (row, status) => adminPost(password, { action: 'setOrderStatus', row, status }).then(load);
  if (orders === null) return <div className="text-sm text-slate-400">লোড হচ্ছে…</div>;
  if (orders === false) {
    return <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-100">Apps Script এর ভার্সন পুরনো। নতুন <code>admin-apps-script.gs</code> পেস্ট করে New version Deploy করুন।</div>;
  }
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">পেমেন্ট যাচাই হওয়া বইয়ের অর্ডার। বই পাঠালে "ডেলিভারি হয়েছে" চিহ্ন দিন।</p>
      {orders.length === 0 && <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-400">এখনো কোনো অর্ডার নেই।</div>}
      {orders.map((o) => (
        <div key={o.row} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-bold text-white">{o.title}</div>
            <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${(ORDER_STATUS[o.status] || ORDER_STATUS.new)[1]}`}>{(ORDER_STATUS[o.status] || ORDER_STATUS.new)[0]}</span>
          </div>
          <div className="space-y-0.5 text-xs text-slate-300">
            <div>নাম: <b className="text-white">{o.name}</b> • যোগাযোগ: <b className="text-white">{o.phone}</b></div>
            <div>ঠিকানা: <b className="text-white">{o.address}</b></div>
            <div className="font-mono text-[11px] text-slate-500">{o.trxId} • ৳{o.amount} • {o.at ? new Date(o.at).toLocaleString('bn-BD') : ''}</div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {['new', 'delivered', 'cancelled'].filter((s) => s !== o.status).map((s) => (
              <button key={s} onClick={() => mark(o.row, s)} className="rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-700">
                {ORDER_STATUS[s][0]} করুন
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- Home page: demo video + daily question
function AdminHomeTab({ password, content }) {
  const settings = (content && content.settings) || {};
  const daily = (content && content.daily) || [];
  const [video, setVideo] = useState(settings.demoVideo || '');
  const [vTitle, setVTitle] = useState(settings.demoTitle || '');
  const [vState, setVState] = useState('idle');
  const blank = { id: '', q: '', options: ['', '', '', ''], answer: 0, explain: '' };
  const [f, setF] = useState(blank);
  const [qState, setQState] = useState('idle');
  const videoOk = !video.trim() || !!demoVideoId(video);
  const saveVideo = () => {
    setVState('busy');
    Promise.all([
      adminPost(password, { action: 'saveSetting', key: 'demoVideo', value: video.trim() }),
      adminPost(password, { action: 'saveSetting', key: 'demoTitle', value: vTitle.trim() })
    ]).then((rs) => {
      setVState(rs.every((r) => r.ok) ? 'done' : 'error');
      loadContent();
    });
  };
  const qOk = f.q.trim().length >= 3 && f.options.every((o) => o.trim());
  const saveQ = () => {
    setQState('busy');
    adminPost(password, { action: 'saveDaily', ...f, id: f.id || `dq-${Date.now().toString(36)}` }).then((r) => {
      setQState(r.ok ? 'done' : 'error');
      if (r.ok) {
        setF(blank);
        loadContent();
      }
    });
  };
  const removeQ = (id) => window.confirm('প্রশ্নটি মুছবেন?') && adminPost(password, { action: 'deleteDaily', id }).then(() => loadContent());
  const today = daily.length ? daily[dhakaDay() % daily.length] : null;
  const label = 'mb-1 block text-[11px] font-semibold text-slate-400';
  const msg = (st) => (st === 'busy' ? 'সেভ হচ্ছে…' : st === 'done' ? '✓ সেভ হয়েছে' : st === 'error' ? 'সেভ হয়নি (Apps Script পুরনো কি না দেখুন)' : '');
  return (
    <div className="space-y-5">
      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="text-sm font-bold text-white">▶ হোম পেজের ফ্রি ডেমো ভিডিও</div>
        <p className="text-xs text-slate-400">YouTube ভিডিওর লিংক দিন। ফাঁকা রাখলে হোমে ভিডিওর অংশ দেখাবে না।</p>
        <label className="block">
          <span className={label}>YouTube লিংক</span>
          <input className={adminInput} value={video} onChange={(e) => setVideo(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
          {!videoOk && <span className="mt-1 block text-[11px] text-rose-300">এটি YouTube ভিডিওর লিংক নয়।</span>}
        </label>
        <label className="block">
          <span className={label}>শিরোনাম (ঐচ্ছিক)</span>
          <input className={adminInput} value={vTitle} onChange={(e) => setVTitle(e.target.value)} placeholder="যেমন: অন্তরীকরণের প্রথম ক্লাস" />
        </label>
        <div className="flex items-center gap-2">
          <button type="button" disabled={vState === 'busy' || !videoOk} onClick={saveVideo} className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 disabled:opacity-50">
            ভিডিও Save
          </button>
          <span className="text-[11px] text-slate-400">{msg(vState)}</span>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="text-sm font-bold text-white">🧠 আজকের প্রশ্ন — {f.id ? 'প্রশ্ন বদলান' : 'নতুন প্রশ্ন যোগ করুন'}</div>
        <p className="text-xs text-slate-400">হোমে প্রতিদিন একটি করে প্রশ্ন পালাক্রমে দেখায়। {toBnDigits(daily.length)}টি প্রশ্ন থাকলে {toBnDigits(daily.length)} দিন পর আবার প্রথমটি আসে। ৩০টির মতো রাখলে ভালো।</p>
        <label className="block">
          <span className={label}>প্রশ্ন</span>
          <textarea className={`${adminInput} min-h-[72px]`} value={f.q} onChange={(e) => setF((x) => ({ ...x, q: e.target.value }))} placeholder="প্রশ্ন লিখুন" />
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {f.options.map((o, i) => (
            <label key={i} className="flex items-center gap-2">
              <input type="radio" name="daily-answer" checked={f.answer === i} onChange={() => setF((x) => ({ ...x, answer: i }))} aria-label={`সঠিক উত্তর ${'কখগঘ'[i]}`} />
              <input
                className={adminInput}
                value={o}
                onChange={(e) => setF((x) => ({ ...x, options: x.options.map((v, j) => (j === i ? e.target.value : v)) }))}
                placeholder={`অপশন ${'কখগঘ'[i]}`}
              />
            </label>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">সঠিক উত্তরের পাশের গোল বোতামটি বেছে দিন।</p>
        <label className="block">
          <span className={label}>ব্যাখ্যা (ঐচ্ছিক)</span>
          <textarea className={`${adminInput} min-h-[60px]`} value={f.explain} onChange={(e) => setF((x) => ({ ...x, explain: e.target.value }))} placeholder="উত্তরের ছোট ব্যাখ্যা" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={qState === 'busy' || !qOk} onClick={saveQ} className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 disabled:opacity-50">
            প্রশ্ন Save
          </button>
          {f.id && (
            <button type="button" onClick={() => setF(blank)} className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white">
              বাতিল
            </button>
          )}
          <span className="text-[11px] text-slate-400">{msg(qState)}</span>
        </div>
      </div>

      {daily.length === 0 && <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-400">এখনো কোনো প্রশ্ন নেই। প্রশ্ন না থাকলে হোমে "আজকের প্রশ্ন" অংশ দেখাবে না।</div>}
      {daily.map((d, n) => (
        <div key={d.id} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="text-sm font-semibold text-white">{toBnDigits(n + 1)}. {d.q}</div>
            {today && today.id === d.id && <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-200">আজ দেখাচ্ছে</span>}
          </div>
          <div className="text-xs text-slate-400">
            {d.options.map((o, i) => (
              <span key={i} className={`mr-3 ${i === d.answer ? 'font-bold text-emerald-300' : ''}`}>{'কখগঘ'[i]}) {o}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setF({ id: d.id, q: d.q, options: [...d.options], answer: d.answer, explain: d.explain })} className="rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-700">
              বদলান
            </button>
            <button type="button" onClick={() => removeQ(d.id)} className="rounded-lg bg-rose-500/20 px-3 py-1.5 text-[11px] font-bold text-rose-300 hover:bg-rose-500/30">
              মুছুন
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminReviewsTab({ password, content }) {
  const blank = { id: '', name: '', info: '', text: '', link: '' };
  const [f, setF] = useState(blank);
  const [state, setState] = useState('idle');
  const reviews = (content && content.reviews) || [];
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const linkOk = !f.link.trim() || FB_LINK_RE.test(f.link.trim());
  const save = () => {
    setState('busy');
    adminPost(password, { action: 'saveReview', ...f, id: f.id || `rv-${Date.now().toString(36)}`, link: f.link.trim() }).then((r) => {
      setState(r.ok ? 'done' : r.error === 'bad-link' ? 'bad-link' : 'error');
      if (r.ok) {
        setF(blank);
        loadContent();
      }
    });
  };
  const remove = (id) => window.confirm('মতামতটি সাইট থেকে সরাবেন?') && adminPost(password, { action: 'deleteReview', id }).then(() => loadContent());
  const label = 'mb-1 block text-[11px] font-semibold text-slate-400';
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs leading-relaxed text-slate-300">
        শিক্ষার্থীরা সাইটের "Facebook এ মতামত দিন" বোতাম চেপে আপনার Facebook পেজে লেখে। যে মতামত সাইটে দেখাতে চান, তার লেখা ও লিংক এখানে বসান।
        লিংক পেতে Facebook এ মতামতের তারিখে বা "…" মেনুতে "Copy link" চাপুন।
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="text-sm font-bold text-white">{f.id ? '✏️ মতামত বদলান' : '+ নতুন মতামত যোগ করুন'}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>শিক্ষার্থীর নাম</span>
            <input className={adminInput} value={f.name} onChange={set('name')} placeholder="যেমন: রাফি আহমেদ" />
          </label>
          <label>
            <span className={label}>পরিচয় (ঐচ্ছিক)</span>
            <input className={adminInput} value={f.info} onChange={set('info')} placeholder="যেমন: HSC 2025, হামদর্দ পাবলিক কলেজ" />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>মতামত</span>
            <textarea className={`${adminInput} min-h-[96px]`} value={f.text} onChange={set('text')} placeholder="Facebook এ যা লিখেছে, সেটা কপি করে দিন" />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Facebook লিংক (ঐচ্ছিক)</span>
            <input className={adminInput} value={f.link} onChange={set('link')} placeholder="https://www.facebook.com/..." />
            {!linkOk && <span className="mt-1 block text-[11px] text-rose-300">শুধু facebook.com এর লিংক দেওয়া যাবে।</span>}
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={state === 'busy' || f.text.trim().length < 3 || !linkOk}
            onClick={save}
            className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 disabled:opacity-50"
          >
            Save
          </button>
          {f.id && (
            <button type="button" onClick={() => setF(blank)} className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white">
              বাতিল
            </button>
          )}
          <span className="text-[11px] text-slate-400">
            {state === 'busy' ? 'সেভ হচ্ছে…' : state === 'done' ? '✓ সেভ হয়েছে' : state === 'bad-link' ? 'লিংকটি Facebook এর নয়' : state === 'error' ? 'সেভ হয়নি (Apps Script পুরনো কি না দেখুন)' : ''}
          </span>
        </div>
      </div>
      {reviews.length === 0 && <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-400">এখনো কোনো মতামত যোগ করা হয়নি।</div>}
      {reviews.map((r) => (
        <div key={r.id} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-sm text-slate-200">“{r.text}”</div>
          <div className="text-xs text-slate-400">
            <b className="text-white">{r.name || 'শিক্ষার্থী'}</b>
            {r.info ? ` • ${r.info}` : ''}
            {r.link && (
              <a href={r.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-[#6ea8ff] hover:underline">
                Facebook ↗
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setF({ id: r.id, name: r.name, info: r.info, text: r.text, link: r.link })} className="rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-700">
              বদলান
            </button>
            <button type="button" onClick={() => remove(r.id)} className="rounded-lg bg-rose-500/20 px-3 py-1.5 text-[11px] font-bold text-rose-300 hover:bg-rose-500/30">
              সরান
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- Book shelf editor
// Built-in books can be re-priced, renamed or hidden; new books can be added or removed.
function AdminBookCard({ item, password, onChanged }) {
  const row = item.row || {};
  const [f, setF] = useState({
    title: row.title || item.title,
    series: row.series !== undefined && row.series !== '' ? row.series : item.series || '',
    author: row.author || item.author || '',
    badge: row.badge || item.badge || '',
    price: String(row.price > 0 ? row.price : item.price || ''),
    meta: row.meta || item.meta || '',
    icon: row.icon || item.icon || '📖',
    cover: row.cover || item.cover || 0,
    image: row.image || '',
    link: row.link || '',
    hidden: row.status === 'hidden'
  });
  const [upload, setUpload] = useState(''); // '' | busy | error message
  const [state, setState] = useState('idle');
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const run = (payload) => {
    setState('busy');
    return adminPost(password, payload).then((r) => {
      setState(r.ok ? 'done' : 'error');
      if (r.ok) onChanged();
    });
  };
  const save = (hidden = f.hidden, image = f.image) =>
    run({
      action: 'saveBook',
      key: item.key,
      title: f.title.trim(),
      series: f.series.trim(),
      author: f.author.trim(),
      badge: f.badge.trim(),
      price: priceNumber(f.price),
      meta: f.meta.trim(),
      icon: f.icon.trim(),
      cover: f.cover,
      image: image.trim(),
      link: f.link.trim(),
      status: hidden ? 'hidden' : ''
    });
  // Shrinks the picture in the browser (longest side 900px, JPEG), uploads it to the owner's Drive and saves it.
  const pickCover = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!/^image\//.test(file.type)) return setUpload('শুধু ছবি (JPG, PNG, WebP) দেওয়া যাবে।');
    setUpload('busy');
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, 900 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(src);
      const data = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
      adminPost(password, { action: 'uploadCover', key: item.key, mime: 'image/jpeg', data }).then((r) => {
        if (!r.ok) {
          if (r.error === 'drive-permission') return setUpload('Apps Script কে Google Drive ব্যবহারের অনুমতি দেওয়া হয়নি। Apps Script editor এ authorizeDrive ফাংশন বেছে Run করে Allow দিন, তারপর আবার চেষ্টা করুন।');
          if (r.error === 'bad-input') return setUpload('ছবিটি নেওয়া গেল না। আরেকটি ছবি (JPG, PNG বা WebP) দিয়ে দেখুন।');
          if (r.error === 'unknown-action') return setUpload('Apps Script এর পুরনো version চলছে। নতুন কোড paste করে Deploy → Manage deployments → New version দিন।');
          return setUpload('আপলোড হয়নি, সার্ভার থেকে উত্তর আসেনি। প্রায়ই কারণ Google Drive এর অনুমতি: Apps Script editor এ authorizeDrive Run করে Allow দিন, তারপর New version Deploy করুন।');
        }
        setUpload('');
        setF((x) => ({ ...x, image: r.url }));
        if (f.title.trim()) save(f.hidden, r.url);
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(src);
      setUpload('ছবিটি পড়া যায়নি।');
    };
    img.src = src;
  };
  const linkOk = !f.link.trim() || /^https:\/\/[^\s"'<>()]+$/i.test(f.link.trim());
  const coverOk = !f.image.trim() || /^https:\/\/[^\s"'<>()]+$/i.test(f.image.trim());
  const label = 'mb-1 block text-[11px] font-semibold text-slate-400';
  return (
    <div className={`space-y-3 rounded-2xl border p-4 ${f.hidden ? 'border-slate-800 bg-slate-900/40 opacity-70' : 'border-slate-800 bg-slate-900/70'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-bold text-white">
          {item.builtIn ? '📚' : '✨'} {f.title || 'নতুন বই'}
          {f.hidden && <span className="ml-2 rounded bg-slate-700 px-1.5 py-0.5 text-[10px]">লুকানো</span>}
        </div>
        <span className="font-mono text-[10px] text-slate-500">{item.key}</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="w-24 shrink-0">
          <BookCover book={{ ...item, title: f.title, series: f.series, author: f.author, icon: f.icon, grad: item.course ? item.grad : BOOK_GRADS[f.cover] || item.grad || BOOK_GRADS[0], image: coverOk ? f.image.trim() : '' }} />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <span className={label}>কভারের ছবি</span>
          <div className="flex flex-wrap items-center gap-2">
            <label className={`cursor-pointer rounded-lg bg-sky-500/20 px-3 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/30 ${upload === 'busy' ? 'pointer-events-none opacity-60' : ''}`}>
              {upload === 'busy' ? 'আপলোড হচ্ছে…' : '📷 ছবি আপলোড করুন'}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={pickCover} />
            </label>
            {f.image && (
              <button
                type="button"
                onClick={() => {
                  setF((x) => ({ ...x, image: '' }));
                  if (f.title.trim()) save(f.hidden, '');
                }}
                className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                ছবি সরান
              </button>
            )}
          </div>
          <input className={adminInput} value={f.image} onChange={set('image')} placeholder="অথবা ছবির লিংক (Google Drive লিংকও চলবে)" />
          {!coverOk && <span className="block text-[11px] text-rose-300">লিংক https:// দিয়ে শুরু হতে হবে।</span>}
          {upload && upload !== 'busy' && <span className="block text-[11px] text-rose-300">{upload}</span>}
          <span className="block text-[11px] text-slate-500">ছবি না দিলে রং ও ইমোজির কভার দেখাবে। খাড়া (৩:৪) ছবি সবচেয়ে ভালো দেখায়।</span>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className={label}>বইয়ের নাম</span>
          <input className={adminInput} value={f.title} onChange={set('title')} placeholder="বইয়ের নাম" />
        </label>
        {!item.course && (
          <label>
            <span className={label}>সিরিজ / প্রকাশক (ছোট লেখা)</span>
            <input className={adminInput} value={f.series} onChange={set('series')} />
          </label>
        )}
        <label>
          <span className={label}>লেখক</span>
          <input className={adminInput} value={f.author} onChange={set('author')} />
        </label>
        <label>
          <span className={label}>ব্যাজ (যেমন Best Seller)</span>
          <input className={adminInput} value={f.badge} onChange={set('badge')} />
        </label>
        <label>
          <span className={label}>PDF কপির দাম (৳) — ফাঁকা থাকলে অর্ডার বাটনের বদলে ইমেইল লিংক</span>
          <input className={adminInput} inputMode="numeric" value={f.price} onChange={set('price')} />
        </label>
        {!item.course && (
          <label className="sm:col-span-2">
            <span className={label}>অন্য সাইটে কেনার লিংক (Amazon ইত্যাদি, ঐচ্ছিক) — দিলে "Amazon এ কিনুন" বাটন আসে</span>
            <input className={adminInput} value={f.link} onChange={set('link')} placeholder="https://www.amazon.com/dp/..." />
            {!linkOk && <span className="block text-[11px] text-rose-300">লিংক https:// দিয়ে শুরু হতে হবে।</span>}
          </label>
        )}
        {!item.course && (
          <label className="sm:col-span-2">
            <span className={label}>এক লাইনের বিবরণ</span>
            <input className={adminInput} value={f.meta} onChange={set('meta')} />
          </label>
        )}
        {!item.course && (
          <label>
            <span className={label}>কভারের ইমোজি</span>
            <input className={adminInput} value={f.icon} onChange={set('icon')} maxLength={4} />
          </label>
        )}
        {!item.course && (
          <div>
            <span className={label}>কভারের রং</span>
            <div className="flex flex-wrap gap-2">
              {BOOK_GRADS.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  aria-label={`রং ${i + 1}`}
                  onClick={() => setF((x) => ({ ...x, cover: i }))}
                  className={`h-8 w-8 rounded-lg bg-gradient-to-br ${g} ${f.cover === i ? 'ring-2 ring-white' : ''}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={state === 'busy' || !f.title.trim() || !coverOk || !linkOk}
          onClick={() => save()}
          className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          disabled={state === 'busy'}
          onClick={() => {
            setF((x) => ({ ...x, hidden: !x.hidden }));
            save(!f.hidden);
          }}
          className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700"
        >
          {f.hidden ? 'আবার দেখান' : 'সাইট থেকে লুকান'}
        </button>
        {item.builtIn && item.row && (
          <button
            type="button"
            disabled={state === 'busy'}
            onClick={() => window.confirm('আগের ডিফল্ট তথ্যে ফিরে যাবে। ঠিক আছে?') && run({ action: 'deleteBook', key: item.key })}
            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700"
          >
            ডিফল্টে ফিরুন
          </button>
        )}
        {!item.builtIn && (
          <button
            type="button"
            disabled={state === 'busy'}
            onClick={() => window.confirm('বইটি মুছে ফেলবেন?') && run({ action: 'deleteBook', key: item.key })}
            className="rounded-lg bg-rose-500/20 px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/30"
          >
            বই মুছুন
          </button>
        )}
        <span className="text-[11px] text-slate-400">
          {state === 'busy' ? 'সেভ হচ্ছে…' : state === 'done' ? '✓ সেভ হয়েছে' : state === 'error' ? 'সেভ হয়নি (Apps Script পুরনো কি না দেখুন)' : ''}
        </span>
      </div>
    </div>
  );
}

function AdminBooksTab({ password, content }) {
  const [drafts, setDrafts] = useState([]); // new books not saved yet
  const rows = Object.fromEntries(((content && content.books) || []).map((r) => [r.key, r]));
  const reload = () => loadContent();
  const items = [
    ...COURSE_BOOK_ORIGINAL.map((o, i) => {
      const c = SPECIAL_COURSES_WITH_BOOKS[i];
      return { key: c.id, builtIn: true, course: true, title: o.bookTitle, author: o.author, badge: o.badge, price: priceNumber(o.bookPriceBdt), grad: c.grad, icon: c.icon, row: rows[c.id] };
    }),
    ...CV_SHOP_BOOKS.map((b) => ({ ...b, builtIn: true, price: 0, row: rows[b.key] })),
    ...((content && content.books) || []).filter((r) => !SPECIAL_COURSES_WITH_BOOKS.some((c) => c.id === r.key) && !CV_SHOP_BOOKS.some((b) => b.key === r.key)).map((r) => ({ key: r.key, builtIn: false, title: r.title, row: r })),
    ...drafts.filter((key) => !rows[key]).map((key) => ({ key, builtIn: false, title: '', row: null }))
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">সাইটের সব বই এখান থেকে বদলানো যাবে: নাম, দাম, ব্যাজ, লুকানো, আর নতুন বই যোগ করা। বদলানোর পর সাইটে রিফ্রেশ করলে দেখা যাবে।</p>
      <button
        type="button"
        onClick={() => setDrafts((d) => [...d, `bk-${Date.now().toString(36)}`])}
        className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-950"
      >
        + নতুন বই যোগ করুন
      </button>
      {items.map((it) => (
        <AdminBookCard
          key={it.key}
          item={it}
          password={password}
          onChanged={reload}
        />
      ))}
    </div>
  );
}

// Admin: create, edit and publish exams.
function AdminExamEditor({ exam, password, onBack }) {
  const [form, setForm] = useState({ id: exam.id || '', title: exam.title || '', subject: exam.subject || '', minutes: exam.minutes || 30, price: exam.price || 10, status: exam.status || 'draft' });
  const [questions, setQuestions] = useState(exam.questions && exam.questions.length ? exam.questions : [emptyQuestion()]);
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const update = (i, patch) => {
    setQuestions((qs) => qs.map((q, j) => (j === i ? { ...q, ...patch } : q)));
    setState('idle');
  };
  const setField = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setState('idle');
  };
  const complete = questions.filter((q) => q.q.trim() && q.options.every((o) => o.trim()));
  const save = () => {
    setState('saving');
    setMsg('');
    adminPost(password, { action: 'saveExam', exam: { ...form, minutes: Number(form.minutes), price: Number(form.price), questions: complete } }).then((r) => {
      setState(r.ok ? 'saved' : 'error');
      if (r.ok) setForm((f) => ({ ...f, id: r.id }));
      else setMsg({ 'bad-input': 'নাম, সময় (১–৩০০ মিনিট) আর ফি ঠিকঠাক দিন।', 'no-questions': 'প্রকাশ করতে অন্তত একটি পূর্ণ প্রশ্ন লাগবে।', 'unknown-action': 'Apps Script এর ভার্সন পুরনো, নতুন কোড Deploy করুন।' }[r.error] || 'Save করা যায়নি।');
    });
  };
  const remove = () => {
    if (!form.id || !window.confirm('এই পরীক্ষা ও প্রশ্নগুলো মুছে ফেলবেন?')) return;
    adminPost(password, { action: 'deleteExam', id: form.id }).then((r) => r.ok && onBack());
  };
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-xs font-bold text-cyan-300 hover:underline">← সব পরীক্ষা</button>
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 lg:grid-cols-[3fr_2fr_1fr_1fr_1.4fr]">
        <input className={`${adminInput} col-span-2 lg:col-span-1`} placeholder="পরীক্ষার নাম" value={form.title} onChange={setField('title')} />
        <input className={adminInput} placeholder="বিষয় (যেমন উচ্চতর গণিত)" value={form.subject} onChange={setField('subject')} />
        <input className={adminInput} type="number" min="1" max="300" placeholder="মিনিট" value={form.minutes} onChange={setField('minutes')} />
        <input className={adminInput} type="number" min="1" placeholder="ফি ৳" value={form.price} onChange={setField('price')} />
        <select className={adminInput} value={form.status} onChange={setField('status')}>
          <option value="draft">খসড়া (লুকানো)</option>
          <option value="published">প্রকাশিত</option>
        </select>
      </div>
      {questions.map((q, i) => (
        <div key={i} className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">প্রশ্ন {toBnDigits(i + 1)}</span>
            <button type="button" onClick={() => setQuestions((qs) => qs.filter((_, j) => j !== i))} className="text-xs font-bold text-rose-300 hover:underline">
              মুছুন
            </button>
          </div>
          <input className={adminInput} placeholder="প্রশ্ন" value={q.q} onChange={(e) => update(i, { q: e.target.value })} />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {q.options.map((o, oi) => (
              <label key={oi} className="flex items-center gap-2">
                <input type="radio" name={`exam-ans-${i}`} checked={q.answer === oi} onChange={() => update(i, { answer: oi })} className="h-4 w-4 accent-emerald-400" />
                <input className={adminInput} placeholder={`অপশন ${['ক', 'খ', 'গ', 'ঘ'][oi]}`} value={o} onChange={(e) => update(i, { options: q.options.map((x, xi) => (xi === oi ? e.target.value : x)) })} />
              </label>
            ))}
          </div>
          <input className={adminInput} placeholder="ব্যাখ্যা (ঐচ্ছিক)" value={q.explain} onChange={(e) => update(i, { explain: e.target.value })} />
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" onClick={() => setQuestions((qs) => [...qs, emptyQuestion()])} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:border-slate-500">
            + নতুন প্রশ্ন
          </button>
          {form.id && (
            <button type="button" onClick={remove} className="rounded-xl px-3 py-2.5 text-xs font-bold text-rose-300 hover:underline">
              পরীক্ষা মুছুন
            </button>
          )}
        </div>
        <AdminSaveButton state={state} onClick={save} label={`পরীক্ষা Save করুন (${toBnDigits(complete.length)}টি প্রশ্ন)`} />
      </div>
      {msg && <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs text-rose-200">{msg}</div>}
    </div>
  );
}

function AdminExamsTab({ password }) {
  const [exams, setExams] = useState(null); // null loading, false old script
  const [editing, setEditing] = useState(null);
  const load = () => adminPost(password, { action: 'getExams' }).then((r) => setExams(r.ok ? r.exams : false));
  useEffect(() => {
    load();
  }, []);
  if (exams === null) return <div className="text-sm text-slate-400">লোড হচ্ছে…</div>;
  if (exams === false) {
    return <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-100">Apps Script এর ভার্সন পুরনো। নতুন <code>admin-apps-script.gs</code> পেস্ট করে New version Deploy করুন।</div>;
  }
  if (editing) {
    return (
      <AdminExamEditor
        key={editing.id || 'new'}
        exam={editing}
        password={password}
        onBack={() => {
          setEditing(null);
          setExams(null);
          load();
          loadContent();
        }}
      />
    );
  }
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">প্রকাশিত পরীক্ষা সাইটের "লাইভ এক্সাম" পেজে দেখায়। প্রশ্ন ও উত্তর শুধু পেমেন্ট যাচাইয়ের পর শিক্ষার্থীর কাছে যায়।</p>
      {exams.map((e) => (
        <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div>
            <div className="text-sm font-bold text-white">{e.title}</div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              {e.questions.length}টি প্রশ্ন • {e.minutes} মিনিট • ৳{e.price} •{' '}
              <span className={e.status === 'published' ? 'text-emerald-300' : 'text-slate-500'}>{e.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}</span>
            </div>
          </div>
          <button onClick={() => setEditing(e)} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700">
            সম্পাদনা
          </button>
        </div>
      ))}
      <button onClick={() => setEditing({})} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:border-slate-500">
        + নতুন পরীক্ষা
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- Admin: payments tab
const REPORT_SCOPES = { lecture: 'লেকচার', course: 'কোর্স', book: 'বই', exam: 'লাইভ এক্সাম' };
const takaBn = (n) => `৳${toBnDigits(Math.round(n).toLocaleString('en-US'))}`;

// 📊 Money in, and which lectures / courses / books are being bought (and which locked lectures are not).
function AdminPaymentReport({ password, content }) {
  const [report, setReport] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    adminPost(password, { action: 'paymentReport' }).then((r) => (r.ok ? setReport(r.report) : setFailed(true)));
  }, []);
  const names = useMemo(() => {
    const m = {};
    adminCatalog(content).forEach((c) =>
      c.chapters.forEach((ch) => ch.lectures.forEach((l) => (m[l.key] = `${ch.label} · ${l.label}`)))
    );
    return m;
  }, [content]);
  const nameOf = (key) => {
    const [scope, id] = String(key).split('|');
    if (scope === 'lecture') return names[id] || id;
    if (scope === 'course') {
      const c = SPECIAL_COURSES_WITH_BOOKS.find((x) => x.id === id);
      return c ? `${c.courseTitle} (পুরো কোর্স)` : id;
    }
    if (scope === 'book') {
      const own = (content.books || []).find((x) => x.key === id && x.title);
      const b = SPECIAL_COURSES_WITH_BOOKS.find((x) => x.id === id);
      return own ? own.title : b ? b.bookTitle : id;
    }
    return `${REPORT_SCOPES[scope] || scope} ${id || ''}`;
  };
  if (failed) {
    return (
      <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-100">
        হিসাব দেখাতে Apps Script এর নতুন ভার্সন Deploy করতে হবে।
      </div>
    );
  }
  if (!report) return <div className="text-sm text-slate-400">হিসাব লোড হচ্ছে…</div>;
  const { status } = report;
  const maxDay = Math.max(1, ...report.days.map((d) => d.amount));
  const card = (title, big, sub, tone = 'text-white') => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5">
      <div className="text-[11px] font-bold text-slate-400">{title}</div>
      <div className={`mt-1 text-xl font-extrabold ${tone}`}>{big}</div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-500">{sub}</div>}
    </div>
  );
  return (
    <div className="space-y-4 rounded-3xl border border-amber-400/30 bg-amber-500/5 p-4">
      <div className="text-sm font-extrabold text-white">📊 হিসাব</div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {card('মোট আয় (আনলক হয়েছে)', takaBn(status.used.amount), `${toBnDigits(status.used.count)}টি আনলক`, 'text-emerald-300')}
        {card('অব্যবহৃত পেমেন্ট', takaBn(status.unused.amount), `${toBnDigits(status.unused.count)}টি, কেউ এখনো আনলক করেনি`, 'text-sky-300')}
        {card('যাচাই দরকার', toBnDigits(status.review.count), 'পড়া যায়নি এমন এসএমএস', status.review.count ? 'text-amber-300' : 'text-white')}
        {card('বাতিল', toBnDigits(status.void.count), takaBn(status.void.amount))}
      </div>

      {Object.keys(report.scopes).length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.keys(report.scopes).map((k) => (
            <span key={k} className="rounded-lg bg-slate-800 px-2.5 py-1 font-bold text-slate-200">
              {REPORT_SCOPES[k] || k}: {toBnDigits(report.scopes[k].count)}টি · {takaBn(report.scopes[k].amount)}
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="mb-2 text-xs font-bold text-slate-300">গত ১৪ দিনের আয়</div>
        <div className="flex h-24 items-end gap-1" role="img" aria-label="গত ১৪ দিনের আয়ের চার্ট">
          {report.days.map((d) => (
            <div key={d.day} className="flex h-full flex-1 flex-col justify-end" title={`${d.day}: ${takaBn(d.amount)}`}>
              <div className={`w-full rounded-t ${d.amount ? 'bg-emerald-400' : 'bg-slate-800'}`} style={{ height: `${d.amount ? Math.max(6, (d.amount / maxDay) * 100) : 4}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-slate-500">
          <span>{report.days[0].day.slice(5)}</span>
          <span>{report.days[report.days.length - 1].day.slice(5)}</span>
        </div>
      </div>

      {report.months.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {report.months.map((m) => (
            <span key={m.month} className="rounded-lg bg-slate-900 px-2.5 py-1 text-slate-300">
              {m.month}: <b className="text-emerald-300">{takaBn(m.amount)}</b>
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="mb-2 text-xs font-bold text-slate-300">কোনটা কতবার কেনা হয়েছে</div>
        {report.items.length === 0 ? (
          <div className="text-xs text-slate-500">এখনো কোনো আনলক হয়নি।</div>
        ) : (
          <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/70">
            {report.items.map((it) => (
              <div key={it.key} className="flex items-center justify-between gap-3 px-3.5 py-2 text-xs">
                <span className="min-w-0 text-slate-200">
                  <span className="mr-1.5 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">{REPORT_SCOPES[it.key.split('|')[0]] || ''}</span>
                  {nameOf(it.key)}
                </span>
                <span className="shrink-0 font-bold text-emerald-300">
                  {toBnDigits(it.count)}× · {takaBn(it.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {report.unsold.length > 0 && (
        <div>
          <div className="mb-1 text-xs font-bold text-slate-300">লক করা আছে, কিন্তু এখনো কেউ কেনেনি ({toBnDigits(report.unsold.length)}টি)</div>
          <div className="text-[11px] leading-relaxed text-slate-500">দাম বা কনটেন্ট আরেকবার দেখতে পারেন।</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {report.unsold.map((k) => (
              <span key={k} className="rounded-lg bg-slate-900 px-2 py-1 text-[11px] text-slate-300" title={k}>
                {names[k] || k}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPaymentsTab({ password, content }) {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ trxId: '', amount: '', sender: '' });
  const [msg, setMsg] = useState('');
  const refresh = () =>
    adminPost(password, { action: 'listPayments' }).then((r) => {
      if (r.ok) setData(r);
    });
  useEffect(() => {
    refresh();
  }, []);
  const act = (payload, okMsg) =>
    adminPost(password, payload).then((r) => {
      setMsg(r.ok ? okMsg : r.error === 'duplicate' ? 'এই Transaction ID আগেই আছে।' : 'হয়নি, তথ্য আবার দেখুন।');
      if (r.ok) refresh();
      return r;
    });
  const label = { unused: 'অব্যবহৃত', used: 'আনলক হয়েছে', void: 'বাতিল', review: 'যাচাই দরকার' };
  const tone = {
    unused: 'bg-sky-500/20 text-sky-200',
    used: 'bg-emerald-500/20 text-emerald-200',
    void: 'bg-slate-700 text-slate-300',
    review: 'bg-amber-500/20 text-amber-200'
  };
  if (!data) return <div className="text-sm text-slate-400">লোড হচ্ছে…</div>;
  return (
    <div className="space-y-5">
      {!data.pricesSynced && (
        <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-100">
          দাম এখনো সিঙ্ক হয়নি। পেজ রিলোড করে আবার লগইন করুন।
        </div>
      )}
      <p className="text-xs leading-relaxed text-slate-400">
        ফোনের bKash এসএমএস থেকে আসা সব পেমেন্ট এখানে দেখাবে। শিক্ষার্থী Transaction ID আর নম্বর দিলে "অব্যবহৃত" পেমেন্ট মিললে নিজে থেকে
        আনলক হয়। এসএমএস না এলে নিচে হাতে পেমেন্ট যোগ করলেই শিক্ষার্থী আনলক করতে পারবে।
      </p>

      <AdminPaymentReport password={password} content={content} />

      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="text-sm font-bold text-white">হাতে পেমেন্ট যোগ করুন</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
          <input className={adminInput} placeholder="Transaction ID" value={form.trxId} onChange={(e) => setForm({ ...form, trxId: e.target.value })} />
          <input className={adminInput} placeholder="টাকা" inputMode="decimal" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <input className={adminInput} placeholder="প্রেরকের নম্বর" inputMode="tel" value={form.sender} onChange={(e) => setForm({ ...form, sender: e.target.value })} />
          <button
            type="button"
            onClick={() => act({ action: 'addPayment', ...form }, 'যোগ হয়েছে।').then((r) => r.ok && setForm({ trxId: '', amount: '', sender: '' }))}
            className="rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
          >
            যোগ করুন
          </button>
        </div>
        {msg && <div className="text-xs text-slate-300">{msg}</div>}
      </div>

      <div className="space-y-2">
        {data.payments.length === 0 && <div className="text-sm text-slate-500">এখনো কোনো পেমেন্ট আসেনি।</div>}
        {data.payments.map((p) => (
          <AdminPaymentRow key={p.row + p.trxId} p={p} tone={tone} label={label} act={act} />
        ))}
      </div>
    </div>
  );
}

function AdminPaymentRow({ p, tone, label, act }) {
  const [fix, setFix] = useState({ trxId: p.trxId, amount: p.amount, sender: p.sender });
  const forText = p.usedFor ? p.usedFor.replace('lecture|', 'লেকচার ').replace('course|', 'কোর্স ') : '';
  return (
    <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${tone[p.status] || tone.void}`}>{label[p.status] || p.status}</span>
          <span className="font-mono text-xs text-white">{p.trxId || '—'}</span>
          <span className="font-bold text-amber-300">{p.amount === '' ? '' : `৳${p.amount}`}</span>
          <span className="text-xs text-slate-400">{p.sender}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          {p.received && <span>{new Date(p.received).toLocaleString('bn-BD')}</span>}
          {p.status !== 'void' && p.trxId && (
            <button type="button" onClick={() => window.confirm('এই পেমেন্ট বাতিল করবেন? আনলকও বন্ধ হয়ে যাবে।') && act({ action: 'voidPayment', trxId: p.trxId }, 'বাতিল হয়েছে।')} className="font-bold text-rose-300 hover:underline">
              বাতিল
            </button>
          )}
        </div>
      </div>
      {p.status === 'used' && <div className="text-xs text-emerald-200">আনলক: {forText} • {p.usedBy}</div>}
      {p.status === 'review' && (
        <div className="space-y-2">
          <div className="rounded-lg bg-slate-950 p-2 font-mono text-[11px] text-slate-400">{p.raw}</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
            <input className={adminInput} placeholder="Transaction ID" value={fix.trxId} onChange={(e) => setFix({ ...fix, trxId: e.target.value })} />
            <input className={adminInput} placeholder="টাকা" value={fix.amount} onChange={(e) => setFix({ ...fix, amount: e.target.value })} />
            <input className={adminInput} placeholder="প্রেরকের নম্বর" value={fix.sender} onChange={(e) => setFix({ ...fix, sender: e.target.value })} />
            <button type="button" onClick={() => act({ action: 'fixPayment', row: p.row, ...fix }, 'ঠিক করা হয়েছে।')} className="rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
              ঠিক করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
