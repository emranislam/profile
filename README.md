# Emran Islam — Academic & EdTech Platform

Static site served by GitHub Pages at https://10takaschool.com.

- `src/App.jsx` — the whole site (React component)
- `assets/` — built output loaded by `index.html` (committed, so Pages needs no build step)

After editing anything in `src/`, rebuild and commit `assets/`:

```sh
npm install
npm run build
```

## Settings to fill in (`src/App.jsx`)

| What | Where |
|------|-------|
| WhatsApp, Telegram, Facebook, live-class link, Google Scholar / ORCID / ResearchGate | `SITE_LINKS` |
| Send Money numbers | `PAYMENT_NUMBERS` |
| Lecture videos (YouTube id) and PDF notes | `LECTURE_RESOURCES` |
| MCQ questions per chapter | `QUIZ_BANK` |
| Weekly live class routine | `CLASS_ROUTINE` |
| Group private batches | `PRIVATE_BATCHES` |
| 1-to-1 / custom batch slots | Google Sheet, see [docs/SLOTS.md](docs/SLOTS.md) |
| Student reviews and results (hidden while empty) | `TESTIMONIALS`, `RESULT_STATS` |
| FAQ | `FAQ_ITEMS` |

Empty links are hidden on the site. With `SITE_LINKS.whatsapp` set, booking, payment and question
requests open WhatsApp; otherwise they open an email to `SITE_LINKS.email`.
