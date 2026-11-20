# Release evidence — 21 November 2026

All shared launch-kit files remain unchanged. Local checks use the actual Next.js production server and the app-specific Neon production branch, with fictional .invalid test accounts. Targets and demos are not customer traction.

| Check | Observed result |
| --- | --- |
| Production build | PASS, Next.js 16.4.6 with strict TypeScript. Tailwind precompiled through npm prebuild. |
| Unit tests | PASS, 7: translations, complete ceremony answers, duplicate rejection, bounds, independent headcounts, date rendering and impossible calendar dates. |
| Browser happy path | PASS, 2 tests: account and invitation creation, share link, Hindi/Urdu/Gujarati rendering, shop branding, RSVP create/update, owner denial and deletion; main route/phone/404 checks. |
| Placeholder scan | PASS; rerun before final commit. |
| Header check | PASS on local HTTP and https://shaadicard-taupe.vercel.app, including hosted HSTS. |
| Policy check | PASS on local production and hosted HTTPS. Distinct substantive template-derived pages; factual/legal adequacy remains manual. |
| Cold mobile performance | PASS, LCP 1288 / 956 / 1596 ms; worst 1596 ms. Three fresh servers/contexts, 4× CPU and 1.6 Mbps / 150 ms throttling. Local lab evidence only. |
| Dependency audit | PASS, 0 vulnerabilities across installed dependencies, including development packages. |
| Runtime privileges | PASS, current_user shaadicard_runtime; can_change_schema false; can_mark_paid false. |
| Demo video | PASS, 62-second H.264/AAC MP4, audible system TTS track, eight large caption sections; real local app backed by Neon. |
| Hosted persistence | BLOCKED: automatic approval review denied transfer of DATABASE_URL. Public deployment is a functional demo, not a complete live RSVP launch. |
| Payments | NOT ENABLED: merchant credentials and verified terms required. No paid invites claimed. |

Detailed security coverage and limitations: SECURITY.md. Deployment and human actions: RELEASE.md. Repeatable commands are in package.json and the README. Tests use invented families and clean up their own accounts on success; failed-run fixtures are removed before delivery.
