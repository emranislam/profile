import React, { useState, useMemo, useEffect } from 'react';
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
  Globe,
  Lock,
  Unlock,
  Trophy,
  Camera,
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

const OA_LEVEL_SHOWCASE_CARDS = [
  {
    id: 'oa-card-dmath',
    code: 'CAIE 4024',
    bigTag: 'D-MATH',
    title: 'O-Level Mathematics (D-Math 4024)',
    sub: 'Algebra, Mensuration, Trigonometry, Matrices, Vectors & Transformations',
    icon: '📏',
    grad: 'from-sky-400 via-blue-500 to-indigo-600',
    moduleIdx: 2,
    chapterIdx: 6
  },
  {
    id: 'oa-card-addmath',
    code: 'CAIE 4037',
    bigTag: 'ADD-MATH',
    title: 'O-Level Additional Mathematics (4037)',
    sub: 'Indices, Surds, Logarithms, Coordinate Geometry, Kinematics & Calculus',
    icon: '🧭',
    grad: 'from-teal-400 via-emerald-500 to-green-700',
    moduleIdx: 2,
    chapterIdx: 7
  },
  {
    id: 'oa-card-p1p2',
    code: 'AS-LEVEL',
    bigTag: 'P1 & P2',
    title: 'AS-Level Pure Math (P1 & P2)',
    sub: 'CAIE 9709 / Edexcel IAL: Quadratics, Functions, Circular Measure & Calculus',
    icon: '📐',
    grad: 'from-violet-400 via-purple-500 to-indigo-700',
    moduleIdx: 0,
    chapterIdx: 0
  },
  {
    id: 'oa-card-p3p4',
    code: 'A2-LEVEL',
    bigTag: 'P3 & P4',
    title: 'A2-Level Pure Math (P3 & P4)',
    sub: 'Parametric/Implicit Calculus, Differential Equations, 3D Vectors & Complex Loci',
    icon: '🌀',
    grad: 'from-fuchsia-400 via-purple-500 to-indigo-700',
    moduleIdx: 1,
    chapterIdx: 0
  },
  {
    id: 'oa-card-m1',
    code: 'MECHANICS',
    bigTag: 'M1',
    title: 'A-Level Mechanics (M1)',
    sub: 'Kinematics, Coplanar Forces, Friction, Connected Particles, Work & Energy',
    icon: '🚀',
    grad: 'from-amber-400 via-orange-500 to-red-600',
    moduleIdx: 2,
    chapterIdx: 0
  },
  {
    id: 'oa-card-s1',
    code: 'STATISTICS',
    bigTag: 'S1',
    title: 'A-Level Probability & Statistics (S1)',
    sub: 'Permutations, Conditional Probability, Binomial, Geometric & Normal Distributions',
    icon: '📊',
    grad: 'from-rose-400 via-pink-500 to-purple-700',
    moduleIdx: 2,
    chapterIdx: 3
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
    badge: 'CAMBRIDGE (CAIE) & EDEXCEL IAL',
    title: 'O-Level & A-Level Mathematics Hub (CAIE 9709 / 4024 / 4037 & Edexcel)',
    subtitle: 'Topical past paper solutions, examiner report insights, formula sheets, and 1-on-1/batch lecture modules.',
    unlockFee: 50,
    modules: [
      {
        id: 'oa-pure12',
        code: 'CAIE 9709 / IAL',
        name: 'AS-Level Pure Math (P1 & P2)',
        sub: 'Quadratics, Functions, Coordinate Geometry, Circular Measure, Calculus',
        icon: '📐',
        grad: 'from-violet-400 via-purple-500 to-indigo-700',
        chapters: [
          { id: 'oa-p1-1', num: 'Topic 01', title: 'Quadratics, Discriminant & Simultaneous Equations', eng: 'Completing the square, hidden quadratics & line-curve intersection', icon: '🧮' },
          { id: 'oa-p1-2', num: 'Topic 02', title: 'Functions, Domain-Range & Transformations', eng: 'Composite, one-one inverse & graphical reflections/stretches', icon: '📈' },
          { id: 'oa-p1-3', num: 'Topic 03', title: 'Coordinate Geometry & Circles', eng: 'Perpendicular bisectors, circle equations & tangent intersections', icon: '⭕' },
          { id: 'oa-p1-4', num: 'Topic 04', title: 'Circular Measure (Radians, Arc & Sector Area)', eng: 'Shaded segment geometry & compound trig perimeter problems', icon: '🧭' },
          { id: 'oa-p1-5', num: 'Topic 05', title: 'Trigonometry & Factor Formulas', eng: 'Identities, exact values & general solutions in given intervals', icon: '📊' },
          { id: 'oa-p1-6', num: 'Topic 06', title: 'Binomial Expansion & Arithmetic/Geometric Series', eng: 'Convergence of infinite GP, sigma notation & term-independent of x', icon: '🔺' },
          { id: 'oa-p1-7', num: 'Topic 07', title: 'Differentiation & Connected Rates of Change', eng: 'Stationary points, second derivative test & optimization', icon: '⚡' },
          { id: 'oa-p1-8', num: 'Topic 08', title: 'Integration & Volume of Revolution', eng: 'Definite area between curves, improper integrals & 360° rotation', icon: '∫' }
        ],
        lectureBlueprint: [
          'Syllabus Objectives, Proof of Formulas & Key Geometrical Intuition',
          'Cambridge CAIE 9709 Summer/Winter Variant-1 & Variant-2 Walkthrough',
          'Edexcel IAL P1/P2 High-Scoring Structured Questions',
          'Examiner Report Analysis: Common Pitfalls & Marking Scheme Keywords',
          'Challenging 8–10 Mark Multi-Part Problem Breakdown',
          'Topical Timed Worksheet & Instant Self-Test Assessment'
        ]
      },
      {
        id: 'oa-pure34',
        code: 'CAIE P3 / IAL P3-P4',
        name: 'A2-Level Pure Math (P3 & P4)',
        sub: 'Logarithmic/Parametric Calculus, Differential Equations, Vectors, Complex Numbers',
        icon: '🌀',
        grad: 'from-fuchsia-400 via-purple-500 to-indigo-700',
        chapters: [
          { id: 'oa-p3-1', num: 'Topic 01', title: 'Modulus, Polynomials, Logarithmic & Exponential Functions', eng: 'Graphical linearization, factor theorem & quotient remainder', icon: '♾️' },
          { id: 'oa-p3-2', num: 'Topic 02', title: 'Harmonic Form R cos(θ - α) & Double Angle Identities', eng: 'Maximum/minimum values & solving R sin(θ + α) = c', icon: '📐' },
          { id: 'oa-p3-3', num: 'Topic 03', title: 'Implicit & Parametric Differentiation', eng: 'Tangents/normals to parametric curves & product/quotient rules', icon: '⚡' },
          { id: 'oa-p3-4', num: 'Topic 04', title: 'Integration by Parts, Substitution & Partial Fractions', eng: '∫ u dv, f\'(x)/f(x) recognition & trapezium rule bounds', icon: '∫' },
          { id: 'oa-p3-5', num: 'Topic 05', title: 'Numerical Solutions of Equations (Iterative Methods)', eng: 'Sign-change locating roots, cobweb/staircase diagrams & convergence', icon: '🔢' },
          { id: 'oa-p3-6', num: 'Topic 06', title: '3D Vectors: Lines, Planes & Skew Distances', eng: 'Vector equation r = a + λb, angle between lines & foot of perpendicular', icon: '🧭' },
          { id: 'oa-p3-7', num: 'Topic 07', title: 'First-Order Differential Equations (Separable Variables)', eng: 'Newton’s law of cooling, population growth & rate modeling', icon: '📉' },
          { id: 'oa-p3-8', num: 'Topic 08', title: 'Complex Numbers & Argand Loci', eng: 'Polar/exponential form re^(iθ), circle & perpendicular bisector loci', icon: '🌀' }
        ],
        lectureBlueprint: [
          'Rigorous Concept Derivation & Visual Argand/3D Vector Mapping',
          'CAIE 9709 Paper 3 Recent 5-Year Past Paper Deep Dive',
          'Edexcel IAL P3/P4 Synoptic Calculus & Differential Equation Modeling',
          'Step-by-Step Method Marks (M1/A1) Strategy from Official Mark Schemes',
          'Advanced A* Grade Target Problem Set',
          'Timed Topical Self-Test & Solution Key'
        ]
      },
      {
        id: 'oa-mech-stat',
        code: 'M1 • S1 • ADD-MATH',
        name: 'Mechanics (M1), Statistics (S1) & O-Level Add-Math',
        sub: 'Kinematics, Newton’s Laws, Probability Distributions, O-Level 4037/4024',
        icon: '🚀',
        grad: 'from-amber-400 via-orange-500 to-rose-600',
        chapters: [
          { id: 'oa-ms-1', num: 'M1-01', title: 'Velocity-Time Graphs, Constant Acceleration & Kinematics', eng: 'SUVAT equations, multi-stage motion & vertical free fall', icon: '🚀' },
          { id: 'oa-ms-2', num: 'M1-02', title: 'Forces, Coplanar Equilibrium, Friction & Inclined Planes', eng: 'Limiting equilibrium F = μR, connected particles & pulleys', icon: '⚖️' },
          { id: 'oa-ms-3', num: 'M1-03', title: 'Work, Energy, Power & Momentum Collisions', eng: 'Conservation of mechanical energy, work-energy principle & impulse', icon: '⚡' },
          { id: 'oa-ms-4', num: 'S1-01', title: 'Permutations, Combinations & Conditional Probability', eng: 'Tree diagrams, independent/mutually exclusive events & arrangements', icon: '🎲' },
          { id: 'oa-ms-5', num: 'S1-02', title: 'Discrete Random Variables, Binomial & Geometric Distributions', eng: 'Expectation E(X), Var(X) & cumulative probability tables', icon: '📊' },
          { id: 'oa-ms-6', num: 'S1-03', title: 'The Normal Distribution & Continuity Correction', eng: 'Standardization Z = (X - μ)/σ, inverse normal & binomial approximation', icon: '🎯' },
          { id: 'oa-ms-7', num: '4037-01', title: 'O-Level Add-Math: Indices, Surds, Log & Coordinate Geometry', eng: 'CAIE 4037 Paper 1 & 2 core algebraic & geometric mastery', icon: '📏' },
          { id: 'oa-ms-8', num: '4037-02', title: 'O-Level Add-Math: Kinematics, Vectors & Calculus', eng: 'Displacement-velocity-acceleration calculus & relative velocity vectors', icon: '🧭' }
        ],
        lectureBlueprint: [
          'Free-Body Diagram / Statistical Distribution Concept Modeling',
          'CAIE 9709 Paper 4 (M1) & Paper 5 (S1) Past Paper Solutions',
          'O-Level Additional Mathematics (4037) High-Yield Exam Questions',
          'Step-by-Step Formula Sheet & Calculator Statistical Mode Guide',
          'A* Target Timed Mock Quiz & Self-Test'
        ]
      }
    ]
  },
  'Admission Test (BUET/DU)': {
    id: 'Admission Test (BUET/DU)',
    badge: 'MEDI-MATH, DU KA, ENGINEERING (BUET/CKRUET) & 20-YR ARCHIVE',
    title: 'University Admission Mathematics Hub (Medi-Math, DU ‘Ka’, BUET/CKRUET & Question Bank)',
    subtitle: 'Dedicated Medi-Math batch for Medical + DU Ka aspirants, high-voltage BUET written derivations, and 20-year question bank hacks.',
    unlockFee: 40,
    modules: [
      {
        id: 'adm-medimath',
        code: 'MEDI-MATH • DU KA',
        name: 'Medi-Math (Medical + DU ‘Ka’ Dedicated Batch)',
        sub: 'মেডিকেল প্রস্তুতির পাশাপাশি ঢাকা বিশ্ববিদ্যালয় ‘ক’ ইউনিটের গণিত প্রস্তুতির ডেডিকেটেড ব্যাচ',
        icon: '🩺',
        grad: 'from-emerald-400 via-teal-500 to-cyan-600',
        chapters: [
          { id: 'adm-mm-1', num: 'Medi-Math 01', title: 'High-Yield Calculus (Differentiation & Integration Without Fear)', eng: 'বায়োলজি-ফোকাসড শিক্ষার্থীদের জন্য কম সময়ে ১০০% কমন উপযোগী ক্যালকুলাস শর্টকাট ও রিটেন', icon: '⚡' },
          { id: 'adm-mm-2', num: 'Medi-Math 02', title: 'Matrices, Determinants, Vectors & Straight Lines', eng: 'DU ‘Ka’ MCQ ও সংক্ষিপ্ত লিখিত প্রশ্নের জন্য ১৫ সেকেন্ডের নির্ভুল কৌশল', icon: '🔢' },
          { id: 'adm-mm-3', num: 'Medi-Math 03', title: 'Circles, Conics & Inverse Trigonometry', eng: 'চিত্র ছাড়াই উপবৃত্ত, পরাবৃত্ত ও অধিবৃত্তের ফোকাস-উৎকেন্দ্রিকতা নির্ণয়', icon: '🪐' },
          { id: 'adm-mm-4', num: 'Medi-Math 04', title: 'Polynomials, Complex Numbers & Binomial Theorem', eng: 'এককের ঘনমূল ω, মূলের সহগ সম্পর্ক ও মধ্যপদ নির্ণয়ের সহজ ট্রিকস', icon: '🌀' },
          { id: 'adm-mm-5', num: 'Medi-Math 05', title: 'Selected Statics, Dynamics & Probability for Medical Aspirants', eng: 'বলবিদ্যা ও সম্ভাবনার শুধু সেই টপিকগুলো যা DU ‘ক’ ও GST-তে প্রতি বছর আসে', icon: '🎯' },
          { id: 'adm-mm-6', num: 'Medi-Math 06', title: 'DU ‘Ka’ Written 2.5-Mark Master Strategy & Model Tests', eng: 'মেডিকেল পরীক্ষার পর দ্রুততম সময়ে ঢাবি ‘ক’ রিটেন প্রস্তুতির পূর্ণাঙ্গ গাইডলাইন', icon: '📝' }
        ],
        lectureBlueprint: [
          'Zero-Panic Concept Builder (Designed for Medical + DU Ka Aspirants)',
          'No-Calculator 15-Second MCQ Shortcut & Memory Hooks',
          'Dhaka University (DU Ka) Last 12 Years Exact Question Walkthrough',
          '2.5-Mark DU Written Crisp Step-by-Step Presentation',
          'Medi-Math Timed Self-Test & Instant Score Evaluation'
        ]
      },
      {
        id: 'adm-du',
        code: 'DU KA • GST • AGRI',
        name: 'Dhaka University ‘Ka’ Unit & GST Varsity Booster',
        sub: 'No-Calculator 20-Second Tricks + DU Written Short-Question Mastery',
        icon: '🎯',
        grad: 'from-rose-400 via-red-500 to-orange-600',
        chapters: [
          { id: 'adm-du-1', num: 'Booster 01', title: 'No-Calculator Calculus Shortcuts (Differentiation & Integration)', eng: '10-second standard integral patterns, area shortcuts & limit tricks', icon: '⚡' },
          { id: 'adm-du-2', num: 'Booster 02', title: 'Matrices, Determinants, Real Numbers & Inequalities', eng: '2x2 / 3x3 instant inverse, eigenvalues & modulus inequality intervals', icon: '🔢' },
          { id: 'adm-du-3', num: 'Booster 03', title: 'Straight Lines, Circles & Conics Rapid Recognition', eng: 'Instant vertex, focus, latus rectum & tangent condition identification', icon: '⭕' },
          { id: 'adm-du-4', num: 'Booster 04', title: 'Trigonometry & Inverse Trig Mental Math Hacks', eng: 'Value substitution, quadrant elimination & principal value tricks', icon: '📐' },
          { id: 'adm-du-5', num: 'Booster 05', title: 'Complex Numbers, Polynomials & Binomial Theorem', eng: 'Cube roots of unity (1, ω, ω²), sum/product of roots & middle terms', icon: '🌀' },
          { id: 'adm-du-6', num: 'Booster 06', title: 'DU ‘Ka’ Written Part: 2.5-Mark Crisp Derivation Strategy', eng: 'How to write full-mark steps in limited space for Dhaka University Written', icon: '📝' }
        ],
        lectureBlueprint: [
          'No-Calculator Mental Math Framework & Formula Compression',
          'Dhaka University (DU Ka) Past 15 Years Question Analysis',
          'JU, RU, CU & GST Cluster Admission High-Yield Problems',
          'DU Written Short-Question Model Answers & Marking Breakdown',
          'Varsity Standard Timed Negative-Marking Self-Test'
        ]
      },
      {
        id: 'adm-buet',
        code: 'BUET • CKRUET • IUT',
        name: 'Engineering Written & Preli (BUET, CKRUET, IUT, MIST)',
        sub: 'BUET, KUET, RUET, CUET, MIST & IUT Written + MCQ Intensive',
        icon: '🚀',
        grad: 'from-amber-400 via-orange-500 to-red-600',
        chapters: [
          { id: 'adm-eng-1', num: 'Module 01', title: 'Engineering Calculus: Limits, L’Hôpital, Leibnitz & Extrema', eng: 'BUET Written 10-mark derivations, indeterminate forms & curve sketching', icon: '⚡' },
          { id: 'adm-eng-2', num: 'Module 02', title: 'Definite Integrals, Reduction Formulas & Area Bounded by Curves', eng: 'King’s property, Walli’s theorem, Gamma-Beta shortcuts & BUET archive', icon: '∫' },
          { id: 'adm-eng-3', num: 'Module 03', title: 'Coordinate Geometry & Conics Locus Masterclass', eng: 'Pair of straight lines, chord of contact, focal properties & rotation of axes', icon: '🪐' },
          { id: 'adm-eng-4', num: 'Module 04', title: 'Vectors & 3D Geometry for Engineering Admission', eng: 'Projection, tetrahedron volume, shortest distance & vector mechanics', icon: '🧭' },
          { id: 'adm-eng-5', num: 'Module 05', title: 'Statics & Dynamics High-Voltage Engineering Problems', eng: 'Projectile on inclined plane, river-boat minimum time & string tension', icon: '⚖️' },
          { id: 'adm-eng-6', num: 'Module 06', title: 'Matrices, Complex Numbers, Theory of Equations & Probability', eng: 'Cayley-Hamilton, nth roots of unity, card/dice Bayes probability', icon: '🎲' }
        ],
        lectureBlueprint: [
          'Concept Booster & Multi-Chapter Synoptic Theory for Engineering',
          'BUET Last 15 Years Written Question Step-by-Step Solution',
          'CKRUET, IUT & MIST High-Frequency Problem Patterns',
          'Scientific Calculator ES/EX Matrix, Integral & Complex Hacks',
          'Engineering Standard Written + MCQ Self-Test (Google Form)'
        ]
      },
      {
        id: 'adm-qbank',
        code: '20-YR ARCHIVE & HACKS',
        name: '20-Year Admission Question Bank & Calculator Hacks',
        sub: 'Topic-wise 20 Years Archive + Casio fx-991EX ClassWiz Masterclass',
        icon: '🧮',
        grad: 'from-violet-400 via-purple-500 to-indigo-700',
        chapters: [
          { id: 'adm-qb-1', num: 'Archive 01', title: 'Casio fx-991ES / 991EX ClassWiz Matrix, Vector & Complex Hacks', eng: 'Solve 4x4 systems, 3D cross products & Argand loci in 12 seconds', icon: '🧮' },
          { id: 'adm-qb-2', num: 'Archive 02', title: '20-Year Calculus Archive (BUET, DU, CKRUET, SUST, JU)', eng: 'Most repeated limit, derivative & definite integral questions with 2-line solutions', icon: '∫' },
          { id: 'adm-qb-3', num: 'Archive 03', title: '20-Year Coordinate Geometry & Conics Question Bank', eng: 'Locus, common chord, tangent & eccentric angle archive solutions', icon: '🪐' },
          { id: 'adm-qb-4', num: 'Archive 04', title: '20-Year Algebra, Permutations & Probability Archive', eng: 'Binomial coefficients, derangements & Bayes conditional probability archive', icon: '🎲' }
        ],
        lectureBlueprint: [
          'Pattern Recognition: Identifying 20-Year Repeated Question Archetypes',
          'Live Calculator Keystroke Demonstration (fx-991EX / 991CW)',
          'Option Elimination & Dimensional/Boundary Value Checking',
          'Full-Length Timed Admission Simulation Self-Test'
        ]
      }
    ]
  },
  'B.Sc. Honours Math': {
    id: 'B.Sc. Honours Math',
    badge: 'B.SC. (HONOURS) IN MATHEMATICS (6 CORE COURSES)',
    title: 'B.Sc. (Honours) & Undergraduate Mathematics Portal',
    subtitle: 'Rigorous theorem proofs, lecture notes, and solved problem sets for Major & Non-Major undergraduate courses (Public Universities, NU & 7-College).',
    unlockFee: 50,
    modules: [
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
    ]
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
    meta: item.chaptersIncluded
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

const bookOrderHref = (book) =>
  `mailto:${CV_CREDENTIALS.email}?subject=${encodeURIComponent(
    `বই অর্ডার: ${book.series ? `${book.series}: ` : ''}${book.title}`
  )}`;

function BookCover({ book, large = false }) {
  return (
    <div className="relative aspect-[3/4] w-full [perspective:900px]">
      <div
        className={`relative h-full w-full origin-left rounded-l-[4px] rounded-r-xl bg-gradient-to-br ${book.grad} overflow-hidden shadow-[8px_10px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:[transform:rotateY(-10deg)]`}
      >
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
          <span className={`text-lg font-black ${light ? 'text-[#b45309]' : 'text-amber-300'}`}>{book.price}</span>
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
        <a
          href={bookOrderHref(book)}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-2 text-center text-xs font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-orange-400"
        >
          অর্ডার করুন
        </a>
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
function ProgramTile({ grad, icon, top, big, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative rounded-[24px] p-[1.5px] text-center transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-amber-300/70 via-orange-500/40 to-rose-600 opacity-70 transition-opacity group-hover:opacity-100" />
      <span className="relative flex flex-col rounded-[23px] bg-[#0d1018] p-1.5 shadow-[inset_0_-16px_28px_-14px_rgba(249,115,22,0.35)] sm:p-2.5">
        <span className={`relative block aspect-[4/3] overflow-hidden rounded-[17px] bg-gradient-to-br ${grad}`}>
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent" />
          <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-[11px] font-black uppercase tracking-wider text-white/95 [text-shadow:0_2px_0_rgba(0,0,0,0.25)] sm:text-base">
              {top}
            </span>
            <span className="mt-0.5 text-[28px] font-black tracking-tight text-white [text-shadow:0_3px_0_rgba(0,0,0,0.3),0_8px_16px_rgba(0,0,0,0.25)] sm:text-5xl">
              {big}
            </span>
          </span>
          <span className="absolute -bottom-1 -right-1 text-3xl drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:text-5xl">
            {icon}
          </span>
        </span>
        <span className="block px-0.5 pb-1 pt-2 text-[11px] font-extrabold leading-tight text-white sm:text-sm">{label}</span>
      </span>
    </button>
  );
}

// ---------------------------------------------------------------- About Me (light editorial design)
const ABOUT_PORTRAIT = 'assets/emran-portrait.webp';

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

function AboutPage({ onOpenRole }) {
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
  { page: 'Admission Test (BUET/DU)', title: 'Admission Test', sub: 'Medi-Math, DU Ka, BUET/CKRUET & archive', icon: '🚀' },
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
          {SPECIAL_COURSES_WITH_BOOKS.map((item) => (
            <BookShopCard key={`author-${item.id}`} light book={courseBookToShop(item)} onDetails={() => onBookDetails(item)} />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <AboutSectionTitle sub="আন্তর্জাতিক মনোগ্রাফ ও পাঠ্যবই">Published Books</AboutSectionTitle>
        <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
          {CV_SHOP_BOOKS.map((book) => (
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

function PrivateBatchHub({ onOpenOption }) {
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
          <div className="text-sm font-extrabold text-emerald-300">
            ফলাফল: {toBnDigits(score)} / {toBnDigits(questions.length)}
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
        title="সাপ্তাহিক ক্লাস রুটিন"
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

// Student reviews and results. The section stays hidden until these lists have entries.
const TESTIMONIALS = [
  // { name: 'শিক্ষার্থীর নাম', info: 'HSC 2025, ঢাকা কলেজ', text: 'মতামত' },
];
const RESULT_STATS = [
  // { value: '১২০+', label: 'HSC তে A+' },
];

function ProofSection() {
  if (TESTIMONIALS.length === 0 && RESULT_STATS.length === 0) return null;
  return (
    <div className="rounded-[30px] border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-7 space-y-6">
      <h3 className="text-xl sm:text-2xl font-extrabold text-white">শিক্ষার্থীদের ফলাফল ও মতামত</h3>
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
      {TESTIMONIALS.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name + t.text} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <blockquote className="text-sm leading-relaxed text-slate-200">“{t.text}”</blockquote>
              <figcaption className="mt-3 text-xs">
                <span className="font-bold text-white">{t.name}</span>
                <span className="text-slate-400"> • {t.info}</span>
              </figcaption>
            </figure>
          ))}
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

// ---------------------------------------------------------------- Page addresses (#/...)
// Every page has its own shareable address, e.g. #/hsc-bangla/paper2/p2-ch3.
const PAGE_SLUGS = {
  'HSC Bangla Version': 'hsc-bangla',
  'HSC English Version': 'hsc-english',
  'O-Level & A-Level': 'o-a-level',
  'Admission Test (BUET/DU)': 'admission',
  'B.Sc. Honours Math': 'honours',
  'Research & Papers': 'research',
  'About Me': 'about',
  'Private Batch': 'private',
  'Class Routine': 'routine',
  Admin: 'admin'
};
const SLUG_PAGES = Object.fromEntries(Object.entries(PAGE_SLUGS).map(([page, slug]) => [slug, page]));

const navStateToHash = (st) => {
  if (!st || st.page === 'HOME') return '#/';
  if (st.page === 'COURSE' && st.course) {
    const c = st.course;
    const base = `#/${PAGE_SLUGS[c.parent] || ''}`;
    if (c.kind === 'bv') return `${base}/course/${c.id}`;
    if (c.kind === 'bvChapter') return `${base}/${c.paperKey}/${c.chapterId}`;
    if (c.kind === 'track') return `${base}/m${c.moduleIdx}`;
    if (c.kind === 'trackChapter') return `${base}/m${c.moduleIdx}/c${c.chapterIdx}`;
    if (c.kind === 'about') return `${base}/${c.role}`;
    if (c.kind === 'private') return `${base}/${c.option}`;
    return base;
  }
  const slug = PAGE_SLUGS[st.page];
  if (!slug) return '#/';
  const o = st.options || {};
  if (o.researchCardId) return `#/${slug}/${o.researchCardId}`;
  if (o.bvPaperKey) return `#/${slug}/${o.bvPaperKey}`;
  return `#/${slug}`;
};

// Rebuilds the navigation state (same shape openSubPage / openCourse use) from an address.
const hashToNavState = (hash) => {
  const parts = (hash || '').replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const page = SLUG_PAGES[parts[0]];
  if (!page) return { page: 'HOME' };
  const [, a, b] = parts;
  if (!a) return { page };

  if (page === 'HSC Bangla Version') {
    if (a === 'course') {
      const c = SPECIAL_COURSES_WITH_BOOKS.find((x) => x.id === b);
      return c ? { page: 'COURSE', course: { kind: 'bv', id: c.id, parent: page, title: c.courseTitle } } : { page };
    }
    const paper = HSC_BV_PAPERS[a];
    if (!paper) return { page };
    const ch = b && paper.chapters.find((x) => x.id === b);
    if (!ch) return { page, options: { bvPaperKey: a } };
    return { page: 'COURSE', course: { kind: 'bvChapter', paperKey: a, chapterId: ch.id, parent: page, title: `${ch.num}: ${ch.title}` } };
  }

  const track = PART3_ACADEMIC_TRACKS[page];
  if (track) {
    const mm = /^m(\d+)$/.exec(a);
    const mod = mm && track.modules[Number(mm[1])];
    if (!mod) return { page };
    const moduleIdx = Number(mm[1]);
    const cm = b && /^c(\d+)$/.exec(b);
    const ch = cm && mod.chapters[Number(cm[1])];
    if (ch) {
      return {
        page: 'COURSE',
        course: { kind: 'trackChapter', trackId: page, parent: page, moduleIdx, chapterIdx: Number(cm[1]), title: `${ch.num} — ${ch.title}`, sub: `${mod.name} • ${ch.eng}`, icon: ch.icon, grad: mod.grad }
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
    const o = PRIVATE_OPTIONS.find((x) => x.key === a);
    return o ? { page: 'COURSE', course: { kind: 'private', option: o.key, parent: page, title: o.title } } : { page };
  }
  return { page };
};

// ---------------------------------------------------------------- Content from the admin Google Sheet
// With SITE_LINKS.contentApi set (the Apps Script web app URL, see docs/ADMIN.md), lecture links,
// quizzes and private slots come from the sheet and can be edited on the #/admin page.
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
      contentCache = { lectures: {}, quiz: {}, slots: [], counts: {}, titles: {}, outline: {}, ...data };
      applyOutline(contentCache.outline);
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
          count: lectureCountFor(content, `p3-${m.id}-${ch.id}`, m.lectureBlueprint.length),
          lectures: Array.from({ length: lectureCountFor(content, `p3-${m.id}-${ch.id}`, m.lectureBlueprint.length) }, (_, i) => ({
            key: `p3-${m.id}-${ch.id}-lec-${i + 1}`,
            label: `Lecture ${i + 1} — ${m.lectureBlueprint[i] || EXTRA_TOPIC}`
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

function AdminLectureRow({ lecture, saved, title, password, onSaved }) {
  const [form, setForm] = useState({ youtube: saved.youtube || '', pdf: saved.pdf || '', live: saved.live || '' });
  const [heading, setHeading] = useState(title || '');
  const [state, setState] = useState('idle');
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setState('idle');
  };
  const badYoutube = form.youtube.trim() && !youtubeId(form.youtube);
  const save = () => {
    setState('saving');
    Promise.all([
      adminPost(password, { action: 'saveLecture', key: lecture.key, ...form }),
      adminPost(password, { action: 'saveTitle', key: lecture.key, title: heading })
    ]).then(([r, t]) => {
      r = { ok: r.ok && t.ok };
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
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <div>
          <input className={adminInput} placeholder="YouTube লিংক" value={form.youtube} onChange={set('youtube')} />
          {badYoutube && <div className="mt-1 text-[11px] text-rose-300">এটা YouTube ভিডিওর লিংক মনে হচ্ছে না</div>}
        </div>
        <input className={adminInput} placeholder="PDF লিংক (Google Drive)" value={form.pdf} onChange={set('pdf')} />
        <input className={adminInput} placeholder="লাইভ ক্লাস লিংক (ঐচ্ছিক)" value={form.live} onChange={set('live')} />
      </div>
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
          options={['🎥 লেকচার', '📚 অধ্যায়', '📝 MCQ কুইজ', '📅 প্রাইভেট স্লট', '💳 পেমেন্ট']}
          value={{ lectures: '🎥 লেকচার', outline: '📚 অধ্যায়', quiz: '📝 MCQ কুইজ', slots: '📅 প্রাইভেট স্লট', payments: '💳 পেমেন্ট' }[tab]}
          onChange={(v) => setTab({ '🎥 লেকচার': 'lectures', '📚 অধ্যায়': 'outline', '📝 MCQ কুইজ': 'quiz', '📅 প্রাইভেট স্লট': 'slots', '💳 পেমেন্ট': 'payments' }[v])}
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

      {tab === 'slots' && <AdminSlotsEditor saved={content.slots || []} password={password} />}

      {tab === 'payments' && <AdminPaymentsTab password={password} />}
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
  course: Object.fromEntries(SPECIAL_COURSES_WITH_BOOKS.map((c) => [c.id, priceNumber(c.priceBdt)]))
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
  const [lang, setLang] = useState('bn');
  const [profilePhoto, setProfilePhoto] = useState('assets/emran-avatar.jpg');
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
  const [bookingRequest, setBookingRequest] = useState(null);
  const siteContent = useContent();
  const askQuestion = (lines = []) => setBookingRequest({ kind: 'question', type: 'প্রশ্ন', lines });
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selfTestAnswers, setSelfTestAnswers] = useState({});
  const [selfTestSubmitted, setSelfTestSubmitted] = useState(false);
  const [activeResearchCardId, setActiveResearchCardId] = useState('thesis-consultation');
  const [thesisLevel, setThesisLevel] = useState('M.Sc. Thesis');

  const [part3ModuleIdx, setPart3ModuleIdx] = useState(0);
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
    const blueprint = activePart3Module.lectureBlueprint;
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
        duration: `${45 + (idx % 3) * 10} Mins`,
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
        duration: `${45 + (idx % 3) * 10} মিনিট`,
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
        duration: `${40 + (idx % 4) * 5} মিনিট`,
        isFree,
        isUnlocked,
        priceBdt: 30,
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-bv-${currentBvChapter.id}-L${lecNum}/viewform`
      };
    });
  }, [currentBvChapter, unlockedLectures, siteContent]);

  const handleCustomPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfilePhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

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
    const hash = navStateToHash(navState);
    if (replace) {
      window.history.replaceState({ ...navState, depth: current.depth || 0 }, '', hash);
      return;
    }
    window.history.replaceState({ ...current, scrollY: window.scrollY }, '');
    window.history.pushState({ ...navState, depth: (current.depth || 0) + 1 }, '', hash);
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
    const fromHash = hashToNavState(window.location.hash);
    const initial = window.history.state && window.history.state.page ? window.history.state : { ...fromHash, depth: 0 };
    window.history.replaceState(initial, '', navStateToHash(initial));
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
      const st = e.state || { ...hashToNavState(window.location.hash), depth: 0 };
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

  // Browser tab title follows the page.
  useEffect(() => {
    const label = isCourseView ? `${activeCourse.title} • ${activeCourse.parent}` : activeSubPage === 'HOME' ? '' : activeSubPage;
    document.title = label ? `${label} | Emran Islam` : 'Emran Islam | Lecturer in Mathematics';
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

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#030812] text-slate-300 border-b border-slate-800/80 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">
              Hamdard Public College, Dhaka • HSC (BV/EV) • O/A-Level • BUET/DU Admission • B.Sc. Honours Math
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeSubPage !== 'HOME' && (
              <button
                onClick={() => openSubPage('HOME')}
                className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold transition"
              >
                ← মূল হোমপেজ (Home)
              </button>
            )}
            <button
              onClick={() => openSubPage('Class Routine')}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 font-semibold border border-slate-700"
            >
              🗓️ ক্লাস রুটিন
            </button>
            <button
              onClick={() => setCvModalOpen(true)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold border border-slate-700"
            >
              📄 Full Academic CV
            </button>
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-3 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 font-semibold border border-teal-500/30 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>
      </div>

      {/* STICKY HEADER WITH SUBTLE PROFILE AVATAR */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <label
              title="আপনার নিজের ছবি পরিবর্তন করতে ক্লিক করুন"
              className="relative group cursor-pointer shrink-0"
            >
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-slate-900 border-2 border-teal-400/70 shadow-md">
                <img
                  src={profilePhoto}
                  alt="Emran Islam"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-teal-300 border border-teal-400 flex items-center justify-center">
                <Camera className="w-2.5 h-2.5" />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomPhotoUpload}
                className="hidden"
              />
            </label>
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
                Lecturer in Mathematics (Hamdard Public College, Dhaka) • Optimization & ML Researcher • Author
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
              🏆 HSC বাংলা
            </button>
            <button
              onClick={() => openSubPage('HSC English Version')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                navActive === 'HSC English Version'
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800'
              }`}
            >
              🎯 HSC English
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
              🚀 Admission
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
                      {activeCourse.parent}
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-amber-300 font-extrabold">{activeCourse.title}</span>
                  </>
                ) : (
                  <span className="text-amber-300 font-extrabold">{activeSubPage}</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>অন্য সাব-পেজে যান:</span>
              {[
                { id: 'HSC Bangla Version', label: 'HSC বাংলা' },
                { id: 'HSC English Version', label: 'HSC EV' },
                { id: 'O-Level & A-Level', label: 'O/A-Level' },
                { id: 'Admission Test (BUET/DU)', label: 'Admission' },
                { id: 'B.Sc. Honours Math', label: 'Honours' },
                { id: 'Research & Papers', label: 'Research' },
                { id: 'About Me', label: 'About Me' },
                { id: 'Private Batch', label: 'প্রাইভেট ব্যাচ' },
                { id: 'Class Routine', label: 'ক্লাস রুটিন' }
              ]
                .filter((t) => t.id !== navActive)
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => openSubPage(t.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-300 border border-slate-800 font-semibold transition"
                  >
                    {t.label}
                  </button>
                ))}
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
            <div className="space-y-3.5">
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight">
                <span className="text-white">Emran Islam —</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">
                  Where Mathematical Rigor, Teaching Excellence & Scientific Research Meet.
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
                Mathematics educator with{' '}
                <strong className="text-white">8+ years of college-level teaching</strong>{' '}
                (including nearly 7 years at Ghatail Cantonment Public School & College, now at
                Hamdard Public College, Dhaka) and an active{' '}
                <strong className="text-teal-300">
                  PhD researcher in Combinatorial Optimization & Scientific Machine Learning
                </strong>
                . Explore chapter-wise PDF hand notes, solved derivations, live/recorded classes,
                and peer-reviewed research.
              </p>
            </div>

            {/* SIX PROGRAM CARDS */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-5 max-w-3xl mx-auto">
                {[
                  {
                    id: 'HSC Bangla Version',
                    code: 'HSC',
                    bigTag: 'BV',
                    icon: '🏆',
                    title: 'HSC বাংলা ভার্সন',
                    sub: '২টি পত্র + ৬টি স্পেশাল কোর্স + ৬টি বই',
                    tileGrad: 'from-sky-400 via-blue-500 to-indigo-600',
                  },
                  {
                    id: 'HSC English Version',
                    code: 'HSC',
                    bigTag: 'EV',
                    icon: '🎯',
                    title: 'HSC English Version',
                    sub: '1st & 2nd Paper + 6 EV Courses',
                    tileGrad: 'from-cyan-400 via-teal-500 to-emerald-600',
                  },
                  {
                    id: 'O-Level & A-Level',
                    code: 'CAIE/IAL',
                    bigTag: 'O/A',
                    icon: '📐',
                    title: 'O & A-Level Math',
                    sub: 'D-Math, Add-Math, P1–P4, M1, S1',
                    tileGrad: 'from-violet-400 via-purple-500 to-indigo-700',
                  },
                  {
                    id: 'Admission Test (BUET/DU)',
                    code: 'ADM',
                    bigTag: 'ADM',
                    icon: '🚀',
                    title: 'Admission Test',
                    sub: 'Medi-Math, DU Ka, BUET & Archive',
                    tileGrad: 'from-amber-400 via-orange-500 to-red-600',
                  },
                  {
                    id: 'B.Sc. Honours Math',
                    code: 'B.Sc.',
                    bigTag: 'HON',
                    icon: '🎓',
                    title: 'B.Sc. Honours Math',
                    sub: 'Calculus, LinAlg, ODE, Num, OR/TSP',
                    tileGrad: 'from-emerald-400 via-green-500 to-teal-700',
                  },
                  {
                    id: 'Research & Papers',
                    code: 'PhD/RES',
                    bigTag: 'RES',
                    icon: '🔬',
                    title: 'Research & Thesis',
                    sub: 'Thesis Consultation, ML & Papers',
                    tileGrad: 'from-rose-400 via-pink-500 to-purple-700',
                  }
                ].map((card) => (
                  <ProgramTile
                    key={card.id}
                    grad={card.tileGrad}
                    icon={card.icon}
                    top={card.code}
                    big={card.bigTag}
                    label={card.title}
                    onClick={() => openSubPage(card.id)}
                  />
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
          {/* STEP 1: HSC BANGLA VERSION SHOWCASE (8 CARDS + 6 BOOKS) */}
          <div
            id="home-step-1"
            className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-sky-500/30 p-5 sm:p-7 space-y-6 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-200 leading-snug pb-1">
                HSC উচ্চতর গণিত বাংলা ভার্সন
              </h3>
            </div>

            {/* 2 Paper Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto w-full">
              {Object.values(HSC_BV_PAPERS).map((paper) => (
                <PremiumCard
                  key={paper.id}
                  person
                  grad={paper.tileGrad}
                  icon={paper.icon}
                  code={paper.code}
                  bigTag={paper.bigTag}
                  title={paper.title}
                  sub={paper.sub.replace('১০টি অধ্যায়', `${toBnDigits(paper.chapters.length)}টি অধ্যায়`)}
                  chips={[`${toBnDigits(paper.chapters.length)}টি অধ্যায়`, 'প্রতি অধ্যায়ে ১০টি লেকচার']}
                  onClick={() => openSubPage('HSC Bangla Version', { bvPaperKey: paper.id })}
                />
              ))}
            </div>

            {/* 6 Special Course Cards */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                ৬টি স্পেশাল কোর্স
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {SPECIAL_COURSES_WITH_BOOKS.map((c) => (
                  <PremiumCard
                    key={c.id}
                    person
                    poster={c.courseTitle}
                    grad={c.grad}
                    icon={c.icon}
                    code={c.courseNum}
                    title={c.courseTitle}
                    sub={c.chaptersIncluded}
                    chips={[`${c.syllabusChapters.length}টি অধ্যায়`]}
                    price={c.priceBdt}
                    onClick={() =>
                      openCourse({ kind: 'bv', id: c.id, parent: 'HSC Bangla Version', title: c.courseTitle })
                    }
                  />
                ))}
              </div>
            </div>

            {/* Authored Books (shop style) */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold text-white flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-amber-400" /> লেখকের বই
                </div>
                <button
                  onClick={() => setBookModalOpen(true)}
                  className="text-xs font-bold text-amber-300 hover:underline"
                >
                  সব বই দেখুন →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {SPECIAL_COURSES_WITH_BOOKS.map((item) => (
                  <BookShopCard
                    key={`home-book-${item.id}`}
                    book={courseBookToShop(item)}
                    onDetails={() => setSelectedSpecialCourseModal(item)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2: HSC ENGLISH VERSION SHOWCASE (8 CARDS) */}
          <div
            id="home-step-2"
            className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-teal-500/30 p-5 sm:p-7 space-y-6 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-200 to-lime-200 leading-snug pb-1">
                HSC Higher Mathematics (English Version)
              </h3>
            </div>

            {/* 2 EV Paper Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto w-full">
              {PART3_ACADEMIC_TRACKS['HSC English Version'].modules.map((mod, mIdx) => (
                <PremiumCard
                  key={mod.id}
                  person
                  poster={mod.name.replace(/Higher Math | \(EV\)/g, '')}
                  grad={mod.grad}
                  icon={mod.icon}
                  code={mod.code}
                  title={mod.name}
                  sub={mod.sub}
                  chips={['NCTB English Version', '10 Chapters']}
                  onClick={() =>
                    openCourse({ kind: 'track', trackId: 'HSC English Version', parent: 'HSC English Version', moduleIdx: mIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad })
                  }
                />
              ))}
            </div>

            {/* 6 EV Special Course Cards */}
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
                  onClick={() =>
                    openCourse({ kind: 'track', trackId: 'HSC English Version', parent: 'HSC English Version', moduleIdx: evc.moduleIdx, chapterIdx: evc.chapterIdx, title: evc.courseTitle, sub: evc.sub, icon: evc.icon, grad: evc.grad })
                  }
                />
              ))}
            </div>
          </div>

          {/* STEP 3: O-LEVEL & A-LEVEL SHOWCASE (6 CARDS) */}
          <div
            id="home-step-3"
            className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-purple-500/30 p-5 sm:p-7 space-y-6 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 leading-snug pb-1">
                O-Level (4024 / 4037) & A-Level (P1–P4, M1, S1)
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {OA_LEVEL_SHOWCASE_CARDS.map((oa) => (
                <PremiumCard
                  key={oa.id}
                  person
                  grad={oa.grad}
                  icon={oa.icon}
                  code={oa.code}
                  bigTag={oa.bigTag}
                  title={oa.title}
                  sub={oa.sub}
                  chips={['Topical Past Papers']}
                  onClick={() =>
                    openCourse({ kind: 'track', trackId: 'O-Level & A-Level', parent: 'O-Level & A-Level', moduleIdx: oa.moduleIdx, chapterIdx: oa.chapterIdx, title: oa.title, sub: oa.sub, icon: oa.icon, grad: oa.grad })
                  }
                />
              ))}
            </div>
          </div>

          {/* STEP 4: ADMISSION TEST SHOWCASE (4 CARDS INCLUDING MEDI-MATH) */}
          <div
            id="home-step-4"
            className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 p-5 sm:p-7 space-y-6 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 leading-snug pb-1">
                University & Engineering Admission
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {PART3_ACADEMIC_TRACKS['Admission Test (BUET/DU)'].modules.map((mod, mIdx) => (
                <PremiumCard
                  key={mod.id}
                  person
                  poster={shortTag(mod.code)}
                  grad={mod.grad}
                  icon={mod.icon}
                  title={mod.name}
                  sub={mod.sub}
                  chips={[mIdx === 0 ? 'Medical + DU Ka' : `${mod.chapters.length} Modules`, '1st Lec Free']}
                  onClick={() =>
                    openCourse({ kind: 'track', trackId: 'Admission Test (BUET/DU)', parent: 'Admission Test (BUET/DU)', moduleIdx: mIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad })
                  }
                />
              ))}
            </div>
          </div>

          {/* STEP 5: B.SC. HONOURS MATHEMATICS SHOWCASE (6 CARDS) */}
          <div
            id="home-step-5"
            className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 p-5 sm:p-7 space-y-6 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 leading-snug pb-1">
                B.Sc. (Honours) in Mathematics
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {PART3_ACADEMIC_TRACKS['B.Sc. Honours Math'].modules.map((mod, mIdx) => (
                <PremiumCard
                  key={mod.id}
                  person
                  poster={shortTag(mod.code)}
                  grad={mod.grad}
                  icon={mod.icon}
                  title={mod.name}
                  sub={mod.sub}
                  chips={[`${mod.chapters.length} Core Units`, 'Theorem Proofs + PDF']}
                  onClick={() =>
                    openCourse({ kind: 'track', trackId: 'B.Sc. Honours Math', parent: 'B.Sc. Honours Math', moduleIdx: mIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad })
                  }
                />
              ))}
            </div>
          </div>

          {/* STEP 6: RESEARCH, THESIS CONSULTATION & PUBLICATIONS SHOWCASE (6 CARDS) */}
          <div
            id="home-step-6"
            className="rounded-[30px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-rose-500/30 p-5 sm:p-7 space-y-6 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 leading-snug pb-1">
                Thesis Consultation, Ongoing Research & Publications
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {RESEARCH_SHOWCASE_CARDS.map((rc) => (
                <PremiumCard
                  key={rc.id}
                  grad={rc.grad}
                  icon={rc.icon}
                  code={rc.code}
                  bigTag={rc.bigTag}
                  title={rc.title}
                  sub={rc.sub}
                  chips={[rc.badge]}
                  onClick={() => openSubPage('Research & Papers', { researchCardId: rc.id, anchorId: 'research-detail' })}
                />
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-amber-400" /> প্রকাশিত বই
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
                {CV_SHOP_BOOKS.map((book) => (
                  <BookShopCard key={book.key} book={book} />
                ))}
              </div>
            </div>
          </div>

          <ProofSection />
          <FaqSection />
        </div>
      </section>
      )}

      {/* VIEW: CLASS ROUTINE */}
      {/* VIEW: ADMIN PANEL (#/admin, not in the menu) */}
      {activeSubPage === 'Admin' && <AdminPage />}

      {activeSubPage === 'Class Routine' && <ClassRoutinePage onAsk={() => askQuestion([['বিষয়', 'ক্লাস রুটিন']])} />}

      {/* VIEW: PRIVATE BATCH HUB + OPTION PAGES */}
      {activeSubPage === 'Private Batch' && (
        <PrivateBatchHub
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

          {/* STEP 1: PAPER SELECTION (উচ্চতর গণিত ১ম পত্র & ২য় পত্র) */}
          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  HSC বাংলা ভার্সন • একাডেমিক লার্নিং পোর্টাল
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  উচ্চতর গণিত ১ম পত্র ও ২য় পত্র — অধ্যায়ভিত্তিক লেকচার, ক্লাস নোট ও সেলফ টেস্ট
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-bold">
                  ✓ ১ম লেকচার সম্পূর্ণ Open (ফ্রি)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 font-bold">
                  🔒 পরবর্তী প্রতিটি লেকচার আনলক: ৳৩০
                </span>
              </div>
            </div>

            {/* 2 Paper Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto pt-1">
              {Object.values(HSC_BV_PAPERS).map((paper) => (
                <PremiumCard
                  key={paper.id}
                  person
                  grad={paper.tileGrad}
                  icon={paper.icon}
                  code={paper.code}
                  bigTag={paper.bigTag}
                  title={paper.title}
                  sub={paper.sub.replace('১০টি অধ্যায়', `${toBnDigits(paper.chapters.length)}টি অধ্যায়`)}
                  chips={[`ধারাবাহিক ${toBnDigits(paper.chapters.length)}টি অধ্যায়`]}
                  selected={hscBvPaperKey === paper.id}
                  onClick={() => {
                    setHscBvPaperKey(paper.id);
                    setSelectedBvChapterId(paper.chapters[0].id);
                  }}
                />
              ))}
            </div>
          </div>

          {/* STEP 2: 10 SEQUENTIAL CHAPTERS FOR SELECTED PAPER */}
          <div className="relative space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base sm:text-lg font-extrabold text-teal-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                {currentBvPaper.title} — ধারাবাহিক {toBnDigits(currentBvPaper.chapters.length)}টি অধ্যায়
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {currentBvPaper.chapters.map((ch, idx) => (
                <PremiumCard
                  key={ch.id}
                  grad={ch.color}
                  icon={ch.icon}
                  code={ch.num}
                  bigTag={`CH-${String(idx + 1).padStart(2, '0')}`}
                  title={ch.title}
                  sub={ch.eng}
                  chips={[`${toBnDigits(lectureCountFor(siteContent, ch.id, BV_LECTURES))}টি লেকচার`]}
                  onClick={() => openBvChapter(currentBvPaper, ch)}
                />
              ))}
            </div>
          </div>

          {/* STEP 4: 6 SPECIAL COURSES IN 1 ROW + COURSE INSIDE CLASSROOM (WITH PROGRESS BAR) + 6 BOOKS IN 1 ROW */}
          <div id="special-courses-row" className="relative space-y-7 pt-6 border-t border-slate-800/90">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  স্পেশাল কোর্সসমূহ (Course 1 – Course 6) ও কোর্স-ভিত্তিক রচিত বইসমূহ
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  ৬টি স্পেশাল গণিত কোর্স
                </h4>
              </div>
            </div>

            {/* 6 Special Courses in 1 Row */}
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
                  chips={[
                    `${item.syllabusChapters.length}টি অধ্যায়`,
                    ...(enrolledCourses[item.id] ? ['✓ Enrolled'] : [])
                  ]}
                  price={item.priceBdt}
                  onClick={() =>
                    openCourse({ kind: 'bv', id: item.id, parent: 'HSC Bangla Version', title: item.courseTitle })
                  }
                />
              ))}
            </div>

            {/* Authored Books (shop style) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-extrabold text-white flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-amber-400" /> কোর্স-ভিত্তিক বই
                </span>
                <button
                  onClick={() => setBookModalOpen(true)}
                  className="text-xs font-bold text-amber-300 hover:underline"
                >
                  সব বই দেখুন →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {SPECIAL_COURSES_WITH_BOOKS.map((item) => (
                  <BookShopCard
                    key={`book-${item.id}`}
                    book={courseBookToShop(item)}
                    onDetails={() => setSelectedSpecialCourseModal(item)}
                  />
                ))}
              </div>
            </div>
          </div>
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
              </div>
            </div>

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
                    <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-400" /> {lec.duration}
                    </span>
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
                        <span className="text-slate-400 font-mono">{lec.duration}</span>
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
                <a
                  href={bookOrderHref(courseBookToShop(activeSpecialCourse))}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-sm font-extrabold transition"
                >
                  বইটি অর্ডার করুন
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: DEDICATED SUB-PAGE FOR PART 3 TRACKS (HSC EV, O/A-LEVEL, ADMISSION, B.SC. HONOURS) */}
      {PART3_ACADEMIC_TRACKS[part3TrackKey] && (
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
                <span className="text-xs font-bold text-cyan-300">{activeCourse.parent}</span>
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
              { length: lectureCountFor(siteContent, `p3-${currentModule.id}-${currentChapter.id}`, currentModule.lectureBlueprint.length) },
              (_, idx) => {
              const topicDesc = currentModule.lectureBlueprint[idx] || EXTRA_TOPIC;
              const lecNum = idx + 1;
              const lecKey = `p3-${currentModule.id}-${currentChapter.id}-lec-${lecNum}`;
              const isFree = lecNum === 1;
              const isUnlocked = isFree || !!unlockedLectures[lecKey];
              return {
                lecNum,
                lecKey,
                titleBn: `Lecture ${lecNum}`,
                topic: lectureTitleFor(siteContent, lecKey, `${currentChapter.title} — ${topicDesc}`),
                duration: `${45 + (idx % 3) * 10} Mins`,
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

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {currentModule.chapters.map((ch, cIdx) => (
                      <PremiumCard
                        key={ch.id}
                        grad={currentModule.grad}
                        icon={ch.icon}
                        poster={ch.num}
                        title={ch.title}
                        sub={ch.eng}
                        chips={[`${lectureCountFor(siteContent, `p3-${currentModule.id}-${ch.id}`, currentModule.lectureBlueprint.length)} Lectures`]}
                        onClick={() =>
                          openTrackChapter(currentTrack, currentModule, currentTrack.modules.indexOf(currentModule), ch, cIdx)
                        }
                      />
                    ))}
                  </div>
                </div>
                )}

                {/* Lecture list (chapter pages only) */}
                {isTrackChapterView && (
                  <>
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
                          <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-teal-400" /> {lec.duration}
                          </span>
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
        const ytId = youtubeId(res.youtube);
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
                (res.pdf ? (
                  <div className="space-y-3">
                    <iframe title="Lecture note" src={pdfEmbedUrl(res.pdf)} className="h-[60vh] w-full rounded-2xl border border-slate-800 bg-white" />
                    <a
                      href={res.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-teal-400"
                    >
                      <Download className="w-4 h-4" /> নতুন ট্যাবে খুলুন / ডাউনলোড
                    </a>
                  </div>
                ) : (
                  <ComingSoon what="ক্লাস নোট (PDF)" />
                ))}

              {m.type === 'video' &&
                (ytId ? (
                  <div className="aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-black">
                    <iframe
                      title="Video lecture"
                      src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={bookOrderHref(courseBookToShop(selectedSpecialCourseModal))}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-sm font-extrabold transition"
                  >
                    অর্ডার করুন
                  </a>
                  <button
                    onClick={() => {
                      const item = selectedSpecialCourseModal;
                      setSelectedSpecialCourseModal(null);
                      openCourse({ kind: 'bv', id: item.id, parent: 'HSC Bangla Version', title: item.courseTitle });
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
                {SPECIAL_COURSES_WITH_BOOKS.map((item) => (
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
                {CV_SHOP_BOOKS.map((book) => (
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

      <footer className="bg-[#030812] text-slate-400 border-t border-slate-800/80 pt-6 pb-24 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white">Emran Islam</strong> — Lecturer in Mathematics (Hamdard Public College, Dhaka) • M.Sc. & B.Sc. Hons (Jahangirnagar University)
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <ContactIcons />
            <div>
              Dhaka, Bangladesh • {CV_CREDENTIALS.email} •{' '}
              <button onClick={() => openSubPage('Admin')} className="text-slate-500 hover:text-white">
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}