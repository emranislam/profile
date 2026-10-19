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
  Camera
} from 'lucide-react';

const CV_CREDENTIALS = {
  fullName: 'Emran Islam',
  titles: 'Lecturer in Mathematics | PhD Applicant — Optimization & Computational Mathematics',
  phone: '+880 1966 631211',
  email: 'emranju70@gmail.com',
  presentAddress: '168/6 Green Road, Dhaka, Bangladesh',
  permanentAddress: 'Miapara, Dhanbari, Tangail, Bangladesh',
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

// Shared premium course card. `wide` puts the art panel beside the text on larger screens.
function PremiumCard({ grad, icon, code, bigTag, title, sub, chips = [], price, cta, onClick, wide = false, selected = false }) {
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
      className="group relative isolate h-full cursor-pointer select-none rounded-[22px] p-px transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/[0.16] to-white/[0.03]" />
      <div
        className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${grad} transition-opacity duration-300 ${
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
      <div
        className={`pointer-events-none absolute -inset-2 -z-10 rounded-[30px] bg-gradient-to-br ${grad} blur-2xl transition-opacity duration-300 ${
          selected ? 'opacity-30' : 'opacity-0 group-hover:opacity-35'
        }`}
      />
      <div
        className={`relative flex h-full overflow-hidden rounded-[21px] bg-[#0a1222] ${
          wide ? 'flex-col sm:flex-row' : 'flex-col'
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-gradient-to-br ${grad} ${
            wide ? 'h-28 sm:h-auto sm:w-44' : 'h-28 sm:h-32'
          }`}
        >
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-white/10" />
          <div className="absolute -bottom-7 -right-3 rotate-12 text-[92px] leading-none opacity-25 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110">
            {icon}
          </div>
          <div className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/25 blur-md transition-all duration-700 ease-out group-hover:left-[130%]" />
          <div className="relative flex h-full flex-col justify-between gap-3 p-3.5">
            <div className="flex items-start justify-between gap-2">
              {code ? (
                <span className="rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur-sm">
                  {code}
                </span>
              ) : (
                <span />
              )}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl shadow-lg ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                {icon}
              </span>
            </div>
            {bigTag && (
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-md sm:text-3xl">
                {bigTag}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h4 className="text-sm font-extrabold leading-snug text-white line-clamp-2 sm:text-[15px]">{title}</h4>
          {sub && <p className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">{sub}</p>}
          {chips.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate-300 ring-1 ring-white/10"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center justify-between gap-2 pt-4">
            {price ? <span className="whitespace-nowrap text-base font-black text-amber-300">{price}</span> : <span />}
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold text-slate-300 transition group-hover:text-white">
              <span className={price ? 'hidden sm:inline' : ''}>{cta}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white group-hover:text-slate-950">
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
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

export default function App() {
  const [lang, setLang] = useState('bn');
  const [profilePhoto, setProfilePhoto] = useState('assets/emran-avatar.jpg');
  const [activeSubPage, setActiveSubPage] = useState('HOME');
  const [activeCourse, setActiveCourse] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('HSC Bangla Version');

  // HSC Bangla Version states
  const [hscBvPaperKey, setHscBvPaperKey] = useState('paper1');
  const [selectedBvChapterId, setSelectedBvChapterId] = useState('p1-ch1');
  const [unlockedLectures, setUnlockedLectures] = useState({});
  const [unlockModalLecture, setUnlockModalLecture] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentTrxId, setPaymentTrxId] = useState('');

  // Special Courses Inside Classroom states (Course 1 to Course 6)
  const [activeSpecialCourseId, setActiveSpecialCourseId] = useState('course-calculus');
  const [selectedCourseChapterIdx, setSelectedCourseChapterIdx] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState({ 'course-calculus': true });
  const [completedCourseLectures, setCompletedCourseLectures] = useState({
    'course-calculus-p1-ch8-lec-1': true,
    'course-calculus-p1-ch8-lec-2': true
  });
  const [courseEnrollModal, setCourseEnrollModal] = useState(null);

  // Modals
  const [activeLectureResourceModal, setActiveLectureResourceModal] = useState(null);
  const [selectedSpecialCourseModal, setSelectedSpecialCourseModal] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selfTestAnswers, setSelfTestAnswers] = useState({});
  const [selfTestSubmitted, setSelfTestSubmitted] = useState(false);
  const [activeResearchCardId, setActiveResearchCardId] = useState('thesis-consultation');
  const [thesisBookingSubmitted, setThesisBookingSubmitted] = useState(false);

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
    return blueprint.map((topicDesc, idx) => {
      const lecNum = idx + 1;
      const lecKey = `p3-${activePart3Module.id}-${activePart3Chapter.id}-lec-${lecNum}`;
      const isFree = lecNum === 1;
      const isUnlocked = isFree || !!unlockedLectures[lecKey];
      return {
        lecNum,
        lecKey,
        titleBn: `Lecture ${lecNum}`,
        topic: `${activePart3Chapter.title} — ${topicDesc}`,
        duration: `${45 + (idx % 3) * 10} Mins`,
        isFree,
        isUnlocked,
        priceBdt: activePart3Track.unlockFee,
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-${activePart3Chapter.id}-L${lecNum}/viewform`
      };
    });
  }, [activePart3Track, activePart3Module, activePart3Chapter, unlockedLectures]);

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
    return Array.from({ length: 8 }, (_, idx) => {
      const lecNum = idx + 1;
      const progressKey = `${activeSpecialCourse.id}-${activeCourseChapter.chId}-lec-${lecNum}`;
      return {
        lecNum,
        progressKey,
        titleBn: `লেকচার ${lecNum}`,
        topic: `${activeCourseChapter.title} — ${lectureTopics[idx]}`,
        duration: `${45 + (idx % 3) * 10} মিনিট`,
        liveDate: liveDates[idx],
        livePlatform: 'Zoom Live + Interactive Whiteboard',
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-course-${activeSpecialCourse.id}-${activeCourseChapter.chId}-L${lecNum}/viewform`
      };
    });
  }, [activeSpecialCourse, activeCourseChapter]);

  // Calculate overall Course Progress Bar for the active special course
  const courseProgressStats = useMemo(() => {
    const totalChapters = activeSpecialCourse.syllabusChapters.length;
    const lecturesPerChapter = 8;
    const totalLectures = totalChapters * lecturesPerChapter;
    let completedCount = 0;

    activeSpecialCourse.syllabusChapters.forEach((ch) => {
      for (let i = 1; i <= lecturesPerChapter; i++) {
        const key = `${activeSpecialCourse.id}-${ch.chId}-lec-${i}`;
        if (completedCourseLectures[key]) {
          completedCount += 1;
        }
      }
    });

    const percent = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;
    return { totalLectures, completedCount, percent };
  }, [activeSpecialCourse, completedCourseLectures]);

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

    return Array.from({ length: 10 }, (_, idx) => {
      const lecNum = idx + 1;
      const lecKey = `${currentBvChapter.id}-lec-${lecNum}`;
      const isFree = lecNum === 1;
      const isUnlocked = isFree || !!unlockedLectures[lecKey];

      return {
        lecNum,
        lecKey,
        titleBn: `লেকচার ${lecNum}`,
        topic: `${currentBvChapter.title} — ${lectureTopics[idx]}`,
        duration: `${40 + (idx % 4) * 5} মিনিট`,
        isFree,
        isUnlocked,
        priceBdt: 30,
        googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-bv-${currentBvChapter.id}-L${lecNum}/viewform`
      };
    });
  }, [currentBvChapter, unlockedLectures]);

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

  const handleUnlockLectureSubmit = (e) => {
    e.preventDefault();
    if (!unlockModalLecture) return;
    setUnlockedLectures((prev) => ({
      ...prev,
      [unlockModalLecture.lecKey]: true
    }));
    setUnlockModalLecture(null);
    setPaymentPhone('');
    setPaymentTrxId('');
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
    } else if (course.kind === 'about') {
      // About Me role pages need no extra state.
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
    if (replace) {
      window.history.replaceState({ ...navState, depth: current.depth || 0 }, '');
      return;
    }
    window.history.replaceState({ ...current, scrollY: window.scrollY }, '');
    window.history.pushState({ ...navState, depth: (current.depth || 0) + 1 }, '');
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

  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'HOME', depth: 0 }, '');
    }
    const onPopState = (e) => {
      const st = e.state || { page: 'HOME' };
      if (st.page === 'COURSE' && st.course) applyCourse(st.course);
      else applySubPage(st.page || 'HOME', st.options || {});
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
                { id: 'About Me', label: 'About Me' }
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                  <PremiumCard
                    key={card.id}
                    grad={card.tileGrad}
                    icon={card.icon}
                    code={card.code}
                    bigTag={card.bigTag}
                    title={card.title}
                    sub={card.sub}
                    cta="দেখুন"
                    onClick={() => openSubPage(card.id)}
                  />
                ))}
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  HSC উচ্চতর গণিত বাংলা ভার্সন
                </h3>
              </div>
            </div>

            {/* 2 Paper Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Object.values(HSC_BV_PAPERS).map((paper) => (
                <PremiumCard
                  key={paper.id}
                  wide
                  grad={paper.tileGrad}
                  icon={paper.icon}
                  code={paper.code}
                  bigTag={paper.bigTag}
                  title={paper.title}
                  sub={paper.sub}
                  chips={['১০টি অধ্যায়', 'প্রতি অধ্যায়ে ১০টি লেকচার']}
                  cta="সাব-পেজ"
                  onClick={() => openSubPage('HSC Bangla Version', { bvPaperKey: paper.id })}
                />
              ))}
            </div>

            {/* 6 Special Course Cards */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                ৬টি স্পেশাল কোর্স
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {SPECIAL_COURSES_WITH_BOOKS.map((c) => (
                  <PremiumCard
                    key={c.id}
                    grad={c.grad}
                    icon={c.icon}
                    code={c.courseNum}
                    title={c.courseTitle}
                    sub={c.chaptersIncluded}
                    chips={[`${c.syllabusChapters.length}টি অধ্যায়`]}
                    price={c.priceBdt}
                    cta="ক্লাসরুম"
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  HSC Higher Mathematics (English Version)
                </h3>
              </div>
            </div>

            {/* 2 EV Paper Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PART3_ACADEMIC_TRACKS['HSC English Version'].modules.map((mod, mIdx) => (
                <PremiumCard
                  key={mod.id}
                  wide
                  grad={mod.grad}
                  icon={mod.icon}
                  code={mod.code}
                  title={mod.name}
                  sub={mod.sub}
                  chips={['NCTB English Version', '10 Chapters']}
                  cta="Open"
                  onClick={() =>
                    openCourse({ kind: 'track', trackId: 'HSC English Version', parent: 'HSC English Version', moduleIdx: mIdx, chapterIdx: 0, title: mod.name, sub: mod.sub, icon: mod.icon, grad: mod.grad })
                  }
                />
              ))}
            </div>

            {/* 6 EV Special Course Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {EV_SPECIAL_COURSES.map((evc) => (
                <PremiumCard
                  key={evc.id}
                  grad={evc.grad}
                  icon={evc.icon}
                  code={evc.courseNum}
                  title={evc.courseTitle}
                  sub={evc.sub}
                  chips={['EV Batch']}
                  price={evc.priceBdt}
                  cta="Open"
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  O-Level (4024 / 4037) & A-Level (P1–P4, M1, S1)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OA_LEVEL_SHOWCASE_CARDS.map((oa) => (
                <PremiumCard
                  key={oa.id}
                  grad={oa.grad}
                  icon={oa.icon}
                  code={oa.code}
                  bigTag={oa.bigTag}
                  title={oa.title}
                  sub={oa.sub}
                  chips={['Topical Past Papers']}
                  cta="Open"
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  University & Engineering Admission
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PART3_ACADEMIC_TRACKS['Admission Test (BUET/DU)'].modules.map((mod, mIdx) => (
                <PremiumCard
                  key={mod.id}
                  grad={mod.grad}
                  icon={mod.icon}
                  code={mod.code}
                  title={mod.name}
                  sub={mod.sub}
                  chips={[mIdx === 0 ? 'Medical + DU Ka' : `${mod.chapters.length} Modules`, '1st Lec Free']}
                  cta="প্রবেশ করুন"
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  B.Sc. (Honours) in Mathematics
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PART3_ACADEMIC_TRACKS['B.Sc. Honours Math'].modules.map((mod, mIdx) => (
                <PremiumCard
                  key={mod.id}
                  grad={mod.grad}
                  icon={mod.icon}
                  code={mod.code}
                  title={mod.name}
                  sub={mod.sub}
                  chips={[`${mod.chapters.length} Core Units`, 'Theorem Proofs + PDF']}
                  cta="Open"
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  Thesis Consultation, Ongoing Research & Publications
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  cta="বিস্তারিত"
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
        </div>
      </section>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto pt-1">
              {Object.values(HSC_BV_PAPERS).map((paper) => (
                <PremiumCard
                  key={paper.id}
                  grad={paper.tileGrad}
                  icon={paper.icon}
                  code={paper.code}
                  bigTag={paper.bigTag}
                  title={paper.title}
                  sub={paper.sub}
                  chips={['ধারাবাহিক ১০টি অধ্যায়']}
                  cta={hscBvPaperKey === paper.id ? 'নির্বাচিত' : 'দেখুন'}
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
                {currentBvPaper.title} — ধারাবাহিক ১০টি অধ্যায়
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
                  chips={['১০টি লেকচার']}
                  cta="লেকচার"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {SPECIAL_COURSES_WITH_BOOKS.map((item) => (
                <PremiumCard
                  key={item.id}
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
                  cta="ক্লাসরুম"
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
                  <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur">১০টি লেকচার</span>
                  <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur">✓ ১ম লেকচার ফ্রি</span>
                  <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur">পরের লেকচার ৳৩০</span>
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
                            ৮টি লেকচার
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
            const lectures = currentModule.lectureBlueprint.map((topicDesc, idx) => {
              const lecNum = idx + 1;
              const lecKey = `p3-${currentModule.id}-${currentChapter.id}-lec-${lecNum}`;
              const isFree = lecNum === 1;
              const isUnlocked = isFree || !!unlockedLectures[lecKey];
              return {
                lecNum,
                lecKey,
                titleBn: `Lecture ${lecNum}`,
                topic: `${currentChapter.title} — ${topicDesc}`,
                duration: `${45 + (idx % 3) * 10} Mins`,
                isFree,
                isUnlocked,
                priceBdt: currentTrack.unlockFee,
                googleFormUrl: `https://docs.google.com/forms/d/e/1FAIpQLSd-emran-${currentChapter.id}-L${lecNum}/viewform`
              };
            });

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
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
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
                        grad={mod.grad}
                        icon={mod.icon}
                        code={mod.code}
                        title={mod.name}
                        sub={mod.sub}
                        chips={[`${mod.chapters.length} Units`]}
                        cta="Open"
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
                        code={ch.num}
                        title={ch.title}
                        sub={ch.eng}
                        chips={[`${currentModule.lectureBlueprint.length} Lectures`]}
                        cta="Lectures"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
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

                  {!thesisBookingSubmitted ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setThesisBookingSubmitted(true);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div>
                        <label className="block text-slate-400 mb-1">আপনার নাম ও বিশ্ববিদ্যালয় *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Arif Rahman, Dept. of Math"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-slate-400 mb-1">ডিগ্রি লেভেল *</label>
                          <select className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white">
                            <option>M.Sc. Thesis</option>
                            <option>B.Sc. (Honours) Project</option>
                            <option>Journal Paper Conversion</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">হোয়াটসঅ্যাপ নম্বর *</label>
                          <input
                            type="text"
                            required
                            placeholder="017XXXXXXXX"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">গবেষণার ক্ষেত্র / বর্তমান অবস্থা</label>
                        <textarea
                          rows={2}
                          placeholder="Need help with topic selection / Optimization / ML / LaTeX..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold shadow-lg transition"
                      >
                        থিসিস কনসালটেশন স্লট রিকোয়েস্ট পাঠান
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-400/50 text-xs space-y-2">
                      <div className="text-sm font-extrabold text-emerald-300">
                        ✓ আপনার থিসিস কনসালটেশন রিকোয়েস্ট গৃহীত হয়েছে!
                      </div>
                      <p className="text-slate-200">
                        প্রভাষক ইমরান ইসলাম স্যার খুব শীঘ্রই আপনার সাথে যোগাযোগ করে সেশনের সময়সূচি চূড়ান্ত করবেন। জরুরি প্রয়োজনে কল/হোয়াটসঅ্যাপ করুন: <strong>+880 1966 631211</strong>।
                      </p>
                      <button
                        onClick={() => setThesisBookingSubmitted(false)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-teal-300 font-bold"
                      >
                        নতুন রিকোয়েস্ট পাঠান
                      </button>
                    </div>
                  )}
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

      {/* COURSE ENROLLMENT MODAL */}
      {courseEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 border border-amber-400/50 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {courseEnrollModal.courseNum} • Full Course Enrollment
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1.5">
                  {courseEnrollModal.courseTitle} কোর্সে ভর্তি হোন
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  অন্তর্ভুক্ত অধ্যায়: {courseEnrollModal.chaptersIncluded}
                </p>
              </div>
              <button
                onClick={() => setCourseEnrollModal(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div className="font-bold text-teal-300">কোর্সে Enroll করলেই পাবেন:</div>
              <div className="text-slate-300">✓ সকল অধ্যায়ের লেকচার নোট (PDF) ও Recorded Class</div>
              <div className="text-slate-300">✓ রুটিন অনুযায়ী Scheduled Live Class ({courseEnrollModal.liveSchedule})</div>
              <div className="text-slate-300">✓ প্রতিটি লেকচারে Google Form Self Test ও Course Progress Bar</div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEnrolledCourses((prev) => ({ ...prev, [courseEnrollModal.id]: true }));
                setCourseEnrollModal(null);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">শিক্ষার্থীর নাম / মোবাইল *</label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    bKash/Nagad TrxID ({courseEnrollModal.priceBdt}) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9K4M2P"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs shadow-lg transition"
              >
                {courseEnrollModal.priceBdt} পেমেন্ট নিশ্চিত করে কোর্স আনলক করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      {unlockModalLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 border border-amber-400/50 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Instant Lecture Unlock • ৳৩০ মাত্র
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1.5">
                  {unlockModalLecture.titleBn} আনলক করুন
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentBvPaper.title} • {currentBvChapter.num}: {currentBvChapter.title}
                </p>
              </div>
              <button
                onClick={() => setUnlockModalLecture(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div className="font-bold text-teal-300">আনলক করলেই সাথে সাথে পাবেন:</div>
              <div className="text-slate-300">✓ ১. পূর্ণাঙ্গ ক্লাস নোট (PDF Download & Print)</div>
              <div className="text-slate-300">✓ ২. এইচডি রেকর্ডেড ভিডিও লেকচার</div>
              <div className="text-slate-300">✓ ৩. Self Test (Google Form কুইজ ও তাৎক্ষণিক ফলাফল)</div>
            </div>

            <form onSubmit={handleUnlockLectureSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  পেমেন্ট মাধ্যম নির্বাচন করুন (Send Money: 01966-631211)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['bKash', 'Nagad', 'Rocket'].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition ${
                        paymentMethod === m
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {m} (৳৩০)
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">আপনার মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Transaction ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8N7A6K"
                    value={paymentTrxId}
                    onChange={(e) => setPaymentTrxId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs shadow-lg transition"
              >
                ৳৩০ পেমেন্ট নিশ্চিত করে লেকচার আনলক করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LECTURE RESOURCE MODAL (PDF / VIDEO / SELF TEST GOOGLE FORM) */}
      {activeLectureResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-cyan-500/40 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  {activeLectureResourceModal.paper.title} • {activeLectureResourceModal.chapter.num} • {activeLectureResourceModal.lec.titleBn}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5">
                  {activeLectureResourceModal.lec.topic}
                </h3>
              </div>
              <button
                onClick={() => setActiveLectureResourceModal(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeLectureResourceModal.type === 'pdf' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="text-teal-300 font-bold text-sm">
                    📄 লেকচার হ্যান্ডনোট ও সূত্রাবলি (PDF ক্লাস নোট)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    প্রভাষক ইমরান ইসলাম স্যারের ক্লাসের সম্পূর্ণ হাতে লেখা নোট, প্রয়োজনীয় সূত্রের প্রমাণ এবং বোর্ড ও ভর্তি পরীক্ষার গুরুত্বপূর্ণ টাইপভিত্তিক উদাহরণ এই PDF নোটে অন্তর্ভুক্ত রয়েছে।
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-amber-300">
                    • অধ্যায়: {activeLectureResourceModal.chapter.title} ({activeLectureResourceModal.lec.titleBn})
                    <br />• প্রস্তুতকারক: Emran Islam, Lecturer in Mathematics (Hamdard Public College, Dhaka)
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> ক্লাস নোট PDF ডাউনলোড / প্রিন্ট করুন
                </button>
              </div>
            )}

            {activeLectureResourceModal.type === 'video' && (
              <div className="aspect-video rounded-2xl bg-slate-950 border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center text-teal-300">
                  <Play className="w-6 h-6 fill-teal-300" />
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {activeLectureResourceModal.lec.titleBn} — HD Recorded Video Lecture Player
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  {activeLectureResourceModal.lec.topic} • Duration: {activeLectureResourceModal.lec.duration}
                </p>
              </div>
            )}

            {activeLectureResourceModal.type === 'live' && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300">
                  <Video className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-extrabold">
                    🔴 Scheduled Live Class (Zoom / Google Meet)
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-white pt-1">
                    {activeLectureResourceModal.lec.titleBn}: {activeLectureResourceModal.lec.topic}
                  </h4>
                  <p className="text-xs text-amber-300 font-semibold">
                    সময়সূচি: {activeLectureResourceModal.lec.liveDate || 'রুটিন অনুযায়ী রাত ৮:৩০ PM'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto">
                  লাইভ ক্লাসে সরাসরি স্যারের সাথে প্রশ্নোত্তর, ডিজিটাল হোয়াইটবোর্ডে গাণিতিক সমস্যার সমাধান এবং পোল কুইজে অংশ নেওয়া যাবে।
                </div>
                <a
                  href="https://zoom.us"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" /> Join Scheduled Live Class
                </a>
              </div>
            )}

            {activeLectureResourceModal.type === 'selftest' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-amber-300 uppercase">
                      Google Form Self Test • পরীক্ষা শেষেই তাৎক্ষণিক ফলাফল (Instant Score)
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      সরাসরি Google Form-এ পরীক্ষা দিন অথবা নিচে তাৎক্ষণিক কুইজে অংশ নিয়ে সাথে সাথেই ফলাফল দেখুন।
                    </p>
                  </div>
                  <a
                    href={activeLectureResourceModal.lec.googleFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open Google Form
                  </a>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      qId: 'st1',
                      q: `১. ${activeLectureResourceModal.chapter.title} (${activeLectureResourceModal.lec.titleBn})-এর মূল সূত্রের ক্ষেত্রে নিচের কোনটি সঠিক?`,
                      options: ['সর্বদা সংজ্ঞায়িত ও অবিচ্ছিন্ন', 'শুধুমাত্র ধনাত্মক মানের জন্য প্রযোজ্য', 'শূন্য বিন্দুতে অসংজ্ঞায়িত', 'কোনোটিই নয়'],
                      correct: 0
                    },
                    {
                      qId: 'st2',
                      q: `২. বোর্ড ও এডমিশন পরীক্ষায় ${activeLectureResourceModal.chapter.title} থেকে কোন ধরনের প্রশ্ন সবচেয়ে বেশি আসে?`,
                      options: ['গাণিতিক প্রমাণ ও শর্টকাট অ্যাপ্লিকেশন', 'শুধুমাত্র সংজ্ঞা', 'তাত্ত্বিক ইতিহাস', 'কোনোটিই নয়'],
                      correct: 0
                    },
                    {
                      qId: 'st3',
                      q: `৩. এই অধ্যায়ের গাণিতিক সমস্যা দ্রুত সমাধানের মূল কৌশল কোনটি?`,
                      options: ['মূল সূত্র ও জ্যামিতিক তাৎপর্য প্রয়োগ', 'যেকোনো ধ্রুবক যোগ করা', 'বর্গমূল করা', 'ভাগ করা'],
                      correct: 0
                    }
                  ].map((item) => (
                    <div key={item.qId} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-white">{item.q}</div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {item.options.map((opt, oIdx) => {
                          const chosen = selfTestAnswers[item.qId] === oIdx;
                          const isRight = item.correct === oIdx;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={selfTestSubmitted}
                              onClick={() =>
                                setSelfTestAnswers((prev) => ({ ...prev, [item.qId]: oIdx }))
                              }
                              className={`p-2 rounded-xl border text-left text-xs transition ${
                                selfTestSubmitted
                                  ? isRight
                                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                                    : chosen
                                    ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                                    : 'bg-slate-900 border-slate-800 text-slate-500'
                                  : chosen
                                  ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {!selfTestSubmitted ? (
                  <button
                    onClick={() => setSelfTestSubmitted(true)}
                    className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs"
                  >
                    সাবমিট করুন ও তাৎক্ষণিক ফলাফল দেখুন (View Score)
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-xs space-y-1">
                    <div className="text-sm font-extrabold text-emerald-300">
                      ✓ আপনার ফলাফল (Instant Result):{' '}
                      {
                        [0, 0, 0].filter(
                          (ans, idx) => selfTestAnswers[`st${idx + 1}`] === ans
                        ).length
                      }{' '}
                      / 3
                    </div>
                    <p className="text-emerald-200">
                      সঠিক উত্তরগুলো সবুজ রঙে চিহ্নিত করে দেওয়া হয়েছে।
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
                  Present: {CV_CREDENTIALS.presentAddress} • Permanent: {CV_CREDENTIALS.permanentAddress} • {CV_CREDENTIALS.phone} • {CV_CREDENTIALS.email}
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

      <footer className="bg-[#030812] text-slate-400 border-t border-slate-800/80 py-6 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white">Emran Islam</strong> — Lecturer in Mathematics (Hamdard Public College, Dhaka) • M.Sc. & B.Sc. Hons (Jahangirnagar University)
          </div>
          <div>168/6 Green Road, Dhaka • +880 1966 631211 • emranju70@gmail.com</div>
        </div>
      </footer>
    </div>
  );
}