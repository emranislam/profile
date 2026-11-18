# কন্ট্রোল প্যানেল (Admin) সেটআপ

কন্ট্রোল প্যানেল থেকে লেকচারের YouTube ও PDF লিংক, অধ্যায়ের MCQ কুইজ আর প্রাইভেট স্লট
বদলানো যায়, কোড বা GitHub ছাড়াই। তথ্য থাকে আপনার নিজের Google Sheet এ। একবার নিচের
সেটআপ করতে হবে (৫–১০ মিনিট)।

## ১. Google Sheet বানান
1. https://sheets.new খুলে একটা নতুন Sheet বানান, নাম দিন যেমন `10takaschool content`।

## ২. স্ক্রিপ্ট বসান
1. Sheet এর মেনু থেকে **Extensions → Apps Script** খুলুন।
2. সেখানে যা লেখা আছে সব মুছে এই রিপোজিটরির
   [`docs/admin-apps-script.gs`](admin-apps-script.gs) ফাইলের পুরো লেখা পেস্ট করুন।
3. উপরের 💾 (Save) চাপুন।

## ৩. পাসওয়ার্ড ঠিক করুন
1. Apps Script এর বাম পাশে ⚙️ **Project Settings** এ যান।
2. নিচে **Script Properties → Add script property**:
   - Property: `ADMIN_PASSWORD`
   - Value: আপনার পছন্দের শক্ত পাসওয়ার্ড
3. **Save script properties** চাপুন।

পাসওয়ার্ড শুধু Google এর সার্ভারে থাকে, সাইটের কোডে থাকে না।

## ৪. Web app হিসেবে চালু করুন
1. উপরে ডানে **Deploy → New deployment**।
2. ⚙️ থেকে টাইপ **Web app** বেছে নিন।
3. **Execute as: Me**, **Who has access: Anyone**।
4. **Deploy** চাপুন। Google অনুমতি চাইলে আপনার অ্যাকাউন্ট বেছে
   **Advanced → Go to … (unsafe) → Allow** দিন (স্ক্রিপ্টটা আপনার নিজের, তাই এই সতর্কবার্তা আসে)।
5. যে **Web app URL** দেখাবে (`https://script.google.com/macros/s/…/exec`) সেটা কপি করুন।

## ৫. লিংকটা সাইটে বসান
URL টা `src/App.jsx` এর `SITE_LINKS.contentApi` তে বসিয়ে `npm run build` করে commit করতে হবে।
এটা একবারের কাজ; লিংকটা পাঠালে আমিই বসিয়ে দিতে পারি।

## ব্যবহার
- সাইটের ফুটারে **Admin** লিংক, অথবা সরাসরি `10takaschool.com/admin/`।
- পাসওয়ার্ড দিয়ে লগইন করুন।
- **B.Sc. Honours পেজ:** ১ম–৪র্থ বর্ষের চারটি কার্ড; প্রতিটি বর্ষে সেই বর্ষের কোর্সগুলো (কোর্স কোডসহ), কোর্সের ভেতরে ইউনিট ও লেকচার। ইউনিটের নাম আপাতত "ইউনিট ১, ২…" দেওয়া আছে। 📚 অধ্যায় ট্যাব থেকে প্রতিটি কোর্সের ইউনিট নিজের সিলেবাস অনুযায়ী বদলে নিন।
- **HSC বাংলা ও English পেজ:** শুধু দুটি কার্ড (১ম ও ২য় পত্রের অধ্যায় সমূহ); ভেতরে অধ্যায়। স্পেশাল কোর্স এখন **প্রাইভেট ব্যাচ** পেজে (ঠিকানা `/private/course/...`)। বইয়ের বিজ্ঞাপন HSC বাংলা পেজে আছে।
- **ভর্তি পরীক্ষার প্রস্তুতি পেজ:** প্রতিটি বিশ্ববিদ্যালয়ের (ঢাবি, জাবি, চবি, রাবি, গুচ্ছ, শাবিপ্রবি, অন্যান্য) দুটি করে অংশ — *অধ্যায় ভিত্তিক ক্লাস* ও *মডেল টেস্ট*। লেকচার, কুইজ, অধ্যায় ও সময় অন্য সব বিষয়ের মতোই 🎥 লেকচার / 📚 অধ্যায় ট্যাব থেকে বদলানো যায়।
- **📚 অধ্যায়:** কোর্স/পেপার/মডিউল বেছে তার অধ্যায় (বা Unit) যোগ, বাদ, নাম বদল ও ↑ ↓ দিয়ে সাজানো যায়, তারপর **অধ্যায়ের তালিকা Save করুন**।
  অধ্যায় বাদ দিলে বা জায়গা পাল্টালে লেকচারের লিংক ও কুইজ হারায় না, Sheet এ থেকে যায়। **ডিফল্টে ফেরান** চাপলে সাইটের মূল তালিকা ফিরে আসে।
