# Emran Islam — Academic & EdTech Platform

Static site served by GitHub Pages at https://10takaschool.com.

- `src/App.jsx` — the whole site (React component)
- `src/page-template.html` — the HTML every page is made from
- `scripts/prerender.mjs` — writes one HTML page per address (`/hsc-bangla/paper1/p1-ch1/`, ...), `sitemap.xml`, `robots.txt` and `404.html`
- `assets/` and the generated page folders (`hsc-bangla/`, `honours/`, ...) — built output (committed, so Pages needs no build step; do not edit by hand)

After editing anything in `src/`, rebuild and commit the output:

```sh
npm install
npm run build
```

## Settings to fill in (`src/App.jsx`)

| What | Where |
|------|-------|
| WhatsApp, Telegram, Facebook, live-class link, Google Scholar / ORCID / ResearchGate | `SITE_LINKS` |
| Send Money numbers | `PAYMENT_NUMBERS` |
| Automatic unlock by bKash SMS (script properties, SMS app, Telegram) | [docs/PAYMENTS.md](docs/PAYMENTS.md) |
| Lecture videos and PDF notes | Admin panel (`/admin/`, see [docs/ADMIN.md](docs/ADMIN.md)), or `LECTURE_RESOURCES` |
| MCQ questions per chapter | Admin panel, or `QUIZ_BANK` |
| Weekly live class routine | `CLASS_ROUTINE` |
| Group private batches | `PRIVATE_BATCHES` |
| 1-to-1 / custom batch slots | Admin panel (or a published sheet, see [docs/SLOTS.md](docs/SLOTS.md)) |
| Student reviews and results (hidden while empty) | `TESTIMONIALS`, `RESULT_STATS` |
| FAQ | `FAQ_ITEMS` |

Empty links are hidden on the site. With `SITE_LINKS.whatsapp` set, booking, payment and question
requests open WhatsApp; otherwise they open an email to `SITE_LINKS.email`.

## Page addresses and search engines

Every page has its own address, for example `/hsc-bangla/paper1/p1-ch1/`, with its own title, description and text in the
HTML (written by `npm run build`), and all of them are in `sitemap.xml`. Older links like `/#/hsc-bangla/paper1` still open
and move to the new address.

Chapters added on the admin page (📚 অধ্যায়) work and can be shared, but they only get their own static page (and a
sitemap entry) after being added to the lists in `src/App.jsx` and rebuilding.
