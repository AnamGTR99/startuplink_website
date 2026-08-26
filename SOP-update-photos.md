# SOP: Update committee photos and project logos

This is for committee members who are **not technical**. You do not need to edit code. You upload photos in chat and paste a prompt. Claude does the rest.

Use this in **Cursor** (this website folder must be open), not on the public Claude website. The public site cannot save files into the project.

---

## What you can update

| Page | What to send | Rule |
| --- | --- | --- |
| **Committee** (`/committee`) | One group photo | One photo per semester. No individual role photos. |
| **Projects** (`/projects`) | Company logo(s) | Two projects per semester. You can update one or both. |

The site currently shows **2026** and **2025**, two semesters each year. Do not add years before 2025 unless a lead asks for it.

---

## Before you start

1. Open **Cursor**.
2. Open the Startup Link website folder (`startuplink_website`).
3. Make sure the photos are on your computer (JPG, PNG, or WEBP is fine).
4. Know the **year**, **semester** (1 or 2), and whether this is **committee** or **projects**.
5. For projects, know the **company name** (and a one-line description if you have one).

---

## Steps

1. In Cursor, open **Chat** (Agent / Composer is fine).
2. **Attach / upload** the image files into the chat.
3. Copy the **AI prompt** below.
4. Paste it into chat.
5. Fill in the blanks in ALL CAPS (committee or projects, year, semester, company names).
6. Send.
7. Wait until Claude says it is done.
8. Check the site:
   - Committee: [http://localhost:5173/committee](http://localhost:5173/committee)
   - Projects: [http://localhost:5173/projects](http://localhost:5173/projects)
9. If the site is not running, ask Claude: `Start the website so I can preview it.`

That is the whole process. You should not be asked to copy file paths or edit TypeScript.

---

## What to say in your own words (examples)

**Committee**

> Update the committee photo for Semester 2, 2026. I uploaded the group photo.

**Projects**

> Update the two project partners for Semester 1, 2025. First logo is Atlassian. Second logo is Canva. I uploaded both logos.

**One project only**

> Replace project 1 for Semester 2, 2026 with this company logo. The company is REA Group.

---

## AI prompt (copy everything in the box)

Copy from “You are updating…” through the end of the prompt. Then replace the ALL CAPS lines at the top.

```
You are updating the Startup Link Melbourne website for a non-technical committee member.

They uploaded image(s) in this chat. Do the file saving and code wiring yourself. Do not ask them to edit code, run git commands, or name files unless a year/semester is missing.

===== FILL THIS IN =====
WHAT TO UPDATE: COMMITTEE   (or PROJECTS)
YEAR: 2026
SEMESTER: 2
(If PROJECTS) COMPANY 1 NAME:
(If PROJECTS) COMPANY 1 SHORT DESCRIPTION:
(If PROJECTS) COMPANY 2 NAME:
(If PROJECTS) COMPANY 2 SHORT DESCRIPTION:
WHICH IMAGE IS WHICH: (e.g. "the group photo is the committee photo" / "first image is company 1, second is company 2")
========================

## Site rules (do not break these)

- Committee page: exactly ONE group photo per semester. Never add president/VP/headshots or extra photos for that semester.
- Projects page: exactly TWO projects per semester. Updating one is allowed; leave the other as it is.
- Years on both pages currently go from the latest semester back to 2025. Do not add 2024 or earlier unless the user explicitly asks.
- Keep existing page layout, navbar, and styling. Only change photos/logos and related text (company name, short description, alt text, current badge).
- Only one semester should have isCurrent: true — the most recent term that exists in the list (today that is 2026 Semester 2 unless the data has moved on).

## File rules

Committee photos:
- Save the uploaded group photo into public/committee/
- Filename: YYYY-sS.jpg (or .png/.webp to match the upload), e.g. public/committee/2026-s2.jpg
- In src/pages/Committee.tsx, set that term’s photo field to the public URL, e.g. '/committee/2026-s2.jpg'
- If that year+semester row does not exist yet and it is 2025 or later, add the row. Sort newest year first, then semester 2 before semester 1.

Project logos:
- Save each uploaded logo into public/projects/
- Filename: YYYY-sS-partner-1.png and YYYY-sS-partner-2.png (or jpg/webp), e.g. public/projects/2026-s2-partner-1.png
- In src/pages/Projects.tsx, update that term’s projects[0] and/or projects[1]:
  - name: the company name
  - logo: '/projects/YYYY-sS-partner-1.png' (matching the file you saved)
  - summary: the short description, or keep a short factual line if none was given
- Each term.projects array must stay length 2.
- If you only received one logo, update only that slot.

## How to save uploaded images

- Read/use the images attached in this chat.
- Write them into the folders above with the filenames above.
- Point the TypeScript photo/logo strings at those public paths. Vite serves files in public/ from the site root, so the code path must start with /committee/ or /projects/ — never public/.

## After you finish

- Confirm which files you added or changed.
- Confirm which semester now shows on /committee and/or /projects.
- If a local dev server is not running, start it (npm run dev) so the member can check.
- Do not commit unless they ask.
```

---

## After Claude finishes (quick check)

- **Committee:** the right semester shows the new group photo, not the “Placeholder — group photo coming soon” graphic.
- **Projects:** the right semester shows the new logo(s) and company name(s).
- Other semesters still look the same.

If something is wrong, stay in the same chat and say what is wrong, for example: “That photo went on 2025 Semester 1. It should be 2026 Semester 2.”

---

## If you are adding a brand new semester

Say so clearly, for example:

> Add Semester 1, 2027 to Committee and Projects. Here is the committee group photo and the two partner logos.

Claude should add the new semester at the top, move the **Current** badge, and still not add anything before 2025.