- **🎥 লেকচার:** কোর্স আর অধ্যায় বেছে প্রতিটা লেকচারে লিংক বসিয়ে **Save**।
  অধ্যায়ের ওপরে **− / +** দিয়ে ওই অধ্যায়ে লেকচারের সংখ্যা কমানো-বাড়ানো যায় (১ থেকে ৩০), তারপর **সংখ্যা Save করুন**।
  প্রতিটি লেকচারের ঘরে **হেডিং** লিখলে সাইটে লেকচারের নামের জায়গায় সেটাই দেখায় (খালি রাখলে আগের লেখাই থাকে)।
  হেডিংয়ের পাশের ঘরে **সময় (মিনিট)** লিখলে সাইটে ওই লেকচারের আসল দৈর্ঘ্য দেখায়। না লিখলে কোনো সময় দেখায় না (আগের মতো আন্দাজি সময় দেখানো হয় না)।
  প্রতিটি লেকচারে একাধিক ভিডিও বা PDF দিতে চাইলে নিচের **+ আরেকটি ভিডিও / PDF যোগ করুন** চাপুন (সর্বোচ্চ ২০টি করে)। চাইলে প্রতিটির একটা নাম দিন; সাইটে ভিডিও/PDF খুললে সবগুলো ওপর থেকে নিচে পরপর দেখায়। **✕** দিয়ে বাদ দিন, তারপর **Save**। এর জন্য Apps Script আবার paste করে **New version** Deploy করতে হবে (Sheet এর `lectures` ট্যাবে `moreVideos`, `morePdfs` কলাম নিজে যোগ হয়)।
  সংখ্যা কমালেও বাদ পড়া লেকচারের লিংক Sheet এ থেকে যায়, আবার বাড়ালে ফিরে আসে। আগে নতুন Apps Script ভার্সন Deploy করতে হবে।
  - YouTube: ভিডিওর সাধারণ লিংক (youtube.com/watch?v=… বা youtu.be/…)। ভিডিও "Unlisted" রাখলে
    শুধু সাইট থেকেই দেখা যাবে, YouTube সার্চে আসবে না।
  - PDF: Google Drive এ আপলোড করে **Share → Anyone with the link** দিয়ে লিংক কপি করুন।
  - ঘর খালি করে Save করলে লিংক মুছে যায়।
