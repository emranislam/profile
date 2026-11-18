// Turns a typed question paper (Word .docx or pasted text) into the quiz format of the site.
// Maths written in Word's own equation editor becomes LaTeX between dollar signs ($...$), which the
// quiz pages draw with KaTeX. Everything here runs in the admin's browser; nothing is uploaded.

const LABELS = ['ক', 'খ', 'গ', 'ঘ'];
const LETTERS = ['a', 'b', 'c', 'd'];
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const toAscii = (s) => String(s).replace(/[০-৯]/g, (d) => BN_DIGITS.indexOf(d));

// 'ক' / 'b' / 'C' / '২' -> 0..3, or -1
const labelIndex = (l) => {
  const s = String(l || '').trim();
  let i = LABELS.indexOf(s);
  if (i < 0) i = LETTERS.indexOf(s.toLowerCase());
  if (i < 0 && /^[1-4]$/.test(toAscii(s))) i = Number(toAscii(s)) - 1;
  return i;
};

const OPTION_AT = /(^|\s)\(?([কখগঘa-dA-D])[.)।]\s*/g;
const QUESTION_START = /^\s*(?:প্রশ্ন\s*|Q(?:uestion)?\.?\s*)?\(?([0-9০-৯]{1,3})\s*[.)।:]\s*(.*)$/i;
const ANSWER_LINE = /^\s*(?:সঠিক\s*)?(?:উত্তর|Ans(?:wer)?|Correct(?:\s*answer)?)\s*[:：\-–]?\s*\(?([কখগঘa-dA-D১-৪1-4])\)?(?:[\s.)।,]|$)/i;
const EXPLAIN_LINE = /^\s*(?:ব্যাখ্যা|সমাধান|Explanation|Solution|Sol)\s*[:：\-–]\s*(.*)$/i;

// Splits 'ক) a  খ) b  গ) c  ঘ) d' (or just one option) into [{ idx, text }]. A label only counts when it
// is the next one in order, so a stray 'a.' inside a sentence is not taken for an option.
function splitOptions(line, expected) {
  const found = [];
  let want = expected;
  const inMath = [];
  line.replace(/\$[^$]*\$/g, (m, at) => inMath.push([at, at + m.length]));
  OPTION_AT.lastIndex = 0;
  let m;
  while ((m = OPTION_AT.exec(line))) {
    const idx = labelIndex(m[2]);
    const at = m.index + m[1].length;
    if (inMath.some(([x, y]) => at >= x && at < y)) continue;
    if (idx === want && !/^[1-4১-৪]$/.test(m[2])) {
      found.push({ idx, at: m.index + m[1].length, end: m.index + m[0].length });
      want += 1;
    }
  }
  return found.map((f, i) => ({ idx: f.idx, text: line.slice(f.end, i + 1 < found.length ? found[i + 1].at : line.length).trim(), at: f.at }));
}

// text -> { questions: [{ q, options[4], answer, explain }], skipped: [{ n, why }] }
export function parseQuestions(text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const drafts = [];
  let cur = null;
  let field = null; // where continuation lines go: 'q' | 'opt' | 'explain'
  const start = (n, rest) => {
    cur = { n, q: rest.trim(), options: [], answer: -1, explain: '' };
    drafts.push(cur);
    field = 'q';
  };
  const add = (key, extra) => {
    cur[key] = (cur[key] ? `${cur[key]} ` : '') + extra.trim();
  };
  lines.forEach((raw) => {
    const line = raw.replace(/ /g, ' ').trim();
    if (!line) return;
    const exp = cur && EXPLAIN_LINE.exec(line);
    if (exp) {
      cur.explain = exp[1].trim();
      field = 'explain';
      return;
    }
    const ans = cur && cur.options.length && ANSWER_LINE.exec(line);
    if (ans) {
      cur.answer = labelIndex(ans[1]);
      const rest = line.slice(ans[0].length).trim();
      if (rest) {
        const e = EXPLAIN_LINE.exec(rest);
        cur.explain = (e ? e[1] : rest).trim();
        field = 'explain';
      } else field = null;
      return;
    }
    if (cur && field !== 'explain' && cur.options.length < 4) {
      const opts = splitOptions(line, cur.options.length);
      if (opts.length && opts[0].at === 0) {
        opts.forEach((o) => cur.options.push(o.text));
        field = 'opt';
        return;
      }
    }
    // an option label at the start of a line that is not the expected next one (e.g. 'খ' first) still starts options
    const q = QUESTION_START.exec(line);
    if (q && !(cur && cur.options.length && cur.options.length < 4 && /^[কখগঘa-dA-D]$/.test(q[1]))) {
      start(q[1], q[2]);
      return;
    }
    if (!cur) return;
    if (field === 'opt') cur.options[cur.options.length - 1] = `${cur.options[cur.options.length - 1]} ${line}`.trim();
    else if (field === 'explain') add('explain', line);
    else if (field === 'q') add('q', line);
  });
  const questions = [];
  const skipped = [];
  drafts.forEach((d) => {
    if (!d.q) skipped.push({ n: d.n, why: 'প্রশ্নের লেখা নেই' });
    else if (d.options.length !== 4 || d.options.some((o) => !o)) skipped.push({ n: d.n, why: `অপশন ${d.options.length}টি পাওয়া গেছে (৪টি লাগবে)` });
    else if (d.answer < 0 || d.answer > 3) skipped.push({ n: d.n, why: 'সঠিক উত্তর (উত্তর: ক) পাওয়া যায়নি' });
    else questions.push({ q: d.q, options: d.options, answer: d.answer, explain: d.explain });
  });
  return { questions, skipped, found: drafts.length };
}

