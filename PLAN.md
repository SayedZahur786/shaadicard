# ShaadiCard launch plan

Research checked 21 November 2026. Product observations are not customer interviews.

## Market
| Product | Offer and published pricing | Complaint evidence and opportunity |
| --- | --- | --- |
| [Canva](https://www.canva.com/invitations/) | Free design; the page returned US print pricing from $26 / 25. Indian Pro pricing not verified. | [A public wedding discussion](https://www.reddit.com/r/Weddingsunder10k/comments/1bvwqp5) describes time spent learning the editor. Do not generalize a single report. Opportunity: guided ceremony setup and integrated replies. |
| [WedMeGood](https://www.wedmegood.com/wedding-invitations) | Static and video cards; sampled videos ₹500–800. Its official 2023 video describes RSVP and guest comments, so RSVP alone is not a unique claim. | No verified negative customer evidence collected. Hypothesis: families want ceremony-specific headcounts with three Indian language options. |
| [The Wed Invite](https://www.thewedinvite.com/) | RSVP dashboards, multilingual pages and WhatsApp sharing; Essential $100 once, Premium $250. | No verified complaints collected. Opportunity: a focused ₹999 India offering, accepting less design customization. |
| [Art Tribe through WedMeGood](https://www.wedmegood.com/vendors/all/wedding-cards/) | Ahmedabad printer, listed ₹50–100/card and 50 minimum order. | No verified complaints collected. Hypothesis: printing and manual attendance follow-up create separate work. Offer shop-branded digital companions, not a claim that print is obsolete. |

## Customer and core job
Primary persona: an Ahmedabad invite-shop owner who helps a family coordinate several ceremonies and relatives reading different scripts. Job: give the family one beautiful shareable invitation and a reliable headcount for each ceremony. Smallest lovable v1: one ornamental cover, four optional ceremonies, complete Hindi/Urdu/Gujarati UI, family-size replies, private owner dashboard, shop name branding. No galleries, video invitations or guest messaging.

## Model and routes
Accounts use password hashes and revocable opaque cookie sessions. Invites belong to an account and hold localized family details plus brand. Ceremonies belong to the invite, with IST timestamps and localized venues. Responses hold a family name, ceremony, attending flag and party size. A guest cookie enables a family to update its own response without exposing others. Rate-limit buckets live in Postgres; payment state is never client-writable.

Routes: / landing; /create editor; /login registration/sign-in; /dashboard owner list; /dashboard/[id] private responses and deletion; /i/[slug] server-rendered public invite; /privacy; /terms. APIs enforce same-origin, schema/body bounds, ownership, durable rate limits and generic errors. Demo is explicitly fictional and read-only; real flows require a database. Empty dashboards invite creation; loading skeletons and retry errors cover pending/unavailable services.

## Riskiest assumption and cheapest test
Assumption: print shops can sell ₹999 invitations based on multilingual RSVP convenience. Show the working demo to five shop owners; ask for one paid family pilot from each before scaling. Do not claim interviews or purchases occurred. Week one: 30 real invites, 10 verified paid invites, 60% of real invites receiving at least one RSVP.

## Execution
Implement app and migrations, local database integration tests, browser happy path and denied-access cases, shared-kit security audit and gates, screenshots, narrated real-app walkthrough, README, GitHub and Vercel deployment when authenticated. Record blocked external services honestly.