- **💳 পেমেন্ট → 📊 হিসাব:** ওপরে মোট আয় (আনলক হওয়া পেমেন্ট), অব্যবহৃত পেমেন্ট, যাচাই দরকার ও বাতিলের সংখ্যা। এরপর লেকচার/কোর্স/বই/এক্সাম ধরে আয়, গত ১৪ দিনের আয়ের চার্ট, মাস ধরে আয়, আর কোন লেকচার কতবার কেনা হয়েছে। নিচে **লক করা আছে, কিন্তু এখনো কেউ কেনেনি** লেকচারগুলোর তালিকা, দাম বা কনটেন্ট আরেকবার দেখার জন্য। সময় বাংলাদেশ সময়ে ধরা হয়। এর জন্য Apps Script আবার paste করে **New version** Deploy করতে হবে।
- **📦 বই অর্ডার:** পেমেন্ট যাচাই হওয়া বইয়ের অর্ডার, ডেলিভারির ঠিকানাসহ। বিস্তারিত: [PAYMENTS.md](PAYMENTS.md)।
- **🏁 লাইভ এক্সাম:** ফি-সহ পেইড MCQ পরীক্ষা বানানো ও প্রকাশ করা। বিস্তারিত: [EXAMS.md](EXAMS.md)।
- **📝 MCQ কুইজ:** অধ্যায় বেছে প্রশ্ন, চারটা অপশন আর সঠিক উত্তর দিয়ে **কুইজ Save করুন**।
  - **প্রতি লেকচারের নিজস্ব Self Test:** অধ্যায় বাছার পর নিচের তালিকা থেকে লেকচার বাছুন। লেকচারের কুইজ থাকলে ✓ ও প্রশ্নের সংখ্যা দেখায়। যে লেকচারে আলাদা কুইজ নেই সেখানে "পুরো অধ্যায়ের কুইজ" দেখায়।
  - **Word থেকে প্রশ্ন আনা:** "📄 Word ফাইল বা লেখা থেকে প্রশ্ন আনুন" খুলে .docx ফাইল বাছুন (বা লেখা পেস্ট করুন)। সাইট প্রশ্নগুলো পড়ে সমীকরণসহ কেমন দেখাবে তা আগে দেখায়; ঠিক থাকলে **যোগ করুন** ও তারপর **কুইজ Save করুন**।
  - **Word এ প্রশ্নের ছাঁচ:** প্রশ্ন নম্বর (`১.` বা `1.`), অপশন `ক) খ) গ) ঘ)` (বা `a) b) c) d)`, এক লাইনে বা আলাদা লাইনে), তারপর `উত্তর: খ` আর ঐচ্ছিক `ব্যাখ্যা: ...`। Word এর স্বয়ংক্রিয় নম্বরও (1. 2. / a) b)) পড়া হয়। যে প্রশ্নে ৪টি অপশন বা উত্তর পাওয়া যায় না সেটা বাদ যায় আর কারণ লেখা দেখায়।
  - **সমীকরণ:** Word এর নিজস্ব **Insert → Equation** দিয়ে লিখলে (ভগ্নাংশ, ঘাত, বর্গমূল, ∑ ∫ lim, ম্যাট্রিক্স, গ্রিক অক্ষর, sin cos ইত্যাদি) নিজে থেকে LaTeX এ বদলে যায়। MathType বা ছবি করা সমীকরণ পড়া যায় না। হাতে লিখতে চাইলে `$x^2 + 1$` এভাবে ডলারের মধ্যে LaTeX লিখুন। সাইটে সমীকরণ KaTeX দিয়ে আঁকা হয় (সমীকরণ থাকলে তবেই ডাউনলোড হয়)।
  - **PDF:** PDF থেকে সমীকরণ নির্ভুলভাবে পড়া যায় না। PDF এর প্রশ্ন Word এ নিন, অথবা Claude কে PDF দিয়ে উপরের ছাঁচে (সমীকরণ `$...$` LaTeX এ) লিখিয়ে নিয়ে পেস্ট করুন।
  - প্রশ্ন সাইটের পাবলিক তথ্যের অংশ, তাই লক করা লেকচারের কুইজের প্রশ্নও টেকনিক্যালি দেখা যায়।
- **📅 প্রাইভেট স্লট:** খালি সময় যোগ করুন। বুকিং কনফার্ম হলে "খালি" চেপে "🔒 বুকড" করে Save করুন।