// ---------------------------------------------------------------- .docx

const u16 = (v, o) => v[o] | (v[o + 1] << 8);
const u32 = (v, o) => (v[o] | (v[o + 1] << 8) | (v[o + 2] << 16) | (v[o + 3] << 24)) >>> 0;

// Reads one file out of a zip (a .docx is a zip) with the browser's built-in decompression.
async function unzipFile(buffer, name) {
  const v = new Uint8Array(buffer);
  let eocd = -1;
  for (let i = v.length - 22; i >= Math.max(0, v.length - 70000); i--) {
    if (u32(v, i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('not-a-zip');
  let p = u32(v, eocd + 16);
  const count = u16(v, eocd + 10);
  for (let n = 0; n < count; n++) {
    if (u32(v, p) !== 0x02014b50) break;
    const method = u16(v, p + 10);
    const csize = u32(v, p + 20);
    const nlen = u16(v, p + 28);
    const elen = u16(v, p + 30);
    const clen = u16(v, p + 32);
    const local = u32(v, p + 42);
    const fname = new TextDecoder().decode(v.subarray(p + 46, p + 46 + nlen));
    if (fname === name) {
      const dataAt = local + 30 + u16(v, local + 26) + u16(v, local + 28);
      const data = v.subarray(dataAt, dataAt + csize);
      if (method === 0) return new TextDecoder().decode(data);
      if (method === 8) {
        const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        return new TextDecoder().decode(await new Response(stream).arrayBuffer());
      }
      throw new Error('bad-zip-method');
    }
    p += 46 + nlen + elen + clen;
  }
  return null;
}

const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const M = 'http://schemas.openxmlformats.org/officeDocument/2006/math';
const kids = (n) => Array.from(n.childNodes).filter((c) => c.nodeType === 1);
const is = (n, ns, name) => n.namespaceURI === ns && n.localName === name;
const first = (n, ns, name) => kids(n).find((c) => is(c, ns, name));
const attr = (n, ns, name) => (n ? n.getAttributeNS(ns, name) || n.getAttribute(`${ns === M ? 'm' : 'w'}:${name}`) || '' : '');

const GREEK = { α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'varepsilon', ϵ: 'epsilon', ζ: 'zeta', η: 'eta', θ: 'theta', ϑ: 'vartheta', ι: 'iota', κ: 'kappa', λ: 'lambda', μ: 'mu', ν: 'nu', ξ: 'xi', π: 'pi', ρ: 'rho', σ: 'sigma', τ: 'tau', υ: 'upsilon', φ: 'varphi', ϕ: 'phi', χ: 'chi', ψ: 'psi', ω: 'omega', Γ: 'Gamma', Δ: 'Delta', Θ: 'Theta', Λ: 'Lambda', Ξ: 'Xi', Π: 'Pi', Σ: 'Sigma', Υ: 'Upsilon', Φ: 'Phi', Ψ: 'Psi', Ω: 'Omega' };
const SYMBOLS = {
  '±': '\\pm ', '∓': '\\mp ', '×': '\\times ', '÷': '\\div ', '·': '\\cdot ', '∙': '\\cdot ', '⋅': '\\cdot ', '≤': '\\le ', '⩽': '\\le ', '≥': '\\ge ', '⩾': '\\ge ', '≠': '\\ne ', '≈': '\\approx ', '≡': '\\equiv ', '∼': '\\sim ', '≅': '\\cong ', '∝': '\\propto ', '∞': '\\infty ', '∂': '\\partial ', '∇': '\\nabla ',
  '→': '\\to ', '←': '\\leftarrow ', '↔': '\\leftrightarrow ', '⇒': '\\Rightarrow ', '⇔': '\\Leftrightarrow ', '⇐': '\\Leftarrow ', '↦': '\\mapsto ', '∈': '\\in ', '∉': '\\notin ', '∋': '\\ni ', '⊂': '\\subset ', '⊆': '\\subseteq ', '⊃': '\\supset ', '⊇': '\\supseteq ', '∪': '\\cup ', '∩': '\\cap ', '∅': '\\emptyset ', '∀': '\\forall ', '∃': '\\exists ', '¬': '\\neg ', '∧': '\\wedge ', '∨': '\\vee ',
  '∴': '\\therefore ', '∵': '\\because ', '°': '^{\\circ}', '′': "'", '″': "''", '∠': '\\angle ', '⊥': '\\perp ', '∥': '\\parallel ', '△': '\\triangle ', 'ℝ': '\\mathbb{R}', 'ℕ': '\\mathbb{N}', 'ℤ': '\\mathbb{Z}', 'ℚ': '\\mathbb{Q}', 'ℂ': '\\mathbb{C}', '…': '\\ldots ', '⋯': '\\cdots ', '−': '-', '–': '-', '∫': '\\int ', '∑': '\\sum ', '∏': '\\prod ', '√': '\\sqrt{}', '⋮': '\\vdots ', '⋱': '\\ddots ', '∘': '\\circ ', '⊕': '\\oplus ', '⊗': '\\otimes ', '⌊': '\\lfloor ', '⌋': '\\rfloor ', '⌈': '\\lceil ', '⌉': '\\rceil ', '⟨': '\\langle ', '⟩': '\\rangle ', 'ℓ': '\\ell ', 'ℏ': '\\hbar ', '∖': '\\setminus ', '≪': '\\ll ', '≫': '\\gg ', '≺': '\\prec ', '≻': '\\succ '
};
const LATEX_SPECIAL = { '\\': '\\backslash ', '{': '\\{', '}': '\\}', '_': '\\_', '%': '\\%', '#': '\\#', '~': '\\sim ', '^': '\\^{}' };
const FUNCS = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'sinh', 'cosh', 'tanh', 'coth', 'arcsin', 'arccos', 'arctan', 'log', 'ln', 'lg', 'exp', 'lim', 'max', 'min', 'sup', 'inf', 'det', 'gcd', 'deg', 'dim', 'ker', 'arg', 'mod', 'Pr', 'liminf', 'limsup']);
const NARY = { '∑': '\\sum', '∏': '\\prod', '∫': '\\int', '∬': '\\iint', '∭': '\\iiint', '∮': '\\oint', '⋃': '\\bigcup', '⋂': '\\bigcap', '⋁': '\\bigvee', '⋀': '\\bigwedge', '∐': '\\coprod' };
const ACCENT = { '̂': 'hat', '̃': 'tilde', '̄': 'bar', '̅': 'overline', '⃗': 'vec', '̇': 'dot', '̈': 'ddot', '̌': 'check', '́': 'acute', '̀': 'grave', '̆': 'breve', '^': 'hat', '~': 'tilde', '¯': 'bar', '→': 'vec', '˙': 'dot', '¨': 'ddot' };
const DELIM = { '{': '\\{', '}': '\\}', '|': '|', '‖': '\\|', '⟨': '\\langle', '⟩': '\\rangle', '⌊': '\\lfloor', '⌋': '\\rfloor', '⌈': '\\lceil', '⌉': '\\rceil', '[': '[', ']': ']', '(': '(', ')': ')', '/': '/', '\\': '\\backslash' };

const isBengali = (c) => c >= 'ঀ' && c <= '৿';

// Text inside an equation run -> LaTeX
function mathText(text, plain, inArray) {
  let out = '';
  let bn = '';
  const flushBn = () => {
    if (bn) out += `\\text{${bn}}`;
    bn = '';
  };
  for (const ch of text) {
    if (isBengali(ch)) {
      bn += ch;
      continue;
    }
    if (bn && ch === ' ') {
      bn += ch;
      continue;
    }
    flushBn();
    if (GREEK[ch]) out += `\\${GREEK[ch]} `;
    else if (SYMBOLS[ch] !== undefined) out += SYMBOLS[ch];
    else if (ch === '&' && inArray) out += '&';
    else if (ch === '&') out += '\\&';
    else if (LATEX_SPECIAL[ch]) out += LATEX_SPECIAL[ch];
    else if (ch === ' ') out += '\\ ';
    else out += ch;
  }
  flushBn();
  if (plain && /[A-Za-z]/.test(text) && !/\\/.test(out)) return `\\mathrm{${out}}`;
  return out;
}

const textOf = (n) => (n.textContent || '').trim();

// Equation element -> LaTeX. `ctx.array` is true inside matrices and aligned blocks, where '&' separates columns.
function omml(node, ctx = {}) {
  if (node.nodeType === 3) return '';
  const k = kids(node);
  const all = (nodes = k, c = ctx) => nodes.map((x) => omml(x, c)).join('');
  const sub = (n, name, c = ctx) => {
    const e = first(n, M, name);
    return e ? all(kids(e), c) : '';
  };
  if (node.namespaceURI !== M) return all();
  const brace = (s) => `{${s || ''}}`;
  switch (node.localName) {
    case 'r': {
      const rpr = first(node, M, 'rPr');
      const sty = rpr && first(rpr, M, 'sty');
      const nor = rpr && first(rpr, M, 'nor');
      const plain = (sty && attr(sty, M, 'val') === 'p') || (nor && attr(nor, M, 'val') !== '0' && attr(nor, M, 'val') !== 'off');
      return k.filter((c) => is(c, M, 't')).map((t) => mathText(t.textContent || '', plain, ctx.array)).join('');
    }
    case 'f': {
      const type = attr(first(first(node, M, 'fPr') || node, M, 'type'), M, 'val');
      const num = sub(node, 'num');
      const den = sub(node, 'den');
      if (type === 'noBar') return `\\binom${brace(num)}${brace(den)}`;
      if (type === 'lin') return `${num}/${den}`;
      if (type === 'skw') return `${brace(num)}/${brace(den)}`;
      return `\\frac${brace(num)}${brace(den)}`;
    }
    case 'sSup':
      return `${brace(sub(node, 'e'))}^${brace(sub(node, 'sup'))}`;
    case 'sSub':
      return `${brace(sub(node, 'e'))}_${brace(sub(node, 'sub'))}`;
    case 'sSubSup':
      return `${brace(sub(node, 'e'))}_${brace(sub(node, 'sub'))}^${brace(sub(node, 'sup'))}`;
    case 'sPre':
      return `{}_${brace(sub(node, 'sub'))}^${brace(sub(node, 'sup'))}${brace(sub(node, 'e'))}`;
    case 'rad': {
      const deg = sub(node, 'deg').trim();
      return deg ? `\\sqrt[${deg}]${brace(sub(node, 'e'))}` : `\\sqrt${brace(sub(node, 'e'))}`;
    }
    case 'nary': {
      const pr = first(node, M, 'naryPr');
      const chr = pr && first(pr, M, 'chr');
      const c = chr ? attr(chr, M, 'val') : '∫';
      const op = NARY[c] || (c ? mathText(c, false) : '');
      const hide = (n) => {
        const h = pr && first(pr, M, n);
        return h && attr(h, M, 'val') !== '0' && attr(h, M, 'val') !== 'off';
      };
      const lo = hide('subHide') ? '' : sub(node, 'sub').trim();
      const hi = hide('supHide') ? '' : sub(node, 'sup').trim();
      return `${op}${lo ? `_${brace(lo)}` : ''}${hi ? `^${brace(hi)}` : ''} ${sub(node, 'e')}`;
    }
    case 'd': {
      const pr = first(node, M, 'dPr');
      const get = (n, d) => {
        const e = pr && first(pr, M, n);
        return e ? attr(e, M, 'val') : d;
      };
      const open = get('begChr', '(');
      const close = get('endChr', ')');
      const sep = get('sepChr', '|');
      const items = k.filter((c) => is(c, M, 'e')).map((e) => all(kids(e)));
      const d = (c) => (c === '' ? '.' : DELIM[c] || (GREEK[c] ? '.' : c));
      return `\\left${d(open)} ${items.join(sep === '' ? ' ' : sep === '|' ? '\\middle| ' : `${sep} `)}\\right${d(close)} `;
    }
    case 'func': {
      const name = textOf(first(node, M, 'fName') || node).replace(/\s+/g, '');
      const body = sub(node, 'e');
      const fn = FUNCS.has(name) ? `\\${name === 'lg' ? 'lg' : name} ` : name ? `\\operatorname{${name}} ` : '';
      return `${fn}${body}`;
    }
    case 'acc': {
      const pr = first(node, M, 'accPr');
      const chr = pr && first(pr, M, 'chr');
      const c = chr ? attr(chr, M, 'val') : '̂';
      return `\\${ACCENT[c] || 'hat'}${brace(sub(node, 'e'))}`;
    }
    case 'bar': {
      const pr = first(node, M, 'barPr');
      const pos = pr && first(pr, M, 'pos');
      return attr(pos, M, 'val') === 'bot' ? `\\underline${brace(sub(node, 'e'))}` : `\\overline${brace(sub(node, 'e'))}`;
    }
    case 'limLow':
      return `\\underset${brace(sub(node, 'lim'))}${brace(sub(node, 'e'))}`;
    case 'limUpp':
      return `\\overset${brace(sub(node, 'lim'))}${brace(sub(node, 'e'))}`;
    case 'groupChr': {
      const pr = first(node, M, 'groupChrPr');
      const pos = pr && first(pr, M, 'pos');
      return attr(pos, M, 'val') === 'top' ? `\\overbrace${brace(sub(node, 'e'))}` : `\\underbrace${brace(sub(node, 'e'))}`;
    }
    case 'eqArr': {
      const rows = k.filter((c) => is(c, M, 'e')).map((e) => all(kids(e), { ...ctx, array: true }));
      return `\\begin{aligned} ${rows.join(' \\\\ ')} \\end{aligned}`;
    }
    case 'm': {
      const rows = k.filter((c) => is(c, M, 'mr')).map((r) => kids(r).filter((c) => is(c, M, 'e')).map((e) => all(kids(e), { ...ctx, array: true })).join(' & '));
      return `\\begin{matrix} ${rows.join(' \\\\ ')} \\end{matrix}`;
    }
    case 'rPr':
    case 'fPr':
    case 'dPr':
    case 'naryPr':
    case 'accPr':
    case 'barPr':
    case 'radPr':
    case 'ctrlPr':
    case 'sSupPr':
    case 'sSubPr':
    case 'sSubSupPr':
    case 'funcPr':
    case 'limLowPr':
    case 'limUppPr':
    case 'eqArrPr':
    case 'mPr':
    case 'groupChrPr':
    case 'boxPr':
    case 'phantPr':
    case 'sPrePr':
      return '';
    default:
      return all();
  }
}

// Numbering ('1.', 'a)') is not part of a paragraph's text in a .docx, so it is rebuilt from numbering.xml.
function readNumbering(xml) {
  const levels = {};
  if (!xml) return { levels, nums: {} };
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const abstracts = {};
  Array.from(doc.getElementsByTagNameNS(W, 'abstractNum')).forEach((a) => {
    const id = attr(a, W, 'abstractNumId');
    abstracts[id] = {};
    kids(a).filter((c) => is(c, W, 'lvl')).forEach((l) => {
      abstracts[id][attr(l, W, 'ilvl')] = { fmt: attr(first(l, W, 'numFmt'), W, 'val'), text: attr(first(l, W, 'lvlText'), W, 'val'), start: Number(attr(first(l, W, 'start'), W, 'val') || 1) };
    });
  });
  const nums = {};
  Array.from(doc.getElementsByTagNameNS(W, 'num')).forEach((n) => {
    nums[attr(n, W, 'numId')] = abstracts[attr(first(n, W, 'abstractNumId'), W, 'val')] || {};
  });
  return { levels, nums };
}

const ALPHA = (n, upper) => {
  let s = '';
  let x = n;
  while (x > 0) {
    s = String.fromCharCode(97 + ((x - 1) % 26)) + s;
    x = Math.floor((x - 1) / 26);
  }
  return upper ? s.toUpperCase() : s;
};
const formatNumber = (fmt, n) => {
  if (fmt === 'lowerLetter') return ALPHA(n, false);
  if (fmt === 'upperLetter') return ALPHA(n, true);
  if (fmt === 'bullet' || fmt === 'none') return '';
  if (/bengali|bangla/i.test(fmt)) return n >= 1 && n <= LABELS.length ? LABELS[n - 1] : String(n);
  return String(n);
};

export async function readDocxText(buffer) {
  const [xml, numXml] = [await unzipFile(buffer, 'word/document.xml'), await unzipFile(buffer, 'word/numbering.xml')];
  if (!xml) throw new Error('no-document');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) throw new Error('bad-xml');
  const numbering = readNumbering(numXml);
  const counters = {};
  const lines = [];

  const runText = (r) => {
    let t = '';
    const rpr = first(r, W, 'rPr');
    const va = rpr && first(rpr, W, 'vertAlign');
    kids(r).forEach((c) => {
      if (is(c, W, 't')) t += c.textContent || '';
      else if (is(c, W, 'tab')) t += ' ';
      else if (is(c, W, 'br') || is(c, W, 'cr')) t += '\n';
      else if (is(c, W, 'sym')) t += '';
    });
    const v = va && attr(va, W, 'val');
    if (t && v === 'superscript') return `$^{${t}}$`;
    if (t && v === 'subscript') return `$_{${t}}$`;
    return t;
  };

  const inline = (node) => {
    let s = '';
    kids(node).forEach((c) => {
      if (is(c, W, 'r')) s += runText(c);
      else if (is(c, M, 'oMath')) s += `$${omml(c).replace(/\s+/g, ' ').trim()}$`;
      else if (is(c, M, 'oMathPara')) s += kids(c).filter((x) => is(x, M, 'oMath')).map((x) => `$${omml(x).replace(/\s+/g, ' ').trim()}$`).join(' ');
      else if (is(c, W, 'pPr') || is(c, W, 'rPr') || is(c, W, 'proofErr') || is(c, W, 'bookmarkStart') || is(c, W, 'bookmarkEnd')) return;
      else if (is(c, W, 'del')) return;
      else s += inline(c);
    });
    return s;
  };

  const label = (p) => {
    const ppr = first(p, W, 'pPr');
    const numPr = ppr && first(ppr, W, 'numPr');
    if (!numPr) return '';
    const id = attr(first(numPr, W, 'numId'), W, 'val');
    const lvl = attr(first(numPr, W, 'ilvl'), W, 'val') || '0';
    const def = numbering.nums[id] && numbering.nums[id][lvl];
    if (!def || id === '0') return '';
    const key = `${id}:`;
    Object.keys(counters).forEach((c) => {
      if (c.startsWith(key) && Number(c.slice(key.length)) > Number(lvl)) delete counters[c];
    });
    counters[key + lvl] = (counters[key + lvl] || def.start - 1) + 1;
    const n = formatNumber(def.fmt, counters[key + lvl]);
    if (!n) return '';
    return `${(def.text || '%1.').replace(/%(\d)/g, (_, d) => (Number(d) - 1 === Number(lvl) ? n : ''))} `;
  };

  const walk = (node) => {
    kids(node).forEach((c) => {
      if (is(c, W, 'p')) {
        const t = `${label(c)}${inline(c)}`.replace(/[ \t]+/g, ' ').trim();
        if (t) lines.push(...t.split('\n'));
      } else if (is(c, W, 'tbl')) {
        kids(c).filter((r) => is(r, W, 'tr')).forEach((r) => {
          const cells = kids(r).filter((x) => is(x, W, 'tc')).map((tc) => {
            const sub = [];
            kids(tc).forEach((p) => {
              if (is(p, W, 'p')) {
                const t = `${label(p)}${inline(p)}`.replace(/\s+/g, ' ').trim();
                if (t) sub.push(t);
              }
            });
            return sub.join(' ');
          });
          const row = cells.filter(Boolean).join('   ');
          if (row) lines.push(row);
        });
      } else if (!is(c, W, 'sectPr')) walk(c);
    });
  };
  walk(doc.getElementsByTagNameNS(W, 'body')[0] || doc.documentElement);
  return lines.join('\n');
}
