# ORVN Labs — SEO & Content Strategy

This document is the operating plan for ranking, content, and the conversion flywheel
that connects organic traffic to PAS demos and early access.

## 1. Primary positioning phrases

These phrases anchor the site’s topical authority. They should appear naturally across
the homepage, PAS page, and blog index — never stuffed.

- AI infrastructure for real estate brokerages
- real estate lead conversion
- speed-to-lead real estate
- real estate ISA automation
- real estate lead qualification
- real estate AI agent
- real estate lead follow-up
- brokerage intelligence
- AI for real estate brokerages
- first-contact infrastructure for real estate

## 2. Long-tail target queries (blog cluster)

Each long-tail maps to one or more blog posts. Internal-link to PAS, the leakage scorecard,
and the newsletter from inside every post.

- how to stop real estate leads going cold
- real estate first response time
- why real estate leads do not convert
- real estate CRM lead leakage
- AI ISA for real estate brokerages
- how brokerages qualify inbound leads
- real estate appointment booking automation
- first-contact audit real estate
- after-hours real estate leads
- ISA vs AI real estate

## 3. Topic clusters (hub + spoke)

| Hub page                | Cluster posts                                                                |
| ----------------------- | ---------------------------------------------------------------------------- |
| `/pas`                  | What is first-contact infrastructure · ISA vs AI · How PAS qualifies         |
| `/calculators/leakage`  | The first-contact audit · Why "contacted" is dirty data · Speed-to-lead       |
| `/calculators/revenue`  | The hidden cost of after-hours leads · Why CRMs become graveyards            |
| `/blog`                 | All published posts (auto-listed)                                            |

The hub pages already exist and link out. The cluster posts live in `src/lib/blog.js`.

## 4. Internal linking rules

Every blog post must include at least one inline link to **two of the three**:

1. The Lead Leakage Scorecard (`/calculators/leakage`)
2. The PAS product page (`/pas`)
3. The Newsletter signup (`/blog` → footer or in-post Newsletter card)

Every blog post must end with a paragraph CTA pointing at the leakage scorecard or PAS demo.

## 5. Newsletter / blog flywheel

```
Long-tail blog post  ──▶  Lead leakage scorecard  ──▶  Newsletter signup
                              │
                              └────▶  /demo  ──▶  /pricing  ──▶  Apply for early access
```

The calculator pages are conversion assets. They produce a result that the visitor wants
to keep — the result page captures email (revenue calculator) or surfaces a newsletter
card (leakage scorecard).

## 6. Calculator-as-lead-magnet strategy

- Both calculators run client-side and require no signup to compute.
- Post-result, the visitor sees a clean newsletter capture and CTAs to PAS demo / pricing.
- The revenue calculator additionally offers an emailed audit report (server-side via
  `/api/calculator-email`).

## 7. Publishing cadence

- **One blog post per week.** Eight seed topics already drafted in `src/lib/blog.js`.
- **One newsletter issue per week**, drawing on the latest blog post + one operator note.
- **Quarterly refresh** of the leakage scorecard benchmarks and revenue-calculator coefficients.

## 8. Suggested first eight posts (already seeded for five)

1. ✅ Why Real Estate Leads Go Cold Before Agents Call
2. ✅ The First-Contact Audit Every Brokerage Should Run
3. ✅ Why "Contacted" Is Dirty Data Inside Real Estate CRMs
4. ✅ Speed-to-Lead Is Not a Productivity Metric. It Is a Conversion Event.
5. ✅ The Hidden Cost of After-Hours Leads
6. How Brokerages Misdiagnose Bad Lead Sources
7. Why CRMs Become Graveyards
8. ISA vs AI First-Touch Infrastructure

## 9. Technical SEO checklist

- [x] `<title>` and `<meta description>` set per page via `useDocumentMeta` hook.
- [x] Canonical URLs.
- [x] OpenGraph + Twitter Card meta.
- [x] `robots.txt` allowing crawl, disallowing `/api/`.
- [x] `sitemap.xml` with all primary routes + blog posts.
- [x] Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`).
- [x] No layout shift from web fonts (preconnect; font-display swap).
- [x] Fast initial load (no GSAP, no reactflow, no marquee).
- [x] Mobile responsive — tested by manual resize.
- [ ] **TODO before launch**: real OG image at `/og-default.png` (1200×630).
- [ ] **TODO before launch**: structured data (`Organization`, `Article`, `FAQPage`) JSON-LD.
- [ ] **TODO before launch**: confirm Vercel `Cache-Control` for static assets is sane.
- [ ] **TODO before launch**: hook up Google Search Console + submit sitemap.

## 10. Off-site signals

- Daniel’s LinkedIn linking to the latest blog post each week (consistency > volume).
- Real-estate operator forums and Slack groups: share the leakage scorecard tool, not the
  PAS pitch.
- Guest essays on operator newsletters trading the byline for a single inbound link.

## 11. Anti-patterns to avoid

- No keyword stuffing. The brand voice ("first-contact infrastructure", "brokerage
  intelligence") is the language we want to own.
- No exit-intent popups, modal newsletter prompts, or "spinning wheel" lead magnets.
- No marquee-style stats bars or fake social proof.
- No false claims of "600% revenue lift" or named-customer logos we don’t actually have.