Save করার সাথে সাথে Sheet এ জমা হয় আর সাইটে দেখায়, নতুন করে build লাগে না।
Sheet এ সরাসরি লিখেও বদলানো যায় (`lectures`, `quiz`, `slots` ট্যাব)।

## স্ক্রিপ্ট পরে বদলালে
Apps Script এ কোড বদলালে **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**
করতে হয়, তাহলে URL একই থাকে।

## পেইড লেকচারের লিংক কীভাবে সুরক্ষিত থাকে
**শুরুতে সব লেকচার খোলা।** কোনো লেকচার পেইড করতে চাইলে Admin → 🎥 লেকচারে ওই লেকচারের ঘরে
**🔒 পেইড (লক করুন)** টিক দিন, **দাম ৳** লিখুন (ফাঁকা রাখলে সাইটের ডিফল্ট দাম), তারপর **Save**।
টিক তুলে Save করলে লেকচার আবার সবার জন্য খুলে যায়। ১ম লেকচারও চাইলে লক করা যায়।
পুরো অধ্যায় একসাথে করতে ওপরের বক্সে **🔒 ১ম বাদে সব লক** / **🔒 সব লক** / **🔓 সব খুলে দিন** (দামও দেওয়া যায়)।
কোর্সের (Special Course) লেকচারে আলাদা দাম নেই; লক করা লেকচার কোর্সে Enroll করলে খোলে।

লক করা লেকচারের ভিডিও আর PDF লিংক সাইটের পাবলিক তথ্যে যায় না। শুধু Admin এ (পাসওয়ার্ড দিয়ে ঢুকলে) আর
পেমেন্ট যাচাই হওয়া শিক্ষার্থীর কাছে যায়, তাই সব কনটেন্ট নিশ্চিন্তে বসাতে পারেন।
কোন লেকচার পেইড সেটা Sheet এর `locks` ট্যাবে থাকে (সারি মুছলে লেকচার খুলে যায়)।

Script Properties এ `RELEASE_ALL_LECTURES` = `yes` দিলে লক থাকা সত্ত্বেও সব লেকচারের লিংক খুলে যায়।

> সতর্কতা: Sheet টা কারো সাথে শেয়ার করবেন না, কারণ Sheet এ সব লিংক সরাসরি লেখা থাকে।
> আর YouTube ভিডিও **Unlisted** রাখুন, **Public** নয়।

## পেমেন্ট দিয়ে স্বয়ংক্রিয় আনলক
শিক্ষার্থীরা Transaction ID দিয়ে নিজে পেইড লেকচার আনলক করতে পারে, সেটা সেটআপের জন্য
[PAYMENTS.md](PAYMENTS.md) দেখুন। আনলক হলে লিংকগুলো Sheet থেকেই আসে, তাই এই পেজেই লিংক বসাতে হবে।

## O Level / A Level

The six O/A cards (O Level 4024, A Level Pure 1, Pure 2 and 3, Mechanics, Probability and Statistics 1 and 2) come from `OA_SYLLABUS` in `src/App.jsx`. Each topic in a chapter is one lecture (Topic 1 free), so lecture titles, counts and durations in Admin are per topic.

## Books (📖 বই tab)

The book shelf can be edited without changing code. For every built-in book you can change the name, author, badge and PDF price, hide it from the site, or press "ডিফল্টে ফিরুন" to undo your changes. "+ নতুন বই যোগ করুন" adds a new book (name, publisher line, author, badge, price, one-line description, cover emoji and colour); "বই মুছুন" removes a book you added. Books are stored in the `books` sheet. A book with a price shows the "PDF কপি নিন" button; the order form uses this price, and a hidden book cannot be bought. After pasting the new `admin-apps-script.gs`, deploy a New version.

### Books sold on another site (Amazon etc.)

