# Shipp-Mates / Show Me Epoxy — evidence and implementation

## Same-month organic Web comparison

For September 2026, the owner-supplied Shipp-Mates Search Console export records **3 clicks and 437 impressions**. The Google Search Console September summary for Show Me Epoxy, received October 6, reports **145 clicks and 8.82K impressions**. These are Web Search totals, not installs, revenue, map interactions, or social traffic. The monthly summary rounds Show Me's impressions; no raw query-level export was available for that site.

Show Me's reported top pages: homepage 73 clicks; uneven/blotchy-floor article 21; one-day-versus-multiple-day article 5. Its two reported brand queries contributed at least 28 clicks (16 and 12), and “epoxy floors near me” contributed 3. This shows an existing mix of brand discovery and useful informational content. It does not demonstrate that all article visitors were qualified local leads or that a particular article caused the local service pages to rank.

## Live comparison

- Show Me sitemap: 97 URLs. Shipp-Mates before this change: 36. Counts describe submitted discovery coverage, not Google's indexed counts or a ranking factor by themselves.
- Show Me's homepage contains named customer testimonials and relevant service links. Shipp-Mates' review page still described the company as newest and invited first customers, and asserted no reviews had been collected. We have not verified a current review count; those static claims were removed rather than replaced with an invented rating.
- Shipp-Mates has a live Google Maps profile with primary category Concrete contractor, the correct website and phone, 19 photos and an owner post dated September 30. The limited public Maps view did not establish a rating or review count. We cannot claim the profile is unverified or inactive.
- Google Maps publishes Monday–Friday 8 AM–5 PM, weekends closed. Site markup and headers previously used 9 AM–5 PM. Website hours are now consistent with the linked profile. No GBP settings were changed.
- The www host already redirects to the primary domain. The production Netlify hostname returned an indexable duplicate with a canonical to the primary site; an explicit hostname-only permanent redirect now consolidates it. Preview deployments are not targeted by that rule.
- Twelve town pages deliberately had noindex. They could not gain new indexed visibility while excluded. The main service pages were crawlable. This does not prove that Google's index contains every allowed page; the supplied Performance export is not an Indexing report.
- Search Console opens a Google sign-in wall in this browser, so actual URL Inspection, selected canonical, manual actions, sitemap processing and exclusion reasons remain unverified until authenticated access is available. No credentials were collected through chat or terminal.

## Changes made

1. Three original homeowner guides on blotchy floor appearance, concrete moisture evaluation, and one-day installation versus cure. They use actual company process facts, existing finished-floor imagery, appropriate manufacturer background and calculator-only pricing links. They are not copies of Show Me's articles or described as personally reviewed by Blake. Their publication date is October 13, 2026, when created.
2. Contextual links from homepage, blog, garage, concrete-repair and acid-staining pages. Article JSON-LD and visible author/publication information agree.
3. Original buyer-planning content for Gravois Mills and Village of Four Seasons, using confirmed service coverage/counties and actual offered services. These two pages are now indexable; no local completed job, customer quote, size or date was invented. Ten other interchangeable town stubs remain excluded.
4. A service-area directory with confirmed cities/counties, links to suitable services, access and estimate planning. Area navigation points to the directory instead of using Contact as a substitute.
5. Owner experience and About/Gallery links on the homepage and reviews page, using the verified Blake Shipp / four years / West Plains Epoxy facts. Customer feedback is linked to the real Google profile without an unverified count.
6. Published hours synchronized, duplicate-host redirect added, and llms.txt Google profile link made consistent. The llms.txt cleanup is identity consistency, not claimed as a Google ranking lever.
7. Sitemap matches the 42 currently indexable HTML pages. Existing cost-guide redirects still lead to the calculator. No static installation prices, price tables or numeric examples were introduced; the visualizer's exact live-Ozarks photo is unchanged.

## Interpretation and next required evidence

The measured gap is limited relevant visibility, with identifiable differences in content coverage and demonstrated brand searches. Useful original guides and stronger local pages address coverage; they do not fabricate the reputation signals Show Me already has. A nearby company can have different brand awareness, history, links, reviews and search positions. Distance between the businesses does not make those signals interchangeable.

We cannot conclude from these sources that Shipp-Mates has a penalty, an unverified GBP, a known backlink deficit, a particular Core Web Vitals failure or a confirmed widespread Google indexing problem. Authenticated Search Console inspection is the next step to diagnose actual excluded URLs and request recrawling after publication. Evaluate new pages for impressions, query relevance and eventual leads separately from article visits; published changes do not guarantee a ranking or timeframe.

## Verification

All 48 existing compositor and lead-delivery tests passed. Inline JavaScript and JSON-LD parse, local linked files exist, titles are unique, each page has one H1 and canonical, and the sitemap has exactly the indexable HTML URLs. Public price-number scanning found no numbers outside the calculator. Deployment and live-browser rendering are verified after publishing.
