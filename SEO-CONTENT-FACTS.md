# Content Facts & Owner Verification Required

This file is the single place to correct business facts. Anything marked **TODO (OWNER)**
was NOT written into the site because it could not be verified from the repository.
Nothing in this project invents reviews, ratings, awards, certifications, project counts,
years in business, staff names, or a street address.

---

## 1. Warranty — RESOLVED, but confirm wording

`warranty.html` is the authoritative document in this repository. It states:

| Surface | Peeling / delamination | Staining (if cleaned within 20 min) |
|---|---|---|
| Residential interior / garage | As long as the **original purchaser owns the home** | 10 years |
| Commercial | 10 years from substantial completion | 10 years |
| Exterior | 3 years from substantial completion | 3 years |

The warranty is **non-transferable** and terminates on sale of the property.

**What was wrong:** the rest of the site claimed a *"Lifetime Warranty"* in 186 places and a
*"15-Year / 15 YR Written Warranty"* in 3 more. Neither term appears in the warranty document,
and a tenure-limited, non-transferable warranty is not a lifetime warranty. A 15-year term
exists nowhere.

**What was done:** every marketing instance now reads **"Written Warranty"**, which is accurate
for all three surface types and does not overstate coverage. `warranty.html` keeps the full
detailed terms.

- [ ] **TODO (OWNER):** confirm the table above matches the signed warranty you actually issue.
      If you want surface-specific wording on marketing pages (e.g. "10-Year Commercial Warranty"),
      say so and it can be applied per page.

---

## 2. Reviews and trust claims — RESOLVED

**What was wrong:** the homepage claimed the company was *"the most trusted concrete coating
contractor in the Lake of the Ozarks"*, while `reviews.html` correctly said *"No Reviews Yet —
we're a brand new company."* Those cannot both be true.

**What was done:** superlatives replaced with verifiable, honest positioning —
*"local, owner-operated concrete coating company serving the Lake of the Ozarks."*
The About page H1 changed from *"Lake of the Ozarks' Most Trusted Floor Coating Company"* to
*"Local, Owner-Operated Floor Coating Company at the Lake of the Ozarks."*

No `AggregateRating` or `Review` schema exists anywhere on the site, and none should be added
until real first-party reviews are collected. The verified Google profile link is retained.

- [ ] **TODO (OWNER):** once you have real Google reviews, they may be displayed and
      `AggregateRating` becomes eligible. Do not add it before then.

---

## 3. Counties — VERIFIED, none were wrong in this repository

The brief reported incorrect counties on the live site (e.g. Camdenton shown as Christian
County). **No county reference of any kind existed in this repository** — the live site may be
running an older build. Accurate counties have now been added to the 8 priority city pages,
using this verified list:

| City | County |
|---|---|
| Osage Beach | Camden and Miller |
| Camdenton | Camden |
| Lake Ozark | Camden and Miller |
| Eldon | Miller |
| Versailles | Morgan |
| Laurie | Morgan |
| Linn Creek | Camden |
| Macks Creek | Camden |
| Stover | Morgan |
| Montreal | Camden |
| Iberia | Miller |
| Sunrise Beach | Camden and Morgan |
| Village of Four Seasons | Camden |
| Climax Springs | Camden |
| Gravois Mills | Morgan |
| Tuscumbia | Miller |
| Lebanon | Laclede |
| Brumley | Miller |
| Rocky Mount | Morgan |
| California | Moniteau |

- [ ] **TODO (OWNER):** if the live site still shows wrong counties, redeploy from this repository.

---

## 4. Article dates — nothing was backdated

The brief mentioned articles dated December 2024 to May 2025. **No visible publication dates and
no `datePublished` / `dateModified` fields exist anywhere in this repository.** Nothing was
backdated, and no `Article` / `BlogPosting` schema was added, because adding it would require
publication dates that cannot be verified.

- [ ] **TODO (OWNER):** supply the real first-publication date for each of the six guides. Once
      supplied, visible dates and matching `BlogPosting` schema can be added together so they agree.

---

## 5. Business facts used in structured data

All verified from the repository or the brief:

- Name: Shipp-Mates Epoxy of the Ozarks
- Phone: 417-255-6890 · Email: shippmatesepoxy@gmail.com
- Hours: Mon–Fri 9:00am–5:00pm (as published in the site top bar)
- Locality: Osage Beach, MO (no street address is published or invented)
- Facebook: https://www.facebook.com/ShippmatesEpoxy
- Google profile: https://maps.app.goo.gl/rQW1NgK3evyzxRiU7

- [ ] **TODO (OWNER):** confirm whether you have a customer-facing address. If you are a pure
      service-area business, the current locality-only markup is correct and no street address
      should ever be added.
- [ ] **TODO (OWNER):** confirm `priceRange` "$$" is acceptable, or remove it.
- [ ] **TODO (OWNER):** confirm insurance status. "Insured" is NOT claimed anywhere on the site
      because it could not be verified. Supply proof and it can be added as a trust signal.

---

## 6. About page — needs real owner content

`about.html` currently has no verified owner names, founding date, training, or certifications.
None were invented.

- [ ] **TODO (OWNER):** owner name(s)
- [ ] **TODO (OWNER):** year the business started
- [ ] **TODO (OWNER):** relevant training / manufacturer certification
- [ ] **TODO (OWNER):** why you serve the Lake area
- [ ] **TODO (OWNER):** real team photograph

---

## 7. Real project data structure

`PROJECTS.template.json` in this repository is a reusable structure for genuine completed
projects. Only fields containing real information should be filled in and displayed. Leave a
field out entirely rather than estimating it.
