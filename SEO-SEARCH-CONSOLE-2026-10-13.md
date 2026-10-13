# Shipp-Mates traffic diagnosis and shipped fixes — October 13, 2026

## Evidence

Source: owner-supplied Search Console performance export. Its filter says “Last 3 months,” but its daily rows actually cover August 8–October 10, 2026: 64 days, **8 organic Web clicks and 1,096 property impressions**. This is not all-source website traffic, map views or paid/social traffic. Query rows omit some clicks; do not infer that all missing clicks were branded or that there were no branded searches.

| Page | Clicks | Impressions | Average position |
|---|---:|---:|---:|
| Homepage | 6 | 128 | 9.14 |
| Former cost article | 0 | 309 | 93.89 |
| Residential | 0 | 140 | 70.91 |
| Metallic epoxy | 0 | 125 | 75.69 |
| Laurie | 0 | 76 | 38.43 |
| Osage Beach | 0 | 70 | 43.43 |
| Camdenton | 0 | 63 | 64.27 |
| Sunrise Beach | 0 | 31 | 15.68 |
| Garage floors | 0 | 23 | 39.78 |

These are page-wide averages, not their positions for a single target query. The specific query “epoxy floor sunrise beach mo” had 17 impressions and average position 6.18; “epoxy floor laurie mo” had 12 impressions at 10.0; “epoxy floor osage beach mo” had 16 at 25.44. Low volume limits the confidence of these averages.

The visualizer is absent from Pages.csv. That establishes no recorded impressions in this export; it does **not** establish that Google has rejected indexing it.

## Confirmed technical state

- Live visualizer returned HTTP 200 without an X-Robots-Tag exclusion. robots.txt permits crawling, its canonical points to itself, and it is included in the sitemap. Its extensionless URL redirects to the canonical HTML URL. HTTP redirects to HTTPS.
- The sample photo and palette previously appeared only after JavaScript ran. The palette is now static HTML and a default split comparison renders before JavaScript. This improves discoverability and first paint; it is not proof that JavaScript caused the lack of traffic.
- The old cost article already redirects to /instant-quote.html. Its historical 309 impressions are not evidence that the deleted article still needs editing. The destination previously led with a vague free-quote heading and gated the estimate. It now explains local floor coating costs and shows the existing calculator's six published price ranges in HTML.
- Twelve town stubs intentionally carry noindex,follow and are excluded from the sitemap: Brumley, California, Climax Springs, Gravois Mills, Iberia, Lebanon, Macks Creek, Montreal, Rocky Mount, Stover, Tuscumbia and Village of Four Seasons. These cannot acquire new indexed visibility while excluded. Removing noindex from repetitive service-area stubs without useful local evidence is not a complete local SEO fix.
- All 48 HTML pages have one H1, one canonical and distinct titles; all referenced local file destinations resolve in the checkout. Home links now point directly to / instead of /index.html redirects.

## Implemented

- Imported the exact current Ozarks Concrete Coatings sample garage photo and its calibrated floor mask; it is labeled a sample, not a Shipp-Mates completed job.
- Applied the newer chip-size distribution and smaller perspective projection while retaining Shipp-Mates' 25-color catalog and its 1280px source-density normalization.
- Disabled object restoration for the empty sample photo, so slab stains cannot reappear through the coating. Uploaded photos retain live rendering and object preservation.
- Generated all 25 finished sample previews with the actual production compositor. Preset selection loads a WebP instead of recomputing the floor on a phone. Missing assets fall back to live rendering. Customer photos stay on the device.
- Generated 300px WebP swatches: the complete thumbnail set drops from 4,754,696 to 646,808 bytes (86.4% smaller). Previews are lazy selected, not all downloaded at page load.
- Added a default comparison without JavaScript, local title/description/H1, visible catalog, keyboard-accessible color choices and comparison slider, and proper rendering/error state. Failed rendering no longer mislabels the original slab as a successfully coated floor.
- Added in-body homepage links to the visualizer and calculator; added an existing Sunrise Beach collection photo and useful estimate/finish links to the strongest nearby query opportunity, without inventing project date, square footage, color or customer testimony.
- Improved calculator cost intent and visible pricing; removed dependency on the browser's implicit window.event for square-foot presets.
- Corrected 31 quote forms plus the calculator so a sendBeacon queue result cannot masquerade as confirmed webhook delivery. HTTP-acknowledged requests succeed; failed requests retain retry handling. No real test lead was submitted.

## What still determines traffic

The main measured problem is limited relevant visibility: most important service pages rank well below the first page, while some low-volume town queries are close enough to improve. There is no evidence here of a site-wide robots block, penalty, a particular algorithm update, poor field Core Web Vitals, or a known backlink deficit. This export cannot identify those causes by itself.

1. Inspect the visualizer and core service URLs in Search Console URL Inspection; confirm index status, Google-selected canonical, last crawl and sitemap processing. Request indexing of the changed URLs after deployment. The Performance export is not an Indexing report.
2. Prioritize original completed-job stories and owner-confirmed captions for Sunrise Beach, Laurie, Osage Beach and Camdenton. Existing photos help, but city names and generic service descriptions alone do not document a completed job. Publish verified details and appropriate links, then evaluate thin towns individually before indexing them.
3. Verify the actual Google Business Profile categories, service area, photos and customer reviews. No authenticated GBP inspection or modification was performed; this report makes no claim that the current profile is deficient.
4. Review citations and local links from actual suppliers/partners and local organizations. No links or reviews were purchased or fabricated.
5. Install conversion analytics using the owner's actual GA4/GTM property if desired; the visualizer currently queues dataLayer events but no provider is configured. Do not invent an analytics ID or treat queued events as measured leads.
6. Compare the same target queries and URLs over the next complete 28-day period. Separate search visibility from visualizer use and submitted leads. Code changes do not guarantee rankings or a specific timeline.

## Validation

48 automated tests passed: compositor geometry/reflections, stale requests, image failures, custom-photo rendering, asset completeness and every changed quote-delivery helper under rejected, failed and successful responses. All executable inline scripts and JSON-LD parse. Inspected rendered neutral, dark and warm sample outputs using the production compositor. Static asset and internal file-link audit found no missing destinations.

Production browser validation and deployment status are recorded in the change's pull request/commit. Automated response tests confirm frontend acknowledgement handling, not downstream CRM workflow execution.
