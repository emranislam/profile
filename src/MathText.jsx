import React, { useEffect, useMemo, useState } from 'react';

// Quiz text can hold maths written as LaTeX between dollar signs: $x^2 + 1$ inside a line, or
// $$ ... $$ on its own. A literal dollar sign is written \$. KaTeX is loaded only when a question
// actually has maths, so ordinary pages never download it.
let katexPromise = null;
const loadKatex = () => {
  if (!katexPromise) {
    if (typeof document !== 'undefined' && !document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = '/assets/katex/katex.min.css';
      document.head.appendChild(link);
    }
    katexPromise = import('katex').then((m) => m.default || m);
  }
  return katexPromise;
};

export const hasMath = (text) => /(^|[^\\])\$/.test(String(text || ''));

// 'a $x$ b' -> [{ text: 'a ' }, { math: 'x' }, { text: ' b' }]
export const splitMath = (text) => {
  const s = String(text || '');
  const out = [];
  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf) out.push({ text: buf.replace(/\\\$/g, '$') });
    buf = '';
  };
  while (i < s.length) {
    if (s[i] === '\\' && s[i + 1] === '$') {
      buf += '\\$';
      i += 2;
    } else if (s[i] === '$') {
      const display = s[i + 1] === '$';
      const open = display ? 2 : 1;
      const close = s.indexOf(display ? '$$' : '$', i + open);
      if (close === -1 || close === i + open) {
        buf += s.slice(i, i + open);
        i += open;
      } else {
        flush();
        out.push({ math: s.slice(i + open, close).trim(), display });
        i = close + open;
      }
    } else {
      buf += s[i];
      i += 1;
    }
  }
  flush();
  return out;
};

export default function MathText({ text, className = '' }) {
  const parts = useMemo(() => splitMath(text), [text]);
  const needs = parts.some((p) => p.math !== undefined);
  const [katex, setKatex] = useState(null);
  useEffect(() => {
    let alive = true;
    if (needs) loadKatex().then((k) => alive && setKatex(k));
    return () => {
      alive = false;
    };
  }, [needs]);
  if (!needs) return <span className={className}>{String(text || '').replace(/\\\$/g, '$')}</span>;
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.math === undefined) return <React.Fragment key={i}>{p.text}</React.Fragment>;
        if (!katex) return <code key={i}>{p.math}</code>;
        const html = katex.renderToString(p.math, { throwOnError: false, displayMode: p.display, strict: 'ignore', maxExpand: 1000, output: 'html' });
        return p.display ? (
          <span key={i} className="block overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
        );
      })}
    </span>
  );
}