Each non-course book in the 📖 বই tab has an "অন্য সাইটে কেনার লিংক" box. Paste an `https://` link (for example the book's Amazon page) and Save: the book's card then shows an **Amazon এ কিনুন ↗** button (opens in a new tab) instead of the bKash order button, and the "হার্ডকপি: স্টক আউট" note is hidden for it. Leave the PDF price empty for such a book. The two Lambert Academic Publishing books ("Development of an Algorithm for Solving TSP" and "An Analytical Approach for Learning Programming Language C") already carry their Amazon links in `src/App.jsx` (`CV_CREDENTIALS.books[].link`). This needs the new Apps Script version (the `books` sheet gets a `link` column automatically).

## Student reviews (⭐ মতামত tab)

Students write reviews on Facebook: the home page has a "Facebook এ মতামত দিন" button. It opens `SITE_LINKS.facebookReviews` in `src/App.jsx`, or `SITE_LINKS.facebook` while that is empty. Set `facebookReviews` to your Facebook Page's Reviews link (for example `https://www.facebook.com/yourpage/reviews`). Reviews and recommendations only exist on a Facebook Page, not on a personal profile.

To show a review on the site, open the ⭐ মতামত tab and paste the student's name, an optional line such as "HSC 2025, Hamdard Public College", the review text and, optionally, the Facebook link to the review ("Copy link" on Facebook). Only facebook.com links are accepted. Reviews are stored in the `reviews` sheet, newest first; the home page shows six with a "show all" button. "বদলান" edits a review and "সরান" removes it. After pasting the new `admin-apps-script.gs`, deploy a New version.

### Book cover pictures

Each book in the 📖 বই tab has a "কভারের ছবি" box. "📷 ছবি আপলোড করুন" picks a picture from your phone or computer; the page shrinks it (longest side 900px) and saves it to a Google Drive folder named "10takaschool book covers", shared as "anyone with the link can view", then saves the book. You can instead paste a picture link: a Google Drive share link (the file must be shared as "anyone with the link") or any https picture link. "ছবি সরান" goes back to the colour and emoji cover. Upright (3:4) pictures look best.

The first time you deploy this version, Google asks you to allow the script to use Google Drive: allow it, or uploads will fail (pasting a link still works).

## Home page (🏠 হোম tab)

**Free demo video.** Paste a YouTube link (watch, youtu.be, shorts or live) and an optional title, then "ভিডিও Save". The home page shows it under the program cards; the player loads only when a visitor taps it. Leave the link empty to hide the section.

**আজকের প্রশ্ন (daily question).** Add questions with four options, pick the right one with the round button, and add a short explanation. The home page shows one question a day in turn (Bangladesh time): with 30 questions, the first one comes back after 30 days. Visitors see the answer and the explanation right after choosing; their answer and a "টানা N দিন" streak are kept on their own device. With no questions the section is hidden. Questions and answers are public (this is free practice, not an exam).

## Progress, sharing and chapter notes

- Each open lecture has a "শেষ করেছি" button; the chapter shows "N / total লেকচার শেষ". The home page shows "যেখানে থেমেছিলেন" with a button back to the last chapter. All of this is stored on the student's device only.
- Chapter pages, quiz results, the demo video and the daily question have WhatsApp / Facebook / copy-link buttons.
- HSC chapters show "এই অধ্যায়ে যা শিখবেন" (key ideas and formulas) from `HSC_CHAPTER_NOTES` in `src/App.jsx`; the same lines go into each page's search description. Edit them there.

## সাইট দ্রুত লোড হওয়ার জন্য (ডেভেলপারদের জন্য)
`npm run build` এখন `assets/app.js` এর সাথে `assets/chunks/` ফোল্ডারও বানায় (এটাও commit করতে হবে)। Admin প্যানেল আলাদা ফাইলে (`src/Admin.jsx`), শিক্ষার্থীদের ব্রাউজারে লোড হয় না, শুধু `/admin/` খুললে নামে। ফন্ট (Google Fonts) পেজ দেখানো আটকায় না, পরে লোড হয়ে বসে।
