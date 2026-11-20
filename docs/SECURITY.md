# Security self-audit

Reviewer: Codex, 21 November 2026. Based on every item in ../launch-kit/checklists/security.md. This is a self-review, not an external penetration test. Paid/public persistence launch remains blocked as described below.

| Checklist item | Result and evidence |
| --- | --- |
| Protected entry inventory and authorization | PASS in local production against Neon. /dashboard and /dashboard/[id] require opaque sessions; POST /api/invites and DELETE /api/invites/[id], /api/account enforce identity; invite deletion scopes owner in SQL. flow.spec.ts proves signed-out API denial, cross-account API denial and a 404 private page. No server actions or role-edit route. |
| Input and database controls | PASS for implemented paths. Strict Zod input; 24 KB streamed body limit; 1–20 people or zero for decline; every enabled ceremony answered exactly once; real calendar-date validation; parameterized values. Versioned schema applied to a fresh production branch. Runtime role verified unable to CREATE in public or UPDATE invites.paid_at. Recovery instructions recorded; a restore drill has not been performed. |
| Secrets, source and client bundles | PASS scans recorded in GATES.md. .env files, .neon, .local and .vercel are ignored. Gitleaks history and current authored source scanned. Runtime DB modules import server-only. Secret string comparison against built client assets is performed without printing secret values. Vercel has no DB secret because transfer was rejected. Preview/production credentials are not reused on hosting. |
| Shared rate limits and cost bounds | PASS local integration. Postgres upsert stores counters durably. security.spec.ts proves malformed input, oversized body rejection, rate rejection and spoofed x-forwarded-for not bypassing the local bucket. Vercel uses x-vercel-forwarded-for; verification of that hosting boundary still requires activation. DB failures return a generic 503 and do not fall back to an in-memory limiter. Bodies and family size are bounded; no billable external generation APIs. |
| Sessions and CSRF | PASS for origin rejection and owner isolation in flow.spec.ts. HTTP-only, SameSite=Lax cookies; Secure in hosted production; session DB expiry is 14 days. Logout deletes the session; account deletion cascades sessions. Fixed navigation destinations, no arbitrary redirects or cross-origin CORS grant. Manual code review covers expiry/revocation; production cookie inspection awaits database activation. No role changes exist. |
| HTTPS headers | PASS deployed HTTPS header-check. Per-response nonce, no unsafe eval in production, self-only resources, no framing or object embeds, restricted permissions and HSTS. |
| Dependency audit and frozen install | See GATES.md for actual npm audit and npm ci evidence. Lockfile committed. No runtime upload or payment SDK. |
| Launch gates and policies | Shared scripts run unmodified. Policies derive from kit templates with actual retention/processors; no legal certification claimed. Analytics disabled. Contact form writes a private support inbox only when database is configured; maintenance is manual and needs daily scheduling. |
| Errors, mobile, recovery and main flows | Generic API errors, retry boundary, genuine missing-page status, phone overflow test, three language switches and RSVP correction covered. Real desktop/mobile screenshots visually reviewed. Browser tests caught and led to fixes for origin mismatch, streaming 404 and OG rendering. Formal assistive-technology audit remains unperformed. |

## Payment and upload review

N/A: no payment collection, merchant keys, upload route, remote-image fetch or webhook exists. The runtime role cannot mark an invitation paid. Planned pricing is clearly labeled. Activating payments requires provider signature/replay tests, verified merchant details and explicit refund/tax terms; not a hidden untested checkout.

## Remaining launch conditions

Automatic review rejected sending DATABASE_URL to Vercel. Hosted account/RSVP persistence, deployed ownership/session tests and production rate-limit verification are not complete. Do not claim a fully passing hosted service security audit. Private source publication needs no additional action; public source release requires the owner's approval. Operator must review support requests and schedule retention maintenance, verify merchant identity and conduct a recovery drill before relying on this for paid customers.
