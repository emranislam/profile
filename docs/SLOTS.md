# Private session slots (Google Sheet)

> If the admin panel is set up (`SITE_LINKS.contentApi`, see [ADMIN.md](ADMIN.md)), manage slots on the `#/admin` page instead; this published-CSV method is only used without it.

The 1-to-1 and custom O/A-Level pages show your free weekly slots. Students can only pick slots
marked `available`; `booked` slots show as locked, and any time you don't list stays locked.

## Set up once

1. Create a Google Sheet with this header row (row 1):

   | day | time | for | mode | status |
   |-----|------|-----|------|--------|

2. Add one row per weekly slot:

   | day | time | for | mode | status |
   |-----|------|-----|------|--------|
   | শনি | বিকাল ৪:০০ – ৫:৩০ | all | Both | available |
   | সোম | রাত ৯:০০ – ১০:৩০ | one | Online | available |
   | রবি | সকাল ১০:০০ – ১১:৩০ | custom | Both | booked |

   - **day**: শনি, রবি, সোম, মঙ্গল, বুধ, বৃহস্পতি, শুক্র (or Sat, Sun, Mon, …)
   - **time**: any text, shown as written
   - **for**: `one` (1-to-1), `custom` (custom O/A-Level batch) or `all`
   - **mode**: `Online`, `Offline` or `Both`
   - **status**: `available` or `booked` (anything else hides the slot)

3. In Google Sheets: **File → Share → Publish to web** → choose the sheet → format
   **Comma-separated values (.csv)** → **Publish**, and copy the link.
4. Put that link in `SITE_LINKS.slotSheetCsv` in `src/App.jsx`, then rebuild (`npm run build`).

## Day to day

- A booking is confirmed → change that row's `status` to `booked`.
- You free up a time → add a row (or change it back to `available`).

The site reads the sheet every time the page opens, so there is nothing to rebuild for these
changes. Google can take a few minutes to refresh a published sheet.

Until `slotSheetCsv` is set, the site shows the sample slots in `SAMPLE_SLOTS`.
