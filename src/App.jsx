import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  ExternalLink,
  Download,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Microscope,
  Compass,
  X,
  Play,
  BookMarked,
  Lock,
  Unlock,
  Trophy,
  MessageCircle,
  Send,
  Facebook,
  Mail
} from 'lucide-react';

const CV_CREDENTIALS = {
  fullName: 'Emran Islam',
  titles: 'Lecturer in Mathematics | PhD Applicant — Optimization & Computational Mathematics',
  email: 'emranju70@gmail.com',
  education: [
    {
      degree: 'PhD Candidate / Applicant',
      institution: 'Optimization Problems & Computational Mathematics',
      year: 'Ongoing / 2026',
      result: 'Research Focus: Metaheuristics, Fuzzy-MOGA & Scientific ML',
      thesis: 'Leakage-Controlled ML & Multi-Objective Optimization'
    },
    {
      degree: 'M.Sc. in Mathematics',
      institution: 'Jahangirnagar University, Bangladesh',
      year: '2017',
      result: 'CGPA 3.79 / 4.00',
      thesis: 'M.Sc. Thesis: Development of an Algorithm for Solving the Travelling Salesman Problem'
    },
    {
      degree: 'B.Sc. (Honours) in Mathematics',
      institution: 'Jahangirnagar University, Bangladesh',
      year: '2015',
      result: 'CGPA 3.52 / 4.00',
      thesis: 'Core Honours in Pure & Applied Mathematics'
    },
    {
      degree: 'Higher Secondary Certificate (HSC, Science)',
      institution: 'Madhupur Degree College (Dhaka Board)',
      year: '2011',
      result: 'GPA 4.80 / 5.00',
      thesis: 'Science Group'
    },
    {
      degree: 'Secondary School Certificate (SSC, Science)',
      institution: 'Dhanbari Nowab Institution (Dhaka Board)',
      year: '2009',
      result: 'GPA 5.00 / 5.00',
      thesis: 'Science Group'
    }
  ],
  experience: [
    {
      role: 'Lecturer in Mathematics',
      org: 'Hamdard Public College, Green Road, Dhaka',
      period: '11 Oct 2025 – Present (Continuing)',
      highlight: 'Teaching HSC & university-track Calculus, Algebra, Geometry, and Statistics in Dhaka.'
    },
    {
      role: 'Lecturer in Mathematics & Professor Under Officer (PUO, BNCC)',
      org: 'Ghatail Cantonment Public School and College, Tangail',
      period: '11 Nov 2018 – 30 Sep 2025 (Nearly 7 Years)',
      highlight: '2× Institutional Best Teacher (2022, 2023), Upazila Best Teacher, and 3× Best PUO (BNCC 2021–2023).'
    },
    {
      role: 'Lecturer in Mathematics',
      org: 'BGIFT Institute of Science and Technology (BIST)',
      period: '04 Aug 2018 – 10 Nov 2018',
      highlight: 'Undergraduate & diploma engineering mathematics instruction.'
    }
  ],
  awards: [
    { level: 'International', title: 'Gold Honour, International Youth Math Challenge (IYMC)', year: '2020' },
    { level: 'National', title: 'Champion, 7th National Undergraduate Mathematical Olympiad (NUMO), Dhaka North (Top 60)', year: '2016' },
    { level: 'National', title: 'Champion, 6th National Undergraduate Mathematical Olympiad (NUMO), Dhaka North (Top 60)', year: '2015' },
    { level: 'Institutional', title: 'Best Teacher Award (2022 & 2023), Ghatail Cantonment Public School & College', year: '2022, 2023' },
    { level: 'Upazila', title: 'Best Teacher, Ghatail Upazila (National Education Week)', year: '2022' },
    { level: 'Leadership', title: 'Best PUO (Professor Under Officer, BNCC), Ghatail Upazila (3 Consecutive Years)', year: '2021–2023' }
  ],
  books: [
    {
      title: 'Development of an Algorithm for Solving TSP',
      publisher: 'LAP LAMBERT Academic Publishing, Germany (15 May 2018)',
      isbn: 'ISBN 978-613-9-83715-1',
      type: 'International Research Monograph'
    },
    {
      title: 'An Analytical Approach for Learning Programming Language C',
      publisher: 'LAP LAMBERT Academic Publishing, Germany (01 June 2018)',
      isbn: 'ISBN 978-613-9-83715-3',
      type: 'International Computing Monograph'
    },
    {
      title: 'The Fuel of Higher Math',
      publisher: 'Locally Published Academic Textbook & Admission Handbook (Bangladesh)',
      isbn: 'Higher-Secondary, Engineering Admission & Undergraduate Edition',
      type: 'Mathematics Textbook (Bengali)'
    }
  ],
  referees: [
    {
      name: 'Dr. Abdul Halim Bhuiyan',
      role: 'Professor, Department of Mathematics, BUET',
      contact: 'ahalim@math.buet.ac.bd'
    },
    {
      name: 'Lt Col Ferdous-Ur-Rahman Khan',
      role: 'Ex-Principal, Ghatail Cantonment Public School & College | Deputy Project Director, e-Passport',
      contact: '+880 1678 017042'
    }
  ]
};

const HSC_BV_PAPERS = {
  paper1: {
    id: 'paper1',
    code: 'HSC 1ST',
    bigTag: '১ম পত্র',
    icon: '📘',
    title: 'উচ্চতর গণিত ১ম পত্র',
    sub: 'ধারাবাহিক ১০টি অধ্যায় • প্রতিটি অধ্যায়ে ১০টি করে লেকচার ও সেলফ টেস্ট',
    tileGrad: 'from-sky-400 via-blue-500 to-indigo-600',
    pillText: '১ম পত্রের সকল অধ্যায় ও লেকচার',
    pillGrad: 'from-blue-600 to-indigo-600',
    chapters: [
      { id: 'p1-ch1', num: 'অধ্যায় ১', title: 'ম্যাট্রিক্স ও নির্ণায়ক', eng: 'Matrices & Determinants', icon: '🔢', color: 'from-cyan-400 to-blue-600' },
      { id: 'p1-ch2', num: 'অধ্যায় ২', title: 'ভেক্টর', eng: 'Vectors', icon: '🧭', color: 'from-teal-400 to-emerald-600' },
      { id: 'p1-ch3', num: 'অধ্যায় ৩', title: 'সরলরেখা', eng: 'Straight Lines', icon: '📏', color: 'from-indigo-400 to-purple-600' },
      { id: 'p1-ch4', num: 'অধ্যায় ৪', title: 'বৃত্ত', eng: 'Circle', icon: '⭕', color: 'from-amber-400 to-orange-600' },
      { id: 'p1-ch5', num: 'অধ্যায় ৫', title: 'বিন্যাস ও সমাবেশ', eng: 'Permutations & Combinations', icon: '🎲', color: 'from-pink-400 to-rose-600' },
      { id: 'p1-ch6', num: 'অধ্যায় ৬', title: 'ত্রিকোণমিতিক অনুপাত', eng: 'Trigonometric Ratios', icon: '📐', color: 'from-violet-400 to-indigo-600' },
      { id: 'p1-ch7', num: 'অধ্যায় ৭', title: 'সংযুক্ত ও যৌগিক কোণের ত্রিকোণমিতিক অনুপাত', eng: 'Associated & Compound Angles', icon: '📊', color: 'from-emerald-400 to-teal-600' },
      { id: 'p1-ch8', num: 'অধ্যায় ৮', title: 'ফাংশন ও ফাংশনের লেখচিত্র', eng: 'Functions & Graphs', icon: '📈', color: 'from-sky-400 to-cyan-600' },
      { id: 'p1-ch9', num: 'অধ্যায় ৯', title: 'অন্তরীকরণ', eng: 'Differentiation', icon: '⚡', color: 'from-orange-400 to-red-600' },
      { id: 'p1-ch10', num: 'অধ্যায় ১০', title: 'যোগজীকরণ', eng: 'Integration', icon: '∫', color: 'from-fuchsia-400 to-purple-600' }
    ]
  },
  paper2: {
    id: 'paper2',
    code: 'HSC 2ND',
    bigTag: '২য় পত্র',
    icon: '📗',
    title: 'উচ্চতর গণিত ২য় পত্র',
    sub: 'ধারাবাহিক ১০টি অধ্যায় • প্রতিটি অধ্যায়ে ১০টি করে লেকচার ও সেলফ টেস্ট',
    tileGrad: 'from-emerald-400 via-teal-500 to-cyan-600',
    pillText: '২য় পত্রের সকল অধ্যায় ও লেকচার',
    pillGrad: 'from-teal-600 to-emerald-600',
    chapters: [
      { id: 'p2-ch1', num: '১ম অধ্যায়', title: 'বাস্তব সংখ্যা ও অসমতা', eng: 'Real Numbers & Inequalities', icon: '♾️', color: 'from-teal-400 to-cyan-600' },
      { id: 'p2-ch2', num: '২য় অধ্যায়', title: 'যোগাশ্রয়ী প্রোগ্রাম', eng: 'Linear Programming', icon: '📉', color: 'from-blue-400 to-indigo-600' },
      { id: 'p2-ch3', num: '৩য় অধ্যায়', title: 'জটিল সংখ্যা', eng: 'Complex Numbers', icon: '🌀', color: 'from-purple-400 to-violet-600' },
      { id: 'p2-ch4', num: '৪র্থ অধ্যায়', title: 'বহুপদী ও বহুপদী সমীকরণ', eng: 'Polynomials & Equations', icon: '🧮', color: 'from-amber-400 to-orange-600' },
      { id: 'p2-ch5', num: '৫ম অধ্যায়', title: 'দ্বিপদী উপপাদ্য', eng: 'Binomial Theorem', icon: '🔺', color: 'from-rose-400 to-pink-600' },
      { id: 'p2-ch6', num: 'অধ্যায় ৬', title: 'কনিক', eng: 'Conics (Parabola, Ellipse, Hyperbola)', icon: '🪐', color: 'from-emerald-400 to-green-600' },
      { id: 'p2-ch7', num: 'অধ্যায় ৭', title: 'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ', eng: 'Inverse Trig & Equations', icon: '🔄', color: 'from-cyan-400 to-sky-600' },
      { id: 'p2-ch8', num: 'অধ্যায় ৮', title: 'স্থিতিবিদ্যা', eng: 'Statics', icon: '⚖️', color: 'from-indigo-400 to-blue-600' },
      { id: 'p2-ch9', num: 'অধ্যায় ৯', title: 'গতিবিদ্যা', eng: 'Dynamics', icon: '🚀', color: 'from-orange-400 to-red-600' },
      { id: 'p2-ch10', num: 'অধ্যায় ১০', title: 'বিস্তার পরিমাপ ও সম্ভাবনা', eng: 'Dispersion & Probability', icon: '🎯', color: 'from-violet-400 to-purple-600' }
    ]
  }
};

// What each HSC chapter covers (shown on the chapter page and in its search description).
// Keys: Bangla Version chapter ids; the English Version chapters (ev1-chN / ev2-chN) use the `en` lines.
const HSC_CHAPTER_NOTES = {
  'p1-ch1': {
    bn: ['ম্যাট্রিক্সের প্রকারভেদ, যোগ, বিয়োগ ও গুণ', 'নির্ণায়কের মান ও ধর্ম', 'অনুবন্ধী ও বিপরীত ম্যাট্রিক্স: A⁻¹ = adj(A) / |A|', 'ক্র্যামারের নিয়মে সমীকরণ জোটের সমাধান'],
    en: ['Types of matrices; addition and multiplication', 'Determinants and their properties', 'Adjoint and inverse: A⁻¹ = adj(A) / |A|', 'Solving linear systems by Cramer’s rule']
  },
  'p1-ch2': {
    bn: ['ভেক্টরের যোগ, বিয়োগ ও একক ভেক্টর', 'ডট গুণন: a·b = |a||b| cos θ', 'ক্রস গুণন: |a×b| = |a||b| sin θ', 'অভিক্ষেপ, লম্ব ও সমান্তরাল হওয়ার শর্ত'],
    en: ['Vector addition, subtraction and unit vectors', 'Dot product: a·b = |a||b| cos θ', 'Cross product: |a×b| = |a||b| sin θ', 'Projection; conditions for perpendicular and parallel vectors']
  },
  'p1-ch3': {
    bn: ['দূরত্ব ও বিভক্তিকরণ সূত্র', 'ঢাল: m = (y₂ − y₁) / (x₂ − x₁)', 'রেখার সমীকরণ: y = mx + c, x/a + y/b = 1', 'দুই রেখার মধ্যবর্তী কোণ ও লম্ব দূরত্ব |ax₁ + by₁ + c| / √(a² + b²)'],
    en: ['Distance and section formulas', 'Slope: m = (y₂ − y₁) / (x₂ − x₁)', 'Forms of a line: y = mx + c, x/a + y/b = 1', 'Angle between two lines; perpendicular distance |ax₁ + by₁ + c| / √(a² + b²)']
  },
  'p1-ch4': {
    bn: ['কেন্দ্র ও ব্যাসার্ধ দিয়ে বৃত্ত: (x − h)² + (y − k)² = r²', 'সাধারণ সমীকরণ x² + y² + 2gx + 2fy + c = 0: কেন্দ্র (−g, −f), ব্যাসার্ধ √(g² + f² − c)', 'স্পর্শক ও অভিলম্বের সমীকরণ', 'বহিঃস্থ বিন্দু থেকে স্পর্শকের দৈর্ঘ্য'],
    en: ['Centre-radius form: (x − h)² + (y − k)² = r²', 'General form x² + y² + 2gx + 2fy + c = 0: centre (−g, −f), radius √(g² + f² − c)', 'Equations of tangents and normals', 'Length of a tangent from an external point']
  },
  'p1-ch5': {
    bn: ['গণনার মূলনীতি ও ফ্যাক্টোরিয়াল', 'বিন্যাস: ⁿPᵣ = n! / (n − r)!', 'সমাবেশ: ⁿCᵣ = n! / (r!(n − r)!)', 'পুনরাবৃত্তিসহ বিন্যাস, চক্র বিন্যাস ও শর্তাধীন বাছাই'],
    en: ['Counting principle and factorials', 'Permutations: ⁿPᵣ = n! / (n − r)!', 'Combinations: ⁿCᵣ = n! / (r!(n − r)!)', 'Arrangements with repetition, circular permutations and restricted selections']
  },
  'p1-ch6': {
    bn: ['ডিগ্রি ও রেডিয়ান পরিমাপ, চাপের দৈর্ঘ্য s = rθ', 'মৌলিক অভেদ: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ', 'চতুর্ভাগ অনুযায়ী অনুপাতের চিহ্ন', 'আদর্শ কোণের মান ও লেখচিত্র'],
    en: ['Degree and radian measure; arc length s = rθ', 'Basic identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ', 'Signs of the ratios in each quadrant', 'Values at standard angles and graphs']
  },
  'p1-ch7': {
    bn: ['যৌগিক কোণ: sin(A ± B), cos(A ± B), tan(A ± B)', 'গুণিতক কোণ: sin 2A = 2 sin A cos A, cos 2A = cos²A − sin²A', 'গুণফল ও যোগফলের রূপান্তর সূত্র', 'ত্রিভুজের সাইন ও কোসাইন সূত্র'],
    en: ['Compound angles: sin(A ± B), cos(A ± B), tan(A ± B)', 'Multiple angles: sin 2A = 2 sin A cos A, cos 2A = cos²A − sin²A', 'Product-to-sum and sum-to-product formulas', 'Sine and cosine rules for a triangle']
  },
  'p1-ch8': {
    bn: ['ফাংশন, ডোমেন ও রেঞ্জ', 'এক-এক ও সার্বিক ফাংশন', 'বিপরীত ফাংশন ও সংযোজিত ফাংশন', 'লেখচিত্র আঁকা ও লেখচিত্রের রূপান্তর'],
    en: ['Functions, domain and range', 'One-one and onto functions', 'Inverse and composite functions', 'Sketching graphs and transformations of graphs']
  },
  'p1-ch9': {
    bn: ['লিমিট ও অবিচ্ছিন্নতা', 'মৌলিক সূত্র: d/dx (xⁿ) = n xⁿ⁻¹', 'গুণ, ভাগ ও চেইন নিয়ম', 'স্পর্শকের ঢাল, গুরুমান ও লঘুমান'],
    en: ['Limits and continuity', 'Basic rule: d/dx (xⁿ) = n xⁿ⁻¹', 'Product, quotient and chain rules', 'Slope of a tangent; maxima and minima']
  },
  'p1-ch10': {
    bn: ['মৌলিক সূত্র: ∫xⁿ dx = xⁿ⁺¹ / (n + 1) + c', 'প্রতিস্থাপন পদ্ধতি', 'অংশায়ন: ∫u dv = uv − ∫v du', 'নির্দিষ্ট যোগজ ও ক্ষেত্রফল নির্ণয়'],
    en: ['Basic rule: ∫xⁿ dx = xⁿ⁺¹ / (n + 1) + c', 'Integration by substitution', 'Integration by parts: ∫u dv = uv − ∫v du', 'Definite integrals and area under a curve']
  },
  'p2-ch1': {
    bn: ['বাস্তব সংখ্যার শ্রেণিবিভাগ ও স্বীকার্য', 'পরম মান |x| ও এর ধর্ম', 'অসমতার সমাধান ও সংখ্যারেখায় প্রকাশ', '|x − a| < b হলে a − b < x < a + b'],
    en: ['Classification and axioms of real numbers', 'Absolute value |x| and its properties', 'Solving inequalities and showing them on the number line', '|x − a| < b means a − b < x < a + b']
  },
  'p2-ch2': {
    bn: ['সীমাবদ্ধতা ও অভীষ্ট ফাংশন গঠন', 'লেখচিত্রে সম্ভাব্য সমাধান অঞ্চল', 'কৌণিক বিন্দুতে সর্বোচ্চ ও সর্বনিম্ন মান', 'বাস্তব সমস্যাকে যোগাশ্রয়ী প্রোগ্রামে রূপ দেওয়া'],
    en: ['Forming constraints and the objective function', 'Feasible region on a graph', 'Maximum and minimum values at corner points', 'Modelling real problems as linear programmes']
  },
  'p2-ch3': {
    bn: ['কাল্পনিক একক i, i² = −1', 'মডুলাস |z| = √(x² + y²), আর্গুমেন্ট ও অনুবন্ধী', 'আর্গন্ড চিত্র ও পোলার আকার', 'এককের ঘনমূল: 1 + ω + ω² = 0, ω³ = 1'],
    en: ['Imaginary unit i, i² = −1', 'Modulus |z| = √(x² + y²), argument and conjugate', 'Argand diagram and polar form', 'Cube roots of unity: 1 + ω + ω² = 0, ω³ = 1']
  },
  'p2-ch4': {
    bn: ['ভাগশেষ ও উৎপাদক উপপাদ্য', 'দ্বিঘাত সমীকরণের মূল: x = (−b ± √(b² − 4ac)) / 2a', 'মূল ও সহগের সম্পর্ক: α + β = −b/a, αβ = c/a', 'নিশ্চায়ক b² − 4ac ও মূলের প্রকৃতি'],
    en: ['Remainder and factor theorems', 'Roots of a quadratic: x = (−b ± √(b² − 4ac)) / 2a', 'Roots and coefficients: α + β = −b/a, αβ = c/a', 'Discriminant b² − 4ac and the nature of roots']
  },
  'p2-ch5': {
    bn: ['দ্বিপদী বিস্তৃতি (a + b)ⁿ', 'সাধারণ পদ: Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ', 'মধ্যপদ ও নির্দিষ্ট পদের সহগ', 'অসীম ধারায় বিস্তৃতি (|x| < 1)'],
    en: ['Binomial expansion of (a + b)ⁿ', 'General term: Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ', 'Middle term and the coefficient of a given term', 'Expansion as an infinite series (|x| < 1)']
  },
  'p2-ch6': {
    bn: ['পরাবৃত্ত: y² = 4ax', 'উপবৃত্ত: x²/a² + y²/b² = 1', 'অধিবৃত্ত: x²/a² − y²/b² = 1', 'উৎকেন্দ্রিকতা, উপকেন্দ্র, নিয়ামক ও উপকেন্দ্রিক লম্ব'],
    en: ['Parabola: y² = 4ax', 'Ellipse: x²/a² + y²/b² = 1', 'Hyperbola: x²/a² − y²/b² = 1', 'Eccentricity, focus, directrix and latus rectum']
  },
  'p2-ch7': {
    bn: ['sin⁻¹x, cos⁻¹x ও tan⁻¹x এর মুখ্য মান', 'tan⁻¹x + tan⁻¹y = tan⁻¹((x + y) / (1 − xy))', 'ত্রিকোণমিতিক সমীকরণের সাধারণ সমাধান', 'নির্দিষ্ট ব্যবধিতে সমাধান'],
    en: ['Principal values of sin⁻¹x, cos⁻¹x and tan⁻¹x', 'tan⁻¹x + tan⁻¹y = tan⁻¹((x + y) / (1 − xy))', 'General solutions of trigonometric equations', 'Solutions in a given interval']
  },
  'p2-ch8': {
    bn: ['দুটি বলের লব্ধি: R² = P² + Q² + 2PQ cos α', 'বলের বিভাজন ও লামির উপপাদ্য', 'বলের ভ্রামক ও যুগল', 'সমান্তরাল বল ও সাম্যাবস্থা'],
    en: ['Resultant of two forces: R² = P² + Q² + 2PQ cos α', 'Resolution of forces and Lami’s theorem', 'Moment of a force and couples', 'Parallel forces and equilibrium']
  },
  'p2-ch9': {
    bn: ['গতির সমীকরণ: v = u + at, s = ut + ½at², v² = u² + 2as', 'অভিকর্ষের অধীনে খাড়া গতি', 'প্রক্ষেপক: পাল্লা R = u² sin 2α / g', 'সর্বোচ্চ উচ্চতা H = u² sin²α / 2g ও বিচরণকাল'],
    en: ['Equations of motion: v = u + at, s = ut + ½at², v² = u² + 2as', 'Vertical motion under gravity', 'Projectiles: range R = u² sin 2α / g', 'Greatest height H = u² sin²α / 2g and time of flight']
  },
  'p2-ch10': {
    bn: ['পরিসর, গড় ব্যবধান, ভেদাঙ্ক ও পরিমিত ব্যবধান', 'সম্ভাবনা: P(A) = অনুকূল ফলাফল / মোট ফলাফল', 'যোগ সূত্র: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'শর্তাধীন সম্ভাবনা ও স্বাধীন ঘটনা'],
    en: ['Range, mean deviation, variance and standard deviation', 'Probability: P(A) = favourable outcomes / total outcomes', 'Addition rule: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'Conditional probability and independent events']
  }
};
// Notes for a chapter id: Bangla for p1-/p2- chapters, English for the matching ev1-/ev2- chapters.
const chapterNotes = (id) => {
  const ev = /^ev([12])-ch(\d+)$/.exec(id || '');
  if (ev) return (HSC_CHAPTER_NOTES[`p${ev[1]}-ch${ev[2]}`] || {}).en || null;
  return (HSC_CHAPTER_NOTES[id] || {}).bn || null;
};

const SPECIAL_COURSES_WITH_BOOKS = [
  {
    id: 'course-calculus',
    courseNum: 'কোর্স ১',
    courseTitle: 'ক্যালকুলাস',
    courseEng: 'Calculus Master Course',
    tag: 'COURSE 01 • CALCULUS',
    icon: '∫',
    grad: 'from-amber-400 via-orange-500 to-red-600',
    bookTitle: 'The Fuel of Higher Math: ক্যালকুলাস',
    bookSub: '১ম পত্র: অধ্যায় ৮ (ফাংশন), অধ্যায় ৯ (অন্তরীকরণ) ও অধ্যায় ১০ (যোগজীকরণ)',
    author: 'Emran Islam',
    badge: 'Best Seller',
    mappedPaper: 'paper1',
    mappedChapter: 'p1-ch8',
    chaptersIncluded: '১ম পত্রের অধ্যায় ৮, ৯, ১০',
    priceBdt: '৳ ৫৫০',
    bookPriceBdt: '৳ ২৯০',
    liveSchedule: 'রবি, মঙ্গল ও বৃহস্পতিবার • রাত ৮:৩০ PM (Zoom Live)',
    syllabusChapters: [
      { paper: '১ম পত্র', chId: 'p1-ch8', num: 'অধ্যায় ৮', title: 'ফাংশন ও ফাংশনের লেখচিত্র', eng: 'Functions & Graphs' },
      { paper: '১ম পত্র', chId: 'p1-ch9', num: 'অধ্যায় ৯', title: 'অন্তরীকরণ', eng: 'Differentiation' },
      { paper: '১ম পত্র', chId: 'p1-ch10', num: 'অধ্যায় ১০', title: 'যোগজীকরণ', eng: 'Integration' }
    ]
  },
  {
    id: 'course-trig',
    courseNum: 'কোর্স ২',
    courseTitle: 'ত্রিকোণমিতি',
    courseEng: 'Trigonometry Full Course',
    tag: 'COURSE 02 • TRIG',
    icon: '📐',
    grad: 'from-violet-400 via-purple-500 to-indigo-700',
    bookTitle: 'The Fuel of Higher Math: ত্রিকোণমিতি',
    bookSub: '১ম পত্র: অধ্যায় ৬, ৭ এবং ২য় পত্র: অধ্যায় ৭ (বিপরীত ত্রিকোণমিতিক ফাংশন ও সমীকরণ)',
    author: 'Emran Islam',
    badge: 'HSC & Adm',
    mappedPaper: 'paper1',
    mappedChapter: 'p1-ch6',
    chaptersIncluded: '১ম পত্রের অধ্যায় ৬, ৭ ও ২য় পত্রের অধ্যায় ৭',
    priceBdt: '৳ ৪৫০',
    bookPriceBdt: '৳ ২৬০',
    liveSchedule: 'শনি, সোম ও বুধবার • রাত ৮:৩০ PM (Zoom Live)',
    syllabusChapters: [
      { paper: '১ম পত্র', chId: 'p1-ch6', num: 'অধ্যায় ৬', title: 'ত্রিকোণমিতিক অনুপাত', eng: 'Trigonometric Ratios' },
      { paper: '১ম পত্র', chId: 'p1-ch7', num: 'অধ্যায় ৭', title: 'সংযুক্ত ও যৌগিক কোণের ত্রিকোণমিতিক অনুপাত', eng: 'Associated & Compound Angles' },
      { paper: '২য় পত্র', chId: 'p2-ch7', num: 'অধ্যায় ৭', title: 'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ', eng: 'Inverse Trig & Equations' }
    ]
  },
  {
    id: 'course-mechanics',
    courseNum: 'কোর্স ৩',
    courseTitle: 'বলবিদ্যা',
    courseEng: 'Mechanics (Statics & Dynamics)',
    tag: 'COURSE 03 • MECH',
    icon: '🚀',
    grad: 'from-cyan-400 via-teal-500 to-emerald-600',
    bookTitle: 'The Fuel of Higher Math: বলবিদ্যা',
    bookSub: '২য় পত্র: অধ্যায় ৮ (স্থিতিবিদ্যা) ও অধ্যায় ৯ (গতিবিদ্যা) ভিজ্যুয়াল ও ইঞ্জিনিয়ারিং গাইড',
    author: 'Emran Islam',
    badge: 'BUET Special',
    mappedPaper: 'paper2',
    mappedChapter: 'p2-ch8',
    chaptersIncluded: '২য় পত্রের অধ্যায় ৮, ৯',
    priceBdt: '৳ ৫০০',
    bookPriceBdt: '৳ ২৮০',
    liveSchedule: 'রবি ও বুধবার • রাত ৯:৩০ PM (Zoom Live)',
    syllabusChapters: [
      { paper: '২য় পত্র', chId: 'p2-ch8', num: 'অধ্যায় ৮', title: 'স্থিতিবিদ্যা', eng: 'Statics' },
      { paper: '২য় পত্র', chId: 'p2-ch9', num: 'অধ্যায় ৯', title: 'গতিবিদ্যা', eng: 'Dynamics' }
    ]
  },
  {
    id: 'course-geometry',
    courseNum: 'কোর্স ৪',
    courseTitle: 'জ্যামিতি',
    courseEng: 'Geometry & Conics',
    tag: 'COURSE 04 • GEOM',
    icon: '🪐',
    grad: 'from-sky-400 via-blue-500 to-indigo-600',
    bookTitle: 'The Fuel of Higher Math: জ্যামিতি ও কনিক',
    bookSub: '১ম পত্র: অধ্যায় ৩ (সরলরেখা), অধ্যায় ৪ (বৃত্ত) এবং ২য় পত্র: অধ্যায় ৬ (কনিক)',
    author: 'Emran Islam',
    badge: 'Visual Guide',
    mappedPaper: 'paper1',
    mappedChapter: 'p1-ch3',
    chaptersIncluded: '১ম পত্রের অধ্যায় ৩, ৪ ও ২য় পত্রের অধ্যায় ৬',
    priceBdt: '৳ ৫০০',
    bookPriceBdt: '৳ ২৭০',
    liveSchedule: 'সোম ও বৃহস্পতিবার • রাত ৯:৩০ PM (Zoom Live)',
    syllabusChapters: [
      { paper: '১ম পত্র', chId: 'p1-ch3', num: 'অধ্যায় ৩', title: 'সরলরেখা', eng: 'Straight Lines' },
      { paper: '১ম পত্র', chId: 'p1-ch4', num: 'অধ্যায় ৪', title: 'বৃত্ত', eng: 'Circle' },
      { paper: '২য় পত্র', chId: 'p2-ch6', num: 'অধ্যায় ৬', title: 'কনিক', eng: 'Conics (Parabola, Ellipse, Hyperbola)' }
    ]
  },
  {
    id: 'course-vector-others',
    courseNum: 'কোর্স ৫',
    courseTitle: 'ভেক্টর ও অন্যান্য',
    courseEng: 'Vectors, Matrices & Permutations',
    tag: 'COURSE 05 • VEC & OTHERS',
    icon: '🧭',
    grad: 'from-rose-400 via-pink-500 to-purple-700',
    bookTitle: 'The Fuel of Higher Math: ভেক্টর ও অন্যান্য',
    bookSub: '১ম পত্র: অধ্যায় ১ (ম্যাট্রিক্স ও নির্ণায়ক), অধ্যায় ২ (ভেক্টর) ও অধ্যায় ৫ (বিন্যাস ও সমাবেশ)',
    author: 'Emran Islam',
    badge: '1st Paper Core',
    mappedPaper: 'paper1',
    mappedChapter: 'p1-ch1',
    chaptersIncluded: '১ম পত্রের অধ্যায় ১, ২, ৫',
    priceBdt: '৳ ৪৫০',
    bookPriceBdt: '৳ ২৬০',
    liveSchedule: 'শনি ও মঙ্গলবার • সন্ধ্যা ৭:৩০ PM (Zoom Live)',
    syllabusChapters: [
      { paper: '১ম পত্র', chId: 'p1-ch1', num: 'অধ্যায় ১', title: 'ম্যাট্রিক্স ও নির্ণায়ক', eng: 'Matrices & Determinants' },
      { paper: '১ম পত্র', chId: 'p1-ch2', num: 'অধ্যায় ২', title: 'ভেক্টর', eng: 'Vectors' },
      { paper: '১ম পত্র', chId: 'p1-ch5', num: 'অধ্যায় ৫', title: 'বিন্যাস ও সমাবেশ', eng: 'Permutations & Combinations' }
    ]
  },
  {
    id: 'course-algebra-prob',
    courseNum: 'কোর্স ৬',
    courseTitle: 'বীজগণিত, যোগাশ্রয়ী ও সম্ভাবনা',
    courseEng: 'Algebra, Linear Programming & Probability',
    tag: 'COURSE 06 • ALGEBRA & PROB',
    icon: '🎯',
    grad: 'from-emerald-400 via-green-500 to-teal-700',
    bookTitle: 'The Fuel of Higher Math: বীজগণিত ও সম্ভাবনা',
    bookSub: '২য় পত্র: অধ্যায় ১, ২, ৩, ৪, ৫ ও ১০ (বাস্তব সংখ্যা, যোগাশ্রয়ী, জটিল, বহুপদী, দ্বিপদী ও সম্ভাবনা)',
    author: 'Emran Islam',
    badge: '2nd Paper Master',
    mappedPaper: 'paper2',
    mappedChapter: 'p2-ch1',
    chaptersIncluded: '২য় পত্রের অধ্যায় ১, ২, ৩, ৪, ৫, ১০',
    priceBdt: '৳ ৫৫০',
    bookPriceBdt: '৳ ৩০০',
    liveSchedule: 'রবি, মঙ্গল ও শুক্রবার • সন্ধ্যা ৭:৩০ PM (Zoom Live)',
    syllabusChapters: [
      { paper: '২য় পত্র', chId: 'p2-ch1', num: '১ম অধ্যায়', title: 'বাস্তব সংখ্যা ও অসমতা', eng: 'Real Numbers & Inequalities' },
      { paper: '২য় পত্র', chId: 'p2-ch2', num: '২য় অধ্যায়', title: 'যোগাশ্রয়ী প্রোগ্রাম', eng: 'Linear Programming' },
      { paper: '২য় পত্র', chId: 'p2-ch3', num: '৩য় অধ্যায়', title: 'জটিল সংখ্যা', eng: 'Complex Numbers' },
      { paper: '২য় পত্র', chId: 'p2-ch4', num: '৪র্থ অধ্যায়', title: 'বহুপদী ও বহুপদী সমীকরণ', eng: 'Polynomials & Equations' },
      { paper: '২য় পত্র', chId: 'p2-ch5', num: '৫ম অধ্যায়', title: 'দ্বিপদী উপপাদ্য', eng: 'Binomial Theorem' },
      { paper: '২য় পত্র', chId: 'p2-ch10', num: 'অধ্যায় ১০', title: 'বিস্তার পরিমাপ ও সম্ভাবনা', eng: 'Dispersion & Probability' }
    ]
  }
];

const EV_SPECIAL_COURSES = [
  {
    id: 'ev-course-1',
    courseNum: 'Course 1',
    courseTitle: 'Calculus (EV)',
    sub: '1st Paper: Ch 8 (Functions), Ch 9 (Differentiation) & Ch 10 (Integration)',
    icon: '∫',
    grad: 'from-amber-400 via-orange-500 to-red-600',
    priceBdt: '৳ 650',
    moduleIdx: 0,
    chapterIdx: 7
  },
  {
    id: 'ev-course-2',
    courseNum: 'Course 2',
    courseTitle: 'Trigonometry (EV)',
    sub: '1st Paper: Ch 6, 7 & 2nd Paper: Ch 7 (Inverse Trig & Trig Equations)',
    icon: '📐',
    grad: 'from-violet-400 via-purple-500 to-indigo-700',
    priceBdt: '৳ 550',
    moduleIdx: 0,
    chapterIdx: 5
  },
  {
    id: 'ev-course-3',
    courseNum: 'Course 3',
    courseTitle: 'Mechanics (EV)',
    sub: '2nd Paper: Ch 8 (Statics) & Ch 9 (Dynamics / Motion in a Plane)',
    icon: '🚀',
    grad: 'from-cyan-400 via-teal-500 to-emerald-600',
    priceBdt: '৳ 600',
    moduleIdx: 1,
    chapterIdx: 7
  },
  {
    id: 'ev-course-4',
    courseNum: 'Course 4',
    courseTitle: 'Geometry & Conics (EV)',
    sub: '1st Paper: Ch 3 (Straight Lines), Ch 4 (Circle) & 2nd Paper: Ch 6 (Conics)',
    icon: '🪐',
    grad: 'from-sky-400 via-blue-500 to-indigo-600',
    priceBdt: '৳ 600',
    moduleIdx: 0,
    chapterIdx: 2
  },
  {
    id: 'ev-course-5',
    courseNum: 'Course 5',
    courseTitle: 'Vectors, Matrices & Permutations (EV)',
    sub: '1st Paper: Ch 1 (Matrices), Ch 2 (Vectors) & Ch 5 (Permutations)',
    icon: '🧭',
    grad: 'from-rose-400 via-pink-500 to-purple-700',
    priceBdt: '৳ 550',
    moduleIdx: 0,
    chapterIdx: 0
  },
  {
    id: 'ev-course-6',
    courseNum: 'Course 6',
    courseTitle: 'Algebra, Linear Prog & Probability (EV)',
    sub: '2nd Paper: Ch 1, 2, 3, 4, 5 & 10 (Real/Complex, Polynomials, Binomial, Prob)',
    icon: '🎯',
    grad: 'from-emerald-400 via-green-500 to-teal-700',
    priceBdt: '৳ 650',
    moduleIdx: 1,
    chapterIdx: 0
  }
];

const RESEARCH_SHOWCASE_CARDS = [
  {
    id: 'thesis-consultation',
    code: 'PAID MENTORSHIP',
    bigTag: 'THESIS',
    title: 'Thesis Consultation (Paid)',
    sub: 'B.Sc. / M.Sc. / M.Phil Thesis: Topic selection, LaTeX writing, Python/MATLAB coding to completion',
    icon: '🎓',
    grad: 'from-amber-400 via-orange-500 to-red-600',
    badge: '1-on-1 Guided'
  },
  {
    id: 'research-collab',
    code: 'ACADEMIC LAB',
    bigTag: 'COLLAB',
    title: 'Research Collaboration',
    sub: 'Joint journal publications, PhD research opportunities & co-authored computational studies',
    icon: '🤝',
    grad: 'from-teal-400 via-cyan-500 to-blue-600',
    badge: 'Open for PhD/Peers'
  },
  {
    id: 'ongoing-projects',
    code: 'SPRINGER NATURE',
    bigTag: 'ML & OPT',
    title: 'My Ongoing Projects',
    sub: 'Earthquake Precursor ML Framework (ROC-AUC ≈ 0.87, Pure & Applied Geophysics) & Fuzzy-MOGA',
    icon: '🔬',
    grad: 'from-rose-400 via-pink-500 to-purple-700',
    badge: 'Under Review'
  },
  {
    id: 'journal-articles',
    code: 'PEER-REVIEWED',
    bigTag: 'PAPERS',
    title: 'Peer-Reviewed Journal Articles',
    sub: 'Improved Nearest Neighbour Algorithm for TSP (IJSRCSEIT 2018) & History of TSP (IJMTT 2018)',
    icon: '📄',
    grad: 'from-indigo-400 via-blue-500 to-cyan-600',
    badge: 'Published DOI'
  },
  {
    id: 'academic-books',
    code: 'GERMANY & BD',
    bigTag: 'BOOKS',
    title: 'Academic Textbooks & Handbooks',
    sub: '2 International Monographs (LAP LAMBERT, Germany) & The Fuel of Higher Math series',
    icon: '📚',
    grad: 'from-emerald-400 via-teal-500 to-cyan-700',
    badge: 'ISBN Verified'
  },
  {
    id: 'datasets-code',
    code: 'REPRODUCIBLE',
    bigTag: 'CODE',
    title: 'Datasets & Code Repository',
    sub: 'USGS Eastern Indian Plate Seismicity Features, TSP Heuristics in C/Python & LaTeX Templates',
    icon: '💻',
    grad: 'from-violet-400 via-purple-500 to-fuchsia-700',
    badge: 'Open Science'
  }
];

// ---------------------------------------------------------------- Admission (ভর্তি পরীক্ষা)
// The Admission page shows one card per university; each university has two sections
// (অধ্যায় ভিত্তিক ক্লাস, মডেল টেস্ট), which are modules of the Admission track below.
const ADMISSION_UNIVERSITIES = [
  { id: 'du', name: 'ঢাবি প্রস্তুতি', full: 'ঢাকা বিশ্ববিদ্যালয় পূর্ণাঙ্গ প্রস্তুতি', short: 'ঢাবি', icon: '🏛️', grad: 'from-sky-400 via-blue-500 to-indigo-700' },
  { id: 'ju', name: 'জাবি প্রস্তুতি', full: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়', short: 'জাবি', icon: '🌳', grad: 'from-emerald-400 via-green-500 to-teal-700' },
  { id: 'cu', name: 'চবি প্রস্তুতি', full: 'চট্টগ্রাম বিশ্ববিদ্যালয়', short: 'চবি', icon: '⛰️', grad: 'from-amber-400 via-orange-500 to-red-600' },
  { id: 'ru', name: 'রাবি প্রস্তুতি', full: 'রাজশাহী বিশ্ববিদ্যালয়', short: 'রাবি', icon: '🏫', grad: 'from-rose-400 via-pink-500 to-fuchsia-700' },
  { id: 'guccho', name: 'গুচ্ছ প্রস্তুতি', full: 'সমন্বিত বিশ্ববিদ্যালয় (গুচ্ছ)', short: 'গুচ্ছ', icon: '🧩', grad: 'from-violet-400 via-purple-500 to-indigo-700' },
  { id: 'sust', name: 'শাবিপ্রবি', full: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়', short: 'শাবিপ্রবি', icon: '🔬', grad: 'from-cyan-400 via-teal-500 to-emerald-700' },
  { id: 'other', name: 'অন্যান্য', full: 'অন্যান্য বিশ্ববিদ্যালয় ও ভর্তি পরীক্ষা', short: 'অন্যান্য', icon: '🎓', grad: 'from-slate-400 via-slate-500 to-slate-700' }
];
const ADMISSION_UNIVERSITY_BY_ID = Object.fromEntries(ADMISSION_UNIVERSITIES.map((u) => [u.id, u]));

const ADM_CHAPTER_TOPICS = [
  ['ম্যাট্রিক্স, নির্ণায়ক ও ভেক্টর', 'Matrices, Determinants & Vectors', '🔢'],
  ['সরলরেখা, বৃত্ত ও কণিক', 'Straight Lines, Circle & Conics', '⭕'],
  ['ফাংশন, সীমা ও অন্তরীকরণ', 'Functions, Limits & Differentiation', '⚡'],
  ['যোগজীকরণ ও এর প্রয়োগ', 'Integration & Applications', '∫'],
  ['ত্রিকোণমিতি ও বিপরীত ত্রিকোণমিতি', 'Trigonometry & Inverse Trigonometry', '📐'],
  ['জটিল সংখ্যা, বহুপদী ও দ্বিপদী', 'Complex Numbers, Polynomials & Binomial', '🌀'],
  ['বিন্যাস, সমাবেশ ও সম্ভাবনা', 'Permutation, Combination & Probability', '🎲'],
  ['স্থিতি, গতি ও পরিসংখ্যান', 'Statics, Dynamics & Statistics', '🎯']
];
const ADM_MODEL_TOPICS = [
  ['টপিক-ভিত্তিক মডেল টেস্ট', 'Topic-wise Model Tests', '🧩'],
  ['অর্ধ-পূর্ণাঙ্গ মডেল টেস্ট', 'Half-length Model Tests', '📄'],
  ['পূর্ণাঙ্গ মডেল টেস্ট', 'Full-length Model Tests', '📝'],
  ['বিগত বছরের প্রশ্ন সমাধান', "Previous Years' Questions", '📚']
];
const ADM_CHAPTER_BLUEPRINT = [
  'মৌলিক ধারণা ও সূত্র রিভিশন',
  'ভর্তি পরীক্ষার টাইপ অনুযায়ী সমস্যা সমাধান',
  'ক্যালকুলেটর ছাড়া দ্রুত সমাধানের কৌশল',
  'বিগত বছরের প্রশ্ন সমাধান',
  'টাইমড প্র্যাকটিস ও ভুল বিশ্লেষণ'
];
const ADM_MODEL_BLUEPRINT = [
  'পরীক্ষার নিয়ম ও সময় ব্যবস্থাপনা',
  'মডেল টেস্ট সমাধান — পর্ব ১',
  'মডেল টেস্ট সমাধান — পর্ব ২',
  'বিস্তারিত সমাধান ও ভুল বিশ্লেষণ'
];
const toBn_ = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
const ADMISSION_MODULES = ADMISSION_UNIVERSITIES.flatMap((u) => [
  {
    id: `adm-${u.id}-ch`,
    univ: u.id,
    section: 'ch',
    code: `${u.short} • অধ্যায়`,
    name: `${u.full} — অধ্যায় ভিত্তিক ক্লাস`,
    cardLabel: 'অধ্যায় ভিত্তিক ক্লাস',
    sub: 'সিলেবাস অনুযায়ী অধ্যায়ভিত্তিক লেকচার ও সেলফ টেস্ট',
    icon: '📚',
    grad: u.grad,
    chapters: ADM_CHAPTER_TOPICS.map(([title, eng, icon], i) => ({ id: `adm-${u.id}-ch-${i + 1}`, num: `অধ্যায় ${toBn_(i + 1)}`, title, eng, icon })),
    lectureBlueprint: ADM_CHAPTER_BLUEPRINT
  },
  {
    id: `adm-${u.id}-mt`,
    univ: u.id,
    section: 'mt',
    code: `${u.short} • মডেল টেস্ট`,
    name: `${u.full} — মডেল টেস্ট`,
    cardLabel: 'মডেল টেস্ট',
    sub: 'টপিক-ভিত্তিক ও পূর্ণাঙ্গ মডেল টেস্ট',
    icon: '📝',
    grad: u.grad,
    chapters: ADM_MODEL_TOPICS.map(([title, eng, icon], i) => ({ id: `adm-${u.id}-mt-${i + 1}`, num: `মডেল টেস্ট ${toBn_(i + 1)}`, title, eng, icon })),
    lectureBlueprint: ADM_MODEL_BLUEPRINT
  }
]);

// ---------------------------------------------------------------- B.Sc. (Honours) yearwise courses
// The Honours page shows four year cards; each year has one card per course. A course is a module of
// the Honours track below (its units are the chapters). The six modules that already had units keep
// their ids, so content entered for them stays.
const HONOURS_YEARS = [
  { id: 'y1', name: '১ম বর্ষের কোর্স সমূহ', full: '১ম বর্ষ — Core & Lab Courses', short: '১ম বর্ষ', icon: '🥇', grad: 'from-emerald-400 via-green-500 to-teal-700' },
  { id: 'y2', name: '২য় বর্ষের কোর্স সমূহ', full: '২য় বর্ষ — Core & Lab Courses', short: '২য় বর্ষ', icon: '🥈', grad: 'from-sky-400 via-blue-500 to-indigo-700' },
  { id: 'y3', name: '৩য় বর্ষের কোর্স সমূহ', full: '৩য় বর্ষ — Core & Lab Courses', short: '৩য় বর্ষ', icon: '🥉', grad: 'from-amber-400 via-orange-500 to-red-600' },
  { id: 'y4', name: '৪র্থ বর্ষের কোর্স সমূহ', full: '৪র্থ বর্ষ — Core & Lab Courses', short: '৪র্থ বর্ষ', icon: '🎓', grad: 'from-fuchsia-400 via-purple-500 to-violet-700' }
];
const HONOURS_YEAR_BY_ID = Object.fromEntries(HONOURS_YEARS.map((y) => [y.id, y]));

// [year, course code, name, id of the older module that already had units (if any), lab/viva?]
const HONOURS_COURSE_LIST = [
  ['y1', '213701', 'Fundamentals of Mathematics', 'hon-fund'],
  ['y1', '213703', 'Fundamentals of Calculus', 'hon-calc'],
  ['y1', '213705', 'Linear Algebra and Analytic Geometry', 'hon-linalg'],
  ['y1', '213706', 'Math Lab-Practical I (Mathematica)', null, true],
  ['y2', '223701', 'Calculus–II', null],
  ['y2', '223703', 'Ordinary Differential Equations', 'hon-ode-pde'],
  ['y2', '223705', 'Computer Programming (Fortran)', null],
  ['y2', '223706', 'Math Lab (Practical)', null, true],
  ['y3', '233701', 'Abstract Algebra', null],
  ['y3', '233703', 'Real Analysis', null],
  ['y3', '233705', 'Numerical Analysis', 'hon-numerical'],
  ['y3', '233707', 'Complex Analysis', null],
  ['y3', '233709', 'Differential Geometry', null],
  ['y3', '233711', 'Mechanics', null],
  ['y3', '233713', 'Linear Programming', 'hon-or-tsp'],
  ['y3', '233714', 'Math Lab (Practical)', null, true],
  ['y4', '243701', 'Theory of Numbers', null],
  ['y4', '243703', 'Topology & Functional Analysis', null],
  ['y4', '243705', 'Methods of Applied Mathematics', null],
  ['y4', '243707', 'Tensor Analysis', null],
  ['y4', '243709', 'Partial Differential Equations', null],
  ['y4', '243711', 'Hydrodynamics', null],
  ['y4', '243713', 'Discrete Mathematics (Standard Core Elective)', null],
  ['y4', '243718', 'Math Lab (Practical) (Standard Core Elective)', null, true],
  ['y4', '243720', 'Viva-Voce (Oral Examination)', null, true]
];
const HONOURS_LEGACY = [
      {
        id: 'hon-calc',
        code: 'COURSE 01 • CALCULUS I',
        name: 'Calculus I',
        sub: 'ε-δ Limits, Mean Value Theorems, Improper Integrals, Partial Derivatives',
        icon: '∫',
        grad: 'from-emerald-400 via-green-500 to-teal-700',
        chapters: [
          { id: 'hon-c-1', num: 'Unit 01', title: 'Real-Valued Functions, ε-δ Definition of Limit & Continuity', eng: 'Sequential criterion, uniform continuity & Intermediate Value Theorem', icon: '♾️' },
          { id: 'hon-c-2', num: 'Unit 02', title: 'Rolle’s Theorem, Lagrange & Cauchy’s Mean Value Theorems', eng: 'Taylor’s & Maclaurin’s theorem with Lagrange/Cauchy form of remainder', icon: '⚡' },
          { id: 'hon-c-3', num: 'Unit 03', title: 'Successive Differentiation (Leibnitz’s Theorem) & Indeterminate Forms', eng: 'nth derivatives of standard functions & L’Hôpital’s rigorous proof', icon: '📈' },
          { id: 'hon-c-4', num: 'Unit 04', title: 'Asymptotes, Envelopes, Curvature & Tracing of Curves', eng: 'Cartesian, polar & parametric radius of curvature, Folium of Descartes', icon: '🪐' },
          { id: 'hon-c-5', num: 'Unit 05', title: 'Reduction Formulas, Beta & Gamma Functions & Improper Integrals', eng: 'Legendre duplication, Dirichlet integrals & arc length/surface area', icon: '∫' },
          { id: 'hon-c-6', num: 'Unit 06', title: 'Functions of Several Variables, Euler’s Theorem & Jacobians', eng: 'Partial differentiation, homogeneous functions & Lagrange multipliers', icon: '🧭' }
        ],
        lectureBlueprint: [
          'Rigorous Statement & Step-by-Step Proof of Core Theorems',
          'Classic Text Problem Solutions (Anton, Apostol, Das & Mukherjee)',
          'University Honours Final Examination Past Question Solutions',
          'Viva-Voce Conceptual Questions & Counter-Examples',
          'Undergraduate Self-Test & Proof Writing Assessment'
        ]
      },
      {
        id: 'hon-fund',
        code: 'COURSE 02 • FUNDAMENTALS',
        name: 'Fundamentals of Mathematics',
        sub: 'Mathematical Logic, Set Theory, Relations, Number Theory & Complex Analysis',
        icon: '🧮',
        grad: 'from-teal-400 via-cyan-500 to-blue-700',
        chapters: [
          { id: 'hon-f-1', num: 'Unit 01', title: 'Mathematical Logic, Truth Tables, Quantifiers & Proof Techniques', eng: 'Tautology, contrapositive, contradiction & mathematical induction', icon: '🧠' },
          { id: 'hon-f-2', num: 'Unit 02', title: 'Set Theory, Binary Relations, Equivalence Classes & Partitions', eng: 'Reflexive, symmetric, transitive relations & partial orderings (Posets)', icon: '🔢' },
          { id: 'hon-f-3', num: 'Unit 03', title: 'Functions, Cardinality, Countable & Uncountable Sets', eng: 'Injective/surjective proofs, Schroeder-Bernstein & Cantor’s theorem', icon: '♾️' },
          { id: 'hon-f-4', num: 'Unit 04', title: 'Elementary Number Theory: Divisibility, Primes & Congruences', eng: 'Euclidean algorithm, Fermat’s Little Theorem, Euler’s φ & Chinese Remainder', icon: '🔑' },
          { id: 'hon-f-5', num: 'Unit 05', title: 'De Moivre’s Theorem, Gregory’s Series & Hyperbolic Functions', eng: 'Summation of C + iS trigonometric series & complex logarithms', icon: '🌀' },
          { id: 'hon-f-6', num: 'Unit 06', title: 'Theory of Equations: Sturm’s Theorem, Cardan’s & Ferrari’s Methods', eng: 'Descartes’ rule of signs, reciprocal equations & transformation of roots', icon: '📐' }
        ],
        lectureBlueprint: [
          'Axiomatic Definitions, Lemmas & Formal Proof Construction',
          'Step-by-Step Solutions of Standard Exercises',
          'Honours 1st Year University Final Exam Archive Solutions',
          'BCS / NTRCA Written Mathematics Linkage',
          'Self-Test Quiz & Proof Verification'
        ]
      },
      {
        id: 'hon-linalg',
        code: 'COURSE 03 • LINEAR ALGEBRA',
        name: 'Linear Algebra & Analytical Geometry',
        sub: 'Vector Spaces, Basis, Linear Transformations, Eigenvalues, 3D Quadric Surfaces',
        icon: '🔢',
        grad: 'from-indigo-400 via-blue-500 to-cyan-600',
        chapters: [
          { id: 'hon-la-1', num: 'Unit 01', title: 'Systems of Linear Equations, Gauss-Jordan & Echelon Forms', eng: 'Rank of matrix, consistency (Rouché–Capelli) & LU decomposition', icon: '🔢' },
          { id: 'hon-la-2', num: 'Unit 02', title: 'Vector Spaces, Subspaces, Linear Independence, Basis & Dimension', eng: 'Span, sum & direct sum of subspaces, dimension theorem proofs', icon: '🧭' },
          { id: 'hon-la-3', num: 'Unit 03', title: 'Linear Transformations, Kernel, Range & Rank-Nullity Theorem', eng: 'Matrix representation of linear operators & change of basis', icon: '🔄' },
          { id: 'hon-la-4', num: 'Unit 04', title: 'Eigenvalues, Eigenvectors, Diagonalization & Cayley-Hamilton', eng: 'Characteristic/minimal polynomials, algebraic vs geometric multiplicity', icon: '⚡' },
          { id: 'hon-la-5', num: 'Unit 05', title: 'Inner Product Spaces & Gram-Schmidt Orthonormalization', eng: 'Cauchy-Schwarz inequality, orthogonal complements & Spectral Theorem', icon: '📐' },
          { id: 'hon-la-6', num: 'Unit 06', title: '3D Analytical Geometry: Planes, Straight Lines, Spheres & Conoids', eng: 'Shortest distance between skew lines, central conicoids & generating lines', icon: '🪐' }
        ],
        lectureBlueprint: [
          'Theorem Proofs (Hoffman & Kunze / Howard Anton / Seymour Lipschutz)',
          'Computational & Proof-Based Worked Examples',
          'University Honours Exam Questions & Solutions',
          'Applications in Machine Learning & 3D Geometry',
          'Linear Algebra Self-Test & Assessment'
        ]
      },
      {
        id: 'hon-ode-pde',
        code: 'COURSE 04 • ODE & PDE',
        name: 'Ordinary & Partial Differential Equations (ODE & PDE)',
        sub: 'Exact ODEs, Wronskian, Series Solutions (Frobenius), Bessel/Legendre, Wave & Heat PDEs',
        icon: '🌊',
        grad: 'from-sky-400 via-blue-500 to-indigo-700',
        chapters: [
          { id: 'hon-de-1', num: 'Unit 01', title: 'First-Order ODEs: Exact Equations, Integrating Factors & Clairaut’s Form', eng: 'Existence-uniqueness theorem, orthogonal trajectories & singular solutions', icon: '📈' },
          { id: 'hon-de-2', num: 'Unit 02', title: 'Higher-Order Linear ODEs: Wronskian, Undetermined Coefficients & Variation of Parameters', eng: 'Cauchy-Euler homogeneous equations & operator methods', icon: '⚡' },
          { id: 'hon-de-3', num: 'Unit 03', title: 'Power Series Solutions (Frobenius Method), Bessel & Legendre Functions', eng: 'Generating functions, recurrence relations & orthogonality properties', icon: '🌀' },
          { id: 'hon-de-4', num: 'Unit 04', title: 'First-Order PDEs: Lagrange’s Linear Equation & Charpit’s Method', eng: 'Complete, particular & singular integrals, Monge’s method', icon: '🧭' },
          { id: 'hon-de-5', num: 'Unit 05', title: 'Second-Order PDEs: Classification (Elliptic, Parabolic, Hyperbolic) & Canonical Forms', eng: 'D’Alembert’s solution, 1D Wave, Heat & Laplace boundary value problems', icon: '🌊' }
        ],
        lectureBlueprint: [
          'Rigorous Analytical Derivation & Boundary Value Modeling',
          'Worked Solutions from Ross, Sneddon & Raisinghania',
          'University Honours 2nd/3rd Year Final Archive Solutions',
          'Physical & Geophysical Wave Modeling Applications',
          'ODE & PDE Timed Self-Test'
        ]
      },
      {
        id: 'hon-numerical',
        code: 'COURSE 05 • NUMERICAL & SCI-COMP',
        name: 'Numerical Analysis & Scientific Computing',
        sub: 'Root Finding, Interpolation, Numerical Integration, RK4 & Python/C Implementation',
        icon: '💻',
        grad: 'from-amber-400 via-orange-500 to-rose-600',
        chapters: [
          { id: 'hon-na-1', num: 'Unit 01', title: 'Transcendental & Polynomial Equations: Bisection, False Position & Newton-Raphson', eng: 'Order of convergence proof, Secant method & fixed-point iteration', icon: '🔢' },
          { id: 'hon-na-2', num: 'Unit 02', title: 'Finite Differences & Polynomial Interpolation (Newton, Gauss, Stirling & Lagrange)', eng: 'Divided differences, error bounds & inverse interpolation', icon: '📈' },
          { id: 'hon-na-3', num: 'Unit 03', title: 'Numerical Differentiation & Quadrature (Trapezoidal, Simpson’s 1/3, 3/8 & Weddle)', eng: 'Newton-Cotes derivation, Romberg integration & Gaussian quadrature', icon: '∫' },
          { id: 'hon-na-4', num: 'Unit 04', title: 'Numerical Linear Algebra: Jacobi, Gauss-Seidel Iterative & Power Method', eng: 'Diagonal dominance convergence & dominant eigenvalue computation', icon: '🧮' },
          { id: 'hon-na-5', num: 'Unit 05', title: 'Numerical Solutions of ODEs: Euler, Modified Euler, Picard & 4th-Order Runge-Kutta (RK4)', eng: 'Milne’s & Adams-Bashforth predictor-corrector methods + Python/C code', icon: '💻' }
        ],
        lectureBlueprint: [
          'Error Analysis, Convergence Rate Proofs & Tabular Hand Calculations',
          'Step-by-Step Casio fx-991EX CALC/TABLE Mode Verification',
          'C & Python (NumPy/SciPy) Lab Implementation Walkthrough',
          'Honours 3rd/4th Year Final Exam Archive Solutions',
          'Numerical Methods Self-Test'
        ]
      },
      {
        id: 'hon-or-tsp',
        code: 'COURSE 06 • OR, LP & TSP',
        name: 'Operations Research, Linear Programming & Combinatorial Optimization (TSP)',
        sub: 'Simplex, Big-M, Duality, Transportation, Assignment & Travelling Salesman Problem',
        icon: '🏆',
        grad: 'from-purple-400 via-fuchsia-500 to-rose-600',
        chapters: [
          { id: 'hon-or-1', num: 'Unit 01', title: 'Convex Sets, Extreme Points & Graphical Linear Programming Formulation', eng: 'Hyperplanes, supporting planes & fundamental theorem of LPP', icon: '📐' },
          { id: 'hon-or-2', num: 'Unit 02', title: 'Simplex Method, Two-Phase Method & Charnes Big-M Method', eng: 'Slack, surplus, artificial variables, degeneracy & cycling resolution', icon: '📉' },
          { id: 'hon-or-3', num: 'Unit 03', title: 'Duality in Linear Programming, Dual Simplex & Sensitivity Analysis', eng: 'Weak & strong duality theorems, complementary slackness & shadow prices', icon: '🔄' },
          { id: 'hon-or-4', num: 'Unit 04', title: 'Transportation (NWCR, Least Cost, VAM, MODI) & Hungarian Assignment', eng: 'Unbalanced transportation, degeneracy & travelling routing reduction', icon: '🚚' },
          { id: 'hon-or-5', num: 'Unit 05', title: 'Combinatorial Optimization & Travelling Salesman Problem (TSP)', eng: 'Exact branch-and-bound, Improved Nearest Neighbour & Genetic Algorithms (M.Sc. Thesis Link)', icon: '🏆' }
        ],
        lectureBlueprint: [
          'Mathematical Formulation, Convexity Proofs & Algorithmic Steps',
          'Step-by-Step Tableau Hand Calculation & Optimality Checks',
          'Honours & M.Sc. Examination Archive Solutions',
          'Research Linkage: Lecturer Emran Islam’s Published TSP Monograph',
          'Optimization Self-Test & Problem Sheet'
        ]
      }
];
const HONOURS_GENERIC_BLUEPRINT = [
  'মূল ধারণা, সংজ্ঞা ও উপপাদ্যের প্রমাণ',
  'সমাধান করা উদাহরণ ও অনুশীলনী',
  'পরীক্ষার প্রশ্ন সমাধান',
  'রিভিশন ও সেলফ টেস্ট'
];
const HONOURS_MODULES = HONOURS_COURSE_LIST.map(([year, code, name, legacyId, lab]) => {
  const y = HONOURS_YEAR_BY_ID[year];
  const old = legacyId ? HONOURS_LEGACY.find((m) => m.id === legacyId) : null;
  const units = lab ? 4 : 6;
  return {
    ...(old || {}),
    id: old ? old.id : `hon-${code}`,
    year,
    courseCode: code,
    code: `${code} • ${y.short}`,
    name,
    sub: old ? old.sub : `${y.short} • কোর্স কোড ${code}`,
    icon: old ? old.icon : lab ? '💻' : '📘',
    grad: old ? old.grad : y.grad,
    chapters: old
      ? old.chapters
      : Array.from({ length: units }, (_, k) => ({
          id: `hon-${code}-${k + 1}`,
          num: `Unit ${String(k + 1).padStart(2, '0')}`,
          title: `ইউনিট ${toBn_(k + 1)}`,
          eng: `${name} — Unit ${k + 1}`,
          icon: '📖'
        })),
    lectureBlueprint: old ? old.lectureBlueprint : HONOURS_GENERIC_BLUEPRINT
  };
});

// ---------------------------------------------------------------- O Level (4024) and A Level (9709) syllabus
// Six sections, each a module of the O-Level & A-Level track. A chapter's topics are its lectures
// (Topic 1 is the free one); the lists come from the developer list supplied by the owner.
const OA_SYLLABUS = [
  {
    id: "oa-o4024", code: "O LEVEL • 4024", name: "O Level (4024)", sub: "9 chapters, 88 topics", icon: "📘", grad: "from-violet-400 via-purple-500 to-indigo-700",
    chapters: [
      { title: "Number", topics: ["Types of number", "Highest common factor and lowest common multiple", "Set language and notation", "Venn diagrams (up to three sets) and number of elements", "Squares, square roots, cubes and cube roots", "Directed numbers (negative numbers in real life)", "Fractions, decimals and percentages", "The four operations and order of operations (BIDMAS)", "Indices I", "Standard form", "Estimation and rounding", "Limits of accuracy (upper and lower bounds)", "Ratio and proportion", "Rates", "Percentages", "Money", "Time", "Exponential growth and decay (repeated percentage change)", "Surds", "Using a calculator effectively (exam technique topic)"] },
      { title: "Algebra and Graphs", topics: ["Algebraic manipulation", "Algebraic fractions", "Indices II", "Algebraic formulae", "Forming equations from word problems", "Linear equations", "Simultaneous equations", "Quadratic equations", "Linear inequalities", "Graphical representation of inequalities (shading regions)", "Sequences", "Variation", "Graphs in practical situations", "Graphs of functions", "Sketching curves", "Functions and function notation"] },
      { title: "Coordinate Geometry", topics: ["Coordinates and drawing straight line graphs", "Gradient of a line", "Length of a line segment and midpoint of a line segment", "Equation of a straight line", "Parallel and perpendicular lines and their gradients"] },
      { title: "Geometry", topics: ["Geometrical terms", "Angle rules", "Angles with parallel lines", "Polygon angles", "Geometrical constructions", "Scale drawings and bearings (measuring and drawing)", "Similarity", "Congruence", "Symmetry", "Circle theorems I", "Circle theorems II"] },
      { title: "Mensuration", topics: ["Units of measure", "Perimeter and area", "Circles", "Surface area and volume I", "Surface area and volume II", "Compound solids and problems combining shapes"] },
      { title: "Trigonometry", topics: ["Pythagoras theorem in 2D and 3D, and its converse", "Trigonometric ratios in right-angled triangles", "Angles of elevation and depression", "Bearings with Pythagoras and trigonometry", "Sine rule, including the ambiguous case", "Cosine rule", "Area of a triangle", "Trigonometry in three dimensions (angle between a line and a plane, simple cases)"] },
      { title: "Transformations and Vectors", topics: ["Reflection", "Rotation", "Translation by a vector", "Enlargement", "Describing a transformation fully, and combined transformations", "Vectors in two dimensions", "Position vectors and the magnitude of a vector", "Vector geometry"] },
      { title: "Probability", topics: ["Probability basics", "Relative frequency and expected frequency from experiments", "Combined events I", "Combined events II", "Combined events III"] },
      { title: "Statistics", topics: ["Types of data and reading statistical tables", "Mean, median and mode; range", "Mean of grouped data (estimated mean), modal class, median class", "Quartiles and interquartile range", "Bar charts, pictograms, pie charts and line graphs", "Stem-and-leaf diagrams", "Scatter diagrams", "Cumulative frequency diagrams", "Histograms"] }
    ]
  },
  {
    id: "oa-p1", code: "A LEVEL • PURE 1", name: "A Level Pure 1", sub: "8 chapters, 37 topics", icon: "📐", grad: "from-sky-400 via-blue-500 to-indigo-700",
    chapters: [
      { title: "Quadratics", topics: ["Solving quadratic equations", "The discriminant and the nature of roots", "Quadratic inequalities", "Simultaneous equations", "Graphs of quadratic functions"] },
      { title: "Functions", topics: ["Functions, domain and range; one-one and many-one", "Composite functions", "Inverse functions and the reflection in the line y = x", "The modulus function"] },
      { title: "Coordinate Geometry", topics: ["Equation of a straight line; gradient, midpoint, length", "Parallel and perpendicular lines; intersection of lines", "Equation of a circle", "Line and circle problems", "Two circles"] },
      { title: "Circular Measure", topics: ["Radian measure", "Arc length and sector area", "Area of a segment and combined shape problems"] },
      { title: "Trigonometry", topics: ["Graphs of sin, cos and tan", "Exact values of special angles", "Basic identities", "Solving trigonometric equations in a given interval"] },
      { title: "Series", topics: ["Binomial theorem for positive integer powers", "Arithmetic progressions", "Geometric progressions", "Proof-style and modelling problems with sequences"] },
      { title: "Differentiation", topics: ["The gradient of a curve and the derivative from first ideas", "Differentiating powers of x, sums and products by a constant", "The chain rule for simple composite functions", "Tangents and normals", "Rates of change and connected rates (basic)", "Stationary points", "Increasing and decreasing functions; optimisation problems"] },
      { title: "Integration", topics: ["Integration as the reverse of differentiation", "Indefinite integrals of powers of x", "Definite integrals", "Area under a curve and between a curve and a line", "Area between two curves"] }
    ]
  },
  {
    id: "oa-p23", code: "A LEVEL • PURE 2 & 3", name: "A Level Pure 2 and 3", sub: "11 chapters, 50 topics", icon: "🧮", grad: "from-cyan-400 via-teal-500 to-emerald-700",
    chapters: [
      { title: "Algebra", topics: ["Modulus equations and inequalities", "Polynomials", "The factor theorem and the remainder theorem", "Division of polynomials"] },
      { title: "Logarithmic and Exponential Functions", topics: ["Laws of logarithms", "The functions e to the x and ln x, and their graphs", "Solving exponential and logarithmic equations, including hidden quadratics", "Change of base and logarithmic modelling of growth and decay"] },
      { title: "Trigonometry (Further)", topics: ["Secant, cosecant and cotangent", "Compound angle formulae (addition formulae)", "Double angle formulae", "The R-form", "Factor formulae (Paper 3) and proving identities", "Solving harder trigonometric equations"] },
      { title: "Differentiation (Further)", topics: ["Differentiating sin, cos, tan, e to the x and ln x", "Product rule and quotient rule", "Implicit differentiation", "Parametric differentiation", "Logarithmic differentiation", "Connected rates of change (further problems)"] },
      { title: "Integration (Further)", topics: ["Standard integrals", "Integration by substitution", "Integration by parts", "Integration using partial fractions", "The trapezium rule for approximate area"] },
      { title: "Numerical Solution of Equations", topics: ["Locating roots by change of sign", "Fixed-point iteration", "Staircase and cobweb diagrams; convergence and divergence"] },
      { title: "Further Algebra (Paper 3 only)", topics: ["Partial fractions", "Partial fractions", "Binomial series for rational powers, and the range of validity"] },
      { title: "Further Calculus (Paper 3 only)", topics: ["Maclaurin series for standard functions", "Maclaurin series of composite and product functions", "Integration problems combining partial fractions, substitution and parts", "Improper integrals (basic cases)"] },
      { title: "Vectors (Paper 3 only)", topics: ["Vectors in three dimensions; the scalar (dot) product and angle between vectors", "Equation of a straight line in 3D", "Equation of a plane", "Intersections", "Distances"] },
      { title: "Differential Equations (Paper 3 only)", topics: ["Forming a differential equation from a real situation", "Solving by separation of variables", "General and particular solutions", "Interpreting solutions; exponential growth and decay models"] },
      { title: "Complex Numbers (Paper 3 only)", topics: ["Imaginary numbers and arithmetic with complex numbers", "The Argand diagram", "Modulus and argument; modulus-argument (polar) form", "Quadratic equations with complex roots; conjugate root pairs", "Square roots of a complex number", "Simple loci and inequalities in the Argand diagram (circles and half-planes)"] }
    ]
  },
  {
    id: "oa-mech", code: "A LEVEL • MECHANICS", name: "A Level Mechanics", sub: "5 chapters, 20 topics", icon: "⚙️", grad: "from-amber-400 via-orange-500 to-red-600",
    chapters: [
      { title: "Forces and Equilibrium", topics: ["Types of force", "Force diagrams and the resultant of coplanar forces", "Resolving forces into components", "Equilibrium of a particle", "Friction"] },
      { title: "Kinematics of Motion in a Straight Line", topics: ["Displacement, velocity and acceleration; graphs of motion", "Constant acceleration formulae (suvat), including vertical motion under gravity", "Velocity-time graphs", "Variable acceleration"] },
      { title: "Momentum", topics: ["Momentum and impulse", "Conservation of linear momentum in collisions", "Direct collisions and Newton's experimental law (coefficient of restitution)"] },
      { title: "Newton's Laws of Motion", topics: ["Newton's laws and F equals ma in one and two dimensions", "Connected particles", "Motion on inclined planes, with and without friction", "Lifts, and systems with several forces"] },
      { title: "Energy, Work and Power", topics: ["Work done by a constant force", "Kinetic energy and gravitational potential energy", "The work-energy principle and conservation of energy problems", "Power, including driving force with constant resistance"] }
    ]
  },
  {
    id: "oa-s1", code: "A LEVEL • P&S 1", name: "A Level Probability and Statistics 1", sub: "5 chapters, 20 topics", icon: "🎲", grad: "from-fuchsia-400 via-pink-500 to-rose-600",
    chapters: [
      { title: "Representation of Data", topics: ["Types of data; organising data, stem-and-leaf diagrams", "Histograms and cumulative frequency graphs", "Box-and-whisker plots and outliers", "Mean, median and mode; quartiles", "Variance and standard deviation (raw and grouped data)", "Comparing two distributions; coding data"] },
      { title: "Permutations and Combinations", topics: ["The multiplication and addition principles of counting", "Permutations", "Combinations"] },
      { title: "Probability", topics: ["Addition and multiplication rules; mutually exclusive and independent events", "Conditional probability", "Tree diagrams, Venn diagrams and two-way tables in problems"] },
      { title: "Discrete Random Variables", topics: ["Probability distributions; expectation E(X) and variance Var(X)", "Expectation and variance of aX plus b", "The binomial distribution", "The geometric distribution"] },
      { title: "The Normal Distribution", topics: ["Properties of the normal curve; standardisation to Z values", "Finding probabilities and using tables / calculator functions", "Finding a value, the mean or the standard deviation from a probability", "Normal approximation to the binomial, with continuity correction"] }
    ]
  },
  {
    id: "oa-s2", code: "A LEVEL • P&S 2", name: "A Level Probability and Statistics 2", sub: "5 chapters, 21 topics", icon: "📊", grad: "from-emerald-400 via-green-500 to-lime-600",
    chapters: [
      { title: "The Poisson Distribution", topics: ["Conditions for a Poisson model; probabilities from the Poisson distribution", "Mean equals variance; addition of independent Poisson variables", "Poisson approximation to the binomial; normal approximation to the Poisson"] },
      { title: "Linear Combinations of Random Variables", topics: ["Expectation and variance of aX plus bY for independent variables", "Linear combinations of normal variables", "Sums of Poisson and normal variables in context problems"] },
      { title: "Continuous Random Variables", topics: ["Probability density functions and their properties", "The cumulative distribution function; median and mode of a continuous distribution", "Expectation and variance from a pdf", "The uniform (rectangular) distribution as the standard example"] },
      { title: "Sampling and Estimation", topics: ["Population and sample; random sampling and bias", "The sampling distribution of the sample mean; the Central Limit Theorem", "Unbiased estimates of the population mean and variance", "Confidence intervals for a population mean", "Confidence intervals for a population proportion (large samples)"] },
      { title: "Hypothesis Tests", topics: ["Hypotheses, test statistic, significance level; one-tail and two-tail tests", "Critical values, critical regions and p-values", "Tests for a population mean (normal distribution and Central Limit Theorem)", "Tests for a population proportion (exact binomial and normal approximation)", "Tests for a Poisson mean", "Type I and Type II errors (ideas and interpretation)"] }
    ]
  }
];
const OA_MODULES = OA_SYLLABUS.map((m) => ({
  id: m.id,
  code: m.code,
  name: m.name,
  sub: m.sub,
  icon: m.icon,
  grad: m.grad,
  chapters: m.chapters.map((c, i) => ({
    id: `${m.id}-${i + 1}`,
    num: `Chapter ${String(i + 1).padStart(2, '0')}`,
    title: c.title,
    eng: `${c.topics.length} topics`,
    icon: m.icon,
    topics: c.topics
  })),
  // Used only for a chapter without its own topic list.
  lectureBlueprint: ['Concepts and worked examples', 'Exam-style practice', 'Past paper questions', 'Revision and self test']
}));


const PART3_ACADEMIC_TRACKS = {
  'HSC English Version': {
    id: 'HSC English Version',
    badge: 'HSC ENGLISH VERSION (NCTB EV)',
    title: 'HSC Higher Mathematics — English Version (1st & 2nd Paper)',
    subtitle: 'Complete English-medium terminology hand notes, step-by-step derivations, recorded lectures, and self-tests.',
    unlockFee: 40,
    modules: [
      {
        id: 'ev-p1',
        code: 'HSC EV 1ST',
        name: 'Higher Math 1st Paper (EV)',
        sub: '10 Sequential Chapters • English Version Hand Notes & Lectures',
        icon: '📘',
        grad: 'from-cyan-400 via-teal-500 to-emerald-600',
        chapters: [
          { id: 'ev1-ch1', num: 'Chapter 01', title: 'Matrices and Determinants', eng: 'Adjoint, Inverse, Rank & System of Linear Equations', icon: '🔢' },
          { id: 'ev1-ch2', num: 'Chapter 02', title: 'Vectors', eng: 'Scalar & Vector Products, Collinearity & Coplanarity', icon: '🧭' },
          { id: 'ev1-ch3', num: 'Chapter 03', title: 'Straight Lines', eng: 'Locus, Angle Bisectors & Family of Lines', icon: '📏' },
          { id: 'ev1-ch4', num: 'Chapter 04', title: 'The Circle', eng: 'Tangents, Normals, Radical Axis & Coaxial Circles', icon: '⭕' },
          { id: 'ev1-ch5', num: 'Chapter 05', title: 'Permutations & Combinations', eng: 'Restricted Arrangements, Cyclic Permutations & Partitions', icon: '🎲' },
          { id: 'ev1-ch6', num: 'Chapter 06', title: 'Trigonometric Ratios', eng: 'Radian Measure, Allied Angles & Identities', icon: '📐' },
          { id: 'ev1-ch7', num: 'Chapter 07', title: 'Trigonometric Ratios of Associated & Compound Angles', eng: 'Multiple, Sub-multiple & Transformation Formulas', icon: '📊' },
          { id: 'ev1-ch8', num: 'Chapter 08', title: 'Functions and Graphs of Functions', eng: 'Domain, Range, Bijective & Inverse Functions', icon: '📈' },
          { id: 'ev1-ch9', num: 'Chapter 09', title: 'Differentiation', eng: 'Limits, Continuity, Chain Rule, Maclaurin Series & Extrema', icon: '⚡' },
          { id: 'ev1-ch10', num: 'Chapter 10', title: 'Integration', eng: 'Substitution, By Parts, Partial Fractions & Definite Area', icon: '∫' }
        ],
        lectureBlueprint: [
          'Core Definitions, Theorems & Geometrical Interpretations (English Version)',
          'Type-1 & Type-2: NCTB Textbook & Board Creative Questions (CQ)',
          'Type-3 & Type-4: Advanced Analytical Problems & Proofs',
          'Graphical Analysis, Tangents & Real-World Applications',
          'Past 10 Years Dhaka & Combined Board Archive Solutions',
          'Scientific Calculator Hacks & 30-Second MCQ Strategies',
          'BUET, IUT & Engineering Admission Bridge Problems',
          'Chapter Master Summary, Formula Cheat-Sheet & Final Assessment'
        ]
      },
      {
        id: 'ev-p2',
        code: 'HSC EV 2ND',
        name: 'Higher Math 2nd Paper (EV)',
        sub: '10 Sequential Chapters • English Version Hand Notes & Lectures',
        icon: '📗',
        grad: 'from-sky-400 via-blue-500 to-indigo-600',
        chapters: [
          { id: 'ev2-ch1', num: 'Chapter 01', title: 'Real Numbers and Inequalities', eng: 'Absolute Value, Order Axioms & Rational Inequalities', icon: '♾️' },
          { id: 'ev2-ch2', num: 'Chapter 02', title: 'Linear Programming', eng: 'Feasible Region, Convex Sets & Objective Optimization', icon: '📉' },
          { id: 'ev2-ch3', num: 'Chapter 03', title: 'Complex Numbers', eng: 'Argand Diagram, De Moivre’s Theorem & nth Roots of Unity', icon: '🌀' },
          { id: 'ev2-ch4', num: 'Chapter 04', title: 'Polynomials and Polynomial Equations', eng: 'Vieta’s Formulas, Symmetric Roots & Synthetic Division', icon: '🧮' },
          { id: 'ev2-ch5', num: 'Chapter 05', title: 'Binomial Theorem', eng: 'General Term, Middle Term & Rational Index Series', icon: '🔺' },
          { id: 'ev2-ch6', num: 'Chapter 06', title: 'Conic Sections', eng: 'Parabola, Ellipse, Hyperbola, Eccentricity & Focal Chords', icon: '🪐' },
          { id: 'ev2-ch7', num: 'Chapter 07', title: 'Inverse Trigonometric Functions & Trig Equations', eng: 'Principal Values, General Solutions & Triangle Properties', icon: '🔄' },
          { id: 'ev2-ch8', num: 'Chapter 08', title: 'Statics', eng: 'Lami’s Theorem, Parallel Forces, Moments & Couples', icon: '⚖️' },
          { id: 'ev2-ch9', num: 'Chapter 09', title: 'Motion of Particles in a Plane (Dynamics)', eng: 'Relative Velocity, Projectiles & Variable Acceleration', icon: '🚀' },
          { id: 'ev2-ch10', num: 'Chapter 10', title: 'Measures of Dispersion & Probability', eng: 'Variance, Standard Deviation, Bayes’ Theorem & Conditional Prob', icon: '🎯' }
        ],
        lectureBlueprint: [
          'Axiomatic Foundations & Proof of Theorems (English Version)',
          'Type-1 & Type-2: Board Standard Structured Questions (CQ)',
          'Type-3 & Type-4: High-Order Thinking & Olympiad-Style Problems',
          'Coordinate / Vector Visualization & Physical Modeling',
          'Past 10 Years Board Archive Solutions (English Version)',
          'Fast MCQ Elimination & Calculator Matrix/Equation Mode Hacks',
          'Engineering & IUT Admission Special Problem Set',
          'Complete Revision, Common Mistakes & Mock Test'
        ]
      }
    ]
  },
  'O-Level & A-Level': {
    id: 'O-Level & A-Level',
    badge: 'CAMBRIDGE O LEVEL (4024) & A LEVEL (9709)',
    title: 'O Level & A Level Mathematics — Chapters and Topics',
    subtitle: 'Cambridge O Level (4024) and A Level (9709): Pure 1, Pure 2 and 3, Mechanics, Probability and Statistics 1 and 2.',
    unlockFee: 50,
    modules: OA_MODULES
  },
  'Admission Test (BUET/DU)': {
    id: 'Admission Test (BUET/DU)',
    badge: 'ঢাবি, জাবি, চবি, রাবি, গুচ্ছ, শাবিপ্রবি ও অন্যান্য',
    title: 'ভর্তি পরীক্ষার প্রস্তুতি — বিশ্ববিদ্যালয়ভিত্তিক গণিত',
    subtitle: 'প্রতিটি বিশ্ববিদ্যালয়ের জন্য অধ্যায় ভিত্তিক ক্লাস ও মডেল টেস্ট।',
    unlockFee: 40,
    modules: ADMISSION_MODULES
  },
  'Job Math': {
    id: 'Job Math',
    badge: 'JOB MATH • BCS PRELIMINARY SYLLABUS',
    title: 'JOB MATH — BCS Preliminary: গাণিতিক যুক্তি, মানসিক দক্ষতা ও মডেল টেস্ট',
    subtitle: 'BCS প্রিলিমিনারি সিলেবাস অনুযায়ী প্রস্তুতি: গাণিতিক যুক্তি (পাটিগণিত, বীজগণিত, জ্যামিতি ও পরিমিতি, ত্রিকোণমিতি ও অন্যান্য), মানসিক দক্ষতা এবং মডেল টেস্ট ও প্রশ্নব্যাংক। দ্রুত সমাধানের কৌশলসহ ধাপে ধাপে লেকচার।',
    unlockFee: 30,
    modules: [
      {
        id: 'job-logic',
        code: 'JOB • MATH LOGIC',
        name: 'গাণিতিক যুক্তি (Mathematical Reasoning)',
        sub: 'পাটিগণিত, বীজগাণিতিক যুক্তি, জ্যামিতি ও পরিমিতি, ত্রিকোণমিতি ও অন্যান্য',
        icon: '🧮',
        grad: 'from-lime-400 via-green-500 to-emerald-600',
        chapters: [
          { id: 'job-gl-1', num: 'পাটিগণিত ১', title: 'বাস্তব সংখ্যা', eng: 'Real Numbers', icon: '🔢', group: 'পাটিগণিত (Arithmetic)', img: 'arith-1' },
          { id: 'job-gl-2', num: 'পাটিগণিত ২', title: 'ল.সা.গু ও গ.সা.গু', eng: 'LCM & GCD', icon: '➗', group: 'পাটিগণিত (Arithmetic)', img: 'arith-2' },
          { id: 'job-gl-3', num: 'পাটিগণিত ৩', title: 'ঐকিক নিয়ম, গড়, শতকরা', eng: 'Unitary Method, Average & Percentage', icon: '📊', group: 'পাটিগণিত (Arithmetic)', img: 'arith-3' },
          { id: 'job-gl-4', num: 'পাটিগণিত ৪', title: 'সরল ও যৌগিক মুনাফা', eng: 'Simple and Compound Interest', icon: '💰', group: 'পাটিগণিত (Arithmetic)', img: 'arith-4' },
          { id: 'job-gl-5', num: 'পাটিগণিত ৫', title: 'অনুপাত ও সমানুপাত', eng: 'Ratio and Proportion', icon: '⚖️', group: 'পাটিগণিত (Arithmetic)', img: 'arith-5' },
          { id: 'job-gl-6', num: 'পাটিগণিত ৬', title: 'লাভ ও ক্ষতি', eng: 'Profit and Loss', icon: '📈', group: 'পাটিগণিত (Arithmetic)', img: 'arith-6' },
          { id: 'job-gl-7', num: 'বীজগণিত ১', title: 'বীজগাণিতিক সূত্রাবলি', eng: 'Algebraic Formulas', icon: '🔣', group: 'বীজগাণিতিক যুক্তি (Algebra)', img: 'alg-1' },
          { id: 'job-gl-8', num: 'বীজগণিত ২', title: 'বহুপদী উৎপাদক', eng: 'Factorization of Polynomials', icon: '🧩', group: 'বীজগাণিতিক যুক্তি (Algebra)', img: 'alg-2' },
          { id: 'job-gl-9', num: 'বীজগণিত ৩', title: 'সরল ও দ্বিঘাত সমীকরণ এবং অসমতা', eng: 'Linear and Quadratic Equations and Inequalities', icon: '🟰', group: 'বীজগাণিতিক যুক্তি (Algebra)', img: 'alg-3' },
          { id: 'job-gl-10', num: 'বীজগণিত ৪', title: 'সরল সহসমীকরণ', eng: 'Systems of Linear Equations', icon: '🔗', group: 'বীজগাণিতিক যুক্তি (Algebra)', img: 'alg-4' },
          { id: 'job-gl-11', num: 'বীজগণিত ৫', title: 'সূচক ও লগারিদম', eng: 'Exponents and Logarithms', icon: '✖️', group: 'বীজগাণিতিক যুক্তি (Algebra)', img: 'alg-5' },
          { id: 'job-gl-12', num: 'বীজগণিত ৬', title: 'সমান্তর ও গুণোত্তর অনুক্রম ও ধারা', eng: 'Arithmetic and Geometric Sequences and Series', icon: '🪜', group: 'বীজগাণিতিক যুক্তি (Algebra)', img: 'alg-6' },
          { id: 'job-gl-13', num: 'জ্যামিতি ১', title: 'রেখা, কোণ, ত্রিভুজ ও চতুর্ভুজ সংক্রান্ত উপপাদ্য', eng: 'Theorems on Lines, Angles, Triangles and Quadrilaterals', icon: '📐', group: 'জ্যামিতি ও পরিমিতি (Geometry & Mensuration)', img: 'geo-1' },
          { id: 'job-gl-14', num: 'জ্যামিতি ২', title: 'পিথাগোরাসের উপপাদ্য ও বৃত্ত সংক্রান্ত উপপাদ্য', eng: 'Pythagoras Theorem and Circle Theorems', icon: '⭕', group: 'জ্যামিতি ও পরিমিতি (Geometry & Mensuration)', img: 'geo-2' },
          { id: 'job-gl-15', num: 'জ্যামিতি ৩', title: 'ক্ষেত্রফল সম্পর্কিত উপপাদ্য ও পরিমিতি', eng: 'Area Theorems and Mensuration', icon: '📏', group: 'জ্যামিতি ও পরিমিতি (Geometry & Mensuration)', img: 'geo-3' },
          { id: 'job-gl-16', num: 'অন্যান্য ১', title: 'ত্রিকোণমিতিক অনুপাত ও দূরত্ব-উচ্চতা', eng: 'Trigonometric Ratios, Distance and Height', icon: '🗼', group: 'ত্রিকোণমিতি ও অন্যান্য', img: 'oth-1' },
          { id: 'job-gl-17', num: 'অন্যান্য ২', title: 'সেট তত্ত্ব ও ভেনচিত্র', eng: 'Set Theory & Venn Diagram', icon: '🔵', group: 'ত্রিকোণমিতি ও অন্যান্য', img: 'oth-2' },
          { id: 'job-gl-18', num: 'অন্যান্য ৩', title: 'বিন্যাস ও সমাবেশ', eng: 'Permutations and Combinations', icon: '🎲', group: 'ত্রিকোণমিতি ও অন্যান্য', img: 'oth-3' },
          { id: 'job-gl-19', num: 'অন্যান্য ৪', title: 'সম্ভাবনা', eng: 'Probability', icon: '🎯', group: 'ত্রিকোণমিতি ও অন্যান্য', img: 'oth-4' }
        ],
        lectureBlueprint: [
          'মৌলিক ধারণা ও সূত্র (শূন্য থেকে শুরু)',
          'সাধারণ ও মাঝারি মানের অঙ্ক সমাধান',
          'শর্টকাট কৌশল ও ক্যালকুলেটর ছাড়া দ্রুত সমাধান',
          'বিগত বছরের BCS, ব্যাংক ও শিক্ষক নিয়োগ প্রশ্ন সমাধান',
          'টাইমড মডেল টেস্ট ও ভুল বিশ্লেষণ'
        ]
      },
      {
        id: 'job-mental',
        code: 'JOB • MENTAL ABILITY',
        name: 'মানসিক দক্ষতা (Mental Ability)',
        sub: 'ভাষাগত যৌক্তিক বিচার, সমস্যা সমাধান, বানান ও ভাষা, যান্ত্রিক দক্ষতা, স্থানাঙ্ক সম্পর্ক, সংখ্যাগত ক্ষমতা',
        icon: '🧠',
        grad: 'from-fuchsia-400 via-purple-500 to-violet-600',
        chapters: [
          { id: 'job-me-1', num: 'ক্ষমতা ১', title: 'ভাষাগত যৌক্তিক বিচার', eng: 'Verbal Reasoning', icon: '🗣️', img: 'mental-1' },
          { id: 'job-me-2', num: 'ক্ষমতা ২', title: 'সমস্যা সমাধান', eng: 'Problem Solving', icon: '🧩', img: 'mental-2' },
          { id: 'job-me-3', num: 'ক্ষমতা ৩', title: 'বানান ও ভাষা', eng: 'Spelling and Language', icon: '✍️', img: 'mental-3' },
          { id: 'job-me-4', num: 'ক্ষমতা ৪', title: 'যান্ত্রিক দক্ষতা', eng: 'Mechanical Reasoning', icon: '⚙️', img: 'mental-4' },
          { id: 'job-me-5', num: 'ক্ষমতা ৫', title: 'স্থানাঙ্ক সম্পর্ক', eng: 'Space Relation', icon: '🧭', img: 'mental-5' },
          { id: 'job-me-6', num: 'ক্ষমতা ৬', title: 'সংখ্যাগত ক্ষমতা', eng: 'Numerical Ability', icon: '🔢', img: 'mental-6' }
        ],
        lectureBlueprint: [
          'ধরন চেনা ও মূল কৌশল',
          'সাধারণ ও মাঝারি মানের সমস্যা সমাধান',
          'দ্রুত সমাধানের কৌশল',
          'বিগত বছরের প্রশ্ন সমাধান',
          'টাইমড মডেল টেস্ট'
        ]
      },
      {
        id: 'job-model',
        code: 'JOB • MODEL TEST',
        name: 'মডেল টেস্ট ও প্রশ্নব্যাংক (Model Tests & Question Bank)',
        sub: 'BCS প্রিলিমিনারির গাণিতিক যুক্তি ও মানসিক দক্ষতার মডেল টেস্ট এবং বিগত বছরের প্রশ্নব্যাংক',
        icon: '📝',
        grad: 'from-amber-400 via-orange-500 to-red-600',
        chapters: [
          { id: 'job-mt-1', num: 'মডেল টেস্ট ১', title: 'গাণিতিক যুক্তি — মডেল টেস্ট', eng: 'Mathematical Reasoning Model Tests', icon: '🧮' },
          { id: 'job-mt-2', num: 'মডেল টেস্ট ২', title: 'মানসিক দক্ষতা — মডেল টেস্ট', eng: 'Mental Ability Model Tests', icon: '🧠' },
          { id: 'job-mt-3', num: 'মডেল টেস্ট ৩', title: 'BCS প্রিলিমিনারি পূর্ণাঙ্গ মডেল টেস্ট', eng: 'Full-length BCS Preliminary Model Tests', icon: '🏛️' },
          { id: 'job-mt-4', num: 'প্রশ্নব্যাংক', title: 'বিগত বছরের BCS প্রিলিমিনারি প্রশ্নব্যাংক', eng: 'Previous Years BCS Preliminary Question Bank', icon: '📚' }
        ],
        lectureBlueprint: [
          'পরীক্ষার ধরন, সময় ব্যবস্থাপনা ও প্রস্তুতির কৌশল',
          'মডেল টেস্ট সমাধান — পর্ব ১',
          'মডেল টেস্ট সমাধান — পর্ব ২',
          'ভুল বিশ্লেষণ ও চূড়ান্ত রিভিশন'
        ]
      }
    ]
  },
  'B.Sc. Honours Math': {
    id: 'B.Sc. Honours Math',
    badge: 'B.SC. (HONOURS) IN MATHEMATICS — YEARWISE COURSES',
    title: 'B.Sc. (Honours) in Mathematics — ১ম থেকে ৪র্থ বর্ষের কোর্স',
    subtitle: 'উপপাদ্যের প্রমাণ, লেকচার নোট ও সমাধানসহ ১ম, ২য়, ৩য় ও ৪র্থ বর্ষের সব কোর্স।',
    unlockFee: 50,
    modules: HONOURS_MODULES
  }
};

const CV_BOOK_COVERS = [
  { grad: 'from-slate-700 via-slate-800 to-slate-950', icon: '🧭', series: 'LAP LAMBERT • Germany' },
  { grad: 'from-sky-600 via-blue-700 to-indigo-900', icon: '💻', series: 'LAP LAMBERT • Germany' },
  { grad: 'from-amber-400 via-orange-500 to-red-600', icon: '🔥', series: 'Textbook • Bangladesh' }
];

const courseBookToShop = (item) => {
  const [series, title] = item.bookTitle.includes(': ')
    ? item.bookTitle.split(': ')
    : ['', item.bookTitle];
  return {
    key: item.id,
    series,
    title,
    author: item.author,
    grad: item.grad,
    icon: item.icon,
    badge: item.badge,
    price: item.bookPriceBdt,
    meta: item.chaptersIncluded,
    image: item.bookImage || ''
  };
};

const CV_SHOP_BOOKS = CV_CREDENTIALS.books.map((b, i) => ({
  key: `cv-book-${i}`,
  series: CV_BOOK_COVERS[i].series,
  title: b.title,
  author: CV_CREDENTIALS.fullName,
  grad: CV_BOOK_COVERS[i].grad,
  icon: CV_BOOK_COVERS[i].icon,
  badge: b.type.includes('International') ? 'International' : 'Textbook',
  price: null,
  meta: b.isbn
}));

// ---- The book shelf can be edited on the admin page (sheet 'books'): built-in books can be
// re-priced, renamed or hidden, and new books can be added.
const BOOK_GRADS = [
  'from-amber-400 via-orange-500 to-red-600',
  'from-violet-400 via-purple-500 to-indigo-700',
  'from-sky-600 via-blue-700 to-indigo-900',
  'from-slate-700 via-slate-800 to-slate-950',
  'from-emerald-400 via-teal-500 to-cyan-700',
  'from-rose-400 via-pink-500 to-fuchsia-700',
  'from-lime-400 via-green-500 to-emerald-700',
  'from-yellow-300 via-amber-500 to-orange-700'
];
const bookPriceText = (n) => `৳ ${Number(n).toLocaleString('bn-BD', { useGrouping: false })}`;
const COURSE_BOOK_ORIGINAL = SPECIAL_COURSES_WITH_BOOKS.map((c) => ({ bookTitle: c.bookTitle, bookPriceBdt: c.bookPriceBdt, badge: c.badge, author: c.author }));
let bookRows = {};
let customBookRows = [];
const applyBooks = (list) => {
  const rows = Array.isArray(list) ? list : [];
  bookRows = Object.fromEntries(rows.map((r) => [r.key, r]));
  SPECIAL_COURSES_WITH_BOOKS.forEach((c, i) => {
    const o = COURSE_BOOK_ORIGINAL[i];
    const r = bookRows[c.id];
    c.bookTitle = (r && r.title) || o.bookTitle;
    c.bookPriceBdt = r && r.price > 0 ? bookPriceText(r.price) : o.bookPriceBdt;
    c.badge = (r && r.badge) || o.badge;
    c.author = (r && r.author) || o.author;
    c.bookImage = (r && r.image) || '';
  });
  const builtIn = new Set([...SPECIAL_COURSES_WITH_BOOKS.map((c) => c.id), ...CV_SHOP_BOOKS.map((b) => b.key)]);
  customBookRows = rows.filter((r) => !builtIn.has(r.key));
};
const bookHidden = (key) => !!(bookRows[key] && bookRows[key].status === 'hidden');
const visibleCourseBooks = () => SPECIAL_COURSES_WITH_BOOKS.filter((c) => !bookHidden(c.id));
const rowToShopBook = (r, base = {}) => ({
  key: r.key,
  series: r.series !== undefined && r.series !== '' ? r.series : base.series || '',
  title: r.title || base.title || '',
  author: r.author || base.author || CV_CREDENTIALS.fullName,
  grad: BOOK_GRADS[r.cover] || base.grad || BOOK_GRADS[0],
  icon: r.icon || base.icon || '📖',
  badge: r.badge || base.badge || '',
  price: r.price > 0 ? bookPriceText(r.price) : base.price || null,
  meta: r.meta || base.meta || '',
  image: r.image || ''
});
// Published books shelf: the built-in ones (with admin changes) followed by books added on the admin page.
const shopBooks = () => [
  ...CV_SHOP_BOOKS.filter((b) => !bookHidden(b.key)).map((b) => (bookRows[b.key] ? rowToShopBook(bookRows[b.key], b) : b)),
  ...customBookRows.filter((r) => r.status !== 'hidden' && r.title).map((r) => rowToShopBook(r))
];

const bookOrderHref = (book) =>
  `mailto:${CV_CREDENTIALS.email}?subject=${encodeURIComponent(
    `বই অর্ডার: ${book.series ? `${book.series}: ` : ''}${book.title}`
  )}`;

// The printed copies are sold out for now; the PDF copy can be ordered. Set to true when stock returns.
const BOOK_HARDCOPY_IN_STOCK = false;
const BOOK_ORDER_LABEL = BOOK_HARDCOPY_IN_STOCK ? 'অর্ডার করুন' : 'PDF কপি নিন';

function BookStockNote({ light = false, className = '' }) {
  if (BOOK_HARDCOPY_IN_STOCK) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${light ? 'bg-rose-100 text-rose-700' : 'bg-rose-500/15 text-rose-300'}`}>
        হার্ডকপি: স্টক আউট
      </span>
      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${light ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/15 text-emerald-300'}`}>
        এখন শুধু PDF কপি পাওয়া যাচ্ছে
      </span>
    </div>
  );
}

// Opens the book order form (rendered once by App); books without a price keep the e-mail link.
const bookOrderListeners = new Set();
const openBookOrder = (book) => bookOrderListeners.forEach((fn) => fn(book));

function BookCover({ book, large = false }) {
  return (
    <div className="relative aspect-[3/4] w-full [perspective:900px]">
      <div
        className={`relative h-full w-full origin-left rounded-l-[4px] rounded-r-xl bg-gradient-to-br ${book.grad} overflow-hidden shadow-[8px_10px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:[transform:rotateY(-10deg)]`}
      >
        {book.image ? (
          <>
            <img src={book.image} alt={book.title} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" draggable="false" />
            <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
            <div className="absolute inset-y-0 left-3.5 w-px bg-white/25" />
          </>
        ) : (
          <>
            <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
            <div className="absolute inset-y-0 left-3.5 w-px bg-white/30" />
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15" />
            <div className="absolute -left-6 bottom-10 h-20 w-20 rounded-full bg-black/10" />
            <div className={`absolute inset-0 flex flex-col justify-between text-white ${large ? 'p-5 pl-8' : 'p-3 pl-6'}`}>
              <div>
                {book.series && (
                  <div className={`font-bold uppercase text-white/85 line-clamp-1 ${large ? 'text-xs tracking-[0.14em]' : 'text-[8px] tracking-[0.06em]'}`}>
                    {book.series}
                  </div>
                )}
                <div className="mt-1.5 h-0.5 w-8 rounded bg-white/70" />
              </div>
              <div className={`drop-shadow-lg ${large ? 'text-6xl' : 'text-4xl'}`}>{book.icon}</div>
              <div>
                <div className={`font-black leading-tight drop-shadow line-clamp-3 ${large ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base'}`}>
                  {book.title}
                </div>
                <div className={`mt-1 font-semibold text-white/90 ${large ? 'text-sm' : 'text-[10px]'}`}>{book.author}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BookShopCard({ book, onDetails, light = false }) {
  return (
    <div
      className={`group flex flex-col rounded-2xl border p-3 transition sm:p-4 ${
        light
          ? 'border-[#e3e6ee] bg-white hover:border-[#c8d3ea] hover:shadow-[0_14px_30px_-18px_rgba(20,33,61,0.35)]'
          : 'border-slate-800 bg-slate-900/70 hover:border-amber-400/60 hover:bg-slate-900'
      }`}
    >
      <button type="button" onClick={onDetails || undefined} className="block w-full px-2 pb-4 pt-1">
        <BookCover book={book} />
      </button>
      <div className="flex-1 space-y-1">
        {book.badge && (
          <span className="inline-block rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
            {book.badge}
          </span>
        )}
        <div className={`text-sm font-extrabold leading-snug line-clamp-2 ${light ? 'text-[#14213d]' : 'text-white'}`}>
          {book.title}
        </div>
        <div className={`text-[11px] ${light ? 'text-[#5b6882]' : 'text-slate-400'}`}>লেখক: {book.author}</div>
        {book.meta && <div className={`text-[10px] line-clamp-1 ${light ? 'text-[#8a94a8]' : 'text-slate-500'}`}>{book.meta}</div>}
      </div>
      <div className="pt-2.5">
        {book.price ? (
          <>
            <span className={`text-lg font-black ${light ? 'text-[#b45309]' : 'text-amber-300'}`}>{book.price}</span>
            <BookStockNote light={light} className="mt-1" />
          </>
        ) : (
          <span className={`text-[11px] font-semibold ${light ? 'text-[#2c7353]' : 'text-teal-300'}`}>{book.series}</span>
        )}
      </div>
      <div className={`grid gap-2 pt-2.5 ${onDetails ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {onDetails && (
          <button
            type="button"
            onClick={onDetails}
            className={`rounded-xl py-2 text-xs font-bold transition ${
              light ? 'bg-[#eef1f6] text-[#14213d] hover:bg-[#e2e7f0]' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            বিস্তারিত
          </button>
        )}
        {book.price ? (
          <button
            type="button"
            onClick={() => openBookOrder(book)}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-2 text-center text-xs font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-orange-400"
          >
            {BOOK_ORDER_LABEL}
          </button>
        ) : (
          <a
            href={bookOrderHref(book)}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-2 text-center text-xs font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-orange-400"
          >
            অর্ডার করুন
          </a>
        )}
      </div>
    </div>
  );
}

// Short poster label from a module code, e.g. 'COURSE 03 • LINEAR ALGEBRA' -> 'LINEAR ALGEBRA'.
const shortTag = (code = '') => {
  const parts = code.split(' • ');
  return /^COURSE \d+$/.test(parts[0]) && parts[1] ? parts[1] : parts[0];
};

// Poster-style course card (like a course thumbnail): a big artwork panel with a bold label and
// Emran's photo (person) or a large emoji, then just a title and one short line underneath.
function PremiumCard({ grad, icon, code, bigTag, poster, title, sub, chips = [], price, onClick, selected = false, person = false }) {
  const posterText = poster || bigTag;
  // Shrink long labels so Bangla words never break mid-word.
  const posterLen = posterText ? posterText.length : 0;
  const posterSize =
    posterLen <= 6 ? 'text-xl sm:text-3xl' : posterLen <= 11 ? 'text-base sm:text-2xl' : 'text-sm sm:text-lg';
  const meta = [price, ...chips].filter(Boolean).join(' • ') || sub;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className="group relative h-full cursor-pointer select-none rounded-[24px] p-[1.5px] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      <div
        className={`absolute inset-0 rounded-[24px] bg-gradient-to-b transition-colors duration-300 ${
          selected
            ? 'from-amber-300 via-orange-500 to-rose-600'
            : 'from-white/20 via-white/[0.06] to-white/15 group-hover:from-amber-300 group-hover:via-orange-500/80 group-hover:to-rose-600'
        }`}
      />
      <div className="relative flex h-full flex-col rounded-[23px] bg-[#0d1018] p-2 shadow-[inset_0_-14px_26px_-14px_rgba(249,115,22,0.22)] sm:p-2.5">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[17px] bg-gradient-to-br ${grad}`}>
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="absolute -left-6 -bottom-8 h-24 w-24 rounded-full bg-black/10" />
          <div className="absolute -right-5 -top-7 h-24 w-24 rounded-full bg-white/15" />
          {person ? (
            <img
              src={ABOUT_PORTRAIT}
              alt=""
              loading="lazy"
              className="absolute -right-3 bottom-0 h-[94%] w-auto max-w-none origin-bottom drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="absolute bottom-1 right-2 text-5xl drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:text-6xl">
              {icon}
            </span>
          )}
          {code && (
            <span className="absolute left-2 top-2 max-w-[70%] truncate rounded-full bg-black/25 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/25 sm:text-[10px]">
              {code}
            </span>
          )}
          {posterText && (
            <span
              className={`absolute bottom-2 left-2.5 ${person ? 'max-w-[60%]' : 'max-w-[70%]'} ${posterSize} line-clamp-3 font-black uppercase leading-[1.1] tracking-tight text-white [text-shadow:0_2px_0_rgba(0,0,0,0.28),0_6px_14px_rgba(0,0,0,0.25)]`}
            >
              {posterText}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-1 pb-1 pt-2.5 text-center">
          <h4 className="text-[13px] font-extrabold leading-snug text-white line-clamp-2 sm:text-[15px]">{title}</h4>
          {meta && <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1 sm:text-xs">{meta}</p>}
        </div>
      </div>
    </div>
  );
}

// App-icon style program tile for the six main programs.
// A home-page program card drawn as one picture (assets/cards/<name>.webp); the words are part of the picture.
function ImageTile({ src, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group block w-full rounded-[28px] transition duration-300 hover:-translate-y-1.5 hover:drop-shadow-[0_14px_22px_rgba(99,102,241,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      <img src={src} alt={label} loading="lazy" className="block h-auto w-full select-none" draggable="false" />
    </button>
  );
}

// ---------------------------------------------------------------- About Me (light editorial design)
const ABOUT_PORTRAIT = '/assets/emran-portrait.webp';

const ABOUT_ROLES = [
  {
    key: 'teacher',
    title: 'Teacher',
    tagline: 'INSPIRE • GUIDE • EMPOWER',
    text: 'I teach mathematics at different levels — from HSC to O/A Level, admission tests and university courses. My goal is to build strong conceptual understanding and problem-solving skills, not just exam results.',
    cta: 'Explore Teaching',
    Icon: GraduationCap,
    iconBg: 'bg-[#4f7fd1]',
    accent: 'text-[#2f5fb3]',
    cardBg: 'from-[#eef3fc] to-[#f7f9fe]',
    border: 'border-[#dbe5f7]'
  },
  {
    key: 'researcher',
    title: 'Researcher',
    tagline: 'EXPLORE • ANALYZE • CONTRIBUTE',
    text: 'I work on optimization, computational mathematics and scientific machine learning — including leakage-controlled ML for earthquake precursor detection. I believe in rigorous methods, real-world relevance and open knowledge.',
    cta: 'Explore Research',
    Icon: Microscope,
    iconBg: 'bg-[#3f8a68]',
    accent: 'text-[#2c7353]',
    cardBg: 'from-[#edf6f1] to-[#f7fbf8]',
    border: 'border-[#d6eadf]'
  },
  {
    key: 'author',
    title: 'Author',
    tagline: 'WRITE • SHARE • MAKE AN IMPACT',
    text: 'I write to simplify complex ideas, turn research into useful knowledge, and create educational content for students and curious minds. Books, articles and teaching materials are part of my journey.',
    cta: 'Explore My Books',
    Icon: BookOpen,
    iconBg: 'bg-[#7a5cc7]',
    accent: 'text-[#5d41a8]',
    cardBg: 'from-[#f2eefb] to-[#f9f7fd]',
    border: 'border-[#e3dbf5]'
  }
];

const ABOUT_FACTS = [
  { Icon: GraduationCap, label: 'Education', value: 'M.Sc. & B.Sc. (Hons) in Mathematics, Jahangirnagar University' },
  { Icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
  { Icon: BookOpen, label: 'Languages', value: 'Bangla, English' },
  { Icon: Sparkles, label: 'Interests', value: 'Math, Research, Books, Technology, Nature, Learning' }
];

function ScriptUnderline({ className = '' }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" aria-hidden="true">
      <path d="M2 9 C 30 3, 70 2, 118 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Layered mountains at dusk with the four verbs across the top.
function AboutMountainBanner() {
  return (
    <div className="relative h-36 sm:h-44 overflow-hidden">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="about-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9e6f1" />
            <stop offset="55%" stopColor="#f3d9c9" />
            <stop offset="100%" stopColor="#f0c9b4" />
          </linearGradient>
        </defs>
        <rect width="1440" height="200" fill="url(#about-sky)" />
        <path d="M0 120 L120 95 L240 115 L380 80 L520 110 L660 85 L820 112 L980 78 L1130 104 L1280 88 L1440 108 L1440 200 L0 200 Z" fill="#a9b3cc" opacity="0.55" />
        <path d="M0 145 L150 118 L300 140 L460 108 L620 138 L780 112 L940 142 L1100 115 L1260 138 L1440 120 L1440 200 L0 200 Z" fill="#7f8bab" opacity="0.7" />
        <path d="M0 170 L180 148 L360 168 L540 140 L720 166 L900 146 L1080 170 L1260 150 L1440 168 L1440 200 L0 200 Z" fill="#56627f" />
      </svg>
      <div className="relative flex items-start justify-center pt-6 sm:pt-8">
        <div className="flex items-center gap-3 sm:gap-5 px-4 text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#34405c]">
          <span className="hidden sm:block h-px w-16 bg-[#34405c]/40" />
          <span>TEACH</span><span className="opacity-50">/</span>
          <span>RESEARCH</span><span className="opacity-50">/</span>
          <span>WRITE</span><span className="opacity-50">/</span>
          <span className="whitespace-nowrap">MAKE AN IMPACT</span>
          <span className="hidden sm:block h-px w-16 bg-[#34405c]/40" />
        </div>
      </div>
    </div>
  );
}

function AboutPage({ onOpenRole, onOpenCv }) {
  return (
    <section className="bg-[#fbfaf7] text-[#1d2a44]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f7f4ee] via-[#f5f2ec] to-[#eef2ee]">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#dfe9e2] opacity-60 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-end gap-8 px-5 pt-10 sm:px-8 md:grid-cols-12 md:pt-14">
          <div className="md:col-span-6 space-y-5 pb-10 md:pb-16">
            <div className="text-xs font-semibold tracking-[0.35em] text-[#3d63a8]">ABOUT ME</div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[#14213d] sm:text-5xl">
              Hi, I’m Emran Islam
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-[#4a5875] sm:text-xl">
              <span>Teacher</span><span className="text-[#9aa5bb]">•</span>
              <span>Researcher</span><span className="text-[#9aa5bb]">•</span>
              <span>Author</span>
            </div>
            <p className="max-w-xl text-[15px] leading-relaxed text-[#33405a]">
              I am a passionate educator, researcher and writer, dedicated to making mathematics more
              accessible, meaningful and useful in the real world. I teach at Hamdard Public College,
              Dhaka, and through teaching, research and writing I aim to contribute to a better
              understanding of mathematics and its role in solving important problems.
            </p>
            <div className="pt-1 text-[#1d2a44]">
              <div className="font-script text-3xl leading-none">Emran Islam</div>
              <ScriptUnderline className="mt-1 h-3 w-28 text-[#1d2a44]" />
            </div>
            <button
              type="button"
              onClick={onOpenCv}
              className="inline-flex items-center gap-2 rounded-xl bg-[#14213d] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1f3159]"
            >
              <FileText className="h-4 w-4" /> Full Academic CV
            </button>
          </div>

          <div className="relative md:col-span-6 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute inset-x-6 bottom-0 top-10 rounded-t-full bg-gradient-to-b from-[#c9ddd1] to-[#a9c8b6]" />
              <div className="absolute inset-x-1 bottom-0 top-4 rounded-t-full border border-[#9dbfab]/70" />
              <div className="absolute -inset-x-3 bottom-0 top-0 rounded-t-full border border-[#9dbfab]/40" />
              <img
                src={ABOUT_PORTRAIT}
                alt="Emran Islam"
                className="relative z-10 mx-auto block w-[88%] select-none"
                draggable="false"
              />
              <div className="absolute bottom-0 inset-x-0 z-20 h-10 bg-gradient-to-t from-[#f5f2ec] to-transparent" />
              <div className="absolute -right-1 top-6 z-20 hidden max-w-[150px] rotate-[-4deg] font-script text-2xl leading-snug text-[#2c7353] sm:block md:-right-6">
                “Better Questions Lead to Deeper Understanding”
                <ScriptUnderline className="mt-1 h-3 w-24 text-[#2c7353]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROLE CARDS */}
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ABOUT_ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => onOpenRole(r.key)}
              className={`group flex flex-col rounded-2xl border ${r.border} bg-gradient-to-b ${r.cardBg} p-7 text-left shadow-[0_1px_2px_rgba(20,33,61,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,33,61,0.25)]`}
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-full ${r.iconBg} text-white shadow-md`}>
                <r.Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-serif text-3xl font-semibold text-[#14213d]">{r.title}</h3>
              <div className={`mt-2 font-mono text-[11px] font-semibold tracking-[0.25em] ${r.accent}`}>{r.tagline}</div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#46536d]">{r.text}</p>
              <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${r.accent}`}>
                {r.cta}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MORE ABOUT ME + QUICK FACTS + QUOTE */}
      <div className="mx-auto max-w-[1200px] px-5 pb-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:border-r lg:border-[#e3e6ee] lg:pr-10 space-y-4">
            <h3 className="font-serif text-3xl font-semibold text-[#14213d]">More About Me</h3>
            <p className="text-[15px] leading-relaxed text-[#46536d]">
              I am a lifelong learner, always curious about how things work and how they can be
              improved. I enjoy working with data, building ideas, and creating resources that help
              others grow.
            </p>
            <p className="text-[15px] leading-relaxed text-[#46536d]">
              Outside of academics, I love reading, exploring new technology, and spending time in
              nature. I believe in continuous learning, kindness, and the power of education to create
              a brighter future.
            </p>
            <div className="pt-2 text-[#1d2a44]">
              <div className="font-script text-2xl">Same passion. Different forms.</div>
              <ScriptUnderline className="h-3 w-40 text-[#4f7fd1]" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xl font-semibold text-[#14213d]">Quick Facts</h4>
            <ul className="space-y-4">
              {ABOUT_FACTS.map((f) => (
                <li key={f.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf0fa] text-[#2f4f8f]">
                    <f.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[#14213d]">{f.label}</div>
                    <div className="text-xs leading-relaxed text-[#5b6882]">{f.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex items-center">
            <figure className="relative w-full rounded-[38%_62%_55%_45%/45%_40%_60%_55%] bg-gradient-to-br from-[#e6eef9] to-[#dfe8f6] px-8 py-10">
              <blockquote className="font-serif text-lg italic leading-relaxed text-[#1d2a44]">
                “Education is not just about knowledge, but about building the capacity to create a
                better tomorrow.”
              </blockquote>
              <figcaption className="mt-4 text-right font-script text-xl text-[#33405a]">— Emran Islam</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <AboutMountainBanner />
    </section>
  );
}

// Shared shell for the Teacher / Researcher / Author pages.
function AboutRoleShell({ role, children }) {
  const r = ABOUT_ROLES.find((x) => x.key === role);
  return (
    <section className="bg-[#fbfaf7] text-[#1d2a44]">
      <div className={`relative overflow-hidden bg-gradient-to-br ${r.cardBg}`}>
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-12 md:py-14">
          <div className="md:col-span-8 space-y-4">
            <span className={`flex h-14 w-14 items-center justify-center rounded-full ${r.iconBg} text-white shadow-md`}>
              <r.Icon className="h-7 w-7" />
            </span>
            <h2 className="font-serif text-4xl font-semibold text-[#14213d] sm:text-5xl">{r.title}</h2>
            <div className={`font-mono text-xs font-semibold tracking-[0.3em] ${r.accent}`}>{r.tagline}</div>
            <p className="max-w-2xl text-[15px] leading-relaxed text-[#46536d]">{r.text}</p>
          </div>
          <div className="md:col-span-4 hidden md:flex justify-end">
            <div className="relative h-56 w-48 overflow-hidden rounded-t-full bg-gradient-to-b from-[#c9ddd1] to-[#a9c8b6]">
              <img src={ABOUT_PORTRAIT} alt="Emran Islam" className="absolute bottom-0 left-1/2 w-[120%] max-w-none -translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] space-y-12 px-5 py-12 sm:px-8">{children}</div>
      <AboutMountainBanner />
    </section>
  );
}

function AboutSectionTitle({ children, sub }) {
  return (
    <div className="space-y-1">
      <h3 className="font-serif text-2xl font-semibold text-[#14213d] sm:text-3xl">{children}</h3>
      {sub && <p className="text-sm text-[#5b6882]">{sub}</p>}
    </div>
  );
}

function AboutTimeline({ items }) {
  return (
    <ol className="relative ml-2 space-y-6 border-l border-[#d9dfea]">
      {items.map((it) => (
        <li key={it.key} className="relative pl-6">
          <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#4f7fd1] ring-4 ring-[#fbfaf7]" />
          <div className="font-mono text-xs font-semibold text-[#2f5fb3]">{it.when}</div>
          <div className="mt-0.5 text-base font-semibold text-[#14213d]">{it.title}</div>
          <div className="text-sm text-[#3f8a68] font-medium">{it.org}</div>
          {it.note && <p className="mt-1 text-sm leading-relaxed text-[#5b6882]">{it.note}</p>}
        </li>
      ))}
    </ol>
  );
}

function AboutAwardList({ awards }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {awards.map((aw) => (
        <div key={aw.title} className="flex items-start gap-3 rounded-xl border border-[#e6e9f0] bg-white p-4">
          <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-[#c58a1c]" />
          <div className="text-sm leading-snug">
            <span className="mr-2 rounded bg-[#eef3fc] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#2f5fb3]">{aw.level}</span>
            <span className="font-semibold text-[#14213d]">{aw.title}</span>
            <span className="ml-1 text-[#7a859b]">({aw.year})</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const TEACHING_LEVELS = [
  { page: 'HSC Bangla Version', title: 'HSC বাংলা ভার্সন', sub: 'উচ্চতর গণিত ১ম ও ২য় পত্র + ৬টি স্পেশাল কোর্স', icon: '🏆' },
  { page: 'HSC English Version', title: 'HSC English Version', sub: 'Higher Math 1st & 2nd Paper + EV courses', icon: '🎯' },
  { page: 'O-Level & A-Level', title: 'O & A-Level Mathematics', sub: 'D-Math, Add-Math, P1–P4, M1, S1', icon: '📐' },
  { page: 'Admission Test (BUET/DU)', title: 'ভর্তি পরীক্ষার প্রস্তুতি', sub: 'Medi-Math, DU Ka, BUET/CKRUET & archive', icon: '🚀' },
  { page: 'Job Math', title: 'JOB MATH', sub: 'BCS প্রিলি: গাণিতিক যুক্তি, মানসিক দক্ষতা ও মডেল টেস্ট', icon: '💼' },
  { page: 'B.Sc. Honours Math', title: 'B.Sc. (Honours) Mathematics', sub: 'Calculus, Linear Algebra, ODE, Numerical, OR', icon: '🎓' }
];

function AboutLinkCard({ icon, title, sub, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-[#e3e6ee] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#c8d3ea] hover:shadow-[0_14px_30px_-18px_rgba(20,33,61,0.35)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f4fa] text-2xl">{icon}</span>
      <span className="flex-1">
        <span className="block text-base font-semibold text-[#14213d]">{title}</span>
        <span className="block text-xs text-[#5b6882]">{sub}</span>
      </span>
      <ChevronRight className="h-5 w-5 text-[#9aa5bb] transition-transform group-hover:translate-x-1 group-hover:text-[#2f5fb3]" />
    </button>
  );
}

function AboutTeacherPage({ openSubPage }) {
  return (
    <AboutRoleShell role="teacher">
      <div className="space-y-5">
        <AboutSectionTitle sub="প্রতিটি লেভেলের নিজের পেজ আছে — চাপ দিলেই খুলবে।">What I Teach</AboutSectionTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEACHING_LEVELS.map((l) => (
            <AboutLinkCard key={l.page} icon={l.icon} title={l.title} sub={l.sub} onClick={() => openSubPage(l.page)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <AboutSectionTitle>Teaching Experience</AboutSectionTitle>
          <AboutTimeline
            items={CV_CREDENTIALS.experience.map((e) => ({ key: e.org, when: e.period, title: e.role, org: e.org, note: e.highlight }))}
          />
        </div>
        <div className="space-y-5">
          <AboutSectionTitle>How I Teach</AboutSectionTitle>
          <div className="space-y-3">
            {[
              ['Concepts first', 'Every chapter starts from the idea behind the formula, so students can rebuild it instead of memorising it.'],
              ['Problem solving', 'Board questions, admission problems and past papers are solved step by step, with the reasoning written out.'],
              ['Steady practice', 'Lecture notes, recorded classes and self-tests for every lecture keep learning regular, not last-minute.']
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-[#dbe5f7] bg-[#f5f8fd] p-5">
                <div className="font-semibold text-[#14213d]">{t}</div>
                <p className="mt-1 text-sm leading-relaxed text-[#46536d]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <AboutSectionTitle>Teaching Awards</AboutSectionTitle>
        <AboutAwardList awards={CV_CREDENTIALS.awards.filter((a) => ['Institutional', 'Upazila', 'Leadership'].includes(a.level))} />
      </div>
    </AboutRoleShell>
  );
}

function AboutResearcherPage({ openSubPage }) {
  return (
    <AboutRoleShell role="researcher">
      <ResearchProfileLinks />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <AboutSectionTitle>Research Interests</AboutSectionTitle>
          <ul className="space-y-3">
            {[
              'Optimization (convex, non-convex, metaheuristics)',
              'Computational Mathematics',
              'Scientific Machine Learning',
              'Earthquake Precursors & Seismology',
              'Travelling Salesman Problem & combinatorial optimization'
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px] text-[#33405a]">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3f8a68]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <AboutSectionTitle>Current Research</AboutSectionTitle>
          <div className="rounded-2xl border border-[#d6eadf] bg-[#f3f9f5] p-6 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#2c7353]">SPRINGER NATURE • UNDER REVIEW</span>
              <span className="font-mono text-xs text-[#5b6882]">2025–2026</span>
            </div>
            <div className="text-lg font-semibold leading-snug text-[#14213d]">
              Leakage-Controlled ML Framework for Short-Term Earthquake Precursor Detection
            </div>
            <p className="text-sm leading-relaxed text-[#46536d]">
              13 seismicity features and a hybrid Fuzzy-MOGA-Random Forest pipeline (ROC-AUC ≈ 0.87),
              benchmarked against an Omori-law baseline on the Eastern Indian Plate margin.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <AboutSectionTitle>Publications</AboutSectionTitle>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e3e6ee] bg-white p-5">
            <div className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#2f5fb3]">JOURNAL ARTICLES • 2018</div>
            <div className="mt-2 font-semibold text-[#14213d]">Improved Nearest Neighbour Algorithm for TSP</div>
            <div className="mt-1 text-sm text-[#5b6882]">IJSRCSEIT & IJMTT</div>
          </div>
          {CV_CREDENTIALS.books.slice(0, 2).map((b) => (
            <div key={b.title} className="rounded-2xl border border-[#e3e6ee] bg-white p-5">
              <div className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#5d41a8]">MONOGRAPH</div>
              <div className="mt-2 font-semibold text-[#14213d]">{b.title}</div>
              <div className="mt-1 text-sm text-[#5b6882]">{b.publisher}</div>
              <div className="mt-1 font-mono text-xs text-[#7a859b]">{b.isbn}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <AboutSectionTitle>Education</AboutSectionTitle>
          <AboutTimeline
            items={CV_CREDENTIALS.education.map((e) => ({ key: e.degree, when: e.year, title: e.degree, org: e.institution, note: `${e.result} • ${e.thesis}` }))}
          />
        </div>
        <div className="space-y-5">
          <AboutSectionTitle>Academic Honours</AboutSectionTitle>
          <AboutAwardList awards={CV_CREDENTIALS.awards.filter((a) => ['International', 'National'].includes(a.level))} />
          <button
            type="button"
            onClick={() => openSubPage('Research & Papers', { researchCardId: 'research-collab', anchorId: 'research-detail' })}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#3f8a68] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2c7353]"
          >
            Open for collaboration <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AboutRoleShell>
  );
}

function AboutAuthorPage({ onBookDetails }) {
  return (
    <AboutRoleShell role="author">
      <div className="space-y-5">
        <AboutSectionTitle sub="HSC কোর্স-ভিত্তিক বই — প্রতিটি স্পেশাল কোর্সের জন্য একটি করে।">The Fuel of Higher Math</AboutSectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {visibleCourseBooks().map((item) => (
            <BookShopCard key={`author-${item.id}`} light book={courseBookToShop(item)} onDetails={() => onBookDetails(item)} />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <AboutSectionTitle sub="আন্তর্জাতিক মনোগ্রাফ ও পাঠ্যবই">Published Books</AboutSectionTitle>
        <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
          {shopBooks().map((book) => (
            <BookShopCard key={`author-${book.key}`} light book={book} />
          ))}
        </div>
      </div>
    </AboutRoleShell>
  );
}

// ---------------------------------------------------------------- Private batches & 1-to-1 sessions
// ---------------------------------------------------------------- Site settings (fill these in)
// Empty links stay hidden on the site. With `whatsapp` set (country code, no +, e.g. '8801XXXXXXXXX'),
// booking, payment and question requests go to WhatsApp instead of email.
const SITE_LINKS = {
  whatsapp: '8801966631211',
  telegram: '', // e.g. 'https://t.me/yourchannel'
  facebook: 'https://www.facebook.com/share/1Mz2tgnjDX/',
  facebookReviews: '', // the Facebook Page's Reviews link (e.g. 'https://www.facebook.com/yourpage/reviews'); empty uses `facebook`
  email: CV_CREDENTIALS.email,
  liveClass: '', // default Zoom / Google Meet link for live classes
  contentApi: 'https://script.google.com/macros/s/AKfycbwze1cSDh1p0TYdlATTGosYhn9b8qRn6jiG9tUW1ioofV4c0dQHVizIrhRVneK5mKdd1Q/exec', // admin panel backend (docs/ADMIN.md)
  slotSheetCsv: '', // published Google Sheet CSV for private slots (used only without contentApi)
  googleScholar: '',
  orcid: '',
  researchGate: ''
};

// Numbers shown for manual Send Money payments.
const PAYMENT_NUMBERS = { bKash: '01966-631211', Nagad: '01966-631211', Rocket: '01966-631211' };

// Opens WhatsApp (if set) or the mail app with the request text; returns the channel name.
const sendRequest = (subject, body) => {
  if (SITE_LINKS.whatsapp) {
    window.open(`https://wa.me/${SITE_LINKS.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, '_blank');
    return 'WhatsApp';
  }
  window.location.href = `mailto:${SITE_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'ইমেইল';
};

// Sample batches for the structure; replace with the real schedule.
// Every batch runs both Online and Offline; the student picks one when booking.
const PRIVATE_BATCHES = [
  { id: 'pb-hsc-bv', title: 'HSC উচ্চতর গণিত (বাংলা ভার্সন)', level: 'HSC', days: 'শনি • সোম • বুধ', time: 'সন্ধ্যা ৭:০০ – ৮:৩০', place: 'গ্রিন রোড, ঢাকা', seats: 15, seatsLeft: 6, fee: { Online: '৳ ২,৫০০ / মাস', Offline: '৳ ৩,০০০ / মাস' }, icon: '🏆', grad: 'from-sky-400 via-blue-500 to-indigo-600' },
  { id: 'pb-hsc-ev', title: 'HSC Higher Math (English Version)', level: 'HSC', days: 'Sun • Tue • Thu', time: '8:30 – 10:00 PM', place: 'Green Road, Dhaka', seats: 12, seatsLeft: 8, fee: { Online: '৳ 2,800 / month', Offline: '৳ 3,300 / month' }, icon: '🎯', grad: 'from-cyan-400 via-teal-500 to-emerald-600' },
  { id: 'pb-oa', title: 'O-Level D-Math & Add-Math', level: 'O/A-Level', days: 'Fri • Sat', time: '10:00 – 11:30 AM', place: 'Green Road, Dhaka', seats: 8, seatsLeft: 2, fee: { Online: '৳ 4,000 / month', Offline: '৳ 4,500 / month' }, icon: '📐', grad: 'from-violet-400 via-purple-500 to-indigo-700' },
  { id: 'pb-adm', title: 'Admission (BUET / DU Ka) Math', level: 'Admission', days: 'রবি – বৃহস্পতি', time: 'সকাল ৮:০০ – ৯:৩০', place: 'গ্রিন রোড, ঢাকা', seats: 20, seatsLeft: 9, fee: { Online: '৳ ৩,০০০ / মাস', Offline: '৳ ৩,৫০০ / মাস' }, icon: '🚀', grad: 'from-amber-400 via-orange-500 to-red-600' },
  { id: 'pb-hons', title: 'B.Sc. Honours Math (1st Year)', level: 'Honours', days: 'Sat • Mon', time: '9:00 – 10:30 PM', place: 'Green Road, Dhaka', seats: 10, seatsLeft: 0, fee: { Online: '৳ 3,000 / month', Offline: '৳ 3,500 / month' }, icon: '🎓', grad: 'from-emerald-400 via-green-500 to-teal-700' }
];

const PRIVATE_OPTIONS = [
  {
    key: 'group',
    code: 'GROUP',
    title: 'গ্রুপ প্রাইভেট ব্যাচ',
    sub: 'চলমান ব্যাচে সিট বুক করুন — Online বা Offline, যেভাবে সুবিধা। ছোট ব্যাচ, নিয়মিত রুটিন, মাসিক টেস্ট।',
    chips: ['Online + Offline', 'সীমিত সিট'],
    icon: '👥',
    grad: 'from-teal-400 via-cyan-500 to-sky-600'
  },
  {
    key: 'one',
    code: '1-TO-1',
    title: '১-টু-১ প্রাইভেট সেশন',
    sub: 'শুধু আপনার জন্য সেশন: নিজের সময়, নিজের গতি, নিজের দুর্বল অধ্যায়।',
    chips: ['Online + Offline', 'নিজের সময়'],
    icon: '🎯',
    grad: 'from-amber-400 via-orange-500 to-rose-600'
  },
  {
    key: 'custom',
    code: 'O / A-LEVEL',
    title: 'কাস্টম O/A-Level ব্যাচ',
    sub: 'বোর্ড, পেপার আর কতজন শিক্ষার্থী সেটা নিজেরা ঠিক করে বন্ধুদের নিয়ে আলাদা ব্যাচ বানান।',
    chips: ['Online + Offline', 'CAIE / Edexcel', '২–৮ জন'],
    icon: '📐',
    grad: 'from-violet-400 via-purple-500 to-fuchsia-600'
  }
];

function ChoiceChips({ options, value, onChange, multi = false }) {
  const isOn = (o) => (multi ? value.includes(o) : value === o);
  const toggle = (o) => {
    if (!multi) return onChange(o);
    onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => toggle(o)}
          className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
            isOn(o)
              ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-[0_0_18px_rgba(251,191,36,0.35)]'
              : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function PrivateField({ label, hint, children }) {
  return (
    <div className="space-y-2.5">
      <div>
        <div className="text-sm font-extrabold text-white">{label}</div>
        {hint && <div className="text-[11px] text-slate-400">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function PrivateHero({ badge, title, sub, grad, icon }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${grad} p-6 sm:p-9 text-white shadow-2xl`}>
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="absolute -right-4 -bottom-10 rotate-12 text-[150px] leading-none opacity-20">{icon}</div>
      <div className="relative max-w-2xl space-y-2">
        <span className="inline-block rounded-full bg-black/25 px-3 py-1 text-xs font-extrabold ring-1 ring-white/25 backdrop-blur-sm">
          {badge}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow">{title}</h2>
        <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">{sub}</p>
      </div>
    </div>
  );
}

// Summary + "send request" bar used by the 1-to-1 and custom batch pages.
function PrivateSummary({ lines, onRequest, disabled, note }) {
  return (
    <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:p-6 space-y-4 lg:sticky lg:top-48">
      <div className="text-sm font-extrabold text-amber-300">আপনার রিকোয়েস্ট</div>
      <dl className="space-y-2 text-sm">
        {lines.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-slate-800/80 pb-2">
            <dt className="text-slate-400">{k}</dt>
            <dd className="text-right font-semibold text-white">{v || '—'}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="text-[11px] leading-relaxed text-slate-400">{note}</p>}
      <button
        type="button"
        disabled={disabled}
        onClick={onRequest}
        className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-extrabold text-slate-950 shadow-md transition hover:from-amber-300 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        বুকিং রিকোয়েস্ট পাঠান →
      </button>
    </div>
  );
}

function PrivateBatchHub({ onOpenOption, onOpenCourse, onOpenEvCourse, enrolled = {} }) {
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <PrivateHero
        badge="প্রাইভেট ব্যাচ ও সেশন"
        title="নিজের মতো করে পড়ুন — গ্রুপে, একা, বা বন্ধুদের নিয়ে"
        sub="Online বা Offline প্রাইভেট ব্যাচে যোগ দিন, ১-টু-১ সেশন বুক করুন, অথবা O/A-Level এর জন্য নিজেদের কাস্টম ব্যাচ বানান।"
        grad="from-teal-500 via-cyan-600 to-indigo-700"
        icon="📅"
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {PRIVATE_OPTIONS.map((o) => (
          <PremiumCard
            key={o.key}
            person
            poster={o.code}
            grad={o.grad}
            icon={o.icon}
            title={o.title}
            sub={o.sub}
            chips={o.chips}
            onClick={() => onOpenOption(o.key)}
          />
        ))}
      </div>

      {/* Special courses (moved here from the HSC pages) */}
      <div id="special-courses" className="space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">স্পেশাল কোর্স</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">HSC বাংলা ভার্সন — ৬টি স্পেশাল গণিত কোর্স</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {SPECIAL_COURSES_WITH_BOOKS.map((item) => (
            <PremiumCard
              key={item.id}
              person
              poster={item.courseTitle}
              grad={item.grad}
              icon={item.icon}
              code={item.courseNum}
              title={item.courseTitle}
              sub={item.chaptersIncluded}
              chips={[`${item.syllabusChapters.length}টি অধ্যায়`, ...(enrolled[item.id] ? ['✓ Enrolled'] : [])]}
              price={item.priceBdt}
              onClick={() => onOpenCourse(item)}
            />
          ))}
        </div>
        <div className="pt-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">HSC English Version — স্পেশাল কোর্স</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {EV_SPECIAL_COURSES.map((evc) => (
            <PremiumCard
              key={evc.id}
              person
              poster={evc.courseTitle.replace(' (EV)', '').split(/,| &/)[0]}
              grad={evc.grad}
              icon={evc.icon}
              code={evc.courseNum}
              title={evc.courseTitle}
              sub={evc.sub}
              chips={['EV Batch']}
              price={evc.priceBdt}
              onClick={() => onOpenEvCourse(evc)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-5">
        <h3 className="text-lg font-extrabold text-white">কীভাবে বুক করবেন</h3>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ['১', 'অপশন বেছে নিন', 'গ্রুপ ব্যাচ, ১-টু-১ সেশন বা কাস্টম ব্যাচ।'],
            ['২', 'রিকোয়েস্ট পাঠান', 'নাম, ফোন নম্বর আর পছন্দের সময় দিয়ে রিকোয়েস্ট পাঠান।'],
            ['৩', 'কনফার্মেশন', 'সময় ও ফি নিশ্চিত করে আপনার সাথে যোগাযোগ করা হবে।']
          ].map(([n, t, d]) => (
            <li key={n} className="flex gap-4 rounded-2xl bg-slate-950/70 p-4 border border-slate-800">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-black text-slate-950">{n}</span>
              <div>
                <div className="font-bold text-white">{t}</div>
                <div className="text-xs leading-relaxed text-slate-400 mt-0.5">{d}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <FaqSection />
    </main>
  );
}

function PrivateBatchCard({ b, onRequest }) {
  const [mode, setMode] = useState('Online');
  const filled = Math.round(((b.seats - b.seatsLeft) / b.seats) * 100);
  const full = b.seatsLeft <= 0;
  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0a1222]">
      <div className={`relative bg-gradient-to-br ${b.grad} p-4`}>
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="relative flex items-start justify-between">
          <span className="rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/25">
            ● Online • 📍 Offline
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-xl ring-1 ring-white/30">{b.icon}</span>
        </div>
        <div className="relative mt-3 text-[11px] font-bold text-white/85">{b.level}</div>
        <h4 className="relative text-base font-extrabold leading-snug text-white">{b.title}</h4>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 text-sm">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-900 p-1">
          {['Online', 'Offline'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-lg py-2 text-xs font-extrabold transition ${
                mode === m ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              {m === 'Online' ? '● Online' : '📍 Offline'}
            </button>
          ))}
        </div>
        <div className="flex justify-between gap-3"><span className="text-slate-400">দিন</span><span className="text-right font-semibold text-white">{b.days}</span></div>
        <div className="flex justify-between gap-3"><span className="text-slate-400">সময়</span><span className="text-right font-semibold text-white">{b.time}</span></div>
        <div className="flex justify-between gap-3">
          <span className="text-slate-400">{mode === 'Online' ? 'ক্লাস' : 'স্থান'}</span>
          <span className="text-right font-semibold text-white">{mode === 'Online' ? 'Zoom / Google Meet' : b.place}</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">সিট</span>
            <span className={`font-bold ${b.seatsLeft <= 3 ? 'text-rose-300' : 'text-emerald-300'}`}>
              {full ? 'সিট পূর্ণ' : `${b.seatsLeft} / ${b.seats} খালি`}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div className={`h-full rounded-full bg-gradient-to-r ${b.grad}`} style={{ width: `${filled}%` }} />
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="whitespace-nowrap text-base font-black text-amber-300">{b.fee[mode]}</span>
          <button
            type="button"
            onClick={() =>
              onRequest(full ? 'গ্রুপ ব্যাচ — ওয়েটিং লিস্ট' : 'গ্রুপ প্রাইভেট ব্যাচ', [
                ['ব্যাচ', b.title],
                ['ধরন', mode],
                ['দিন', b.days],
                ['সময়', b.time],
                ...(mode === 'Offline' ? [['স্থান', b.place]] : []),
                ['ফি', b.fee[mode]]
              ])
            }
            className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-xs font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-orange-400"
          >
            {full ? 'ওয়েটিং লিস্টে যোগ দিন' : 'সিট বুক করুন'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivateGroupPage({ onRequest }) {
  const [level, setLevel] = useState('সব');
  const levels = ['সব', ...Array.from(new Set(PRIVATE_BATCHES.map((b) => b.level)))];
  const shown = PRIVATE_BATCHES.filter((b) => level === 'সব' || b.level === level);
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PrivateHero
        badge="GROUP • ONLINE / OFFLINE"
        title="গ্রুপ প্রাইভেট ব্যাচ"
        sub="ছোট ব্যাচে নিয়মিত ক্লাস। প্রতিটি ব্যাচে Online ও Offline দুইভাবেই যোগ দেওয়া যায়, বুক করার সময় বেছে নিন।"
        grad="from-teal-400 via-cyan-500 to-sky-600"
        icon="👥"
      />
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <ChoiceChips options={levels} value={level} onChange={setLevel} />
      </div>
      {shown.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-sm text-slate-400">
          এই লেভেলে এখন কোনো ব্যাচ নেই। ১-টু-১ সেশন বা কাস্টম ব্যাচের রিকোয়েস্ট পাঠাতে পারেন।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((b) => (
            <PrivateBatchCard key={b.id} b={b} onRequest={onRequest} />
          ))}
        </div>
      )}
    </main>
  );
}

function PrivateOneToOnePage({ onRequest }) {
  const [level, setLevel] = useState('HSC (বাংলা ভার্সন)');
  const [mode, setMode] = useState('Online');
  const [duration, setDuration] = useState('৯০ মিনিট');
  const [frequency, setFrequency] = useState('প্রতি সপ্তাহে নিয়মিত');
  const [slots, setSlots] = useState([]);
  const [topic, setTopic] = useState('');
  const lines = [
    ['লেভেল', level],
    ['ধরন', mode],
    ['সেশনের দৈর্ঘ্য', duration],
    ['কতবার', frequency],
    ['স্লট', slots.join(', ')],
    ['যে বিষয়/অধ্যায়', topic]
  ];
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PrivateHero
        badge="1-TO-1 • PERSONAL"
        title="১-টু-১ প্রাইভেট সেশন"
        sub="শুধু একজন শিক্ষার্থীর জন্য সেশন। নিজের সময় আর দুর্বল অধ্যায় বেছে নিন, বাকিটা আমরা সাজিয়ে দেব।"
        grad="from-amber-400 via-orange-500 to-rose-600"
        icon="🎯"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-7 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
          <PrivateField label="লেভেল">
            <ChoiceChips options={['HSC (বাংলা ভার্সন)', 'HSC (English Version)', 'O-Level', 'A-Level', 'Admission', 'B.Sc. Honours']} value={level} onChange={setLevel} />
          </PrivateField>
          <PrivateField label="ধরন">
            <ChoiceChips options={['Online', 'Offline']} value={mode} onChange={(m) => { setMode(m); setSlots([]); }} />
          </PrivateField>
          <PrivateField label="প্রতিটি সেশনের দৈর্ঘ্য">
            <ChoiceChips options={['৬০ মিনিট', '৯০ মিনিট', '১২০ মিনিট']} value={duration} onChange={setDuration} />
          </PrivateField>
          <PrivateField label="কতবার">
            <ChoiceChips options={['একটি সেশন', 'প্রতি সপ্তাহে নিয়মিত']} value={frequency} onChange={setFrequency} />
          </PrivateField>
          <PrivateField label="খালি স্লট বেছে নিন" hint="শুধু খালি স্লট বেছে নেওয়া যাবে। নিয়মিত হলে সপ্তাহের যতদিন চান ততগুলো স্লট বেছে নিন।">
            <SlotPicker forType="one" mode={mode} selected={slots} onChange={setSlots} />
          </PrivateField>
          <PrivateField label="কোন বিষয় বা অধ্যায়ে সাহায্য দরকার?" hint="ঐচ্ছিক">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="যেমন: ক্যালকুলাসের যোগজীকরণ, বোর্ড প্রশ্নের CQ…"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </PrivateField>
        </div>
        <div className="lg:col-span-4">
          <PrivateSummary
            lines={lines}
            disabled={slots.length === 0}
            note={slots.length === 0 ? 'অন্তত একটি খালি স্লট বেছে নিন।' : 'ফি সেশনের দৈর্ঘ্য ও লেভেল অনুযায়ী কনফার্মেশনের সময় জানানো হবে।'}
            onRequest={() => onRequest('১-টু-১ প্রাইভেট সেশন', lines)}
          />
        </div>
      </div>
    </main>
  );
}

const OA_PAPERS = {
  'O-Level / IGCSE': ['D-Math (4024)', 'Add-Math (4037)', 'IGCSE Maths (0580)', 'IGCSE Add-Maths (0606)'],
  'AS Level': ['Pure 1 (P1)', 'Mechanics (M1)', 'Statistics (S1)'],
  'A2 Level': ['Pure 3 (P3)', 'Pure 4 (P4)', 'Further Maths']
};

function PrivateCustomOAPage({ onRequest }) {
  const [board, setBoard] = useState('Cambridge (CAIE)');
  const [stage, setStage] = useState('O-Level / IGCSE');
  const [papers, setPapers] = useState([]);
  const [size, setSize] = useState(4);
  const [mode, setMode] = useState('Online');
  const [slots, setSlots] = useState([]);
  const changeStage = (st) => {
    setStage(st);
    setPapers([]);
  };
  const lines = [
    ['বোর্ড', board],
    ['লেভেল', stage],
    ['পেপার', papers.join(', ')],
    ['শিক্ষার্থী সংখ্যা', `${size} জন (নির্দিষ্ট)`],
    ['ধরন', mode],
    ['স্লট', slots.join(', ')]
  ];
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PrivateHero
        badge="O / A-LEVEL • CUSTOM BATCH"
        title="কাস্টম O/A-Level প্রাইভেট ব্যাচ"
        sub="বন্ধুদের নিয়ে নিজেদের ব্যাচ বানান। বোর্ড, পেপার আর কতজন শিক্ষার্থী থাকবে সেটা আপনারাই ঠিক করবেন। ব্যাচে এর বেশি কেউ যোগ হবে না।"
        grad="from-violet-400 via-purple-500 to-fuchsia-600"
        icon="📐"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-7 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
          <PrivateField label="বোর্ড">
            <ChoiceChips options={['Cambridge (CAIE)', 'Pearson Edexcel']} value={board} onChange={setBoard} />
          </PrivateField>
          <PrivateField label="লেভেল">
            <ChoiceChips options={Object.keys(OA_PAPERS)} value={stage} onChange={changeStage} />
          </PrivateField>
          <PrivateField label="পেপার" hint="একাধিক বেছে নিতে পারেন">
            <ChoiceChips options={OA_PAPERS[stage]} value={papers} onChange={setPapers} multi />
          </PrivateField>
          <PrivateField label="ব্যাচে কতজন শিক্ষার্থী" hint="২ থেকে ৮ জন। এই সংখ্যা নির্দিষ্ট থাকবে।">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSize((n) => Math.max(2, n - 1))}
                className="h-11 w-11 rounded-xl border border-slate-700 bg-slate-950 text-xl font-black text-white hover:border-slate-500"
                aria-label="কমান"
              >
                −
              </button>
              <div className="min-w-[96px] text-center">
                <div className="text-4xl font-black text-amber-300">{size}</div>
                <div className="text-[11px] text-slate-400">জন শিক্ষার্থী</div>
              </div>
              <button
                type="button"
                onClick={() => setSize((n) => Math.min(8, n + 1))}
                className="h-11 w-11 rounded-xl border border-slate-700 bg-slate-950 text-xl font-black text-white hover:border-slate-500"
                aria-label="বাড়ান"
              >
                +
              </button>
              <div className="flex flex-1 flex-wrap gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className={`h-7 w-7 rounded-full text-center text-sm leading-7 ${i < size ? 'bg-purple-400/90 text-slate-950' : 'bg-slate-800 text-slate-600'}`}>
                    👤
                  </span>
                ))}
              </div>
            </div>
          </PrivateField>
          <PrivateField label="ধরন">
            <ChoiceChips options={['Online', 'Offline']} value={mode} onChange={(m) => { setMode(m); setSlots([]); }} />
          </PrivateField>
          <PrivateField label="খালি স্লট বেছে নিন" hint="সপ্তাহে যতদিন ক্লাস চান ততগুলো স্লট বেছে নিন।">
            <SlotPicker forType="custom" mode={mode} selected={slots} onChange={setSlots} />
          </PrivateField>
        </div>
        <div className="lg:col-span-4">
          <PrivateSummary
            lines={lines}
            disabled={papers.length === 0 || slots.length === 0}
            note={
              papers.length === 0 || slots.length === 0
                ? 'অন্তত একটি পেপার আর একটি খালি স্লট বেছে নিন।'
                : 'জনপ্রতি ফি ব্যাচের আকার ও পেপার অনুযায়ী কনফার্মেশনের সময় জানানো হবে।'
            }
            onRequest={() => onRequest('কাস্টম O/A-Level ব্যাচ', lines)}
          />
        </div>
      </div>
    </main>
  );
}

// One form for every request a visitor can send:
//   kind 'booking'  – private batch / session booking
//   kind 'question' – a doubt about a chapter or lecture
//   kind 'payment'  – Send Money done; asks for the Transaction ID so it can be verified
function RequestModal({ request, onClose }) {
  const kind = request.kind || 'booking';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [note, setNote] = useState('');
  const [method, setMethod] = useState('bKash');
  const [trxId, setTrxId] = useState('');
  const [sentVia, setSentVia] = useState('');

  const phoneOk = /^[0-9+\-\s]{8,}$/.test(phone.trim());
  const valid =
    name.trim() &&
    phoneOk &&
    (kind !== 'question' || note.trim()) &&
    (kind !== 'payment' || trxId.trim().length >= 4);

  const heading = { booking: 'বুকিং রিকোয়েস্ট', question: 'প্রশ্ন করুন', payment: 'পেমেন্ট যাচাই' }[kind];
  const subject = {
    booking: `প্রাইভেট বুকিং: ${request.type}`,
    question: `প্রশ্ন: ${request.lines[0] ? request.lines[0][1] : 'সাধারণ'}`,
    payment: `পেমেন্ট: ${request.type}`
  }[kind];

  const send = () => {
    const body = [
      ...(kind === 'question' ? [] : [`রিকোয়েস্ট: ${request.type}`]),
      ...request.lines.map(([k, v]) => `${k}: ${v || '—'}`),
      ...(kind === 'payment' ? [`পেমেন্ট মাধ্যম: ${method} (${PAYMENT_NUMBERS[method]})`, `Transaction ID: ${trxId}`] : []),
      '',
      `নাম: ${name}`,
      `ফোন: ${phone}`,
      ...(institution ? [`প্রতিষ্ঠান/ক্লাস: ${institution}`] : []),
      ...(note ? [kind === 'question' ? `প্রশ্ন: ${note}` : `নোট: ${note}`] : [])
    ].join('\n');
    setSentVia(sendRequest(subject, body));
  };

  const input =
    'w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none';
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-3xl border border-amber-400/40 bg-slate-900 p-6 text-white shadow-2xl sm:p-7"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">
          <X className="h-4 w-4" />
        </button>
        <div>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">{heading}</span>
          <h3 className="mt-1.5 pr-8 text-xl font-extrabold">{kind === 'question' ? 'আপনার প্রশ্ন লিখুন' : request.type}</h3>
        </div>
        {request.lines.length > 0 && (
          <dl className="space-y-1.5 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs">
            {request.lines.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-slate-400">{k}</dt>
                <dd className="text-right font-semibold">{v || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
        {sentVia ? (
          <div className="space-y-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-sm">
            <div className="font-bold text-emerald-300">✓ মেসেজ তৈরি হয়েছে</div>
            <p className="leading-relaxed text-slate-300">
              {sentVia} খুলেছে, সেখান থেকে মেসেজটি পাঠিয়ে দিন।{' '}
              {kind === 'payment'
                ? 'পেমেন্ট যাচাইয়ের পর আনলক করে আপনার ফোন নম্বরে জানানো হবে।'
                : kind === 'question'
                ? 'উত্তর আপনার দেওয়া ফোন নম্বরে বা যেখান থেকে পাঠিয়েছেন সেখানে দেওয়া হবে।'
                : 'কনফার্মেশনের জন্য আপনার দেওয়া ফোন নম্বরে যোগাযোগ করা হবে।'}
            </p>
            <button onClick={onClose} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold hover:bg-slate-700">
              বন্ধ করুন
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {kind === 'payment' && (
              <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="text-xs font-bold text-slate-300">
                  ১. নিচের নম্বরে {request.amount} Send Money করুন  ২. Transaction ID লিখে পাঠান
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(PAYMENT_NUMBERS).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-xl border py-2 text-xs font-extrabold transition ${
                        method === m ? 'border-amber-300 bg-amber-400 text-slate-950' : 'border-slate-700 bg-slate-800 text-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="text-center font-mono text-lg font-black text-amber-300">{PAYMENT_NUMBERS[method]}</div>
              </div>
            )}
            <input className={input} placeholder="শিক্ষার্থীর নাম *" value={name} onChange={(e) => setName(e.target.value)} />
            <input
              className={input}
              placeholder={kind === 'payment' ? 'যে নম্বর থেকে টাকা পাঠিয়েছেন *' : 'ফোন নম্বর (শিক্ষার্থী বা অভিভাবক) *'}
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {kind === 'payment' && (
              <input className={`${input} font-mono`} placeholder="Transaction ID *" value={trxId} onChange={(e) => setTrxId(e.target.value)} />
            )}
            {kind !== 'payment' && (
              <input className={input} placeholder="স্কুল/কলেজ ও ক্লাস (ঐচ্ছিক)" value={institution} onChange={(e) => setInstitution(e.target.value)} />
            )}
            <textarea
              className={input}
              rows={kind === 'question' ? 4 : 2}
              placeholder={kind === 'question' ? 'আপনার প্রশ্ন *' : 'অন্য কিছু জানাতে চাইলে (ঐচ্ছিক)'}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="button"
              disabled={!valid}
              onClick={send}
              className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {SITE_LINKS.whatsapp ? 'WhatsApp এ পাঠান' : 'ইমেইলে পাঠান'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Lecture resources, quizzes, routine, FAQ, proof
// Videos and notes per lecture, keyed by the lecture's key (shown in each lecture's URL-free id,
// e.g. 'p1-ch1-lec-1' for HSC Bangla, 'p3-<module>-<chapter>-lec-1' for the other tracks,
// '<course>-<chapter>-lec-1' for special courses).
//   youtube: the video id from the YouTube link (youtube.com/watch?v=THIS_PART)
//   pdf:     a link to the PDF (a Google Drive "preview" link works well)
//   live:    a Zoom / Meet link for this lecture's live class (falls back to SITE_LINKS.liveClass)
const LECTURE_RESOURCES = {
  // 'p1-ch1-lec-1': { youtube: 'dQw4w9WgXcQ', pdf: 'https://drive.google.com/file/d/FILE_ID/preview' },
};

// MCQs per chapter id (e.g. 'p1-ch1', 'p1-ch8'). Chapters without questions show the sample quiz.
const QUIZ_BANK = {
  // 'p1-ch1': [{ q: 'প্রশ্ন', options: ['ক', 'খ', 'গ', 'ঘ'], answer: 0, explain: 'ব্যাখ্যা' }],
};

const SAMPLE_QUIZ = [
  { q: 'f(x) = x² হলে f′(x) = ?', options: ['x', '2x', 'x²/2', '2'], answer: 1, explain: 'd/dx (xⁿ) = n·xⁿ⁻¹, তাই d/dx (x²) = 2x।' },
  { q: '∫ 2x dx = ?', options: ['2', 'x² + c', '2x² + c', 'x + c'], answer: 1, explain: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + c, তাই ∫ 2x dx = x² + c।' },
  { q: 'i² এর মান কত?', options: ['1', '0', '−1', 'i'], answer: 2, explain: 'সংজ্ঞা অনুযায়ী i = √−1, তাই i² = −1।' }
];

const toBnDigits = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

function QuizPanel({ quizKey }) {
  const content = useContent();
  const bank = quizFor(content, quizKey);
  const questions = bank || SAMPLE_QUIZ;
  const isSample = !bank;
  const total = questions.length * 60;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState(total);

  useEffect(() => {
    if (submitted) return undefined;
    if (left <= 0) {
      setSubmitted(true);
      return undefined;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left, submitted]);

  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <div className="space-y-4">
      {isSample && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 text-[11px] text-amber-200">
          এই অধ্যায়ের প্রশ্ন শীঘ্রই যোগ হবে। নিচে কুইজটি কেমন হবে তার নমুনা।
        </div>
      )}
      <div className="flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs">
        <span className="font-bold text-slate-300">{toBnDigits(questions.length)}টি প্রশ্ন</span>
        <span className={`font-mono text-sm font-black ${left < 30 && !submitted ? 'text-rose-300' : 'text-amber-300'}`}>
          ⏱ {mm}:{ss}
        </span>
      </div>
      {questions.map((item, qi) => (
        <div key={qi} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
          <div className="text-sm font-bold text-white">{toBnDigits(qi + 1)}. {item.q}</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {item.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const right = item.answer === oi;
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={submitted}
                  onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  className={`rounded-xl border p-2.5 text-left text-xs transition ${
                    submitted
                      ? right
                        ? 'border-emerald-400 bg-emerald-500/20 font-bold text-emerald-200'
                        : chosen
                        ? 'border-rose-400 bg-rose-500/20 text-rose-200'
                        : 'border-slate-800 bg-slate-900 text-slate-500'
                      : chosen
                      ? 'border-teal-400 bg-teal-500 font-bold text-slate-950'
                      : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && item.explain && <div className="text-[11px] leading-relaxed text-slate-400">💡 {item.explain}</div>}
        </div>
      ))}
      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="w-full rounded-xl bg-teal-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-teal-400"
        >
          সাবমিট করুন ও ফলাফল দেখুন
        </button>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/50 bg-emerald-950/90 p-4">
          <div className="space-y-2">
            <div className="text-sm font-extrabold text-emerald-300">
              ফলাফল: {toBnDigits(score)} / {toBnDigits(questions.length)}
            </div>
            <ShareButtons text={`MCQ কুইজে আমি ${toBnDigits(score)}/${toBnDigits(questions.length)} পেয়েছি! তুমিও দাও:`} />
          </div>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setLeft(total);
            }}
            className="rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-700"
          >
            আবার দিন
          </button>
        </div>
      )}
    </div>
  );
}

function ComingSoon({ what }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
      <Clock className="h-8 w-8 text-slate-500" />
      <div className="text-sm font-bold text-white">{what} শীঘ্রই আসছে</div>
      <p className="max-w-sm text-xs text-slate-400">এই লেকচারের কনটেন্ট যোগ হলেই এখানে দেখা যাবে।</p>
    </div>
  );
}

// Weekly live class routine (sample; replace with the real one).
const CLASS_ROUTINE = [
  { day: 'শনি', time: 'সন্ধ্যা ৭:০০', title: 'HSC বাংলা — ক্যালকুলাস', mode: 'Online' },
  { day: 'রবি', time: 'বিকাল ৪:০০', title: 'Admission — BUET Written', mode: 'Offline' },
  { day: 'সোম', time: 'রাত ৮:৩০', title: 'HSC EV — Calculus (EV)', mode: 'Online' },
  { day: 'মঙ্গল', time: 'সন্ধ্যা ৭:০০', title: 'HSC বাংলা — ত্রিকোণমিতি', mode: 'Online' },
  { day: 'বুধ', time: 'রাত ৯:০০', title: 'B.Sc. Honours — Linear Algebra', mode: 'Online' },
  { day: 'বৃহস্পতি', time: 'বিকাল ৪:০০', title: 'Admission — DU Ka', mode: 'Offline' },
  { day: 'শুক্র', time: 'সকাল ১০:০০', title: 'O-Level — Add-Math (4037)', mode: 'Online' }
];

function ClassRoutinePage({ onAsk }) {
  const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র'];
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PrivateHero
        badge="WEEKLY ROUTINE"
        title="লাইভ ক্লাসের রুটিন"
        sub="সব লাইভ ক্লাস এক জায়গায়। Online ক্লাসের লিংক লেকচারের Live Class বাটনে আর এখানে দেওয়া হবে।"
        grad="from-indigo-500 via-blue-600 to-cyan-600"
        icon="🗓️"
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-7">
        {days.map((d) => {
          const items = CLASS_ROUTINE.filter((c) => c.day === d);
          return (
            <div key={d} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="mb-2 text-sm font-extrabold text-white">{d}</div>
              {items.length === 0 ? (
                <div className="text-[11px] text-slate-500">ক্লাস নেই</div>
              ) : (
                <div className="space-y-2">
                  {items.map((c) => (
                    <div key={c.title + c.time} className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                      <div className="font-mono text-[11px] font-bold text-amber-300">{c.time}</div>
                      <div className="mt-0.5 text-xs font-bold leading-snug text-white">{c.title}</div>
                      <div className={`mt-1 text-[10px] font-bold ${c.mode === 'Online' ? 'text-emerald-300' : 'text-sky-300'}`}>
                        {c.mode === 'Online' ? '● Online' : '📍 Offline'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="text-sm text-slate-300">রুটিন নিয়ে কোনো প্রশ্ন আছে?</div>
        <button onClick={onAsk} className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
          প্রশ্ন করুন
        </button>
      </div>
    </main>
  );
}

const FAQ_ITEMS = [
  ['প্রথম লেকচার কি ফ্রি?', 'হ্যাঁ। প্রতিটি অধ্যায়ের প্রথম লেকচার সবার জন্য খোলা। পরের লেকচারগুলো আনলক করতে হয়।'],
  ['কীভাবে পেমেন্ট করব?', 'bKash, Nagad বা Rocket এ Send Money করে লেকচার বা কোর্সের পেজ থেকে Transaction ID সহ রিকোয়েস্ট পাঠান। যাচাইয়ের পর আনলক করে আপনাকে জানানো হবে।'],
  ['লাইভ ক্লাস কোথায় হয়?', 'Online ক্লাস হয় Zoom বা Google Meet এ। সময় ও লিংক ক্লাস রুটিন পেজে আর লেকচারের Live Class বাটনে পাবেন।'],
  ['প্রাইভেট ব্যাচ বা ১-টু-১ সেশন কীভাবে বুক করব?', 'প্রাইভেট ব্যাচ পেজ থেকে খালি সিট বা স্লট বেছে রিকোয়েস্ট পাঠান। কনফার্ম হলে সেই স্লট সবার জন্য লক দেখাবে।'],
  ['পড়তে গিয়ে প্রশ্ন থাকলে কী করব?', 'প্রতিটি অধ্যায় ও লেকচারে "প্রশ্ন করুন" বাটন আছে। এছাড়া নিচের কোণের যোগাযোগ বাটন থেকেও প্রশ্ন পাঠাতে পারেন।']
];

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <div className="rounded-[30px] border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-7 space-y-4">
      <h3 className="text-xl sm:text-2xl font-extrabold text-white">সাধারণ প্রশ্নোত্তর (FAQ)</h3>
      <div className="divide-y divide-slate-800">
        {FAQ_ITEMS.map(([q, a], i) => (
          <div key={q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm font-bold text-white">{q}</span>
              <ChevronRight className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open === i ? 'rotate-90' : ''}`} />
            </button>
            {open === i && <p className="pb-4 text-sm leading-relaxed text-slate-300">{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Share, demo video, daily question, progress
// Share the current page (or a given path) to WhatsApp / Facebook, copy its link, or use the phone's share sheet.
function ShareButtons({ text, path, light = false, className = '' }) {
  const [copied, setCopied] = useState(false);
  const url = () => SITE_ORIGIN + (path || window.location.pathname);
  const open = (href) => window.open(href, '_blank', 'noopener,noreferrer');
  const btn = `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
    light ? 'bg-white/20 text-white hover:bg-white/30' : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
  }`;
  const copy = () => {
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    };
    try {
      navigator.clipboard.writeText(url()).then(done, () => window.prompt('লিংক কপি করুন:', url()));
    } catch {
      window.prompt('লিংক কপি করুন:', url());
    }
  };
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className={`text-[11px] font-semibold ${light ? 'text-white/80' : 'text-slate-400'}`}>শেয়ার:</span>
      <button type="button" className={btn} onClick={() => open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url()}`)}`)}>
        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
      </button>
      <button type="button" className={btn} onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)}>
        <Facebook className="h-3.5 w-3.5" /> Facebook
      </button>
      <button type="button" className={btn} onClick={copy}>
        {copied ? '✓ কপি হয়েছে' : '🔗 লিংক কপি'}
      </button>
    </div>
  );
}

const demoVideoId = (v) => {
  const m = String(v || '').trim().match(/^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#\/].*)?$/);
  return m ? m[1] : '';
};

// Free demo class on the home page (link set on the admin page). The player loads only after a tap.
function DemoVideoSection() {
  const content = useContent();
  const [playing, setPlaying] = useState(false);
  const settings = (content && content.settings) || {};
  const id = demoVideoId(settings.demoVideo);
  if (!id) return null;
  return (
    <div id="demo-class" className="grid items-center gap-5 rounded-[30px] border border-teal-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-7 lg:grid-cols-[1.25fr_1fr]">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={settings.demoTitle || 'ফ্রি ডেমো ক্লাস'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label="ডেমো ক্লাস চালু করুন" className="group absolute inset-0 h-full w-full">
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 shadow-xl transition group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-white text-white" />
            </span>
          </button>
        )}
      </div>
      <div className="space-y-3">
        <span className="inline-block rounded-full bg-teal-400/15 px-3 py-1 text-[11px] font-bold text-teal-300">ফ্রি ডেমো ক্লাস</span>
        <h3 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">{settings.demoTitle || 'ভর্তি হওয়ার আগে একটি ক্লাস দেখে নিন'}</h3>
        <p className="text-sm leading-relaxed text-slate-300">পড়ানোর ধরন পছন্দ হলে প্রতিটি অধ্যায়ের প্রথম লেকচার ফ্রি দেখে শুরু করুন।</p>
        <ShareButtons text="Emran Islam স্যারের ফ্রি ডেমো ক্লাস:" path="/" />
      </div>
    </div>
  );
}

// "আজকের প্রশ্ন": one question a day from the admin's list, in turn. The answer and a day streak stay on this device.
const dhakaDay = () => Math.floor((Date.now() + 6 * 3600 * 1000) / 86400000);
const readDaily = () => {
  try {
    return JSON.parse(localStorage.getItem('dailyQuestion') || '{}') || {};
  } catch {
    return {};
  }
};
function DailyQuestion() {
  const content = useContent();
  const list = (content && content.daily) || [];
  const day = dhakaDay();
  const [saved, setSaved] = useState(readDaily);
  if (list.length === 0) return null;
  const q = list[day % list.length];
  const answeredToday = saved.day === day && saved.id === q.id;
  const choice = answeredToday ? saved.choice : null;
  const streak = saved.day === day || saved.day === day - 1 ? saved.streak || 0 : 0;
  const pick = (i) => {
    if (answeredToday) return;
    const next = { day, id: q.id, choice: i, streak: saved.day === day - 1 ? (saved.streak || 0) + 1 : 1 };
    setSaved(next);
    try {
      localStorage.setItem('dailyQuestion', JSON.stringify(next));
    } catch {
      // Storage unavailable: the answer still shows for this visit.
    }
  };
  const right = choice === q.answer;
  return (
    <div id="daily-question" className="rounded-[30px] border border-violet-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-7 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-extrabold text-white sm:text-2xl">🧠 আজকের প্রশ্ন</h3>
        {streak > 0 && (
          <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300">🔥 টানা {toBnDigits(streak)} দিন</span>
        )}
      </div>
      <p className="text-sm font-semibold leading-relaxed text-white sm:text-base">{q.q}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const state = !answeredToday ? 'idle' : i === q.answer ? 'right' : i === choice ? 'wrong' : 'rest';
          return (
            <button
              key={i}
              type="button"
              disabled={answeredToday}
              onClick={() => pick(i)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                state === 'idle'
                  ? 'border-slate-700 bg-slate-950 text-slate-100 hover:border-violet-400 hover:bg-violet-500/10'
                  : state === 'right'
                  ? 'border-emerald-400 bg-emerald-500/15 text-emerald-100'
                  : state === 'wrong'
                  ? 'border-rose-400 bg-rose-500/15 text-rose-100'
                  : 'border-slate-800 bg-slate-950/60 text-slate-500'
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black">{'কখগঘ'[i]}</span>
              <span>{o}</span>
              {state === 'right' && <span className="ml-auto">✓</span>}
              {state === 'wrong' && <span className="ml-auto">✗</span>}
            </button>
          );
        })}
      </div>
      {answeredToday ? (
        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className={`text-sm font-extrabold ${right ? 'text-emerald-300' : 'text-rose-300'}`}>
            {right ? '🎉 সঠিক উত্তর!' : `উত্তর ভুল হয়েছে। সঠিক উত্তর: ${'কখগঘ'[q.answer]}) ${q.options[q.answer]}`}
          </div>
          {q.explain && <p className="text-sm leading-relaxed text-slate-300">{q.explain}</p>}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-400">কাল নতুন প্রশ্ন আসবে।</span>
            <ShareButtons text={`আজকের প্রশ্ন: ${q.q} তুমি পারবে?`} path="/" />
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400">একটি উত্তর বেছে নিন। সাথে সাথে ব্যাখ্যা দেখাবে।</p>
      )}
    </div>
  );
}

// "যেখানে থেমেছিলেন": the last chapter opened on this device.
const readLastStudy = () => {
  try {
    const v = JSON.parse(localStorage.getItem('lastStudy') || 'null');
    return v && typeof v.path === 'string' && /^\/[a-z0-9\-/]*$/i.test(v.path) && v.title ? v : null;
  } catch {
    return null;
  }
};
function ContinueBanner({ completed }) {
  const [last] = useState(readLastStudy);
  if (!last) return null;
  const done = (last.keys || []).filter((k) => completed[k]).length;
  const total = (last.keys || []).length;
  return (
    <a
      href={last.path}
      className="flex flex-col gap-3 rounded-[26px] border border-sky-400/30 bg-gradient-to-r from-sky-500/10 via-slate-900 to-slate-950 p-4 transition hover:border-sky-300/60 sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div className="min-w-0">
        <div className="text-[11px] font-bold text-sky-300">যেখানে থেমেছিলেন</div>
        <div className="truncate text-sm font-extrabold text-white sm:text-base">{last.title}</div>
        {total > 0 && <ProgressBar done={done} total={total} className="mt-2 max-w-sm" />}
      </div>
      <span className="shrink-0 rounded-xl bg-sky-400 px-4 py-2 text-center text-xs font-extrabold text-slate-950">চালিয়ে যান →</span>
    </a>
  );
}

function ProgressBar({ done, total, className = '' }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className={className}>
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
        <span>{toBnDigits(done)} / {toBnDigits(total)} লেকচার শেষ</span>
        <span className="text-emerald-300">{toBnDigits(pct)}%</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// What a chapter covers (key ideas and formulas).
function ChapterNotes({ id, english = false }) {
  const notes = chapterNotes(id);
  if (!notes) return null;
  return (
    <div className="rounded-3xl border border-amber-400/25 bg-amber-400/[0.06] p-5 sm:p-6">
      <h3 className="text-sm font-extrabold text-amber-200 sm:text-base">{english ? '📌 What you will learn in this chapter' : '📌 এই অধ্যায়ে যা শিখবেন'}</h3>
      <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-200 sm:grid-cols-2">
        {notes.map((n) => (
          <li key={n} className="flex gap-2">
            <span className="mt-0.5 text-amber-300">•</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Remembers the chapter being read so the home page can offer to continue it.
function RememberStudy({ title, keys }) {
  const sig = keys.join('|');
  useEffect(() => {
    try {
      localStorage.setItem('lastStudy', JSON.stringify({ title, path: window.location.pathname, keys, at: Date.now() }));
    } catch {
      // Storage unavailable: nothing to continue later.
    }
  }, [title, sig]);
  return null;
}

// "শেষ" toggle shown on each open lecture.
function DoneToggle({ done, onClick, english = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={english ? 'Mark this lecture as done' : 'লেকচার শেষ হিসেবে চিহ্নিত করুন'}
      className={`flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1 text-[11px] font-extrabold transition ${
        done ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700 bg-slate-950 text-slate-400 hover:text-white'
      }`}
    >
      <CheckCircle2 className="h-3.5 w-3.5" /> {done ? (english ? 'Done' : 'শেষ হয়েছে') : english ? 'Mark done' : 'শেষ করেছি'}
    </button>
  );
}

// Results typed here; student reviews come from Facebook and are chosen on the admin page (⭐ মতামত).
const RESULT_STATS = [
  // { value: '১২০+', label: 'HSC তে A+' },
];
const FB_REVIEW_LINK = () => SITE_LINKS.facebookReviews || SITE_LINKS.facebook;

function ReviewCard({ r }) {
  const initial = (r.name || '?').trim().charAt(0);
  return (
    <figure className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="text-sm tracking-widest text-amber-300" aria-hidden="true">★★★★★</div>
      <blockquote className="mt-2 flex-1 whitespace-pre-line text-sm leading-relaxed text-slate-200">“{r.text}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-sm font-black text-slate-950">{initial}</span>
        <span className="min-w-0 flex-1 text-xs">
          <span className="block truncate font-bold text-white">{r.name || 'শিক্ষার্থী'}</span>
          {r.info && <span className="block truncate text-slate-400">{r.info}</span>}
        </span>
        {r.link && (
          <a href={r.link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[11px] font-bold text-[#6ea8ff] hover:underline">
            Facebook ↗
          </a>
        )}
      </figcaption>
    </figure>
  );
}

function ProofSection() {
  const content = useContent();
  const reviews = (content && content.reviews) || [];
  const [showAll, setShowAll] = useState(false);
  const fb = FB_REVIEW_LINK();
  if (!fb && reviews.length === 0 && RESULT_STATS.length === 0) return null;
  const shown = showAll ? reviews : reviews.slice(0, 6);
  return (
    <div id="reviews" className="rounded-[30px] border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">শিক্ষার্থীদের মতামত</h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">শিক্ষার্থীরা Facebook এ যা লিখেছে।</p>
        </div>
        {fb && (
          <a
            href={fb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#1877F2] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#2d86ff]"
          >
            <Facebook className="h-4 w-4" /> Facebook এ মতামত দিন
          </a>
        )}
      </div>
      {RESULT_STATS.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {RESULT_STATS.map((r) => (
            <div key={r.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center">
              <div className="text-3xl font-black text-emerald-300">{r.value}</div>
              <div className="mt-1 text-xs font-semibold text-slate-400">{r.label}</div>
            </div>
          ))}
        </div>
      )}
      {reviews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>
          {reviews.length > 6 && (
            <div className="text-center">
              <button type="button" onClick={() => setShowAll((v) => !v)} className="text-xs font-bold text-emerald-300 hover:underline">
                {showAll ? 'কম দেখান' : `সব ${toBnDigits(reviews.length)}টি মতামত দেখুন`}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-5 text-center text-sm text-slate-300">
          আমার কাছে পড়েছেন? আপনার অভিজ্ঞতা Facebook এ লিখুন, এখানে দেখানো হবে।
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Contact
const CONTACT_CHANNELS = [
  { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, cls: 'bg-[#25D366] text-white', href: () => `https://wa.me/${SITE_LINKS.whatsapp}` },
  { key: 'telegram', label: 'Telegram', Icon: Send, cls: 'bg-[#229ED9] text-white', href: () => SITE_LINKS.telegram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook, cls: 'bg-[#1877F2] text-white', href: () => SITE_LINKS.facebook },
  { key: 'email', label: 'Email', Icon: Mail, cls: 'bg-slate-700 text-white', href: () => `mailto:${SITE_LINKS.email}` }
];
// Channels with no link set are hidden.
const activeChannels = () => CONTACT_CHANNELS.filter((c) => SITE_LINKS[c.key]);

function ContactIcons({ size = 'sm' }) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeChannels().map((c) => (
        <a
          key={c.key}
          href={c.href()}
          target={c.key === 'email' ? undefined : '_blank'}
          rel="noreferrer"
          title={c.label}
          aria-label={c.label}
          className={`flex ${box} items-center justify-center rounded-full ${c.cls} shadow transition hover:scale-110`}
        >
          <c.Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

function FloatingContact({ onAsk }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-60 space-y-1.5 rounded-2xl border border-slate-700 bg-slate-900/95 p-2.5 shadow-2xl backdrop-blur">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onAsk();
            }}
            className="flex w-full items-center gap-3 rounded-xl bg-amber-400 px-3 py-2.5 text-left text-sm font-extrabold text-slate-950 hover:bg-amber-300"
          >
            <span className="text-lg">❓</span> প্রশ্ন করুন
          </button>
          {activeChannels().map((c) => (
            <a
              key={c.key}
              href={c.href()}
              target={c.key === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-white hover:bg-slate-800"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${c.cls}`}>
                <c.Icon className="h-4 w-4" />
              </span>
              {c.label}
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="যোগাযোগ"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-slate-950 shadow-[0_10px_30px_rgba(20,184,166,0.45)] transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- Private slots
// Sample slots used until SITE_LINKS.slotSheetCsv is set (see docs/SLOTS.md).
//   for:    'one' (1-to-1), 'custom' (custom O/A-Level batch) or 'all'
//   mode:   'Online', 'Offline' or 'Both'
//   status: 'available' or 'booked'. Slots not listed are locked.
const SAMPLE_SLOTS = [
  { day: 'শনি', time: 'বিকাল ৪:০০ – ৫:৩০', for: 'all', mode: 'Both', status: 'available' },
  { day: 'শনি', time: 'সন্ধ্যা ৬:০০ – ৭:৩০', for: 'one', mode: 'Online', status: 'booked' },
  { day: 'রবি', time: 'সকাল ১০:০০ – ১১:৩০', for: 'custom', mode: 'Both', status: 'available' },
  { day: 'সোম', time: 'বিকাল ৪:০০ – ৫:৩০', for: 'all', mode: 'Offline', status: 'available' },
  { day: 'সোম', time: 'রাত ৯:০০ – ১০:৩০', for: 'one', mode: 'Online', status: 'available' },
  { day: 'বুধ', time: 'সন্ধ্যা ৬:০০ – ৭:৩০', for: 'all', mode: 'Both', status: 'booked' },
  { day: 'বৃহস্পতি', time: 'রাত ৯:০০ – ১০:৩০', for: 'all', mode: 'Online', status: 'available' },
  { day: 'শুক্র', time: 'সকাল ১০:০০ – ১১:৩০', for: 'custom', mode: 'Both', status: 'available' },
  { day: 'শুক্র', time: 'বিকাল ৩:০০ – ৪:৩০', for: 'all', mode: 'Both', status: 'booked' }
];

const DAY_ALIASES = {
  sat: 'শনি', saturday: 'শনি', sun: 'রবি', sunday: 'রবি', mon: 'সোম', monday: 'সোম', tue: 'মঙ্গল', tuesday: 'মঙ্গল',
  wed: 'বুধ', wednesday: 'বুধ', thu: 'বৃহস্পতি', thursday: 'বৃহস্পতি', fri: 'শুক্র', friday: 'শুক্র'
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

function slotsFromCsv(text) {
  const [header, ...rows] = parseCsv(text);
  const col = (name) => header.findIndex((h) => h.trim().toLowerCase() === name);
  const idx = { day: col('day'), time: col('time'), for: col('for'), mode: col('mode'), status: col('status') };
  return rows
    .map((r) => {
      const get = (k) => (idx[k] >= 0 ? (r[idx[k]] || '').trim() : '');
      const rawDay = get('day');
      return {
        day: DAY_ALIASES[rawDay.toLowerCase()] || rawDay,
        time: get('time'),
        for: (get('for') || 'all').toLowerCase(),
        mode: get('mode') || 'Both',
        status: (get('status') || '').toLowerCase()
      };
    })
    .filter((s) => s.day && s.time && (s.status === 'available' || s.status === 'booked'));
}

function useSlots() {
  const content = useContent();
  const [state, setState] = useState({ slots: SITE_LINKS.slotSheetCsv ? null : SAMPLE_SLOTS, error: false });
  useEffect(() => {
    if (!SITE_LINKS.slotSheetCsv) return undefined;
    let cancelled = false;
    fetch(SITE_LINKS.slotSheetCsv, { cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((t) => !cancelled && setState({ slots: slotsFromCsv(t), error: false }))
      .catch(() => !cancelled && setState({ slots: [], error: true }));
    return () => {
      cancelled = true;
    };
  }, []);
  if (SITE_LINKS.contentApi) {
    return content ? { slots: content.slots || [], error: !!content.error } : { slots: null, error: false };
  }
  return state;
}

const slotId = (s) => `${s.day} • ${s.time}`;

function SlotPicker({ forType, mode, selected, onChange }) {
  const { slots, error } = useSlots();
  const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র'];
  if (!slots) return <div className="rounded-xl bg-slate-950 p-4 text-xs text-slate-400">স্লট লোড হচ্ছে…</div>;
  const mine = slots.filter((s) => s.for === 'all' || s.for === forType);
  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs text-rose-200">
          স্লটের তালিকা এখন লোড করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন বা যোগাযোগ বাটনে জানান।
        </div>
      )}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {days.map((d) => {
          const daySlots = mine.filter((s) => s.day === d);
          return (
            <div key={d} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
              <div className="mb-2 text-xs font-extrabold text-white">{d}</div>
              {daySlots.length === 0 ? (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Lock className="h-3 w-3" /> কোনো খালি স্লট নেই
                </div>
              ) : (
                <div className="space-y-1.5">
                  {daySlots.map((s) => {
                    const id = slotId(s);
                    const booked = s.status === 'booked';
                    const wrongMode = !booked && s.mode !== 'Both' && s.mode !== mode;
                    const on = selected.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        disabled={booked || wrongMode}
                        onClick={() => toggle(id)}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-2.5 py-2 text-left text-[11px] font-bold transition ${
                          booked
                            ? 'cursor-not-allowed border-slate-800 bg-slate-900 text-slate-500'
                            : wrongMode
                            ? 'cursor-not-allowed border-slate-800 bg-slate-900 text-slate-500'
                            : on
                            ? 'border-amber-400 bg-amber-400 text-slate-950'
                            : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400'
                        }`}
                      >
                        <span className={booked ? 'line-through' : ''}>{s.time}</span>
                        <span className="shrink-0">
                          {booked ? '🔒 বুকড' : wrongMode ? `শুধু ${s.mode}` : on ? '✓' : 'খালি'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
        <span><span className="text-emerald-300">■</span> খালি — বেছে নেওয়া যাবে</span>
        <span><span className="text-slate-500">■</span> 🔒 বুকড / লক</span>
        <span>রিকোয়েস্ট পাঠালেই স্লট বুক হয় না; কনফার্ম হলে সবার জন্য লক দেখাবে।</span>
      </div>
    </div>
  );
}

function ResearchProfileLinks() {
  const links = [
    ['Google Scholar', SITE_LINKS.googleScholar],
    ['ORCID', SITE_LINKS.orcid],
    ['ResearchGate', SITE_LINKS.researchGate]
  ].filter(([, url]) => url);
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {links.map(([label, url]) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[#d6eadf] bg-white px-4 py-2.5 text-sm font-semibold text-[#2c7353] transition hover:border-[#3f8a68]"
        >
          <ExternalLink className="h-4 w-4" /> {label}
        </a>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- Page addresses (/hsc-bangla/paper1/p1-ch1/)
// Every page has its own real address, e.g. /hsc-bangla/paper2/p2-ch3/. The build step
// (scripts/prerender.mjs) writes an HTML page for each one so search engines can index it.
// Older shared links of the form /#/hsc-bangla/... still work.
const PAGE_SLUGS = {
  'HSC Bangla Version': 'hsc-bangla',
  'HSC English Version': 'hsc-english',
  'O-Level & A-Level': 'o-a-level',
  'Admission Test (BUET/DU)': 'admission',
  'Job Math': 'job-math',
  'B.Sc. Honours Math': 'honours',
  'Research & Papers': 'research',
  'About Me': 'about',
  'Private Batch': 'private',
  'Class Routine': 'routine',
  'Live Exam': 'exams',
  Admin: 'admin'
};
const SLUG_PAGES = Object.fromEntries(Object.entries(PAGE_SLUGS).map(([page, slug]) => [slug, page]));

const navStateToPath = (st) => {
  if (!st || st.page === 'HOME') return '/';
  if (st.page === 'COURSE' && st.course) {
    const c = st.course;
    const base = `/${PAGE_SLUGS[c.parent] || ''}`;
    if (c.kind === 'bv') return `${base}/course/${c.id}/`;
    if (c.kind === 'bvChapter') return `${base}/${c.paperKey}/${c.chapterId}/`;
    if (c.kind === 'track' || c.kind === 'trackChapter') {
      const track = PART3_ACADEMIC_TRACKS[c.trackId];
      const mod = track && track.modules[c.moduleIdx];
      if (!mod) return `${base}/`;
      const ch = c.kind === 'trackChapter' && mod.chapters[c.chapterIdx];
      return ch ? `${base}/${mod.id}/${ch.id}/` : `${base}/${mod.id}/`;
    }
    if (c.kind === 'about') return `${base}/${c.role}/`;
    if (c.kind === 'private') return `${base}/${c.option}/`;
    return `${base}/`;
  }
  const slug = PAGE_SLUGS[st.page];
  if (!slug) return '/';
  const o = st.options || {};
  if (o.admUniv) return `/${slug}/${o.admUniv}/`;
  if (o.honYear) return `/${slug}/${o.honYear}/`;
  if (o.researchCardId) return `/${slug}/${o.researchCardId}/`;
  if (o.bvPaperKey) return `/${slug}/${o.bvPaperKey}/`;
  return `/${slug}/`;
};

// Rebuilds the navigation state (same shape openSubPage / openCourse use) from an address.
const partsToNavState = (parts) => {
  const page = SLUG_PAGES[parts[0]];
  if (!page) return { page: 'HOME' };
  const [, a, b] = parts;
  if (!a) return { page };

  if (page === 'HSC Bangla Version') {
    if (a === 'course') {
      const c = SPECIAL_COURSES_WITH_BOOKS.find((x) => x.id === b);
      return c ? { page: 'COURSE', course: { kind: 'bv', id: c.id, parent: 'Private Batch', title: c.courseTitle } } : { page };
    }
    const paper = HSC_BV_PAPERS[a];
    if (!paper) return { page };
    const ch = b && paper.chapters.find((x) => x.id === b);
    if (!ch) return { page, options: { bvPaperKey: a } };
    return { page: 'COURSE', course: { kind: 'bvChapter', paperKey: a, chapterId: ch.id, parent: page, title: `${ch.num}: ${ch.title}` } };
  }

  if (page === 'Admission Test (BUET/DU)' && a && !b && ADMISSION_UNIVERSITY_BY_ID[a]) {
    return { page, options: { admUniv: a } };
  }

  if (page === 'B.Sc. Honours Math' && a && !b && HONOURS_YEAR_BY_ID[a]) {
    return { page, options: { honYear: a } };
  }

  const track = PART3_ACADEMIC_TRACKS[page];
  if (track) {
    // Modules and chapters are addressed by id (/hsc-english/ev-p1/ev1-ch1/); the older m0 / c3 form still works.
    let moduleIdx = track.modules.findIndex((m) => m.id === a);
    if (moduleIdx < 0) {
      const mm = /^m(\d+)$/.exec(a);
      moduleIdx = mm ? Number(mm[1]) : -1;
    }
    const mod = track.modules[moduleIdx];
    if (!mod) return { page };
    let chapterIdx = b ? mod.chapters.findIndex((c) => c.id === b) : -1;
    if (chapterIdx < 0 && b) {
      const cm = /^c(\d+)$/.exec(b);
      chapterIdx = cm && mod.chapters[Number(cm[1])] ? Number(cm[1]) : -1;
    }
    const ch = chapterIdx >= 0 && mod.chapters[chapterIdx];
    if (ch) {
      return {
        page: 'COURSE',
        course: { kind: 'trackChapter', trackId: page, parent: page, moduleIdx, chapterIdx, title: `${ch.num} — ${ch.title}`, sub: `${mod.name} • ${ch.eng}`, icon: ch.icon, grad: mod.grad }
      };
    }
    return {
      page: 'COURSE',
      course: { kind: 'track', trackId: page, parent: page, moduleIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad }
    };
  }

  if (page === 'Research & Papers' && RESEARCH_SHOWCASE_CARDS.some((x) => x.id === a)) {
    return { page, options: { researchCardId: a, anchorId: 'research-detail' } };
  }
  if (page === 'About Me') {
    const r = ABOUT_ROLES.find((x) => x.key === a);
    return r ? { page: 'COURSE', course: { kind: 'about', role: r.key, parent: page, title: r.title } } : { page };
  }
  if (page === 'Private Batch') {
    if (a === 'course') {
      const c = SPECIAL_COURSES_WITH_BOOKS.find((x) => x.id === b);
      return c ? { page: 'COURSE', course: { kind: 'bv', id: c.id, parent: page, title: c.courseTitle } } : { page };
    }
    const o = PRIVATE_OPTIONS.find((x) => x.key === a);
    return o ? { page: 'COURSE', course: { kind: 'private', option: o.key, parent: page, title: o.title } } : { page };
  }
  return { page };
};

const pathToNavState = (pathname) =>
  partsToNavState((pathname || '').split('/').filter(Boolean).map(decodeURIComponent));
// Older links: /#/hsc-bangla/paper1
const hashToNavState = (hash) =>
  partsToNavState((hash || '').replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent));

// ---------------------------------------------------------------- Page titles, descriptions and links
// One description of every page, used for the browser tab and share previews while browsing and by
// scripts/prerender.mjs to write the static HTML that search engines read.
const SITE_ORIGIN = 'https://10takaschool.com';
const HOME_TITLE = 'Emran Islam (ইমরান ইসলাম) | HSC Higher Math, Admission & Honours Math Teacher, Dhaka';
const HOME_DESCRIPTION =
  'ইমরান ইসলাম, গণিতের প্রভাষক, হামদর্দ পাবলিক কলেজ, ঢাকা। HSC উচ্চতর গণিত (বাংলা ও ইংলিশ ভার্সন), O/A-Level, BUET ও ভার্সিটি ভর্তি এবং B.Sc. Honours Math এর লেকচার, নোট, মডেল টেস্ট ও প্রাইভেট ব্যাচ। Emran Islam, Lecturer in Mathematics, Hamdard Public College, Dhaka.';

const oneLine = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const clipText = (s, n = 158) => {
  const t = oneLine(s);
  return t.length <= n ? t : `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…`;
};

const paperKeyOfChapter = (chId) => {
  const p = Object.values(HSC_BV_PAPERS).find((x) => x.chapters.some((c) => c.id === chId));
  return p ? p.id : null;
};

// Returns { path, title, description, heading, summary, crumbs, children, index } for a navigation
// state (the same shape openSubPage / openCourse use), or null for an unknown page.
const routeInfo = (st) => {
  const path = navStateToPath(st);
  const home = { path: '/', label: 'হোম' };
  const make = (o) => ({ path, index: true, children: [], crumbs: [home], ...o, description: clipText(o.description || o.summary) });
  const suffix = ' | Emran Islam';
  const link = (nav, label) => ({ path: navStateToPath(nav), label });
  const pageLink = (page) => link({ page }, page === 'HSC Bangla Version' ? 'HSC উচ্চতর গণিত (বাংলা ভার্সন)' : page === 'Private Batch' ? 'প্রাইভেট ব্যাচ' : PART3_ACADEMIC_TRACKS[page] ? PART3_ACADEMIC_TRACKS[page].title : page);

  if (!st || st.page === 'HOME') return make({ title: HOME_TITLE, heading: 'ইমরান ইসলাম (Emran Islam) — গণিতের প্রভাষক, ঢাকা', summary: HOME_DESCRIPTION, crumbs: [] });

  if (st.page === 'COURSE' && st.course) {
    const c = st.course;
    const parent = c.parent;
    const parentLink = pageLink(parent);
    if (c.kind === 'bv') {
      const course = SPECIAL_COURSES_WITH_BOOKS.find((x) => x.id === c.id);
      if (!course) return null;
      return make({
        title: `${course.courseTitle} মাস্টার কোর্স — HSC উচ্চতর গণিত${suffix}`,
        heading: `${course.courseTitle} (${course.courseEng})`,
        summary: `${course.courseEng} — ${course.chaptersIncluded}। ${course.liveSchedule}। কোর্স ফি ${course.priceBdt}। বই: ${course.bookTitle}।`,
        crumbs: [home, parentLink],
        children: course.syllabusChapters.map((ch) => {
          const pk = paperKeyOfChapter(ch.chId);
          return pk ? link({ page: 'COURSE', course: { kind: 'bvChapter', paperKey: pk, chapterId: ch.chId, parent: 'HSC Bangla Version' } }, `${ch.paper} ${ch.num}: ${ch.title}`) : null;
        }).filter(Boolean)
      });
    }
    if (c.kind === 'bvChapter') {
      const paper = HSC_BV_PAPERS[c.paperKey];
      const ch = paper && paper.chapters.find((x) => x.id === c.chapterId);
      if (!ch) return null;
      return make({
        title: `${ch.title} (${ch.eng}) — ${paper.title} ${ch.num}${suffix}`,
        heading: `${paper.title} — ${ch.num}: ${ch.title}`,
        summary: `${paper.title}, ${ch.num} "${ch.title}" (${ch.eng}): ধাপে ধাপে লেকচার, সেলফ টেস্ট ও MCQ কুইজ। প্রথম লেকচার ফ্রি, পরের লেকচার মাত্র ৳৩০।${chapterNotes(ch.id) ? ` এই অধ্যায়ে যা শিখবেন: ${chapterNotes(ch.id).join('; ')}।` : ''}`,
        description: chapterNotes(ch.id)
          ? `${paper.title} ${ch.num}: ${ch.title} — ${chapterNotes(ch.id).slice(0, 3).join('; ')}। প্রথম লেকচার ফ্রি।`
          : `${paper.title} ${ch.num}: ${ch.title} (${ch.eng}) — ধাপে ধাপে লেকচার, সেলফ টেস্ট ও MCQ কুইজ। প্রথম লেকচার ফ্রি।`,
        crumbs: [home, parentLink, link({ page: parent, options: { bvPaperKey: paper.id } }, paper.title)]
      });
    }
    if (c.kind === 'track' || c.kind === 'trackChapter') {
      const track = PART3_ACADEMIC_TRACKS[c.trackId];
      const mod = track && track.modules[c.moduleIdx];
      if (!mod) return null;
      // Honours courses repeat names across years (e.g. Math Lab), so their pages carry the course code.
      const modName = mod.courseCode ? `${mod.courseCode} ${mod.name}` : mod.name;
      const modLink = link({ page: 'COURSE', course: { kind: 'track', trackId: c.trackId, moduleIdx: c.moduleIdx, parent } }, modName);
      const admU = c.trackId === 'Admission Test (BUET/DU)' && mod.univ && ADMISSION_UNIVERSITY_BY_ID[mod.univ];
      const honY = c.trackId === 'B.Sc. Honours Math' && mod.year && HONOURS_YEAR_BY_ID[mod.year];
      const univCrumb = admU
        ? [link({ page: c.trackId, options: { admUniv: admU.id } }, admU.name)]
        : honY
        ? [link({ page: c.trackId, options: { honYear: honY.id } }, honY.name)]
        : [];
      if (c.kind === 'track') {
        return make({
          title: `${modName} — ${track.id}${suffix}`,
          heading: modName,
          summary: `${modName}: ${mod.sub}. অধ্যায়: ${mod.chapters.map((x) => x.title).join(', ')}।`,
          crumbs: [home, parentLink, ...univCrumb],
          children: mod.chapters.map((ch, i) => link({ page: 'COURSE', course: { kind: 'trackChapter', trackId: c.trackId, moduleIdx: c.moduleIdx, chapterIdx: i, parent } }, `${ch.num} — ${ch.title}`))
        });
      }
      const ch = mod.chapters[c.chapterIdx];
      if (!ch) return null;
      return make({
        title: `${ch.title} (${ch.eng}) — ${modName}${suffix}`,
        heading: `${modName} — ${ch.num}: ${ch.title}`,
        summary: ch.topics
          ? `${modName}, ${ch.num}: ${ch.title}. Topics: ${ch.topics.join('; ')}. প্রথম লেকচার ফ্রি, পরের লেকচার ৳${track.unlockFee}।`
          : `${ch.title}: ${ch.eng}. ${modName} (${track.id}) এর লেকচার, নোট ও সেলফ টেস্ট। প্রথম লেকচার ফ্রি, পরের লেকচার ৳${track.unlockFee}।${chapterNotes(ch.id) ? ` What you will learn: ${chapterNotes(ch.id).join('; ')}.` : ''}`,
        description: ch.topics
          ? `${modName} — ${ch.title}: ${ch.topics.join(', ')}.`
          : chapterNotes(ch.id)
          ? `${ch.title} — ${modName}: ${chapterNotes(ch.id).slice(0, 3).join('; ')}. First lecture free.`
          : `${ch.title} (${ch.eng}) — ${modName}: লেকচার, নোট ও সেলফ টেস্ট। প্রথম লেকচার ফ্রি।`,
        crumbs: [home, parentLink, ...univCrumb, modLink]
      });
    }
    if (c.kind === 'about') {
      const r = ABOUT_ROLES.find((x) => x.key === c.role);
      if (!r) return null;
      return make({ title: `${r.title} — Emran Islam, Lecturer in Mathematics${suffix.replace(' | Emran Islam', '')}`, heading: `${r.title} — Emran Islam`, summary: r.text, crumbs: [home, link({ page: 'About Me' }, 'About Me')] });
    }
    if (c.kind === 'private') {
      const o = PRIVATE_OPTIONS.find((x) => x.key === c.option);
      if (!o) return null;
      return make({ title: `${o.title} — Online ও Offline, ঢাকা${suffix}`, heading: o.title, summary: o.sub, crumbs: [home, link({ page: 'Private Batch' }, 'প্রাইভেট ব্যাচ')] });
    }
    return null;
  }

  const page = st.page;
  const o = st.options || {};
  if (page === 'HSC Bangla Version') {
    if (o.bvPaperKey) {
      const paper = HSC_BV_PAPERS[o.bvPaperKey];
      if (!paper) return null;
      return make({
        title: `${paper.title} — সব অধ্যায়, লেকচার ও সেলফ টেস্ট${suffix}`,
        heading: paper.title,
        summary: `${paper.title}: ${paper.chapters.map((c) => c.title).join(', ')}। প্রতিটি অধ্যায়ে ধারাবাহিক লেকচার, সেলফ টেস্ট ও MCQ কুইজ।`,
        crumbs: [home, pageLink(page)],
        children: paper.chapters.map((ch) => link({ page: 'COURSE', course: { kind: 'bvChapter', paperKey: paper.id, chapterId: ch.id, parent: page } }, `${ch.num}: ${ch.title}`))
      });
    }
    return make({
      title: `HSC উচ্চতর গণিত (বাংলা ভার্সন) — ১ম ও ২য় পত্র, স্পেশাল কোর্স${suffix}`,
      heading: 'HSC উচ্চতর গণিত — বাংলা ভার্সন',
      summary: 'উচ্চতর গণিত ১ম ও ২য় পত্রের সব অধ্যায় — লেকচার, সেলফ টেস্ট ও MCQ কুইজসহ। প্রতিটি অধ্যায়ের প্রথম লেকচার ফ্রি। লেখকের বই ও PDF কপি।',
      children: Object.values(HSC_BV_PAPERS).map((p) => link({ page, options: { bvPaperKey: p.id } }, `${p.title}ের অধ্যায় সমূহ`))
    });
  }
  if (page === 'Admission Test (BUET/DU)') {
    const admT = PART3_ACADEMIC_TRACKS[page];
    if (o.admUniv) {
      const u = ADMISSION_UNIVERSITY_BY_ID[o.admUniv];
      if (!u) return null;
      const sections = admT.modules.map((m, i) => ({ m, i })).filter(({ m }) => m.univ === u.id);
      return make({
        title: `${u.full} — ভর্তি পরীক্ষার গণিত প্রস্তুতি${suffix}`,
        heading: u.full,
        summary: `${u.full} ভর্তি পরীক্ষার গণিত প্রস্তুতি: অধ্যায় ভিত্তিক ক্লাস ও মডেল টেস্ট। প্রথম লেকচার ফ্রি, পরের লেকচার ৳${admT.unlockFee}।`,
        crumbs: [home, pageLink(page)],
        children: sections.map(({ m, i }) => link({ page: 'COURSE', course: { kind: 'track', trackId: page, moduleIdx: i, parent: page } }, `${u.name} — ${m.cardLabel}`))
      });
    }
    return make({
      title: `ভর্তি পরীক্ষার প্রস্তুতি — ঢাবি, জাবি, চবি, রাবি, গুচ্ছ, শাবিপ্রবি${suffix}`,
      heading: 'বিশ্ববিদ্যালয় ভর্তি পরীক্ষার গণিত প্রস্তুতি',
      summary: `প্রতিটি বিশ্ববিদ্যালয়ের জন্য অধ্যায় ভিত্তিক ক্লাস ও মডেল টেস্ট — ${ADMISSION_UNIVERSITIES.map((u) => u.full).join(', ')}।`,
      children: ADMISSION_UNIVERSITIES.map((u) => link({ page, options: { admUniv: u.id } }, u.name))
    });
  }
  if (page === 'B.Sc. Honours Math') {
    const honT = PART3_ACADEMIC_TRACKS[page];
    if (o.honYear) {
      const y = HONOURS_YEAR_BY_ID[o.honYear];
      if (!y) return null;
      const courses = honT.modules.map((m, i) => ({ m, i })).filter(({ m }) => m.year === y.id);
      return make({
        title: `B.Sc. Honours গণিত — ${y.name}${suffix}`,
        heading: `B.Sc. (Honours) Mathematics — ${y.name}`,
        summary: `${y.full}: ${courses.map(({ m }) => `${m.courseCode} ${m.name}`).join(', ')}।`,
        crumbs: [home, pageLink(page)],
        children: courses.map(({ m, i }) => link({ page: 'COURSE', course: { kind: 'track', trackId: page, moduleIdx: i, parent: page } }, `${m.courseCode}: ${m.name}`))
      });
    }
    return make({
      title: `B.Sc. (Honours) গণিত — ১ম, ২য়, ৩য় ও ৪র্থ বর্ষের কোর্স${suffix}`,
      heading: 'B.Sc. (Honours) in Mathematics',
      summary: `১ম, ২য়, ৩য় ও ৪র্থ বর্ষের সব কোর্স — ${HONOURS_YEARS.map((y) => y.name).join(', ')}।`,
      children: HONOURS_YEARS.map((y) => link({ page, options: { honYear: y.id } }, y.name))
    });
  }
  const track = PART3_ACADEMIC_TRACKS[page];
  if (track) {
    return make({
      title: `${track.title}${suffix}`,
      heading: track.title,
      summary: `${track.subtitle} ${track.modules.map((m) => m.name).join('; ')}।`,
      children: track.modules.map((m, i) => link({ page: 'COURSE', course: { kind: 'track', trackId: page, moduleIdx: i, parent: page } }, m.name))
    });
  }
  if (page === 'Research & Papers') {
    if (o.researchCardId) {
      const card = RESEARCH_SHOWCASE_CARDS.find((x) => x.id === o.researchCardId);
      if (!card) return null;
      return make({ title: `${card.title} — Research${suffix}`, heading: card.title, summary: card.sub, crumbs: [home, link({ page }, 'Research & Papers')] });
    }
    return make({
      title: `Research, Papers & Thesis Consultation — Emran Islam${suffix.replace(' | Emran Islam', '')}`,
      heading: 'Research & Papers',
      summary: 'Optimization, computational mathematics and scientific machine learning: research, papers, books, datasets and thesis consultation by Emran Islam.',
      children: RESEARCH_SHOWCASE_CARDS.map((c) => link({ page, options: { researchCardId: c.id } }, c.title))
    });
  }
  if (page === 'About Me') {
    return make({
      title: `About Emran Islam — Teacher, Researcher & Author${suffix.replace(' | Emran Islam', '')}`,
      heading: 'About Emran Islam',
      summary: 'ইমরান ইসলাম: গণিতের শিক্ষক, গবেষক ও লেখক। Lecturer in Mathematics, Hamdard Public College, Dhaka; M.Sc. and B.Sc. (Hons) from Jahangirnagar University.',
      children: ABOUT_ROLES.map((r) => link({ page: 'COURSE', course: { kind: 'about', role: r.key, parent: page } }, r.title))
    });
  }
  if (page === 'Private Batch') {
    return make({
      title: `প্রাইভেট ব্যাচ ও ১-টু-১ সেশন (Online / Offline), ঢাকা${suffix}`,
      heading: 'প্রাইভেট ব্যাচ ও ১-টু-১ সেশন',
      summary: `${PRIVATE_OPTIONS.map((x) => `${x.title}: ${x.sub}`).join(' ')} স্পেশাল কোর্স: ${SPECIAL_COURSES_WITH_BOOKS.map((c) => c.courseTitle).join(', ')}।`,
      children: [
        ...PRIVATE_OPTIONS.map((x) => link({ page: 'COURSE', course: { kind: 'private', option: x.key, parent: page } }, x.title)),
        ...SPECIAL_COURSES_WITH_BOOKS.map((c) => link({ page: 'COURSE', course: { kind: 'bv', id: c.id, parent: page } }, `${c.courseTitle} মাস্টার কোর্স`))
      ]
    });
  }
  if (page === 'Class Routine') {
    return make({ title: `লাইভ ক্লাসের রুটিন${suffix}`, heading: 'লাইভ ক্লাসের রুটিন', summary: 'সব লাইভ ও অফলাইন ক্লাসের সাপ্তাহিক রুটিন এক জায়গায়। HSC, O/A-Level, ভর্তি প্রস্তুতি ও অনার্স গণিত।' });
  }
  if (page === 'Live Exam') {
    return make({ title: `লাইভ এক্সাম — প্রতিটি মাত্র ৳১০${suffix}`, heading: 'লাইভ এক্সাম', summary: 'টাইমারসহ MCQ পরীক্ষা দিন, সাথে সাথে স্কোর, সঠিক উত্তর, ব্যাখ্যা ও র‍্যাঙ্কিং দেখুন। প্রতিটি পরীক্ষা মাত্র ৳১০।' });
  }
  if (page === 'Admin') {
    return make({ title: `Admin${suffix}`, heading: 'Admin', summary: 'Control panel', index: false });
  }
  return null;
}

// Every page of the site, for the static pages and the sitemap.
const listRoutes = () => {
  const sts = [{ page: 'HOME' }];
  Object.keys(PAGE_SLUGS).forEach((page) => sts.push({ page }));
  Object.values(HSC_BV_PAPERS).forEach((p) => {
    sts.push({ page: 'HSC Bangla Version', options: { bvPaperKey: p.id } });
    p.chapters.forEach((ch) => sts.push({ page: 'COURSE', course: { kind: 'bvChapter', paperKey: p.id, chapterId: ch.id, parent: 'HSC Bangla Version' } }));
  });
  SPECIAL_COURSES_WITH_BOOKS.forEach((c) => sts.push({ page: 'COURSE', course: { kind: 'bv', id: c.id, parent: 'Private Batch' } }));
  ADMISSION_UNIVERSITIES.forEach((u) => sts.push({ page: 'Admission Test (BUET/DU)', options: { admUniv: u.id } }));
  HONOURS_YEARS.forEach((y) => sts.push({ page: 'B.Sc. Honours Math', options: { honYear: y.id } }));
  Object.values(PART3_ACADEMIC_TRACKS).forEach((t) =>
    t.modules.forEach((m, mi) => {
      sts.push({ page: 'COURSE', course: { kind: 'track', trackId: t.id, moduleIdx: mi, parent: t.id } });
      m.chapters.forEach((_, ci) => sts.push({ page: 'COURSE', course: { kind: 'trackChapter', trackId: t.id, moduleIdx: mi, chapterIdx: ci, parent: t.id } }));
    })
  );
  ABOUT_ROLES.forEach((r) => sts.push({ page: 'COURSE', course: { kind: 'about', role: r.key, parent: 'About Me' } }));
  PRIVATE_OPTIONS.forEach((o) => sts.push({ page: 'COURSE', course: { kind: 'private', option: o.key, parent: 'Private Batch' } }));
  RESEARCH_SHOWCASE_CARDS.forEach((c) => sts.push({ page: 'Research & Papers', options: { researchCardId: c.id } }));
  return sts.map(routeInfo).filter(Boolean);
};

// Keeps the tab title and the description / share tags in step with the open page.
const setHeadTag = (selector, create, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create.tag);
    Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};
const applyHeadMeta = (info) => {
  if (!info) return;
  document.title = info.title;
  setHeadTag('meta[name="description"]', { tag: 'meta', attrs: { name: 'description' } }, 'content', info.description);
  setHeadTag('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' } }, 'href', SITE_ORIGIN + info.path);
  setHeadTag('meta[property="og:title"]', { tag: 'meta', attrs: { property: 'og:title' } }, 'content', info.title);
  setHeadTag('meta[property="og:description"]', { tag: 'meta', attrs: { property: 'og:description' } }, 'content', info.description);
  setHeadTag('meta[property="og:url"]', { tag: 'meta', attrs: { property: 'og:url' } }, 'content', SITE_ORIGIN + info.path);
  setHeadTag('meta[name="robots"]', { tag: 'meta', attrs: { name: 'robots' } }, 'content', info.index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');
};

export { routeInfo, listRoutes, SITE_ORIGIN };

// ---------------------------------------------------------------- Content from the admin Google Sheet
// With SITE_LINKS.contentApi set (the Apps Script web app URL, see docs/ADMIN.md), lecture links,
// quizzes and private slots come from the sheet and can be edited on the /admin/ page.
let contentCache = null;

// Chapter lists the admin page can rearrange: group id -> the site's own chapter array.
// The arrays are rewritten in place when content loads; the built-in lists are kept to fall back on.
const outlineTargets = () => {
  const t = {};
  Object.values(HSC_BV_PAPERS).forEach((p) => (t[`bv-${p.id}`] = { list: p.chapters, key: 'id' }));
  SPECIAL_COURSES_WITH_BOOKS.forEach((c) => (t[c.id] = { list: c.syllabusChapters, key: 'chId' }));
  Object.values(PART3_ACADEMIC_TRACKS).forEach((tr) => tr.modules.forEach((m) => (t[`p3-${m.id}`] = { list: m.chapters, key: 'id' })));
  return t;
};
const outlineDefaults = {};
function applyOutline(outline = {}) {
  const targets = outlineTargets();
  Object.keys(targets).forEach((group) => {
    const { list, key } = targets[group];
    if (!outlineDefaults[group]) outlineDefaults[group] = list.map((c) => ({ ...c }));
    const base = outlineDefaults[group];
    const rows = outline[group];
    const next = rows && rows.length
      ? rows.map((r) => ({ ...(base.find((c) => c[key] === r.id) || base[0]), [key]: r.id, num: r.num, title: r.title, eng: r.eng }))
      : base.map((c) => ({ ...c }));
    list.splice(0, list.length, ...next);
  });
}
// The chapters of a group as the admin page edits them.
const currentOutline = (group) => {
  const t = outlineTargets()[group];
  return t ? t.list.map((c) => ({ id: c[t.key], num: c.num, title: c.title, eng: c.eng })) : [];
};
const contentListeners = new Set();

const loadContent = () => {
  if (!SITE_LINKS.contentApi) return Promise.resolve(null);
  return fetch(`${SITE_LINKS.contentApi}?t=${Date.now()}`)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .catch(() => ({ error: true }))
    .then((data) => {
      contentCache = { lectures: {}, quiz: {}, slots: [], counts: {}, titles: {}, durations: {}, outline: {}, exams: [], books: [], reviews: [], settings: {}, daily: [], ...data };
      applyOutline(contentCache.outline);
      applyBooks(contentCache.books);
      contentListeners.forEach((fn) => fn(contentCache));
      return contentCache;
    });
};

function useContent() {
  const [content, setContent] = useState(contentCache);
  useEffect(() => {
    contentListeners.add(setContent);
    if (!contentCache) loadContent();
    return () => contentListeners.delete(setContent);
  }, []);
  return content;
}

// Lecture slots per chapter: the admin page can change them (sheet 'counts'); otherwise the site default.
const lectureCountFor = (content, prefix, fallback) => {
  const n = Math.floor(Number(content && content.counts && content.counts[prefix]));
  return n >= 1 && n <= 30 ? n : fallback;
};
// A lecture's heading from the admin page, else the built-in topic.
const lectureTitleFor = (content, key, fallback) => (content && content.titles && content.titles[key]) || fallback;
// Length of a lecture, as typed on the admin page; nothing is shown until it is set.
const lectureDurationFor = (content, key, english = false) => {
  const n = content && content.durations && Number(content.durations[key]);
  if (!(n >= 1)) return '';
  return english ? `${n} Mins` : `${toBnDigits(n)} মিনিট`;
};
const BV_LECTURES = 10;
const COURSE_LECTURES = 8;
const EXTRA_TOPIC = 'অতিরিক্ত অনুশীলন ও সমস্যা সমাধান';

const lectureResource = (content, key) => ({
  ...(LECTURE_RESOURCES[key] || {}),
  ...((content && content.lectures && content.lectures[key]) || {}),
  // Links of lectures this student has paid for (from the verified unlock).
  ...(accessState.links[key] || {})
});

const quizFor = (content, key) => {
  const fromSheet = content && content.quiz && content.quiz[key];
  return fromSheet && fromSheet.length ? fromSheet : QUIZ_BANK[key];
};

// Accepts a full YouTube link (watch, youtu.be, shorts, embed) or a bare video id.
const youtubeId = (v = '') => {
  const m = /(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/.exec(v);
  return m ? m[1] : /^[\w-]{11}$/.test(v.trim()) ? v.trim() : '';
};

// Google Drive "view" links are turned into embeddable "preview" links.
const pdfEmbedUrl = (v = '') => {
  const m = /drive\.google\.com\/file\/d\/([\w-]+)/.exec(v);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : v;
};

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

function AdminLectureRow({ lecture, saved, title, minutes, password, onSaved }) {
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
      adminPost(password, { action: 'saveDuration', key: lecture.key, minutes: mins })
    ]).then(([r, t, d]) => {
      r = { ok: r.ok && t.ok && d.ok };
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
        </div>
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
  return (
    <div className="space-y-4">
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
          <input className={adminInput} placeholder="প্রশ্ন" value={q.q} onChange={(e) => update(i, { q: e.target.value })} />
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
          {chapter.lectures.map((l) => (
            <AdminLectureRow
              key={l.key}
              lecture={l}
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
          <AdminQuizEditor key={chapter.quizKey} quizKey={chapter.quizKey} saved={(content.quiz && content.quiz[chapter.quizKey]) || []} password={password} />
        </div>
      )}

      {tab === 'exams' && <AdminExamsTab password={password} />}

      {tab === 'slots' && <AdminSlotsEditor saved={content.slots || []} password={password} />}

      {tab === 'payments' && <AdminPaymentsTab password={password} />}

      {tab === 'orders' && <AdminOrdersTab password={password} />}

      {tab === 'books' && <AdminBooksTab password={password} content={content} />}

      {tab === 'reviews' && <AdminReviewsTab password={password} content={content} />}

      {tab === 'home' && <AdminHomeTab password={password} content={content} />}
    </>
  );
}

// ---------------------------------------------------------------- Paid unlocks (verified by the Apps Script)
// A student pays by Send Money, then enters the Transaction ID and the number they paid from. The
// script checks it against the bKash SMS received on the owner's phone and, only then, returns the
// lecture links. The unlock is remembered in this browser (just the Transaction ID and number).
const GRANTS_KEY = 'unlockGrants';

const readGrants = () => {
  try {
    const list = JSON.parse(localStorage.getItem(GRANTS_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

const writeGrants = (list) => {
  try {
    localStorage.setItem(GRANTS_KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable; the student can restore the unlock with the same Transaction ID.
  }
};

// What is unlocked on this device and the links that came with it.
let accessState = { lectures: {}, courses: {}, links: {}, ready: false };
const accessListeners = new Set();
const setAccess = (next) => {
  accessState = next;
  accessListeners.forEach((fn) => fn(next));
};

const applyGrants = (grants, links) => {
  const lectures = {};
  const courses = {};
  grants.forEach((g) => {
    if (g.scope === 'course') courses[g.key] = true;
    else lectures[g.key] = true;
  });
  setAccess({ lectures, courses, links: links || {}, ready: true });
};

const postPublic = (payload) =>
  fetch(SITE_LINKS.contentApi, { method: 'POST', body: JSON.stringify(payload) })
    .then((r) => r.json())
    .catch(() => ({ ok: false, error: 'network' }));

const loadAccess = () => {
  const saved = readGrants();
  if (!SITE_LINKS.contentApi || saved.length === 0) {
    setAccess({ ...accessState, ready: true });
    return Promise.resolve();
  }
  return postPublic({ action: 'access', grants: saved }).then((r) => {
    if (r.ok) {
      // Forget saved unlocks the server no longer honours (payment voided).
      const alive = new Set((r.grants || []).map((g) => g.trx));
      writeGrants(saved.filter((g) => alive.has(String(g.trx).toUpperCase().replace(/[^A-Z0-9]/g, ''))));
      applyGrants(r.grants || [], r.links);
    } else {
      setAccess({ ...accessState, ready: true });
    }
  });
};

function useAccess() {
  const [state, setState] = useState(accessState);
  useEffect(() => {
    accessListeners.add(setState);
    if (!accessState.ready) loadAccess();
    return () => accessListeners.delete(setState);
  }, []);
  return state;
}

// '৳ ৫৫০' / '৳ 650' / 30 -> 550 / 650 / 30
const priceNumber = (v) => Number(asciiDigitsClient(String(v)).replace(/[^\d.]/g, '')) || 0;
const asciiDigitsClient = (s) => s.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));

// Prices the script checks payments against; the admin page syncs these after each login.
const priceRules = () => ({
  lecture: [
    { prefix: 'p1-', price: 30 },
    { prefix: 'p2-', price: 30 },
    ...Object.values(PART3_ACADEMIC_TRACKS).flatMap((t) => t.modules.map((m) => ({ prefix: `p3-${m.id}-`, price: priceNumber(t.unlockFee) })))
  ],
  course: Object.fromEntries(SPECIAL_COURSES_WITH_BOOKS.map((c) => [c.id, priceNumber(c.priceBdt)])),
  book: Object.fromEntries(SPECIAL_COURSES_WITH_BOOKS.map((c) => [c.id, priceNumber(c.bookPriceBdt)]))
});

const UNLOCK_ERRORS = {
  'bad-input': 'Transaction ID আর যে নম্বর থেকে টাকা পাঠিয়েছেন সেটা ঠিকঠাক লিখুন।',
  'not-found':
    'এই Transaction ID এর পেমেন্ট এখনো পাওয়া যায়নি। ID ঠিক আছে কিনা দেখুন। পেমেন্টের মেসেজ আসতে কয়েক মিনিট লাগতে পারে, একটু পরে আবার চেষ্টা করুন।',
  'phone-mismatch': 'এই Transaction ID এর সাথে আপনার দেওয়া নম্বর মেলেনি। যে নম্বর থেকে টাকা পাঠিয়েছেন সেটাই লিখুন।',
  'amount-low': 'পাঠানো টাকা কম। এই আনলকের দাম পুরোটা পাঠাতে হবে।',
  used: 'এই Transaction ID আগেই ব্যবহার হয়ে গেছে।',
  void: 'এই পেমেন্টটি বাতিল করা হয়েছে। WhatsApp এ যোগাযোগ করুন।',
  review: 'পেমেন্টটি যাচাই হচ্ছে। একটু অপেক্ষা করুন বা WhatsApp এ জানান।',
  'no-price': 'এই আইটেমের দাম এখনো ঠিক করা হয়নি। WhatsApp এ যোগাযোগ করুন।',
  'too-many': 'অনেকবার ভুল চেষ্টা হয়েছে। এক ঘণ্টা পরে আবার চেষ্টা করুন বা WhatsApp এ জানান।',
  network: 'সংযোগে সমস্যা হচ্ছে। ইন্টারনেট দেখে আবার চেষ্টা করুন।'
};

// ---------------------------------------------------------------- Book orders
// Same payment check as a lecture unlock (bKash Send Money + Transaction ID + sender number); the
// student also gives a delivery address, and the order reaches the owner as soon as it is verified.
const BOOK_ERRORS = {
  ...UNLOCK_ERRORS,
  'bad-order': 'নাম, ডেলিভারির পুরো ঠিকানা (অন্তত ১০ অক্ষর) আর যোগাযোগের নম্বর ঠিকঠাক লিখুন।',
  'amount-low': 'পাঠানো টাকা কম। বইয়ের দামের পুরোটা পাঠাতে হবে।'
};
const bookInput =
  'w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none';

// book: { key, title, series, price: '৳ ২৯০' }
function BookOrderModal({ book, onClose }) {
  const amount = priceNumber(book.price);
  const [method, setMethod] = useState('bKash');
  const [form, setForm] = useState({ name: '', address: '', contact: '', email: '', trx: '', phone: '' });
  const [state, setState] = useState('idle'); // idle | busy | done
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const connected = !!SITE_LINKS.contentApi;
  const pdf = !BOOK_HARDCOPY_IN_STOCK; // the printed copy is sold out: the order is for the PDF copy
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const trxClean = form.trx.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const digits = (v) => v.replace(/\D/g, '');
  const valid =
    form.name.trim().length >= 2 &&
    (pdf || form.address.trim().length >= 10) &&
    digits(form.contact).length >= 10 &&
    trxClean.length >= 6 &&
    digits(form.phone).length >= 10;
  const title = `${book.series ? `${book.series}: ` : ''}${book.title}`;

  const submit = () => {
    setState('busy');
    setError('');
    postPublic({
      action: 'order',
      bookKey: book.key,
      title,
      trxId: trxClean,
      phone: form.phone,
      name: form.name.trim(),
      address: form.address.trim(),
      contact: form.contact,
      format: pdf ? 'pdf' : 'print',
      email: form.email.trim()
    }).then((r) => {
      if (!r.ok) {
        setState('idle');
        setError(BOOK_ERRORS[r.error] || 'অর্ডার নেওয়া যায়নি। WhatsApp এ যোগাযোগ করুন।');
        return;
      }
      setOrder(r.order);
      setState('done');
    });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-950/85 p-3 backdrop-blur-sm sm:items-center sm:p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg space-y-5 rounded-3xl border border-amber-400/40 bg-slate-900 p-5 text-white shadow-2xl sm:p-7">
        <button onClick={onClose} aria-label="বন্ধ করুন" className="absolute right-4 top-4 rounded-xl bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">
          <X className="h-4 w-4" />
        </button>
        <div>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">{pdf ? 'PDF কপি' : 'বই অর্ডার'}</span>
          <h3 className="mt-1.5 pr-8 text-lg font-extrabold leading-snug">{title}</h3>
          <p className="mt-1 text-sm text-slate-300">{pdf ? 'PDF কপির দাম' : 'বইয়ের দাম'}: <b className="text-amber-300">৳{toBnDigits(amount)}</b></p>
          <BookStockNote className="mt-2" />
        </div>

        {state === 'done' && order ? (
          <div className="space-y-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5">
            <div className="text-lg font-extrabold text-emerald-300">✓ অর্ডার নিশ্চিত হয়েছে!</div>
            <div className="space-y-1 text-sm text-slate-200">
              <div>নাম: <b>{order.name}</b></div>
              <div>{pdf ? 'PDF পাঠানো হবে' : 'ঠিকানা'}: <b>{order.address}</b></div>
              <div>যোগাযোগ: <b>{order.contact}</b></div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {pdf
                ? 'আপনার পেমেন্ট যাচাই হয়েছে। PDF কপি WhatsApp বা ইমেইলে পাঠানো হবে। কিছুক্ষণের মধ্যে না পেলে WhatsApp এ জানান।'
                : 'আপনার পেমেন্ট যাচাই হয়েছে। বই পাঠানোর বিষয়ে এই নম্বরে যোগাযোগ করা হবে। অর্ডারে কোনো ভুল থাকলে WhatsApp এ জানান।'}
              {' '}আবার দেখতে একই Transaction ID আর নম্বর দিয়ে চেষ্টা করুন।
            </p>
            <button onClick={onClose} className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-extrabold text-slate-950 hover:bg-emerald-300">
              ঠিক আছে
            </button>
          </div>
        ) : !connected ? (
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
            স্বয়ংক্রিয় অর্ডার এখনো চালু হয়নি। WhatsApp এ যোগাযোগ করে বইটি অর্ডার করুন।
            <a href={`https://wa.me/${SITE_LINKS.whatsapp}`} className="block rounded-xl bg-amber-400 px-4 py-2.5 text-center text-xs font-extrabold text-slate-950 hover:bg-amber-300">
              WhatsApp এ জানান
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <ol className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm">
              <li className="space-y-2">
                <div className="font-bold text-white">১. নিচের নম্বরে ৳{toBnDigits(amount)} Send Money করুন</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(PAYMENT_NUMBERS).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-xl border py-2 text-xs font-extrabold transition ${method === m ? 'border-amber-300 bg-amber-400 text-slate-950' : 'border-slate-700 bg-slate-800 text-slate-300'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="text-center font-mono text-lg font-black text-amber-300">{PAYMENT_NUMBERS[method]}</div>
              </li>
              <li className="font-bold text-white">{pdf ? '২. আপনার তথ্য আর পেমেন্টের তথ্য দিয়ে অর্ডার করুন' : '২. ডেলিভারির তথ্য আর পেমেন্টের তথ্য দিয়ে অর্ডার করুন'}</li>
            </ol>
            <input className={bookInput} placeholder="আপনার নাম" maxLength={60} value={form.name} onChange={set('name')} />
            {pdf ? (
              <input className={bookInput} type="email" placeholder="ইমেইল (ঐচ্ছিক, PDF ইমেইলে পেতে চাইলে)" maxLength={120} value={form.email} onChange={set('email')} />
            ) : (
              <textarea className={`${bookInput} min-h-[84px]`} placeholder="ডেলিভারির পুরো ঠিকানা (বাসা, রাস্তা, এলাকা, জেলা)" maxLength={300} value={form.address} onChange={set('address')} />
            )}
            <input className={bookInput} placeholder={pdf ? 'WhatsApp নম্বর (PDF এই নম্বরে পাঠানো হবে)' : 'যোগাযোগের নম্বর'} inputMode="tel" value={form.contact} onChange={set('contact')} />
            <input className={`${bookInput} font-mono tracking-wider`} placeholder="Transaction ID (যেমন 9K4M2P7XQA)" value={form.trx} autoCapitalize="characters" onChange={set('trx')} />
            <input className={bookInput} placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন" inputMode="tel" value={form.phone} onChange={set('phone')} />
            {error && <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs leading-relaxed text-rose-200">{error}</div>}
            <button
              disabled={!valid || state === 'busy'}
              onClick={submit}
              className="w-full rounded-xl bg-amber-400 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-300 disabled:opacity-40"
            >
              {state === 'busy' ? 'যাচাই হচ্ছে…' : pdf ? 'PDF কপির অর্ডার নিশ্চিত করুন' : 'অর্ডার নিশ্চিত করুন'}
            </button>
          </div>
        )}
      </div>
    </div>
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

// ---------------------------------------------------------------- Student reviews (from Facebook)
const FB_LINK_RE = /^https:\/\/((www|m|web|business)\.)?(facebook\.com|fb\.com|fb\.me)\/[^\s"'<>]*$/i;

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
        if (!r.ok) return setUpload('আপলোড হয়নি। Apps Script নতুন version এ deploy করা আছে কি না দেখুন।');
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
          disabled={state === 'busy' || !f.title.trim() || !coverOk}
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

// ---------------------------------------------------------------- Live exams
// Paid MCQ exams (৳ price set on the admin page). Questions come from the script only after the
// payment is verified, and the script grades the answers, so nothing here can reveal the key early.
const EXAM_GRANTS_KEY = 'examGrants';
const readExamGrants = () => {
  try {
    const list = JSON.parse(localStorage.getItem(EXAM_GRANTS_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};
const saveExamGrant = (g) => {
  try {
    localStorage.setItem(EXAM_GRANTS_KEY, JSON.stringify([...readExamGrants().filter((x) => x.examId !== g.examId), g]));
  } catch {
    // Storage unavailable; the student can resume with the same Transaction ID and number.
  }
};
const readExamAnswers = (examId, trx) => {
  try {
    const a = JSON.parse(localStorage.getItem(`examAns:${examId}:${trx}`) || '[]');
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
};
const writeExamAnswers = (examId, trx, answers) => {
  try {
    localStorage.setItem(`examAns:${examId}:${trx}`, JSON.stringify(answers));
  } catch {
    // Answers are still kept on screen.
  }
};
const mmss = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
const EXAM_ERRORS = {
  ...UNLOCK_ERRORS,
  'no-exam': 'এই পরীক্ষাটি এখন পাওয়া যাচ্ছে না।',
  'not-allowed': 'পেমেন্ট যাচাই করা যায়নি। Transaction ID আর নম্বর আবার দিয়ে শুরু করুন।',
  'not-started': 'পরীক্ষা শুরু করা হয়নি।'
};
const examInput =
  'w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none';

function ExamResultView({ result, onClose }) {
  const pct = result.total ? Math.round((result.score / result.total) * 100) : 0;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-center">
        <div className="text-xs font-bold text-emerald-300">{result.title}</div>
        <div className="mt-1 text-5xl font-black text-white">
          {toBnDigits(result.score)}<span className="text-2xl text-slate-400"> / {toBnDigits(result.total)}</span>
        </div>
        <div className="mt-1 text-sm text-slate-300">{toBnDigits(pct)}% • সময় লেগেছে {mmss(result.seconds)}</div>
        {result.board.rank ? (
          <div className="mt-3 inline-block rounded-full bg-amber-400 px-4 py-1.5 text-sm font-extrabold text-slate-950">
            আপনার অবস্থান: {toBnDigits(result.board.rank)} ({toBnDigits(result.board.count)} জনের মধ্যে)
          </div>
        ) : (
          <div className="mt-3 text-xs text-amber-200">সময়ের পরে জমা দেওয়ায় এই ফল র‍্যাঙ্কিংয়ে ধরা হয়নি।</div>
        )}
      </div>

      {result.board.top.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-white">🏆 র‍্যাঙ্কিং</h4>
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            {result.board.top.map((x) => (
              <div key={x.rank} className={`flex items-center gap-3 px-4 py-2.5 text-sm ${x.me ? 'bg-amber-400/15' : 'odd:bg-slate-900/60'}`}>
                <span className="w-8 font-black text-amber-300">{toBnDigits(x.rank)}</span>
                <span className="flex-1 truncate font-bold text-white">{x.name}{x.me ? ' (আপনি)' : ''}</span>
                <span className="font-bold text-emerald-300">{toBnDigits(x.score)}/{toBnDigits(x.total)}</span>
                <span className="w-14 text-right font-mono text-[11px] text-slate-400">{mmss(x.seconds)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-sm font-extrabold text-white">উত্তর ও ব্যাখ্যা</h4>
        {result.review.map((q, i) => (
          <div key={i} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="text-sm font-bold text-white">{toBnDigits(i + 1)}. {q.q}</div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {q.options.map((o, oi) => (
                <div
                  key={oi}
                  className={`rounded-xl border px-3 py-2 text-xs ${
                    oi === q.answer
                      ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-200'
                      : oi === q.yours
                      ? 'border-rose-400/60 bg-rose-500/15 text-rose-200'
                      : 'border-slate-800 text-slate-300'
                  }`}
                >
                  {['ক', 'খ', 'গ', 'ঘ'][oi]}) {o}
                  {oi === q.answer && ' ✓'}
                  {oi === q.yours && oi !== q.answer && ' ✗ (আপনার উত্তর)'}
                </div>
              ))}
            </div>
            {q.yours === -1 && <div className="text-[11px] text-amber-300">উত্তর দেননি</div>}
            {q.explain && <div className="rounded-xl bg-slate-950 p-3 text-xs leading-relaxed text-slate-300">💡 {q.explain}</div>}
          </div>
        ))}
      </div>
      <button onClick={onClose} className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700">
        বন্ধ করুন
      </button>
    </div>
  );
}

function ExamRunner({ exam, run, creds, onDone }) {
  const [answers, setAnswers] = useState(() => {
    const a = readExamAnswers(exam.id, creds.trx);
    return run.questions.map((_, i) => (Number.isInteger(a[i]) ? a[i] : -1));
  });
  const [cur, setCur] = useState(0);
  const [left, setLeft] = useState(() => Math.max(0, Math.round((run.deadline - (Date.now() + run.offset)) / 1000)));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const doneRef = useRef(false);

  const submit = (auto = false) => {
    if (doneRef.current) return;
    const unanswered = answersRef.current.filter((a) => a < 0).length;
    if (!auto && unanswered > 0 && !window.confirm(`${toBnDigits(unanswered)}টি প্রশ্নের উত্তর দেওয়া হয়নি। তবু জমা দেবেন?`)) return;
    setBusy(true);
    setError('');
    postPublic({ action: 'examSubmit', examId: exam.id, trxId: creds.trx, phone: creds.phone, answers: answersRef.current }).then((r) => {
      setBusy(false);
      if (!r.ok) {
        setError(EXAM_ERRORS[r.error] || 'জমা দেওয়া যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন, উত্তরগুলো সংরক্ষিত আছে।');
        return;
      }
      doneRef.current = true;
      onDone(r);
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setLeft(Math.max(0, Math.round((run.deadline - (Date.now() + run.offset)) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [run]);
  useEffect(() => {
    if (left === 0 && !busy && !error) submit(true);
  }, [left]);

  const pick = (oi) => {
    const next = answers.map((a, i) => (i === cur ? oi : a));
    setAnswers(next);
    writeExamAnswers(exam.id, creds.trx, next);
  };
  const q = run.questions[cur];
  const answered = answers.filter((a) => a >= 0).length;
  return (
    <div className="space-y-5">
      <div className="sticky top-0 z-10 -mx-1 flex items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 backdrop-blur">
        <div className="min-w-0 truncate text-xs font-bold text-slate-300">{exam.title}</div>
        <div className={`rounded-xl px-3 py-1.5 font-mono text-lg font-black ${left <= 60 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-amber-300'}`}>
          ⏱ {mmss(left)}
        </div>
      </div>
      <div className="text-xs text-slate-400">
        প্রশ্ন {toBnDigits(cur + 1)} / {toBnDigits(run.questions.length)} • উত্তর দেওয়া হয়েছে {toBnDigits(answered)}টি
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="text-base font-bold leading-relaxed text-white">{q.q}</div>
        <div className="space-y-2">
          {q.options.map((o, oi) => (
            <button
              key={oi}
              type="button"
              onClick={() => pick(oi)}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                answers[cur] === oi ? 'border-amber-300 bg-amber-400/15 text-white' : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500'
              }`}
            >
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${answers[cur] === oi ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                {['ক', 'খ', 'গ', 'ঘ'][oi]}
              </span>
              <span>{o}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button disabled={cur === 0} onClick={() => setCur(cur - 1)} className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40">
          ← আগের
        </button>
        {cur < run.questions.length - 1 ? (
          <button onClick={() => setCur(cur + 1)} className="rounded-xl bg-slate-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-600">
            পরের →
          </button>
        ) : (
          <button onClick={() => submit(false)} disabled={busy} className="rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-300 disabled:opacity-60">
            {busy ? 'জমা হচ্ছে…' : 'জমা দিন ✓'}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {run.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            aria-label={`প্রশ্ন ${i + 1}`}
            className={`h-8 w-8 rounded-lg text-[11px] font-bold ${
              i === cur ? 'bg-amber-400 text-slate-950' : answers[i] >= 0 ? 'bg-emerald-500/30 text-emerald-200' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {toBnDigits(i + 1)}
          </button>
        ))}
      </div>
      {error && <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs text-rose-200">{error}</div>}
      {cur < run.questions.length - 1 && (
        <button onClick={() => submit(false)} disabled={busy} className="text-xs font-bold text-slate-400 hover:text-white">
          এখনই জমা দিন
        </button>
      )}
    </div>
  );
}

function ExamFlow({ exam, onClose }) {
  const saved = readExamGrants().find((g) => g.examId === exam.id);
  const [stage, setStage] = useState(saved ? 'loading' : 'pay'); // pay | loading | run | result
  const [method, setMethod] = useState('bKash');
  const [form, setForm] = useState({ trx: saved ? saved.trx : '', phone: saved ? saved.phone : '', name: saved ? saved.name : '' });
  const [error, setError] = useState('');
  const [run, setRun] = useState(null);
  const [result, setResult] = useState(null);
  const trxClean = form.trx.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const phone10 = form.phone.replace(/\D/g, '').slice(-10);
  const valid = trxClean.length >= 6 && phone10.length >= 10 && form.name.trim().length >= 2;

  const start = (c) => {
    setStage('loading');
    setError('');
    postPublic({ action: 'examStart', examId: exam.id, trxId: c.trx, phone: c.phone, name: c.name }).then((r) => {
      if (!r.ok) {
        setStage('pay');
        setError(EXAM_ERRORS[r.error] || 'পরীক্ষা শুরু করা যায়নি। WhatsApp এ যোগাযোগ করুন।');
        return;
      }
      saveExamGrant({ examId: exam.id, trx: c.trx, phone: c.phone, name: c.name });
      if (r.finished) {
        setResult(r);
        setStage('result');
      } else {
        setRun({ ...r, offset: r.now - Date.now() });
        setStage('run');
      }
    });
  };
  useEffect(() => {
    if (saved) start(saved);
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 p-3 backdrop-blur-sm sm:p-6">
      <div className="relative mx-auto w-full max-w-2xl space-y-5 rounded-3xl border border-amber-400/40 bg-slate-900 p-5 text-white shadow-2xl sm:p-7">
        {stage !== 'run' && (
          <button onClick={onClose} aria-label="বন্ধ করুন" className="absolute right-4 top-4 rounded-xl bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">
            <X className="h-4 w-4" />
          </button>
        )}
        {stage === 'pay' && (
          <>
            <div>
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">লাইভ এক্সাম</span>
              <h3 className="mt-1.5 pr-8 text-xl font-extrabold">{exam.title}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {toBnDigits(exam.count)}টি MCQ • {toBnDigits(exam.minutes)} মিনিট • ফি: <b className="text-amber-300">৳{toBnDigits(exam.price)}</b>
              </p>
            </div>
            <ol className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm">
              <li className="space-y-2">
                <div className="font-bold text-white">১. নিচের নম্বরে ৳{toBnDigits(exam.price)} Send Money করুন</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(PAYMENT_NUMBERS).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-xl border py-2 text-xs font-extrabold transition ${method === m ? 'border-amber-300 bg-amber-400 text-slate-950' : 'border-slate-700 bg-slate-800 text-slate-300'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="text-center font-mono text-lg font-black text-amber-300">{PAYMENT_NUMBERS[method]}</div>
              </li>
              <li className="font-bold text-white">২. নিচে নাম, Transaction ID আর আপনার নম্বর লিখে শুরু করুন</li>
            </ol>
            <input className={examInput} placeholder="আপনার নাম (র‍্যাঙ্কিংয়ে দেখাবে)" maxLength={30} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={`${examInput} font-mono tracking-wider`} placeholder="Transaction ID (যেমন 9K4M2P7XQA)" value={form.trx} autoCapitalize="characters" onChange={(e) => setForm({ ...form, trx: e.target.value })} />
            <input className={examInput} placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            {error && <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs leading-relaxed text-rose-200">{error}</div>}
            <div className="rounded-xl bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-400">
              শুরু করার পর টাইমার চলবে এবং একবারই দেওয়া যাবে। ব্রাউজার বন্ধ হলেও একই Transaction ID আর নম্বর দিয়ে সময় থাকতে ফিরে আসা যাবে।
            </div>
            <button
              disabled={!valid}
              onClick={() => start({ trx: trxClean, phone: phone10, name: form.name.trim() })}
              className="w-full rounded-xl bg-amber-400 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-300 disabled:opacity-40"
            >
              পরীক্ষা শুরু করুন
            </button>
          </>
        )}
        {stage === 'loading' && <div className="py-10 text-center text-sm text-slate-300">লোড হচ্ছে…</div>}
        {stage === 'run' && run && (
          <ExamRunner
            exam={exam}
            run={run}
            creds={{ trx: trxClean || saved.trx, phone: phone10 || saved.phone }}
            onDone={(r) => {
              setResult(r);
              setStage('result');
            }}
          />
        )}
        {stage === 'result' && result && <ExamResultView result={result} onClose={onClose} />}
      </div>
    </div>
  );
}

function ExamsPage({ onAsk }) {
  const content = useContent();
  const [open, setOpen] = useState(null);
  const exams = (content && content.exams) || [];
  const grants = readExamGrants();
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PrivateHero
        badge="LIVE EXAM"
        title="লাইভ এক্সাম — প্রতিটি মাত্র ৳১০"
        sub="টাইমারসহ MCQ পরীক্ষা দিন, সাথে সাথে স্কোর, সঠিক উত্তর ও ব্যাখ্যা আর র‍্যাঙ্কিং দেখুন।"
        grad="from-rose-500 via-orange-500 to-amber-500"
        icon="📝"
      />
      {!content ? (
        <div className="text-sm text-slate-400">লোড হচ্ছে…</div>
      ) : exams.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
          এখন কোনো পরীক্ষা চালু নেই। নতুন পরীক্ষার খবর পেতে WhatsApp এ জানান।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((e) => {
            const mine = grants.some((g) => g.examId === e.id);
            return (
              <div key={e.id} className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="space-y-1.5">
                  {e.subject && <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-300">{e.subject}</span>}
                  <h3 className="text-lg font-extrabold leading-snug text-white">{e.title}</h3>
                  <p className="text-xs text-slate-400">
                    {toBnDigits(e.count)}টি MCQ • {toBnDigits(e.minutes)} মিনিট
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl font-black text-amber-300">৳{toBnDigits(e.price)}</span>
                  <button onClick={() => setOpen(e)} className="rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
                    {mine ? 'চালিয়ে যান / ফলাফল' : 'পরীক্ষা দিন'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="text-sm text-slate-300">পরীক্ষা নিয়ে কোনো প্রশ্ন আছে?</div>
        <button onClick={onAsk} className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
          প্রশ্ন করুন
        </button>
      </div>
      {open && <ExamFlow key={open.id} exam={open} onClose={() => setOpen(null)} />}
    </main>
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

// item: { scope: 'lecture' | 'course', key, title, amount (number) }
function UnlockModal({ item, onClose, onWhatsApp }) {
  const [method, setMethod] = useState('bKash');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [state, setState] = useState('idle'); // idle | busy | done
  const [error, setError] = useState('');
  const connected = !!SITE_LINKS.contentApi;
  const input =
    'w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none';
  const trxClean = trxId.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const valid = trxClean.length >= 6 && phone.replace(/\D/g, '').length >= 10;

  const submit = () => {
    setState('busy');
    setError('');
    postPublic({ action: 'unlock', scope: item.scope, key: item.key, trxId: trxClean, phone }).then((r) => {
      if (!r.ok) {
        setState('idle');
        setError(UNLOCK_ERRORS[r.error] || 'আনলক করা যায়নি। WhatsApp এ যোগাযোগ করুন।');
        return;
      }
      const saved = readGrants().filter((g) => !(g.trx === trxClean && g.phone === phone.replace(/\D/g, '').slice(-10)));
      writeGrants([...saved, { trx: trxClean, phone: phone.replace(/\D/g, '').slice(-10) }]);
      // Merge with what is already unlocked on this device.
      const lectures = { ...accessState.lectures };
      const courses = { ...accessState.courses };
      (r.grants || []).forEach((g) => {
        if (g.scope === 'course') courses[g.key] = true;
        else lectures[g.key] = true;
      });
      setAccess({ lectures, courses, links: { ...accessState.links, ...(r.links || {}) }, ready: true });
      setState('done');
    });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-3xl border border-amber-400/40 bg-slate-900 p-6 text-white shadow-2xl sm:p-7"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">
          <X className="h-4 w-4" />
        </button>
        <div>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
            {item.scope === 'course' ? 'কোর্সে ভর্তি' : 'লেকচার আনলক'}
          </span>
          <h3 className="mt-1.5 pr-8 text-xl font-extrabold">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-300">ফি: <b className="text-amber-300">৳{toBnDigits(item.amount)}</b></p>
        </div>

        {state === 'done' ? (
          <div className="space-y-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5">
            <div className="text-lg font-extrabold text-emerald-300">✓ আনলক হয়েছে!</div>
            <p className="text-sm leading-relaxed text-slate-200">
              {item.scope === 'course' ? 'কোর্সের সব লেকচার' : 'লেকচারটি'} এখন খোলা। এই ফোন বা কম্পিউটারে পরেও খোলা থাকবে।
              অন্য ডিভাইসে একই Transaction ID আর নম্বর দিলে আবার পাবেন।
            </p>
            <button onClick={onClose} className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-extrabold text-slate-950 hover:bg-emerald-300">
              শুরু করুন
            </button>
          </div>
        ) : !connected ? (
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
            স্বয়ংক্রিয় আনলক এখনো চালু হয়নি। পেমেন্ট করে WhatsApp এ জানান।
            <button onClick={onWhatsApp} className="block rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
              WhatsApp এ জানান
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <ol className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm">
              <li className="space-y-2">
                <div className="font-bold text-white">১. নিচের নম্বরে ৳{toBnDigits(item.amount)} Send Money করুন</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(PAYMENT_NUMBERS).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-xl border py-2 text-xs font-extrabold transition ${
                        method === m ? 'border-amber-300 bg-amber-400 text-slate-950' : 'border-slate-700 bg-slate-800 text-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="text-center font-mono text-lg font-black text-amber-300">{PAYMENT_NUMBERS[method]}</div>
              </li>
              <li className="font-bold text-white">২. নিচে Transaction ID আর আপনার নম্বর লিখে আনলক চাপুন</li>
            </ol>
            <input
              className={`${input} font-mono tracking-wider`}
              placeholder="Transaction ID (যেমন 9K4M2P7XQA)"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              autoCapitalize="characters"
            />
            <input
              className={input}
              placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && (
              <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-xs leading-relaxed text-rose-100">{error}</div>
            )}
            <button
              type="button"
              disabled={!valid || state === 'busy'}
              onClick={submit}
              className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {state === 'busy' ? 'যাচাই হচ্ছে…' : '🔓 আনলক করুন'}
            </button>
            <button type="button" onClick={onWhatsApp} className="w-full text-center text-xs font-bold text-slate-400 hover:text-white">
              পেমেন্ট করেছি কিন্তু আনলক হচ্ছে না? WhatsApp এ জানান
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Admin: payments tab
function AdminPaymentsTab({ password }) {
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

export default function App() {
  const [activeSubPage, setActiveSubPage] = useState('HOME');
  const [activeCourse, setActiveCourse] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('HSC Bangla Version');

  // HSC Bangla Version states
  const [hscBvPaperKey, setHscBvPaperKey] = useState('paper1');
  const [selectedBvChapterId, setSelectedBvChapterId] = useState('p1-ch1');
  // Paid lectures and courses unlock when the script verifies the student's payment (UnlockModal).
  const access = useAccess();
  const unlockedLectures = access.lectures;
  const [unlockModalLecture, setUnlockModalLecture] = useState(null);

  // Special Courses Inside Classroom states (Course 1 to Course 6)
  const [activeSpecialCourseId, setActiveSpecialCourseId] = useState('course-calculus');
  const [selectedCourseChapterIdx, setSelectedCourseChapterIdx] = useState(0);
  const enrolledCourses = access.courses;
  // Completed lectures are remembered on this device.
  const [completedCourseLectures, setCompletedCourseLectures] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('completedLectures') || '{}');
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('completedLectures', JSON.stringify(completedCourseLectures));
    } catch {
      // Storage unavailable (private mode); progress just won't persist.
    }
  }, [completedCourseLectures]);
  const [courseEnrollModal, setCourseEnrollModal] = useState(null);

  // Modals
  const [activeLectureResourceModal, setActiveLectureResourceModal] = useState(null);
  const [selectedSpecialCourseModal, setSelectedSpecialCourseModal] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookOrder, setBookOrder] = useState(null);
  useEffect(() => {
    bookOrderListeners.add(setBookOrder);
    return () => bookOrderListeners.delete(setBookOrder);
  }, []);
  const [bookingRequest, setBookingRequest] = useState(null);
  const siteContent = useContent();
  const askQuestion = (lines = []) => setBookingRequest({ kind: 'question', type: 'প্রশ্ন', lines });
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selfTestAnswers, setSelfTestAnswers] = useState({});
  const [selfTestSubmitted, setSelfTestSubmitted] = useState(false);
  const [activeResearchCardId, setActiveResearchCardId] = useState('thesis-consultation');
  const navRowRef = useRef(null);
  const [thesisLevel, setThesisLevel] = useState('M.Sc. Thesis');

  const [part3ModuleIdx, setPart3ModuleIdx] = useState(0);
  const [bvOpenPaper, setBvOpenPaper] = useState(null); // paper opened on the HSC বাংলা page (null = the two paper cards)
  const [honYear, setHonYear] = useState(null); // selected year on the B.Sc. Honours page (null = show the 4 year cards)
  const [admUniv, setAdmUniv] = useState(null); // selected university on the Admission page (null = show the 7 cards)
  const [part3ChapterIdx, setPart3ChapterIdx] = useState(0);

  const activePart3Track = PART3_ACADEMIC_TRACKS[selectedTrack] || null;
  const activePart3Module = activePart3Track
    ? activePart3Track.modules[part3ModuleIdx] || activePart3Track.modules[0]
    : null;
  const activePart3Chapter = activePart3Module
    ? activePart3Module.chapters[part3ChapterIdx] || activePart3Module.chapters[0]
    : null;

  const activePart3Lectures = useMemo(() => {
    if (!activePart3Track || !activePart3Module || !activePart3Chapter) return [];
    const blueprint = activePart3Chapter.topics || activePart3Module.lectureBlueprint;
    const total = lectureCountFor(siteContent, `p3-${activePart3Module.id}-${activePart3Chapter.id}`, blueprint.length);
    return Array.from({ length: total }, (_, idx) => {
      const topicDesc = blueprint[idx] || EXTRA_TOPIC;
      const lecNum = idx + 1;
      const lecKey = `p3-${activePart3Module.id}-${activePart3Chapter.id}-lec-${lecNum}`;
      const isFree = lecNum === 1;
      const isUnlocked = isFree || !!unlockedLectures[lecKey];
      return {
        lecNum,
        lecKey,
        titleBn: `Lecture ${lecNum}`,
        topic: lectureTitleFor(siteContent, lecKey, `${activePart3Chapter.title} — ${topicDesc}`),
        duration: lectureDurationFor(siteContent, lecKey, true),
        isFree,
        isUnlocked,
        priceBdt: activePart3Track.unlockFee,
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-${activePart3Chapter.id}-L${lecNum}/viewform`
      };
    });
  }, [activePart3Track, activePart3Module, activePart3Chapter, unlockedLectures, siteContent]);

  const currentBvPaper = HSC_BV_PAPERS[hscBvPaperKey];
  const currentBvChapter =
    currentBvPaper.chapters.find((c) => c.id === selectedBvChapterId) ||
    currentBvPaper.chapters[0];

  const activeSpecialCourse =
    SPECIAL_COURSES_WITH_BOOKS.find((c) => c.id === activeSpecialCourseId) ||
    SPECIAL_COURSES_WITH_BOOKS[0];

  const activeCourseChapter =
    activeSpecialCourse.syllabusChapters[selectedCourseChapterIdx] ||
    activeSpecialCourse.syllabusChapters[0];

  // Build 8 structured lectures per chapter inside a Special Course
  const activeCourseLectures = useMemo(() => {
    const lectureTopics = [
      'মৌলিক ধারণা, সংজ্ঞা ও সূত্রের জ্যামিতিক প্রমাণ (Foundational Concepts & Proofs)',
      'টাইপ-১ ও টাইপ-২: বোর্ড পরীক্ষার সৃজনশীল (CQ) গাণিতিক সমস্যা সমাধান',
      'টাইপ-৩ ও টাইপ-৪: মধ্যম ও জটিল মানের গাণিতিক সমস্যা বিশ্লেষণ',
      'লেখচিত্র, জ্যামিতিক তাৎপর্য ও বাস্তব প্রয়োগভিত্তিক অংক',
      'বিগত ১০ বছরের বোর্ড প্রশ্নের ধারাবাহিক সমাধান (Board Archive)',
      'ক্যালকুলেটর হ্যাকস ও ৩০ সেকেন্ডে MCQ সমাধানের শর্টকাট টেকনিক',
      'ইঞ্জিনিয়ারিং (BUET, CKRUET) ও ভার্সিটি ‘ক’ ভর্তি পরীক্ষার প্রশ্ন সমাধান',
      'মাস্টার সামারি, ডাউট সলভিং ও চূড়ান্ত মডেল টেস্ট ক্লাস'
    ];
    const liveDates = [
      '২০ অক্টোবর, রাত ৮:৩০ PM',
      '২২ অক্টোবর, রাত ৮:৩০ PM',
      '২৫ অক্টোবর, রাত ৮:৩০ PM',
      '২৭ অক্টোবর, রাত ৮:৩০ PM',
      '২৯ অক্টোবর, রাত ৮:৩০ PM',
      '১ নভেম্বর, রাত ৮:৩০ PM',
      '৩ নভেম্বর, রাত ৮:৩০ PM',
      '৫ নভেম্বর, রাত ৮:৩০ PM'
    ];
    return Array.from({ length: lectureCountFor(siteContent, `${activeSpecialCourse.id}-${activeCourseChapter.chId}`, COURSE_LECTURES) }, (_, idx) => {
      const lecNum = idx + 1;
      const progressKey = `${activeSpecialCourse.id}-${activeCourseChapter.chId}-lec-${lecNum}`;
      return {
        lecNum,
        progressKey,
        titleBn: `লেকচার ${lecNum}`,
        topic: lectureTitleFor(siteContent, progressKey, `${activeCourseChapter.title} — ${lectureTopics[idx] || EXTRA_TOPIC}`),
        duration: lectureDurationFor(siteContent, progressKey),
        liveDate: liveDates[idx] || 'সময় শিগগিরই জানানো হবে',
        livePlatform: 'Zoom Live + Interactive Whiteboard',
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-course-${activeSpecialCourse.id}-${activeCourseChapter.chId}-L${lecNum}/viewform`
      };
    });
  }, [activeSpecialCourse, activeCourseChapter, siteContent]);

  // Calculate overall Course Progress Bar for the active special course
  const courseProgressStats = useMemo(() => {
    let totalLectures = 0;
    let completedCount = 0;

    activeSpecialCourse.syllabusChapters.forEach((ch) => {
      const lecturesPerChapter = lectureCountFor(siteContent, `${activeSpecialCourse.id}-${ch.chId}`, COURSE_LECTURES);
      totalLectures += lecturesPerChapter;
      for (let i = 1; i <= lecturesPerChapter; i++) {
        const key = `${activeSpecialCourse.id}-${ch.chId}-lec-${i}`;
        if (completedCourseLectures[key]) {
          completedCount += 1;
        }
      }
    });

    const percent = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;
    return { totalLectures, completedCount, percent };
  }, [activeSpecialCourse, completedCourseLectures, siteContent]);

  const toggleCourseLectureCompletion = (progressKey) => {
    setCompletedCourseLectures((prev) => ({
      ...prev,
      [progressKey]: !prev[progressKey]
    }));
  };

  const currentBvLectures = useMemo(() => {
    const lectureTopics = [
      'মৌলিক ধারণা, সংজ্ঞা ও সূত্রের জ্যামিতিক প্রমাণ (Foundational Concepts & Proofs)',
      'টাইপ-১ ও টাইপ-২: বোর্ড পরীক্ষার সৃজনশীল (CQ) গাণিতিক সমস্যা সমাধান',
      'টাইপ-৩ ও টাইপ-৪: মধ্যম ও জটিল মানের গাণিতিক সমস্যা বিশ্লেষণ',
      'লেখচিত্র, জ্যামিতিক তাৎপর্য ও বাস্তব প্রয়োগভিত্তিক অংক',
      'বিগত ১০ বছরের বোর্ড প্রশ্নের ধারাবাহিক সমাধান — পর্ব ১',
      'বিগত ১০ বছরের বোর্ড প্রশ্নের ধারাবাহিক সমাধান — পর্ব ২',
      'ক্যালকুলেটর হ্যাকস ও ৩০ সেকেন্ডে MCQ সমাধানের শর্টকাট টেকনিক',
      'ইঞ্জিনিয়ারিং (BUET, CKRUET) ভর্তি পরীক্ষার প্রশ্ন সমাধান',
      'ভার্সিটি ‘ক’ ও গুচ্ছ ভর্তি পরীক্ষার স্পেশাল প্রশ্ন সমাধান',
      'মাস্টার সামারি, ডাউট সলভিং ও পূর্ণাঙ্গ অধ্যায় মূল্যায়ন'
    ];

    return Array.from({ length: lectureCountFor(siteContent, currentBvChapter.id, BV_LECTURES) }, (_, idx) => {
      const lecNum = idx + 1;
      const lecKey = `${currentBvChapter.id}-lec-${lecNum}`;
      const isFree = lecNum === 1;
      const isUnlocked = isFree || !!unlockedLectures[lecKey];

      return {
        lecNum,
        lecKey,
        titleBn: `লেকচার ${lecNum}`,
        topic: lectureTitleFor(siteContent, lecKey, `${currentBvChapter.title} — ${lectureTopics[idx] || EXTRA_TOPIC}`),
        duration: lectureDurationFor(siteContent, lecKey),
        isFree,
        isUnlocked,
        priceBdt: 30,
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-bv-${currentBvChapter.id}-L${lecNum}/viewform`
      };
    });
  }, [currentBvChapter, unlockedLectures, siteContent]);

  // Sets the page state for a sub-page without touching history or scroll.
  const applySubPage = (trackId, options = {}) => {
    setActiveCourse(null);
    if (trackId === 'HOME') {
      setActiveSubPage('HOME');
      return;
    }
    if (options.bvPaperKey) {
      setHscBvPaperKey(options.bvPaperKey);
      const targetPaper = HSC_BV_PAPERS[options.bvPaperKey];
      if (targetPaper) {
        setSelectedBvChapterId(options.bvChapterId || targetPaper.chapters[0].id);
      }
    }
    if (options.specialCourseId) {
      setActiveSpecialCourseId(options.specialCourseId);
      setSelectedCourseChapterIdx(0);
    }
    if (typeof options.moduleIdx === 'number') {
      setPart3ModuleIdx(options.moduleIdx);
      setPart3ChapterIdx(options.chapterIdx || 0);
    }
    if (options.researchCardId) {
      setActiveResearchCardId(options.researchCardId);
    }
    setBvOpenPaper(trackId === 'HSC Bangla Version' ? options.bvPaperKey || null : null);
    setAdmUniv(trackId === 'Admission Test (BUET/DU)' ? options.admUniv || null : null);
    setHonYear(trackId === 'B.Sc. Honours Math' ? options.honYear || null : null);
    setSelectedTrack(trackId);
    setActiveSubPage(trackId);
  };

  // Course pages: { kind: 'bv', id, parent, title } or
  // { kind: 'track', trackId, moduleIdx, chapterIdx, parent, title, sub, icon, grad }.
  const applyCourse = (course) => {
    if (course.kind === 'bv') {
      setActiveSpecialCourseId(course.id);
      setSelectedCourseChapterIdx(0);
    } else if (course.kind === 'about' || course.kind === 'private') {
      // About Me and private-batch option pages need no extra state.
    } else if (course.kind === 'bvChapter') {
      setHscBvPaperKey(course.paperKey);
      setSelectedBvChapterId(course.chapterId);
    } else {
      setSelectedTrack(course.trackId);
      setPart3ModuleIdx(course.moduleIdx);
      setPart3ChapterIdx(course.chapterIdx || 0);
      if (course.trackId === 'Admission Test (BUET/DU)') {
        const m = PART3_ACADEMIC_TRACKS['Admission Test (BUET/DU)'].modules[course.moduleIdx];
        setAdmUniv((m && m.univ) || null);
      }
      if (course.trackId === 'B.Sc. Honours Math') {
        const m = PART3_ACADEMIC_TRACKS['B.Sc. Honours Math'].modules[course.moduleIdx];
        setHonYear((m && m.year) || null);
      }
    }
    setActiveCourse(course);
    setActiveSubPage('COURSE');
  };

  const scrollToAnchorOrTop = (anchorId) => {
    window.requestAnimationFrame(() => {
      const el = anchorId && document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // Remember where the viewer was, then add a history entry so the browser
  // back button (and our Back button) returns to the same spot.
  // With `replace`, swap the current entry instead (used for previous/next chapter).
  const pushNavState = (navState, replace = false) => {
    const current = window.history.state || { page: 'HOME', depth: 0 };
    const path = navStateToPath(navState);
    if (replace) {
      window.history.replaceState({ ...navState, depth: current.depth || 0 }, '', path);
      return;
    }
    window.history.replaceState({ ...current, scrollY: window.scrollY }, '');
    window.history.pushState({ ...navState, depth: (current.depth || 0) + 1 }, '', path);
  };

  const openSubPage = (trackId, options = {}) => {
    pushNavState({ page: trackId, options });
    applySubPage(trackId, options);
    scrollToAnchorOrTop(options.anchorId);
  };

  const openCourse = (course, replace = false) => {
    pushNavState({ page: 'COURSE', course }, replace);
    applyCourse(course);
    scrollToAnchorOrTop();
  };

  const goBack = () => {
    if ((window.history.state?.depth || 0) > 0) window.history.back();
    else openSubPage('HOME');
  };

  const applyNavState = (st) => {
    if (st.page === 'COURSE' && st.course) applyCourse(st.course);
    else applySubPage(st.page || 'HOME', st.options || {});
  };

  useEffect(() => {
    // Open the page named in the address (a shared link or a reload), else keep this entry's state.
    const legacy = /^#\//.test(window.location.hash);
    const fromAddress = legacy ? hashToNavState(window.location.hash) : pathToNavState(window.location.pathname);
    const initial = !legacy && window.history.state && window.history.state.page ? window.history.state : { ...fromAddress, depth: 0 };
    // An old #/ link moves to its real address; a real address is left exactly as typed.
    window.history.replaceState(initial, '', legacy ? navStateToPath(initial) : window.location.pathname + window.location.search);
    if (initial.page !== 'HOME') {
      applyNavState(initial);
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          const el = initial.options && initial.options.anchorId && document.getElementById(initial.options.anchorId);
          if (el) el.scrollIntoView({ block: 'start' });
        })
      );
    }
    const onPopState = (e) => {
      // A hand-edited address arrives without state; rebuild it from the hash.
      const st = e.state || { ...pathToNavState(window.location.pathname), depth: 0 };
      if (!e.state) window.history.replaceState(st, '');
      applyNavState(st);
      const y = st.scrollY || 0;
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'auto' }))
      );
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const isCourseView = activeSubPage === 'COURSE' && !!activeCourse;
  const isTrackCourse =
    isCourseView && (activeCourse.kind === 'track' || activeCourse.kind === 'trackChapter');
  const isTrackChapterView = isCourseView && activeCourse.kind === 'trackChapter';
  const part3TrackKey = isTrackCourse ? activeCourse.trackId : activeSubPage;
  // The Admission landing (7 university cards, or one university's 2 section cards) has its own view.
  const admissionHubView = activeSubPage === 'Admission Test (BUET/DU)' && !isCourseView;
  const honoursHubView = activeSubPage === 'B.Sc. Honours Math' && !isCourseView;
  const evHubView = activeSubPage === 'HSC English Version' && !isCourseView;
  const oaHubView = activeSubPage === 'O-Level & A-Level' && !isCourseView;
  // Friendly Bengali page labels for the breadcrumb (menu already uses these).
  const pageLabelBn = (id) =>
    ({ 'Admission Test (BUET/DU)': 'ভর্তি পরীক্ষার প্রস্তুতি', 'B.Sc. Honours Math': 'B.Sc. Honours', 'Job Math': 'JOB MATH', 'Class Routine': 'লাইভ ক্লাসের রুটিন', 'Private Batch': 'প্রাইভেট ব্যাচ' }[id] || id);

  // Browser tab title follows the page.
  useEffect(() => {
    // Only a real page address gets the page's tags; any other address (a chapter added in the admin,
    // a mistyped link) keeps the page it was served with and only gets a tab title.
    const info = routeInfo(pathToNavState(window.location.pathname));
    if (info && info.path === window.location.pathname) applyHeadMeta(info);
    else document.title = activeSubPage === 'HOME' ? HOME_TITLE : `${isCourseView ? activeCourse.title : activeSubPage} | Emran Islam`;
  }, [activeSubPage, activeCourse, isCourseView]);

  const openBvChapter = (paper, ch, replace = false) =>
    openCourse({
      kind: 'bvChapter',
      paperKey: paper.id,
      chapterId: ch.id,
      parent: 'HSC Bangla Version',
      title: `${ch.num}: ${ch.title}`
    }, replace);

  const openTrackChapter = (track, mod, mIdx, ch, cIdx, replace = false) =>
    openCourse({
      kind: 'trackChapter',
      trackId: track.id,
      parent: track.id,
      moduleIdx: mIdx,
      chapterIdx: cIdx,
      title: `${ch.num} — ${ch.title}`,
      sub: `${mod.name} • ${ch.eng}`,
      icon: ch.icon,
      grad: mod.grad
    }, replace);
  const navActive = isCourseView ? activeCourse.parent : activeSubPage;
  // On phones the menu is one swipeable row: keep the current page's button in view.
  useEffect(() => {
    const row = navRowRef.current;
    const on = row && row.querySelector('button.shadow-sm');
    if (on && row.scrollWidth > row.clientWidth) row.scrollTo({ left: Math.max(0, on.offsetLeft - 16), behavior: 'auto' });
  }, [navActive]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
      {/* STICKY HEADER WITH SUBTLE PROFILE AVATAR */}
      <header className="lg:sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border-2 border-teal-400/70 shadow-md">
              <img src="/assets/emran-avatar.jpg" alt="Emran Islam" className="w-full h-full object-cover object-top" draggable="false" />
            </div>
            <div onClick={() => openSubPage('HOME')} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white hover:text-teal-300 transition">
                  Emran Islam
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  M.Sc. (3.79) & B.Sc. Hons (3.52) • Jahangirnagar University
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lecturer in Mathematics<span className="hidden sm:inline"> (Hamdard Public College, Dhaka) • Optimization & ML Researcher • Author</span>
              </p>
            </div>
          </div>

          <div
            ref={navRowRef}
            className="main-nav -mx-4 flex w-[calc(100%+2rem)] items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-full sm:px-0 lg:flex-wrap lg:gap-1.5 lg:overflow-visible lg:pb-0 lg:[&>button]:px-2.5 [&>button]:shrink-0 [&>button]:whitespace-nowrap"
          >
            <button
              onClick={() => openSubPage('HOME')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'HOME'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => openSubPage('HSC Bangla Version')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'HSC Bangla Version'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-800'
              }`}
            >
              🏆 HSC বাংলা ভার্সন
            </button>
            <button
              onClick={() => openSubPage('HSC English Version')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'HSC English Version'
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800'
              }`}
            >
              🎯 HSC English Version
            </button>
            <button
              onClick={() => openSubPage('O-Level & A-Level')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'O-Level & A-Level'
                  ? 'bg-purple-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-800'
              }`}
            >
              📐 O / A-Level
            </button>
            <button
              onClick={() => openSubPage('Admission Test (BUET/DU)')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'Admission Test (BUET/DU)'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800'
              }`}
            >
              🚀 ভর্তি পরীক্ষার প্রস্তুতি
            </button>
            <button
              onClick={() => openSubPage('Job Math')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'Job Math'
                  ? 'bg-lime-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-lime-300 border border-slate-800'
              }`}
            >
              💼 JOB MATH
            </button>
            <button
              onClick={() => openSubPage('B.Sc. Honours Math')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'B.Sc. Honours Math'
                  ? 'bg-emerald-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800'
              }`}
            >
              🎓 B.Sc. Honours
            </button>
            <button
              onClick={() => openSubPage('Research & Papers')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'Research & Papers'
                  ? 'bg-rose-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800'
              }`}
            >
              🔬 Research
            </button>
            <button
              onClick={() => setBookModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition"
            >
              📚 বইসমূহ
            </button>
            <button
              onClick={() => openSubPage('About Me')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'About Me'
                  ? 'bg-sky-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800'
              }`}
            >
              👤 About Me
            </button>
            <button
              onClick={() => openSubPage('Private Batch')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'Private Batch'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 text-amber-300 border border-amber-400/40'
              }`}
            >
              📅 প্রাইভেট ব্যাচ
            </button>
            <button
              onClick={() => openSubPage('Class Routine')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'Class Routine'
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800'
              }`}
            >
              🗓️ লাইভ ক্লাসের রুটিন
            </button>
          </div>
        </div>
      </header>

      {/* SUB-PAGE BREADCRUMB BAR (WHEN INSIDE ANY SUB-PAGE) */}
      {activeSubPage !== 'HOME' && (
        <div className="bg-slate-900/95 border-b border-cyan-500/30">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={goBack}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md transition"
              >
                ← ফিরে যান (Back)
              </button>
              <div className="text-xs sm:text-sm font-bold text-slate-300 flex flex-wrap items-center gap-2">
                <button onClick={() => openSubPage('HOME')} className="text-slate-500 hover:text-white transition">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                {isCourseView ? (
                  <>
                    <button
                      onClick={() => openSubPage(activeCourse.parent)}
                      className="text-slate-400 hover:text-white transition"
                    >
                      {pageLabelBn(activeCourse.parent)}
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-amber-300 font-extrabold">{activeCourse.title}</span>
                  </>
                ) : (
                  <span className="text-amber-300 font-extrabold">{pageLabelBn(activeSubPage)}</span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 1: CLEAN HOME LANDING PAGE (ONLY SHOWN WHEN activeSubPage === 'HOME') */}
      {activeSubPage === 'HOME' && (
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(20,184,166,0.16),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(245,158,11,0.12),_transparent_55%)]" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* MAIN FIELD (full width; the profile lives on the dedicated About Me sub-page) */}
          <div className="lg:col-span-12 flex flex-col justify-between space-y-6 py-1">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300 sm:text-xs">
                  🎁 প্রতিটি অধ্যায়ের প্রথম লেকচার ফ্রি
                </span>
                <h2 className="text-[26px] font-black leading-[1.25] tracking-tight sm:text-4xl xl:text-5xl xl:leading-[1.2]">
                  <span className="text-white">গণিত শিখুন বুঝে,</span>{' '}
                  <span className="bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">মুখস্থ করে নয়।</span>
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  HSC, O/A Level, ভর্তি পরীক্ষা, Job Math ও B.Sc. Honours এর অধ্যায়ভিত্তিক ক্লাস, PDF হ্যান্ডনোট ও MCQ কুইজ। পড়াচ্ছেন{' '}
                  <strong className="text-white">Emran Islam</strong>, Lecturer in Mathematics, Hamdard Public College, Dhaka।
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => openSubPage('HSC Bangla Version')}
                    className="rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:from-teal-300 hover:to-emerald-300"
                  >
                    ▶ ফ্রি ক্লাস দেখুন
                  </button>
                  <button
                    type="button"
                    onClick={() => openSubPage('Private Batch')}
                    className="rounded-2xl border border-amber-400/50 bg-amber-400/10 px-5 py-3 text-sm font-extrabold text-amber-200 transition hover:bg-amber-400/20"
                  >
                    📅 প্রাইভেট ব্যাচ
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-xs text-slate-400 sm:text-sm">
                  <span><b className="text-base font-black text-white sm:text-lg">৮+</b> বছর কলেজে শিক্ষকতা</span>
                  <span><b className="text-base font-black text-white sm:text-lg">{toBnDigits(SPECIAL_COURSES_WITH_BOOKS.length + CV_SHOP_BOOKS.length)}</b>টি বইয়ের লেখক</span>
                  <span><b className="text-base font-black text-white sm:text-lg">M.Sc.</b> জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</span>
                </div>
              </div>
              <div className="relative mx-auto hidden w-56 shrink-0 lg:block xl:w-64">
                <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-teal-400/30 via-transparent to-amber-400/30 blur-2xl" />
                <img
                  src={ABOUT_PORTRAIT}
                  alt="Emran Islam"
                  className="relative aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover object-top shadow-2xl"
                  draggable="false"
                />
              </div>
            </div>

            <ContinueBanner completed={completedCourseLectures} />

            <div className="pt-1 text-center text-sm font-extrabold text-slate-200 sm:text-base">কোন বিভাগে পড়তে চান?</div>

            {/* PROGRAM CARDS (each opens its own page) */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 max-w-5xl mx-auto">
                {[
                  { id: 'HSC Bangla Version', img: 'bv', title: 'HSC বাংলা ভার্সন' },
                  { id: 'HSC English Version', img: 'ev', title: 'HSC English Version' },
                  { id: 'O-Level & A-Level', img: 'oa', title: 'O & A-Level Math' },
                  { id: 'Admission Test (BUET/DU)', img: 'adm', title: 'ভর্তি পরীক্ষার প্রস্তুতি' },
                  { id: 'Job Math', img: 'job', title: 'JOB MATH' },
                  { id: 'B.Sc. Honours Math', img: 'hon', title: 'B.Sc. Honours Math' },
                  { id: 'Research & Papers', img: 'res', title: 'Research & Thesis' },
                  { id: 'Private Batch', img: 'pvt', title: 'প্রাইভেট ব্যাচ' }
                ].map((card) => (
                  <ImageTile key={card.id} src={`/assets/cards/${card.img}.webp`} label={card.title} onClick={() => openSubPage(card.id)} />
                ))}
              </div>
            </div>

            {/* PRIVATE BATCH / 1-TO-1 BANNER */}
            <div className="relative overflow-hidden rounded-[26px] border border-amber-400/30 bg-gradient-to-r from-[#1b1408] via-[#0f1626] to-[#0b1222] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-lg">📅</span>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-white">প্রাইভেট ব্যাচ ও ১-টু-১ সেশন</div>
                    <div className="text-xs sm:text-sm text-slate-300">Online / Offline ব্যাচে যোগ দিন, একা পড়ুন, বা O/A-Level এর কাস্টম ব্যাচ বানান।</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRIVATE_OPTIONS.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => openCourse({ kind: 'private', option: o.key, parent: 'Private Batch', title: o.title })}
                      className="rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-bold text-white transition hover:border-amber-400/60 hover:bg-amber-400/15"
                    >
                      {o.icon} {o.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 space-y-12">
          <DemoVideoSection />
          <DailyQuestion />

          {/* BOOK SHELF */}
          <div id="home-books" className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 p-5 sm:p-7 space-y-5 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-400" /> লেখকের বই
              </h3>
              <button onClick={() => setBookModalOpen(true)} className="text-xs font-bold text-amber-300 hover:underline">
                সব বই দেখুন →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {visibleCourseBooks().map((item) => (
                <BookShopCard
                  key={`home-book-${item.id}`}
                  book={courseBookToShop(item)}
                  onDetails={() => setSelectedSpecialCourseModal(item)}
                />
              ))}
              {shopBooks().filter((book) => book.price).map((book) => (
                <BookShopCard key={`home-${book.key}`} book={book} />
              ))}
            </div>
          </div>

          <ProofSection />
          <FaqSection />
        </div>
      </section>
      )}

      {/* VIEW: CLASS ROUTINE */}
      {/* VIEW: ADMIN PANEL (/admin/, not in the menu) */}
      {activeSubPage === 'Admin' && <AdminPage />}

      {activeSubPage === 'Class Routine' && <ClassRoutinePage onAsk={() => askQuestion([['বিষয়', 'ক্লাস রুটিন']])} />}

      {activeSubPage === 'Live Exam' && <ExamsPage onAsk={() => askQuestion([['বিষয়', 'লাইভ এক্সাম']])} />}

      {/* VIEW: PRIVATE BATCH HUB + OPTION PAGES */}
      {activeSubPage === 'Private Batch' && (
        <PrivateBatchHub
          enrolled={enrolledCourses}
          onOpenCourse={(item) => openCourse({ kind: 'bv', id: item.id, parent: 'Private Batch', title: item.courseTitle })}
          onOpenEvCourse={(evc) =>
            openCourse({ kind: 'track', trackId: 'HSC English Version', parent: 'HSC English Version', moduleIdx: evc.moduleIdx, chapterIdx: evc.chapterIdx, title: evc.courseTitle, sub: evc.sub, icon: evc.icon, grad: evc.grad })
          }
          onOpenOption={(key) =>
            openCourse({ kind: 'private', option: key, parent: 'Private Batch', title: PRIVATE_OPTIONS.find((o) => o.key === key).title })
          }
        />
      )}
      {isCourseView && activeCourse.kind === 'private' && activeCourse.option === 'group' && (
        <PrivateGroupPage onRequest={(type, lines) => setBookingRequest({ type, lines })} />
      )}
      {isCourseView && activeCourse.kind === 'private' && activeCourse.option === 'one' && (
        <PrivateOneToOnePage onRequest={(type, lines) => setBookingRequest({ type, lines })} />
      )}
      {isCourseView && activeCourse.kind === 'private' && activeCourse.option === 'custom' && (
        <PrivateCustomOAPage onRequest={(type, lines) => setBookingRequest({ type, lines })} />
      )}

      {/* VIEW: ABOUT ME */}
      {activeSubPage === 'About Me' && (
        <AboutPage
          onOpenCv={() => setCvModalOpen(true)}
          onOpenRole={(role) =>
            openCourse({ kind: 'about', role, parent: 'About Me', title: ABOUT_ROLES.find((r) => r.key === role).title })
          }
        />
      )}

      {/* VIEW: ABOUT ME → TEACHER / RESEARCHER / AUTHOR */}
      {isCourseView && activeCourse.kind === 'about' && activeCourse.role === 'teacher' && (
        <AboutTeacherPage openSubPage={openSubPage} />
      )}
      {isCourseView && activeCourse.kind === 'about' && activeCourse.role === 'researcher' && (
        <AboutResearcherPage openSubPage={openSubPage} />
      )}
      {isCourseView && activeCourse.kind === 'about' && activeCourse.role === 'author' && (
        <AboutAuthorPage onBookDetails={(item) => setSelectedSpecialCourseModal(item)} />
      )}

      {/* VIEW 2: DEDICATED SUB-PAGE FOR HSC BANGLA VERSION */}
      {activeSubPage === 'HSC Bangla Version' && (
      <main id="hsc-bv-hub" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="rounded-[32px] bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 text-white border border-slate-800 p-5 sm:p-8 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(20,184,166,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(245,158,11,0.10),_transparent_55%)]" />

          {bvOpenPaper && HSC_BV_PAPERS[bvOpenPaper] ? (
            /* A paper's chapters */
            <div className="relative space-y-5">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br ${HSC_BV_PAPERS[bvOpenPaper].tileGrad} flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}>
                  {HSC_BV_PAPERS[bvOpenPaper].icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-300">HSC বাংলা ভার্সন</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{HSC_BV_PAPERS[bvOpenPaper].title}ের অধ্যায় সমূহ</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{toBnDigits(HSC_BV_PAPERS[bvOpenPaper].chapters.length)}টি অধ্যায়</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {HSC_BV_PAPERS[bvOpenPaper].chapters.map((ch, idx) => (
                  <PremiumCard
                    key={ch.id}
                    grad={ch.color}
                    icon={ch.icon}
                    code={ch.num}
                    bigTag={`CH-${String(idx + 1).padStart(2, '0')}`}
                    title={ch.title}
                    sub={ch.eng}
                    chips={[`${toBnDigits(lectureCountFor(siteContent, ch.id, BV_LECTURES))}টি লেকচার`]}
                    onClick={() => openBvChapter(HSC_BV_PAPERS[bvOpenPaper], ch)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* The two paper cards */}
              <div className="relative grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
                {Object.values(HSC_BV_PAPERS).map((paper) => (
                  <PremiumCard
                    key={paper.id}
                    person
                    grad={paper.tileGrad}
                    icon={paper.icon}
                    code={paper.code}
                    bigTag={paper.bigTag}
                    title={`${paper.title}ের অধ্যায় সমূহ`}
                    sub={`${toBnDigits(paper.chapters.length)}টি অধ্যায়`}
                    onClick={() => openSubPage('HSC Bangla Version', { bvPaperKey: paper.id })}
                  />
                ))}
              </div>

              {/* Authored books (shop style) */}
              <div id="special-courses-row" className="relative space-y-3 pt-6 border-t border-slate-800/90">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold text-white flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-amber-400" /> লেখকের বই
                  </span>
                  <button onClick={() => setBookModalOpen(true)} className="text-xs font-bold text-amber-300 hover:underline">
                    সব বই দেখুন →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {visibleCourseBooks().map((item) => (
                    <BookShopCard key={`book-${item.id}`} book={courseBookToShop(item)} onDetails={() => setSelectedSpecialCourseModal(item)} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      )}

      {/* VIEW: DEDICATED CHAPTER PAGE (HSC BANGLA VERSION) */}
      {isCourseView && activeCourse.kind === 'bvChapter' && (() => {
        const chIdx = currentBvPaper.chapters.findIndex((c) => c.id === currentBvChapter.id);
        const prevCh = currentBvPaper.chapters[chIdx - 1];
        const nextCh = currentBvPaper.chapters[chIdx + 1];
        return (
          <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${currentBvChapter.color} p-6 sm:p-8 text-white shadow-2xl`}>
              <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute -right-4 -bottom-10 rotate-12 text-[160px] leading-none opacity-20">{currentBvChapter.icon}</div>
              <div className="relative space-y-2">
                <span className="inline-block rounded-full bg-black/25 px-3 py-1 text-xs font-extrabold ring-1 ring-white/25 backdrop-blur-sm">
                  {currentBvPaper.title} • {currentBvChapter.num}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow">{currentBvChapter.title}</h2>
                <p className="text-sm sm:text-base font-semibold text-white/85">{currentBvChapter.eng}</p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-bold">
                  <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur">{toBnDigits(lectureCountFor(siteContent, currentBvChapter.id, BV_LECTURES))}টি লেকচার</span>
                  <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur">✓ ১ম লেকচার ফ্রি</span>
                  <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur">পরের লেকচার ৳৩০</span>
                  <button
                    type="button"
                    onClick={() =>
                      askQuestion([['অধ্যায়', `${currentBvPaper.title} • ${currentBvChapter.num}: ${currentBvChapter.title}`]])
                    }
                    className="rounded-lg bg-white px-3 py-1 text-slate-900 shadow hover:bg-amber-100"
                  >
                    ❓ প্রশ্ন করুন
                  </button>
                </div>
                <ShareButtons light className="pt-2" text={`${currentBvPaper.title} ${currentBvChapter.num}: ${currentBvChapter.title} — ফ্রি লেকচার:`} />
              </div>
            </div>
            <RememberStudy title={`${currentBvPaper.title} • ${currentBvChapter.num}: ${currentBvChapter.title}`} keys={currentBvLectures.map((l) => l.lecKey)} />
            <ChapterNotes id={currentBvChapter.id} />

          {/* STEP 3: LECTURE LIST (লেকচার ১, লেকচার ২... প্রতিটি লেকচারে ৩ ধরনের লিংক) */}
          <div className="relative bg-[#071527]/95 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-bold">
                  <span>{currentBvPaper.title}</span>
                  <span>•</span>
                  <span>{currentBvChapter.num}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  {currentBvChapter.num}: {currentBvChapter.title} ({currentBvChapter.eng}) — ধারাবাহিক লেকচারসমূহ
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold">
                  ১ম লেকচার ফ্রি • পরবর্তী প্রতিটি লেকচার ৳৩০
                </span>
              </div>
            </div>

            <ProgressBar done={currentBvLectures.filter((l) => completedCourseLectures[l.lecKey]).length} total={currentBvLectures.length} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentBvLectures.map((lec) => (
                <div
                  key={lec.lecKey}
                  className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3.5 ${
                    lec.isUnlocked
                      ? 'bg-slate-900/90 border-teal-500/40 shadow-md'
                      : 'bg-slate-950/80 border-slate-800/90 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
                            lec.isFree
                              ? 'bg-emerald-500 text-slate-950'
                              : lec.isUnlocked
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-400/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                          }`}
                        >
                          {lec.titleBn}
                        </span>
                        {lec.isFree ? (
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <Unlock className="w-3 h-3" /> ১ম লেকচার ফ্রি (Open)
                          </span>
                        ) : lec.isUnlocked ? (
                          <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> আনলককৃত (Unlocked)
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> লক করা আছে (৳{lec.priceBdt})
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white leading-snug pt-0.5">
                        {lec.topic}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      {lec.duration && (
                        <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-teal-400" /> {lec.duration}
                        </span>
                      )}
                      {lec.isUnlocked && <DoneToggle done={!!completedCourseLectures[lec.lecKey]} onClick={() => toggleCourseLectureCompletion(lec.lecKey)} />}
                    </div>
                  </div>

                  {/* 3 Links per Lecture: ক্লাস নোট (PDF), ভিডিও লেকচার, Self Test */}
                  {lec.isUnlocked ? (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() =>
                          setActiveLectureResourceModal({
                            type: 'pdf',
                            lec,
                            chapter: currentBvChapter,
                            paper: currentBvPaper
                          })
                        }
                        className="py-2 px-2.5 rounded-xl bg-teal-500/15 hover:bg-teal-500 hover:text-slate-950 text-teal-300 border border-teal-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span>ক্লাস নোট (PDF)</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveLectureResourceModal({
                            type: 'video',
                            lec,
                            chapter: currentBvChapter,
                            paper: currentBvPaper
                          })
                        }
                        className="py-2 px-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Video className="w-3.5 h-3.5 shrink-0" />
                        <span>ভিডিও লেকচার</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelfTestAnswers({});
                          setSelfTestSubmitted(false);
                          setActiveLectureResourceModal({
                            type: 'selftest',
                            lec,
                            chapter: currentBvChapter,
                            paper: currentBvPaper
                          });
                        }}
                        className="py-2 px-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Self Test</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 whitespace-nowrap">
                        <span>📄 ক্লাস নোট (PDF)</span>
                        <span>•</span>
                        <span>🎥 ভিডিও লেকচার</span>
                        <span>•</span>
                        <span>📝 Self Test</span>
                      </div>
                      <button
                        onClick={() => setUnlockModalLecture(lec)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shrink-0 transition"
                      >
                        <Lock className="w-3 h-3" /> ৳৩০ দিয়ে Unlock করুন
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

            <div className="grid grid-cols-2 gap-3">
              {prevCh ? (
                <button
                  onClick={() => openBvChapter(currentBvPaper, prevCh, true)}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left transition hover:border-slate-600"
                >
                  <div className="text-[11px] font-bold text-slate-400">← আগের অধ্যায়</div>
                  <div className="mt-1 text-sm font-extrabold text-white line-clamp-1">{prevCh.num}: {prevCh.title}</div>
                </button>
              ) : <span />}
              {nextCh ? (
                <button
                  onClick={() => openBvChapter(currentBvPaper, nextCh, true)}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-right transition hover:border-slate-600"
                >
                  <div className="text-[11px] font-bold text-slate-400">পরের অধ্যায় →</div>
                  <div className="mt-1 text-sm font-extrabold text-white line-clamp-1">{nextCh.num}: {nextCh.title}</div>
                </button>
              ) : <span />}
            </div>
          </main>
        );
      })()}

      {/* VIEW: DEDICATED SPECIAL COURSE PAGE (HSC BANGLA VERSION) */}
      {isCourseView && activeCourse.kind === 'bv' && (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#08192e] via-[#061325] to-[#040c18] border-2 border-amber-400/40 p-5 sm:p-7 space-y-6 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
              {/* Top Course Header + Student Enrollment & Progress Bar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center border-b border-slate-800 pb-5">
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold">
                      {activeSpecialCourse.courseNum}: {activeSpecialCourse.courseTitle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-bold">
                      অন্তর্ভুক্ত: {activeSpecialCourse.chaptersIncluded}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-[11px] font-semibold">
                      🎥 Live Schedule: {activeSpecialCourse.liveSchedule}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                    {activeSpecialCourse.courseTitle} ({activeSpecialCourse.courseEng}) — পূর্ণাঙ্গ কোর্স ক্লাসরুম
                  </h4>
                  <p className="text-xs text-slate-300">
                    প্রতিটি লেকচারে রয়েছে <strong className="text-teal-300">লেকচার নোট (PDF)</strong>,{' '}
                    <strong className="text-cyan-300">Recorded Class</strong>,{' '}
                    <strong className="text-purple-300">Live Class (Scheduled)</strong> এবং{' '}
                    <strong className="text-amber-300">Self Test (Google Form)</strong>।
                  </p>
                </div>

                {/* Course Progress Bar & Enrollment Status Box */}
                <div className="lg:col-span-5 bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-teal-400" />
                        <span>Student Course Progress Bar</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {courseProgressStats.completedCount} / {courseProgressStats.totalLectures} লেকচার সম্পন্ন হয়েছে
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-black text-teal-300">
                        {courseProgressStats.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400 transition-all duration-500"
                      style={{ width: `${Math.max(courseProgressStats.percent, 4)}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    {enrolledCourses[activeSpecialCourse.id] ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> আপনি এই কোর্সে Enrolled আছেন (সব লেকচার Open)
                      </span>
                    ) : (
                      <span className="text-xs text-amber-300 font-semibold">
                        কোর্স ফি: <strong>{activeSpecialCourse.priceBdt}</strong> (সব অধ্যায় ও লাইভ ক্লাস)
                      </span>
                    )}

                    {!enrolledCourses[activeSpecialCourse.id] ? (
                      <button
                        onClick={() => setCourseEnrollModal(activeSpecialCourse)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-md transition"
                      >
                        Enroll Now ({activeSpecialCourse.priceBdt})
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedSpecialCourseModal(activeSpecialCourse)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold border border-slate-700"
                      >
                        📖 কোর্সের বই দেখুন
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Included Chapters Selector Tabs inside the Selected Course */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                    এই কোর্সের অন্তর্ভুক্ত অধ্যায়সমূহ (যেকোনো অধ্যায়ে ক্লিক করে লেকচার দেখুন):
                  </span>
                  <span className="text-[11px] text-slate-400">
                    লেকচারের ডান পাশের চেকবক্সে টিক দিলে আপনার Course Progress Bar আপডেট হবে
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeSpecialCourse.syllabusChapters.map((ch, idx) => {
                    const isActiveCh = selectedCourseChapterIdx === idx;
                    return (
                      <button
                        key={ch.chId}
                        type="button"
                        onClick={() => setSelectedCourseChapterIdx(idx)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                          isActiveCh
                            ? 'bg-gradient-to-r from-teal-950/90 to-cyan-950/80 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                            : 'bg-slate-900/90 border-slate-800 hover:border-teal-500/40'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-extrabold">
                              {ch.paper}
                            </span>
                            <span className="text-xs font-extrabold text-amber-300">{ch.num}</span>
                          </div>
                          <div className="text-sm font-extrabold text-white">{ch.title}</div>
                          <div className="text-[11px] text-slate-400">{ch.eng}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold text-cyan-300">
                            {toBnDigits(lectureCountFor(siteContent, `${activeSpecialCourse.id}-${ch.chId}`, COURSE_LECTURES))}টি লেকচার
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lectures List for Selected Course Chapter (Each with PDF, Recorded Class, Live Class Scheduled, Self Test + Progress Checkbox) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {activeCourseLectures.map((lec) => {
                  const isCompleted = !!completedCourseLectures[lec.progressKey];
                  const isCourseUnlocked = !!enrolledCourses[activeSpecialCourse.id] || lec.lecNum === 1;

                  return (
                    <div
                      key={lec.progressKey}
                      className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3.5 ${
                        isCompleted
                          ? 'bg-emerald-950/25 border-emerald-500/50'
                          : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-extrabold">
                              {lec.titleBn}
                            </span>
                            <span className="text-[11px] text-amber-300 font-semibold">
                              {activeCourseChapter.paper} • {activeCourseChapter.num}
                            </span>
                            {lec.lecNum === 1 && !enrolledCourses[activeSpecialCourse.id] && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                ফ্রি ডেমো লেকচার
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-white leading-snug pt-0.5">
                            {lec.topic}
                          </div>
                        </div>

                        {/* Mark Complete Checkbox for Course Progress Bar */}
                        <button
                          type="button"
                          onClick={() => toggleCourseLectureCompletion(lec.progressKey)}
                          title="লেকচার সম্পন্ন হিসেবে চিহ্নিত করুন"
                          className={`px-2.5 py-1 rounded-xl border text-[11px] font-extrabold flex items-center gap-1 shrink-0 transition ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : 'bg-slate-950 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isCompleted ? 'Done' : 'Mark Done'}</span>
                        </button>
                      </div>

                      {/* Scheduled Live Class Info Banner */}
                      <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span className="text-purple-300 font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                          Scheduled Live Class: {lec.liveDate}
                        </span>
                        {lec.duration && <span className="text-slate-400 font-mono">{lec.duration}</span>}
                      </div>

                      {/* 4 Action Buttons per Lecture: লেকচার নোট (PDF), Recorded Class, Live Class (Scheduled), Self Test */}
                      {isCourseUnlocked ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          <button
                            onClick={() =>
                              setActiveLectureResourceModal({
                                type: 'pdf',
                                lec,
                                chapter: activeCourseChapter,
                                paper: { title: `${activeSpecialCourse.courseTitle} (${activeCourseChapter.paper})` }
                              })
                            }
                            className="py-2 px-2 rounded-xl bg-teal-500/15 hover:bg-teal-500 hover:text-slate-950 text-teal-300 border border-teal-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span>লেকচার নোট (PDF)</span>
                          </button>

                          <button
                            onClick={() =>
                              setActiveLectureResourceModal({
                                type: 'video',
                                lec,
                                chapter: activeCourseChapter,
                                paper: { title: `${activeSpecialCourse.courseTitle} (${activeCourseChapter.paper})` }
                              })
                            }
                            className="py-2 px-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                          >
                            <Video className="w-3.5 h-3.5 shrink-0" />
                            <span>Recorded Class</span>
                          </button>

                          <button
                            onClick={() =>
                              setActiveLectureResourceModal({
                                type: 'live',
                                lec,
                                chapter: activeCourseChapter,
                                paper: { title: `${activeSpecialCourse.courseTitle} (${activeCourseChapter.paper})` },
                                course: activeSpecialCourse
                              })
                            }
                            className="py-2 px-2 rounded-xl bg-purple-500/15 hover:bg-purple-400 hover:text-slate-950 text-purple-300 border border-purple-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                          >
                            <Play className="w-3.5 h-3.5 shrink-0" />
                            <span>Live Class</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelfTestAnswers({});
                              setSelfTestSubmitted(false);
                              setActiveLectureResourceModal({
                                type: 'selftest',
                                lec,
                                chapter: activeCourseChapter,
                                paper: { title: `${activeSpecialCourse.courseTitle} (${activeCourseChapter.paper})` }
                              });
                            }}
                            className="py-2 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Self Test</span>
                          </button>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-400">
                            📄 PDF • 🎥 Recorded • 🔴 Live Class • 📝 Self Test
                          </span>
                          <button
                            onClick={() => setCourseEnrollModal(activeSpecialCourse)}
                            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[11px] flex items-center gap-1 shrink-0"
                          >
                            <Lock className="w-3 h-3" /> কোর্সে Enroll করুন ({activeSpecialCourse.priceBdt})
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 lg:col-span-3 group max-w-[220px] w-full mx-auto">
              <BookCover book={courseBookToShop(activeSpecialCourse)} large />
            </div>
            <div className="sm:col-span-8 lg:col-span-9 space-y-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold">
                এই কোর্সের বই
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activeSpecialCourse.bookTitle}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{activeSpecialCourse.bookSub}</p>
              <div className="text-sm text-slate-400">লেখক: {activeSpecialCourse.author}</div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <span className="text-2xl font-black text-amber-300">{activeSpecialCourse.bookPriceBdt}</span>
                <BookStockNote />
                <button
                  type="button"
                  onClick={() => openBookOrder(courseBookToShop(activeSpecialCourse))}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-sm font-extrabold transition"
                >
                  {BOOK_HARDCOPY_IN_STOCK ? 'বইটি অর্ডার করুন' : 'PDF কপি নিন'}
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: DEDICATED SUB-PAGE FOR PART 3 TRACKS (HSC EV, O/A-LEVEL, ADMISSION, B.SC. HONOURS) */}
      {oaHubView && (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="rounded-[32px] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white border border-purple-500/30 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(168,85,247,0.14),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(6,182,212,0.10),_transparent_55%)]" />
          <div className="relative grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
            {OA_MODULES.map((m, mIdx) => (
              <PremiumCard
                key={m.id}
                person
                poster={m.name}
                grad={m.grad}
                icon={m.icon}
                code={m.code}
                title={m.name}
                sub={m.sub}
                onClick={() =>
                  openCourse({ kind: 'track', trackId: 'O-Level & A-Level', parent: 'O-Level & A-Level', moduleIdx: mIdx, chapterIdx: 0, title: m.name, sub: m.sub, icon: m.icon, grad: m.grad })
                }
              />
            ))}
          </div>
        </section>
      </main>
      )}

      {evHubView && (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="rounded-[32px] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white border border-cyan-500/30 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.10),_transparent_55%)]" />
          <div className="relative grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {PART3_ACADEMIC_TRACKS['HSC English Version'].modules.map((mod, mIdx) => (
              <PremiumCard
                key={mod.id}
                person
                poster={mod.name.replace(/Higher Math | \(EV\)/g, '')}
                grad={mod.grad}
                icon={mod.icon}
                code={mod.code}
                title={`${mod.name} — Chapters`}
                sub={`${mod.chapters.length} Chapters`}
                onClick={() =>
                  openCourse({ kind: 'track', trackId: 'HSC English Version', parent: 'HSC English Version', moduleIdx: mIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad })
                }
              />
            ))}
          </div>
        </section>
      </main>
      )}

      {honoursHubView && (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="rounded-[32px] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white border border-emerald-500/30 p-5 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.10),_transparent_55%)]" />
          {(() => {
            const honTrack = PART3_ACADEMIC_TRACKS['B.Sc. Honours Math'];
            const yr = honYear && HONOURS_YEAR_BY_ID[honYear];
            if (yr) {
              const courses = honTrack.modules.map((m, mIdx) => ({ m, mIdx })).filter(({ m }) => m.year === yr.id);
              return (
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br ${yr.grad} flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}>
                      {yr.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-300">B.Sc. Honours Math</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{yr.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">{toBnDigits(courses.length)}টি কোর্স</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    {courses.map(({ m, mIdx }) => (
                      <PremiumCard
                        key={m.id}
                        person
                        poster={m.courseCode}
                        grad={m.grad}
                        icon={m.icon}
                        title={m.name}
                        sub={m.sub}
                        chips={[`${toBnDigits(m.chapters.length)}টি ইউনিট`, '১ম লেকচার ফ্রি']}
                        onClick={() =>
                          openCourse({ kind: 'track', trackId: honTrack.id, parent: honTrack.id, moduleIdx: mIdx, chapterIdx: 0, title: m.name, sub: `${yr.short} • কোর্স কোড ${m.courseCode}`, icon: m.icon, grad: m.grad })
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div className="relative grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 max-w-5xl mx-auto">
                {HONOURS_YEARS.map((y) => (
                  <PremiumCard
                    key={y.id}
                    poster={y.short}
                    grad={y.grad}
                    icon={y.icon}
                    title={y.name}
                    sub={y.full}
                    chips={[`${toBnDigits(honTrack.modules.filter((m) => m.year === y.id).length)}টি কোর্স`]}
                    onClick={() => openSubPage('B.Sc. Honours Math', { honYear: y.id })}
                  />
                ))}
              </div>
            );
          })()}
        </section>
      </main>
      )}

      {admissionHubView && (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="rounded-[32px] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white border border-cyan-500/30 p-5 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.10),_transparent_55%)]" />
          {(() => {
            const admTrack = PART3_ACADEMIC_TRACKS['Admission Test (BUET/DU)'];
            const univ = admUniv && ADMISSION_UNIVERSITY_BY_ID[admUniv];
            if (univ) {
              const sections = admTrack.modules
                .map((m, mIdx) => ({ m, mIdx }))
                .filter(({ m }) => m.univ === univ.id);
              return (
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br ${univ.grad} flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}>
                      {univ.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-300">ভর্তি পরীক্ষার প্রস্তুতি</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{univ.full}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">অধ্যায় ভিত্তিক ক্লাস ও মডেল টেস্ট</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto">
                    {sections.map(({ m, mIdx }) => (
                      <PremiumCard
                        key={m.id}
                        poster={m.cardLabel}
                        grad={m.grad}
                        icon={m.icon}
                        title={m.cardLabel}
                        sub={m.sub}
                        chips={[`${toBnDigits(m.chapters.length)}${m.section === 'mt' ? 'টি টেস্ট' : 'টি অধ্যায়'}`, '১ম লেকচার ফ্রি']}
                        onClick={() =>
                          openCourse({ kind: 'track', trackId: admTrack.id, parent: admTrack.id, moduleIdx: mIdx, chapterIdx: 0, title: m.name, sub: m.sub, icon: m.icon, grad: m.grad })
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div className="relative grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 max-w-5xl mx-auto">
                {ADMISSION_UNIVERSITIES.map((u) => (
                  <PremiumCard
                    key={u.id}
                    poster={u.short}
                    grad={u.grad}
                    icon={u.icon}
                    title={u.name}
                    sub={u.full}
                    onClick={() => openSubPage('Admission Test (BUET/DU)', { admUniv: u.id })}
                  />
                ))}
              </div>
            );
          })()}
        </section>
      </main>
      )}

      {PART3_ACADEMIC_TRACKS[part3TrackKey] && !admissionHubView && !honoursHubView && !evHubView && !oaHubView && (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section
          id="part3-academic-hub"
          className="rounded-[32px] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white border border-cyan-500/30 p-5 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.10),_transparent_55%)]" />

          {isCourseView ? (
            <div className="relative flex items-center gap-4 border-b border-slate-800 pb-5">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br ${activeCourse.grad} flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}
              >
                {activeCourse.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-300">{pageLabelBn(activeCourse.parent)}</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{activeCourse.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{activeCourse.sub}</p>
              </div>
              {isTrackChapterView && (
                <button
                  type="button"
                  onClick={() => askQuestion([['অধ্যায়', activeCourse.title], ['কোর্স', activeCourse.sub]])}
                  className="ml-auto shrink-0 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
                >
                  ❓ প্রশ্ন করুন
                </button>
              )}
            </div>
          ) : (
            <>
          {/* Dedicated Sub-page Header */}
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {PART3_ACADEMIC_TRACKS[part3TrackKey].badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                {PART3_ACADEMIC_TRACKS[part3TrackKey].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {PART3_ACADEMIC_TRACKS[part3TrackKey].subtitle}
              </p>
            </div>
          </div>
            </>
          )}

          {(() => {
            const currentTrack = PART3_ACADEMIC_TRACKS[part3TrackKey];
            const currentModule =
              currentTrack.modules[part3ModuleIdx] || currentTrack.modules[0];
            const currentChapter =
              currentModule.chapters[part3ChapterIdx] || currentModule.chapters[0];
            const lectures = Array.from(
              { length: lectureCountFor(siteContent, `p3-${currentModule.id}-${currentChapter.id}`, (currentChapter.topics || currentModule.lectureBlueprint).length) },
              (_, idx) => {
              const topicDesc = (currentChapter.topics || currentModule.lectureBlueprint)[idx] || EXTRA_TOPIC;
              const lecNum = idx + 1;
              const lecKey = `p3-${currentModule.id}-${currentChapter.id}-lec-${lecNum}`;
              const isFree = lecNum === 1;
              const isUnlocked = isFree || !!unlockedLectures[lecKey];
              return {
                lecNum,
                lecKey,
                titleBn: `Lecture ${lecNum}`,
                topic: lectureTitleFor(siteContent, lecKey, `${currentChapter.title} — ${topicDesc}`),
                duration: lectureDurationFor(siteContent, lecKey, true),
                isFree,
                isUnlocked,
                priceBdt: currentTrack.unlockFee,
                googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-${currentChapter.id}-L${lecNum}/viewform`
              };
              }
            );

            return (
              <div className="relative space-y-8">
                {/* Course / Paper Selection Cards (hidden on a course's own page) */}
                {!isCourseView && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                      Select Course / Paper under {currentTrack.id}:
                    </span>
                    <span className="text-xs text-amber-300 font-semibold">
                      ✓ 1st Lecture Free (Open) • Subsequent Lectures Unlock: ৳{currentTrack.unlockFee}
                    </span>
                  </div>

                  <div
                    className={`grid grid-cols-2 gap-3 sm:gap-4 ${
                      currentTrack.modules.length >= 4
                        ? 'lg:grid-cols-4'
                        : currentTrack.modules.length === 3
                        ? 'lg:grid-cols-3'
                        : 'lg:grid-cols-2 max-w-3xl mx-auto'
                    } gap-4`}
                  >
                    {currentTrack.modules.map((mod, mIdx) => (
                      <PremiumCard
                        key={mod.id}
                        person
                        poster={shortTag(mod.code)}
                        grad={mod.grad}
                        icon={mod.icon}
                        title={mod.name}
                        sub={mod.sub}
                        chips={[`${mod.chapters.length} Units`]}
                        selected={currentModule.id === mod.id}
                        onClick={() =>
                          openCourse({ kind: 'track', trackId: currentTrack.id, parent: currentTrack.id, moduleIdx: mIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad })
                        }
                      />
                    ))}
                  </div>
                </div>
                )}

                {/* Chapter / Unit cards (each opens its own chapter page) */}
                {!isTrackChapterView && (
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-teal-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      {currentModule.name}: Select Chapter / Unit
                    </h4>
                  </div>

                  {(() => {
                    // Chapters in the order of the list, one block per group (a group can have its own heading).
                    const blocks = [];
                    currentModule.chapters.forEach((ch, cIdx) => {
                      const last = blocks[blocks.length - 1];
                      if (last && last.group === ch.group) last.items.push({ ch, cIdx });
                      else blocks.push({ group: ch.group, items: [{ ch, cIdx }] });
                    });
                    return blocks.map((blk, bi) => {
                      const pictures = blk.items.every((x) => x.ch.img);
                      return (
                        <div key={`${blk.group || 'all'}-${bi}`} className="space-y-3">
                          {blk.group && <h5 className="pt-2 text-sm font-extrabold text-amber-300">{blk.group}</h5>}
                          <div className={pictures ? `grid grid-cols-2 ${blk.items.length === 4 ? 'lg:grid-cols-4 max-w-6xl' : 'lg:grid-cols-3 max-w-5xl'} gap-3 sm:gap-5 mx-auto` : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'}>
                            {blk.items.map(({ ch, cIdx }) =>
                              ch.img ? (
                                <ImageTile
                                  key={ch.id}
                                  src={`/assets/cards/${ch.img}.webp`}
                                  label={`${ch.title} (${ch.eng})`}
                                  onClick={() => openTrackChapter(currentTrack, currentModule, currentTrack.modules.indexOf(currentModule), ch, cIdx)}
                                />
                              ) : (
                                <PremiumCard
                                  key={ch.id}
                                  grad={currentModule.grad}
                                  icon={ch.icon}
                                  poster={ch.num}
                                  title={ch.title}
                                  sub={ch.eng}
                                  chips={[`${lectureCountFor(siteContent, `p3-${currentModule.id}-${ch.id}`, (ch.topics || currentModule.lectureBlueprint).length)} ${ch.topics ? 'Topics' : 'Lectures'}`]}
                                  onClick={() => openTrackChapter(currentTrack, currentModule, currentTrack.modules.indexOf(currentModule), ch, cIdx)}
                                />
                              )
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
                )}

                {/* Lecture list (chapter pages only) */}
                {isTrackChapterView && (
                  <>
                <RememberStudy title={`${currentModule.name} • ${currentChapter.num}: ${currentChapter.title}`} keys={lectures.map((l) => l.lecKey)} />
                <ShareButtons text={`${currentModule.name} — ${currentChapter.title}: free first lecture`} />
                <ChapterNotes id={currentChapter.id} english />
                <div className="bg-[#071527]/95 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-bold text-cyan-300">
                        {currentModule.name} • {currentChapter.num}
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold text-white">
                        {currentChapter.title} — Lectures, PDF Notes & Self Tests
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold">
                      1st Lecture Free • Next Lectures ৳{currentTrack.unlockFee}
                    </span>
                  </div>

                  <ProgressBar done={lectures.filter((l) => completedCourseLectures[l.lecKey]).length} total={lectures.length} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lectures.map((lec) => (
                      <div
                        key={lec.lecKey}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                          lec.isUnlocked
                            ? 'bg-slate-900/90 border-teal-500/40 shadow-md'
                            : 'bg-slate-950/80 border-slate-800/90 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
                                  lec.isFree
                                    ? 'bg-emerald-500 text-slate-950'
                                    : lec.isUnlocked
                                    ? 'bg-teal-500/20 text-teal-300 border border-teal-400/40'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                                }`}
                              >
                                {lec.titleBn}
                              </span>
                              {lec.isFree ? (
                                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                  <Unlock className="w-3 h-3" /> Free (Open)
                                </span>
                              ) : lec.isUnlocked ? (
                                <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Unlocked
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                                  <Lock className="w-3 h-3" /> Locked (৳{lec.priceBdt})
                                </span>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-white leading-snug pt-0.5">
                              {lec.topic}
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1.5">
                            {lec.duration && (
                              <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-teal-400" /> {lec.duration}
                              </span>
                            )}
                            {lec.isUnlocked && <DoneToggle english done={!!completedCourseLectures[lec.lecKey]} onClick={() => toggleCourseLectureCompletion(lec.lecKey)} />}
                          </div>
                        </div>

                        {lec.isUnlocked ? (
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() =>
                                setActiveLectureResourceModal({
                                  type: 'pdf',
                                  lec,
                                  chapter: currentChapter,
                                  paper: { title: currentModule.name }
                                })
                              }
                              className="py-2 px-2 rounded-xl bg-teal-500/15 hover:bg-teal-500 hover:text-slate-950 text-teal-300 border border-teal-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                            >
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span>PDF Note</span>
                            </button>

                            <button
                              onClick={() =>
                                setActiveLectureResourceModal({
                                  type: 'video',
                                  lec,
                                  chapter: currentChapter,
                                  paper: { title: currentModule.name }
                                })
                              }
                              className="py-2 px-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                            >
                              <Video className="w-3.5 h-3.5 shrink-0" />
                              <span>Video Class</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelfTestAnswers({});
                                setSelfTestSubmitted(false);
                                setActiveLectureResourceModal({
                                  type: 'selftest',
                                  lec,
                                  chapter: currentChapter,
                                  paper: { title: currentModule.name }
                                });
                              }}
                              className="py-2 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span>Self Test</span>
                            </button>
                          </div>
                        ) : (
                          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] text-slate-400">
                              📄 PDF Note • 🎥 Video • 📝 Self Test
                            </span>
                            <button
                              onClick={() => setUnlockModalLecture(lec)}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shrink-0 transition"
                            >
                              <Lock className="w-3 h-3" /> Unlock (৳{lec.priceBdt})
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                  <div className="grid grid-cols-2 gap-3">
                    {currentModule.chapters[part3ChapterIdx - 1] ? (
                      <button
                        onClick={() =>
                          openTrackChapter(currentTrack, currentModule, part3ModuleIdx, currentModule.chapters[part3ChapterIdx - 1], part3ChapterIdx - 1, true)
                        }
                        className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left transition hover:border-slate-600"
                      >
                        <div className="text-[11px] font-bold text-slate-400">← Previous chapter</div>
                        <div className="mt-1 text-sm font-extrabold text-white line-clamp-1">
                          {currentModule.chapters[part3ChapterIdx - 1].title}
                        </div>
                      </button>
                    ) : <span />}
                    {currentModule.chapters[part3ChapterIdx + 1] ? (
                      <button
                        onClick={() =>
                          openTrackChapter(currentTrack, currentModule, part3ModuleIdx, currentModule.chapters[part3ChapterIdx + 1], part3ChapterIdx + 1, true)
                        }
                        className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-right transition hover:border-slate-600"
                      >
                        <div className="text-[11px] font-bold text-slate-400">Next chapter →</div>
                        <div className="mt-1 text-sm font-extrabold text-white line-clamp-1">
                          {currentModule.chapters[part3ChapterIdx + 1].title}
                        </div>
                      </button>
                    ) : <span />}
                  </div>
                  </>
                )}
              </div>
            );
          })()}
        </section>
      </main>
      )}

      {/* VIEW 4: DEDICATED SUB-PAGE FOR RESEARCH & PUBLICATIONS (PHD PORTFOLIO & THESIS CONSULTATION) */}
      {activeSubPage === 'Research & Papers' && (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="rounded-[32px] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white border border-rose-500/30 p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs font-bold">
                  <Microscope className="w-3.5 h-3.5 text-amber-400" />
                  THESIS CONSULTATION, COLLABORATION & PHD PORTFOLIO
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Research, Paid Thesis Consultation & Publications Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                  Select any of the 6 pillars below for Paid Thesis Consultation (Topic Selection to Completion), Research Collaboration, Ongoing Seismic ML Projects, Peer-Reviewed TSP Papers, Monographs, and Code Repositories.
                </p>
              </div>
              <button
                onClick={() => setCvModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4" /> View / Print Full Academic CV
              </button>
            </div>

            {/* 6 Research & Thesis Selector Cards inside Sub-page */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {RESEARCH_SHOWCASE_CARDS.map((rc) => {
                const isSelected = activeResearchCardId === rc.id;
                return (
                  <button
                    key={rc.id}
                    type="button"
                    onClick={() => setActiveResearchCardId(rc.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.3)]'
                        : 'bg-slate-950/90 border-slate-800 hover:border-rose-400/60'
                    }`}
                  >
                    <div
                      className={`h-16 rounded-xl bg-gradient-to-br ${rc.grad} p-2.5 flex items-center justify-between text-white`}
                    >
                      <span className="text-xs font-black">{rc.bigTag}</span>
                      <span className="text-xl">{rc.icon}</span>
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white line-clamp-1">
                        {rc.title}
                      </div>
                      <div className="text-[10px] text-amber-300 font-semibold mt-0.5">
                        {rc.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Detail Panel for the Selected Research Card */}
            <div id="research-detail" className="scroll-mt-56" />
            {activeResearchCardId === 'thesis-consultation' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#071527] border-2 border-amber-400/50 rounded-3xl p-6">
                <div className="lg:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold">
                    🎓 PAID THESIS CONSULTATION • TOPIC SELECTION TO COMPLETION
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                    B.Sc. (Honours), M.Sc. & M.Phil Thesis Mentorship Program
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    থিসিসের টপিক নির্বাচন থেকে শুরু করে প্রবলেম ফর্মুলেশন, অ্যালগরিদম ডিজাইন (Python / MATLAB / C), ডেটা অ্যানালাইসিস, ফলাফল যাচাই এবং আন্তর্জাতিক মানের LaTeX থিসিস রিপোর্ট ও প্রেজেন্টেশন তৈরি পর্যন্ত ধাপে ধাপে ১-অন-১ পেইড কনসালটেশন।
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        phase: 'Phase 1: Topic & Proposal',
                        desc: 'গবেষণার গ্যাপ নির্ণয়, লিটারেচার রিভিউ ও থিসিস প্রপোজাল অনুমোদন'
                      },
                      {
                        phase: 'Phase 2: Model & Coding',
                        desc: 'Optimization / ML / Numerical মডেল তৈরি এবং Python/C কোডিং সাপোর্ট'
                      },
                      {
                        phase: 'Phase 3: LaTeX Thesis Writing',
                        desc: 'ওভারলিফ (Overleaf LaTeX)-এ নিখুঁত থিসিস ডকুমেন্ট, গ্রাফ ও টেবিল প্রস্তুতকরণ'
                      },
                      {
                        phase: 'Phase 4: Defense & Paper',
                        desc: 'ভাইভা/ডিফেন্স স্লাইড প্রস্তুতি এবং থিসিস থেকে জার্নাল পেপার পাবলিকেশন গাইডলাইন'
                      }
                    ].map((p, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="font-extrabold text-teal-300">{p.phase}</div>
                        <div className="text-slate-300 text-[11px]">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-sm font-extrabold text-white">Book Thesis Consultation</div>
                      <div className="text-[11px] text-slate-400">Online (Zoom) or In-Person (Green Road, Dhaka)</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-black">
                      Paid Session
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="text-slate-400">কী নিয়ে সাহায্য দরকার?</div>
                    <ChoiceChips
                      options={['M.Sc. Thesis', 'B.Sc. (Honours) Project', 'Journal Paper Conversion']}
                      value={thesisLevel}
                      onChange={setThesisLevel}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setBookingRequest({ kind: 'booking', type: 'থিসিস কনসালটেশন', lines: [['ধরন', thesisLevel]] })
                      }
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold shadow-lg transition"
                    >
                      থিসিস কনসালটেশন রিকোয়েস্ট পাঠান
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeResearchCardId === 'research-collab' && (
              <div className="p-6 rounded-3xl bg-[#071527] border border-teal-400/40 space-y-4">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-extrabold">
                  🤝 ACADEMIC & PHD RESEARCH COLLABORATION
                </span>
                <h4 className="text-xl font-extrabold text-white">
                  Open for PhD Supervision, Joint Publications & Computational Research
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  I actively welcome collaboration with faculty members, PhD supervisors, and graduate researchers working in <strong>Combinatorial Optimization, Metaheuristics (NSGA-II / Fuzzy-MOGA), Scientific Machine Learning, and Computational Seismology</strong>.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={`mailto:${CV_CREDENTIALS.email}?subject=Research%20Collaboration%20Inquiry`}
                    className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs"
                  >
                    ✉️ Email: {CV_CREDENTIALS.email}
                  </a>
                  <button
                    onClick={() => setCvModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs"
                  >
                    📄 View Academic Referees & Full CV
                  </button>
                </div>
              </div>
            )}

            {activeResearchCardId === 'ongoing-projects' && (
              <div className="p-6 rounded-3xl bg-[#071527] border border-cyan-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                    Under Review • Pure and Applied Geophysics (Springer Nature, 2025–2026)
                  </span>
                  <span className="text-xs font-mono text-cyan-300">ROC-AUC ≈ 0.87</span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Leakage-Controlled Machine-Learning Framework for Short-Term Earthquake Precursor Detection on the Eastern Indian Plate Margin
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Engineered 13 physically motivated seismicity features from the USGS catalogue (cumulative Benioff strain acceleration, AMR-style convexity, robust CV of inter-event times). Built a hybrid Fuzzy-MOGA-Random Forest pipeline validated via strict time-series cross-validation and benchmarked against parameter-free Omori-law persistence baselines.
                </p>
              </div>
            )}

            {activeResearchCardId === 'journal-articles' && (
              <div className="p-6 rounded-3xl bg-[#071527] border border-indigo-500/40 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  Peer-Reviewed Journal Articles (Combinatorial Optimization & TSP)
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Published Journal Papers on the Travelling Salesman Problem (TSP)
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    • <strong>Islam, E. (2018).</strong> "An Improved Nearest Neighbour Algorithm for Solving TSP." <em>International Journal of Scientific Research in Computer Science, Engineering and Information Technology (IJSRCSEIT)</em>, Vol. 3, Issue 5, May–June 2018.
                  </li>
                  <li className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    • <strong>Islam, E., Sultana, M., & Ahmed, F. (2018).</strong> "A Tale of Revolution: Discovery and Development of TSP." <em>International Journal of Mathematics Trends and Technology (IJMTT)</em>, 57(2), 136–139.
                  </li>
                </ul>
              </div>
            )}

            {activeResearchCardId === 'academic-books' && (
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-300">
                  International Monographs (Germany) & Academic Textbooks
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {CV_CREDENTIALS.books.map((b, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#071527] border border-emerald-500/30 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-teal-300">{b.type}</span>
                      <div className="text-sm font-extrabold text-white">{b.title}</div>
                      <div className="text-xs text-slate-400">{b.publisher}</div>
                      <div className="text-xs font-mono text-amber-300">{b.isbn}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeResearchCardId === 'datasets-code' && (
              <div className="p-6 rounded-3xl bg-[#071527] border border-purple-500/40 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                  Reproducible Code & Datasets
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Scientific ML Pipelines, USGS Feature Engineering & TSP Algorithms
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-teal-300">USGS Seismicity 13-Feature Pipeline</div>
                    <p className="text-slate-400">Benioff strain, b-value & strict rolling-origin time-series evaluation in Python.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-amber-300">Improved Nearest Neighbour TSP Solver</div>
                    <p className="text-slate-400">C & Python heuristic implementations benchmarked on TSPLIB instances.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-purple-300">LaTeX Thesis & Exam Templates</div>
                    <p className="text-slate-400">Clean Overleaf templates for B.Sc./M.Sc. mathematics theses & hand notes.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      )}
      </div>

      {bookOrder && <BookOrderModal key={bookOrder.key} book={bookOrder} onClose={() => setBookOrder(null)} />}

      {/* UNLOCK (course enrollment / single lecture) */}
      {courseEnrollModal && (
        <UnlockModal
          item={{
            scope: 'course',
            key: courseEnrollModal.id,
            title: `${courseEnrollModal.courseNum}: ${courseEnrollModal.courseTitle}`,
            amount: priceNumber(courseEnrollModal.priceBdt)
          }}
          onClose={() => setCourseEnrollModal(null)}
          onWhatsApp={() => {
            const c = courseEnrollModal;
            setCourseEnrollModal(null);
            setBookingRequest({
              kind: 'payment',
              type: `কোর্সে ভর্তি: ${c.courseTitle}`,
              amount: c.priceBdt,
              lines: [['কোর্স', `${c.courseNum}: ${c.courseTitle}`], ['অধ্যায়', c.chaptersIncluded], ['ফি', c.priceBdt]]
            });
          }}
        />
      )}
      {unlockModalLecture && (
        <UnlockModal
          item={{
            scope: 'lecture',
            key: unlockModalLecture.lecKey,
            title: `${unlockModalLecture.titleBn}: ${unlockModalLecture.topic}`,
            amount: priceNumber(unlockModalLecture.priceBdt)
          }}
          onClose={() => setUnlockModalLecture(null)}
          onWhatsApp={() => {
            const l = unlockModalLecture;
            setUnlockModalLecture(null);
            setBookingRequest({
              kind: 'payment',
              type: `লেকচার আনলক: ${l.titleBn}`,
              amount: `৳${l.priceBdt}`,
              lines: [['লেকচার', l.lecKey], ['বিষয়', l.topic], ['ফি', `৳${l.priceBdt}`]]
            });
          }}
        />
      )}

      {/* LECTURE RESOURCE MODAL (PDF / VIDEO / LIVE / SELF TEST) */}
      {activeLectureResourceModal && (() => {
        const m = activeLectureResourceModal;
        const res = lectureResource(siteContent, m.lec.lecKey || m.lec.progressKey);
        const videoList = [{ t: '', id: youtubeId(res.youtube) }, ...(res.videos || []).map((x) => ({ t: x.t, id: youtubeId(x.u) }))].filter((x) => x.id);
        const pdfList = [{ t: '', u: res.pdf }, ...(res.pdfs || [])].filter((x) => x.u);
        const liveUrl = res.live || SITE_LINKS.liveClass;
        const close = () => setActiveLectureResourceModal(null);
        return (
          <div onClick={close} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 border border-cyan-500/40 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                    {m.paper.title} • {m.chapter.num} • {m.lec.titleBn}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5">{m.lec.topic}</h3>
                </div>
                <button onClick={close} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {m.type === 'pdf' &&
                (pdfList.length ? (
                  <div className="space-y-6">
                    {pdfList.map((p, i) => (
                      <div key={i} className="space-y-3">
                        {(pdfList.length > 1 || p.t) && <div className="text-sm font-bold text-teal-300">{p.t || `PDF ${toBnDigits(i + 1)}`}</div>}
                        <iframe title={p.t || 'Lecture note'} src={pdfEmbedUrl(p.u)} className="h-[60vh] w-full rounded-2xl border border-slate-800 bg-white" />
                        <a
                          href={p.u}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-teal-400"
                        >
                          <Download className="w-4 h-4" /> নতুন ট্যাবে খুলুন / ডাউনলোড
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ComingSoon what="ক্লাস নোট (PDF)" />
                ))}

              {m.type === 'video' &&
                (videoList.length ? (
                  <div className="space-y-6">
                    {videoList.map((v, i) => (
                      <div key={i} className="space-y-2">
                        {(videoList.length > 1 || v.t) && <div className="text-sm font-bold text-teal-300">{v.t || `ভিডিও ${toBnDigits(i + 1)}`}</div>}
                        <div className="aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-black">
                          <iframe
                            title={v.t || 'Video lecture'}
                            src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ComingSoon what="ভিডিও লেকচার" />
                ))}

              {m.type === 'live' && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-4 text-center">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-extrabold">
                    🔴 Live Class (Zoom / Google Meet)
                  </span>
                  <p className="text-xs text-amber-300 font-semibold">সময়সূচি: {m.lec.liveDate || 'ক্লাস রুটিন অনুযায়ী'}</p>
                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" /> লাইভ ক্লাসে যোগ দিন
                    </a>
                  ) : (
                    <p className="text-xs text-slate-400">ক্লাসের লিংক ক্লাস শুরুর আগে এখানে দেওয়া হবে।</p>
                  )}
                  <div>
                    <button
                      onClick={() => {
                        close();
                        openSubPage('Class Routine');
                      }}
                      className="text-xs font-bold text-cyan-300 hover:underline"
                    >
                      🗓️ পুরো ক্লাস রুটিন দেখুন →
                    </button>
                  </div>
                </div>
              )}

              {m.type === 'selftest' && <QuizPanel key={m.lec.lecKey || m.lec.progressKey} quizKey={m.chapter.id || m.chapter.chId} />}

              <div className="flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
                <span className="text-xs text-slate-400">এই লেকচার নিয়ে কিছু বুঝতে সমস্যা?</span>
                <button
                  onClick={() => {
                    close();
                    askQuestion([
                      ['লেকচার', `${m.paper.title} • ${m.chapter.num} • ${m.lec.titleBn}`],
                      ['বিষয়', m.lec.topic]
                    ]);
                  }}
                  className="rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
                >
                  ❓ প্রশ্ন করুন
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* SPECIAL COURSE & FEATURED BOOK MODAL */}
      {selectedSpecialCourseModal && (
        <div
          onClick={() => setSelectedSpecialCourseModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-amber-400/40 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setSelectedSpecialCourseModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5 group max-w-[240px] w-full mx-auto">
                <BookCover book={courseBookToShop(selectedSpecialCourseModal)} large />
              </div>
              <div className="sm:col-span-7 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {selectedSpecialCourseModal.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug pr-8">
                  {selectedSpecialCourseModal.bookTitle}
                </h3>
                <div className="text-sm text-slate-400">লেখক: {selectedSpecialCourseModal.author}</div>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedSpecialCourseModal.bookSub}</p>
                <div className="text-3xl font-black text-amber-300">
                  {selectedSpecialCourseModal.bookPriceBdt}
                </div>
                <BookStockNote />
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => openBookOrder(courseBookToShop(selectedSpecialCourseModal))}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-sm font-extrabold transition"
                  >
                    {BOOK_ORDER_LABEL}
                  </button>
                  <button
                    onClick={() => {
                      const item = selectedSpecialCourseModal;
                      setSelectedSpecialCourseModal(null);
                      openCourse({ kind: 'bv', id: item.id, parent: 'Private Batch', title: item.courseTitle });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold flex items-center gap-1.5 transition"
                  >
                    <BookOpen className="w-4 h-4 text-teal-300" /> {selectedSpecialCourseModal.courseTitle} কোর্সে যান
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookingRequest && (
        <RequestModal key={bookingRequest.type + bookingRequest.lines.length} request={bookingRequest} onClose={() => setBookingRequest(null)} />
      )}

      <FloatingContact onAsk={() => askQuestion()} />

      {/* AUTHORED BOOKS MODAL (shop style) */}
      {bookModalOpen && (
        <div
          onClick={() => setBookModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300">
                  বইসমূহ
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">Emran Islam-এর বই</h3>
              </div>
              <button
                onClick={() => setBookModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-extrabold text-teal-300">The Fuel of Higher Math — HSC কোর্স-ভিত্তিক বই</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {visibleCourseBooks().map((item) => (
                  <BookShopCard
                    key={`modal-book-${item.id}`}
                    book={courseBookToShop(item)}
                    onDetails={() => {
                      setBookModalOpen(false);
                      setSelectedSpecialCourseModal(item);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-sm font-extrabold text-teal-300 pt-3">প্রকাশিত বই ও আন্তর্জাতিক মনোগ্রাফ</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
                {shopBooks().map((book) => (
                  <BookShopCard key={`modal-${book.key}`} book={book} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL OFFICIAL CV MODAL */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-cyan-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300">
                  Official Curriculum Vitae (Academic & PhD Dossier)
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {CV_CREDENTIALS.fullName}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-teal-300">
                  {CV_CREDENTIALS.titles}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Dhaka, Bangladesh • {CV_CREDENTIALS.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setCvModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Educational Qualifications
              </h4>
              <div className="grid gap-2.5">
                {CV_CREDENTIALS.education.map((ed, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{ed.degree}</div>
                      <div className="text-slate-300">{ed.institution}</div>
                      <div className="text-slate-400 italic">{ed.thesis}</div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-mono font-bold">
                        {ed.result}
                      </span>
                      <div className="text-slate-400 mt-1 font-semibold">{ed.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Teaching Experience (8+ Years)
              </h4>
              <div className="grid gap-2.5">
                {CV_CREDENTIALS.experience.map((exp, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-bold text-white text-sm">{exp.role}</span>
                      <span className="font-mono text-amber-300 font-bold">{exp.period}</span>
                    </div>
                    <div className="font-semibold text-teal-300">{exp.org}</div>
                    <div className="text-slate-400">{exp.highlight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#030812] text-slate-400 border-t border-slate-800/80 pt-10 pb-24 text-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/assets/emran-avatar.jpg" alt="" className="h-11 w-11 rounded-2xl border-2 border-teal-400/70 object-cover object-top" />
              <div>
                <div className="text-base font-extrabold text-white">Emran Islam</div>
                <div className="text-xs">Lecturer in Mathematics, Hamdard Public College, Dhaka</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed">HSC, O/A Level, ভর্তি পরীক্ষা, Job Math ও B.Sc. Honours গণিতের ক্লাস, নোট ও কুইজ। প্রতিটি অধ্যায়ের প্রথম লেকচার ফ্রি।</p>
            <ContactIcons size="lg" />
          </div>
          {[
            {
              title: 'কোর্স',
              links: [
                ['HSC Bangla Version', 'HSC বাংলা ভার্সন'],
                ['HSC English Version', 'HSC English Version'],
                ['O-Level & A-Level', 'O / A Level'],
                ['Admission Test (BUET/DU)', 'ভর্তি পরীক্ষার প্রস্তুতি'],
                ['Job Math', 'JOB MATH'],
                ['B.Sc. Honours Math', 'B.Sc. Honours']
              ]
            },
            {
              title: 'আরও',
              links: [
                ['Private Batch', 'প্রাইভেট ব্যাচ ও ১-টু-১'],
                ['Class Routine', 'লাইভ ক্লাসের রুটিন'],
                ['Research & Papers', 'Research'],
                ['About Me', 'About Me']
              ]
            }
          ].map((col) => (
            <nav key={col.title} aria-label={col.title} className="space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-white">{col.title}</div>
              <ul className="space-y-1.5">
                {col.links.map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={navStateToPath({ page: id })}
                      onClick={(e) => {
                        e.preventDefault();
                        openSubPage(id);
                      }}
                      className="text-sm text-slate-400 transition hover:text-teal-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                {col.title === 'আরও' && (
                  <li>
                    <button type="button" onClick={() => setBookModalOpen(true)} className="text-sm text-slate-400 transition hover:text-teal-300">
                      বইসমূহ
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          ))}
          <div className="space-y-2.5">
            <div className="text-xs font-extrabold uppercase tracking-wider text-white">যোগাযোগ</div>
            {SITE_LINKS.whatsapp && (
              <a
                href={`https://wa.me/${SITE_LINKS.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp এ লিখুন
              </a>
            )}
            <ul className="space-y-1.5 text-sm">
              {SITE_LINKS.whatsapp && (
                <li>
                  📞 <a href={`tel:+${SITE_LINKS.whatsapp}`} className="hover:text-white">+{SITE_LINKS.whatsapp.replace(/^(\d{3})(\d{4})(\d+)$/, '$1 $2-$3')}</a>
                </li>
              )}
              <li>
                ✉️ <a href={`mailto:${SITE_LINKS.email}`} className="break-all hover:text-white">{SITE_LINKS.email}</a>
              </li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-800/80 px-4 pt-5 text-xs sm:flex-row sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} Emran Islam • M.Sc. & B.Sc. Hons (Jahangirnagar University)</div>
          <button onClick={() => openSubPage('Admin')} className="text-slate-600 hover:text-white">
            Admin
          </button>
        </div>
      </footer>
    </div>
  );
}