# SEO Measurement Plan

## Current analytics state

**No analytics tag of any kind is installed on this site** — no GA4, no Google Tag Manager,
no Search Console verification file. Nothing was added automatically, because installing a
tag requires your own property IDs and adding the wrong one is worse than none.

### Step 1 — Google Search Console
1. Add the property at https://search.google.com/search-console (choose **Domain** property).
2. Verify via DNS TXT record with your domain registrar.
3. Submit `https://shippmatesepoxy.com/sitemap.xml`.
4. Check **Pages** after a week for indexing errors.

### Step 2 — GA4
1. Create a GA4 property and copy the Measurement ID (`G-XXXXXXXXXX`).
2. Give the ID to your developer to install **once**, sitewide, in `<head>`.
3. Do not paste it into individual pages — duplicate tags double-count every session.

### Step 3 — Conversion events to configure

| Event | Trigger | Why it matters |
|---|---|---|
| `generate_lead` | Quote form submitted on any page | Primary conversion |
| `calculator_complete` | Instant calculator reveals a price | High-intent lead |
| `click_to_call` | Any `tel:4172556890` link clicked | Largest conversion path for contractors |
| `click_to_email` | `mailto:` link clicked | Secondary contact |
| `form_error` | Validation fails on submit | Finds broken funnels |
| `quote_success` | Webhook returns success | Confirms leads actually arrive |

The lead webhook already logs failures to the browser console, so `form_error` can be wired to
the same code path.

---

## Monthly tracking table

Record on the same day each month.

| Metric | Source | M1 | M2 | M3 | M4 | M5 | M6 |
|---|---|---|---|---|---|---|---|
| Organic clicks | Search Console | | | | | | |
| Impressions | Search Console | | | | | | |
| Click-through rate | Search Console | | | | | | |
| Average position | Search Console | | | | | | |
| Indexed pages | Search Console → Pages | | | | | | |
| Quote form conversions | GA4 | | | | | | |
| Calculator conversions | GA4 | | | | | | |
| Phone clicks | GA4 | | | | | | |
| GBP calls | Business Profile | | | | | | |
| GBP website clicks | Business Profile | | | | | | |
| GBP direction requests | Business Profile | | | | | | |
| Review count | Business Profile | | | | | | |
| Average rating | Business Profile | | | | | | |
| Referring domains | Search Console → Links | | | | | | |

### Rankings by target city

| Query | M1 | M2 | M3 | M4 | M5 | M6 |
|---|---|---|---|---|---|---|
| epoxy flooring Lake of the Ozarks | | | | | | |
| garage floor coating Lake of the Ozarks | | | | | | |
| concrete coatings Lake of the Ozarks | | | | | | |
| epoxy flooring Osage Beach MO | | | | | | |
| garage floor coating Osage Beach MO | | | | | | |
| epoxy flooring Camdenton MO | | | | | | |
| garage floor coating Camdenton MO | | | | | | |
| epoxy flooring Lake Ozark MO | | | | | | |
| polyaspartic flooring Lake of the Ozarks | | | | | | |
| commercial floor coatings Lake of the Ozarks | | | | | | |
| acid stained concrete Lake of the Ozarks | | | | | | |

---

## Why Search Console position will not match what you see on Google

When you search your own keyword and see a different position than Search Console reports,
neither is wrong. They measure different things.

- **Location.** Local results change street by street. Search Console averages every location
  the query was seen from.
- **Personalisation.** Your own browser has visited your site many times, which raises how
  highly Google shows it to you specifically.
- **Device.** Mobile and desktop return different results, and mobile weights local proximity
  more heavily.
- **Query variations.** Search Console groups a keyword with its close variants; you searched
  one exact phrase.
- **Date range.** Search Console reports an average across the whole period, not today.
- **Averaging effect.** Ranking #3 in Osage Beach and #40 in Lebanon reports as roughly #21 —
  a position you never actually hold anywhere.

Use Search Console for **trend direction**, and a location-accurate rank tracker or an incognito
window with location set to the target city for **spot checks**.
