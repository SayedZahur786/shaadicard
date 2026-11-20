# Release evidence — 21 November 2026

All shared launch-kit files remain unchanged. Local checks use the actual Next.js production server and the app-specific Neon production branch, with fictional .invalid test accounts. Targets and demos are not customer traction.

| Check | Observed result |
| --- | --- |
| Production build | PASS, Next.js 16.4.6 with strict TypeScript. Tailwind precompiled through npm prebuild. |
| Unit tests | PASS, 7: translations, complete ceremony answers, duplicate rejection, bounds, independent headcounts, date rendering and impossible calendar dates. |
| Browser happy path | PASS, 2 tests: account and invitation creation, share link, Hindi/Urdu/Gujarati rendering, shop branding, RSVP create/update, owner denial and deletion; main route/phone/404 checks. |
| Placeholder scan | PASS, final source scanned with the shared script. |
| Header check | PASS on local HTTP and https://shaadicard-taupe.vercel.app, including hosted HSTS. |
| Policy check | PASS on local production and hosted HTTPS. Distinct substantive template-derived pages; factual/legal adequacy remains manual. |
| Cold mobile performance | PASS, LCP 616 / 596 / 596 ms; worst 616 ms on the final build (earlier run: 1288 / 956 / 1596 ms). Three fresh servers/contexts, 4× CPU and 1.6 Mbps / 150 ms throttling. Local lab evidence only. |
| Dependency audit | PASS, 0 vulnerabilities across installed dependencies, including development packages. |
| Security regression suite | PASS, 2 tests: size/validation/CSRF/rate limits, spoofed header resistance, rotating CSP nonces and rendered OG image. |
| Frozen install | PASS, npm ci --ignore-scripts from the committed lockfile; subsequent production build and checks pass. |
| Secret scans | PASS, Gitleaks on repository history and current source archive; 48 built client assets compared against database URLs/passwords with zero matches. |
| Screenshots | PASS, 24 real desktop/mobile PNGs across 12 routes/states; wait for page headings and loaded fonts before capture. |
| README animation | PASS, locally rendered committed SVG image changed between frames; no remote image hotlink. |
| Runtime privileges | PASS, current_user shaadicard_runtime; can_change_schema false; can_mark_paid false. |
| Demo video | PASS, 62-second H.264/AAC MP4, audible system TTS track, eight large caption sections; real local app backed by Neon. |
| Hosted persistence | BLOCKED: automatic approval review denied transfer of DATABASE_URL. Public deployment is a functional demo, not a complete live RSVP launch. |
| Payments | NOT ENABLED: merchant credentials and verified terms required. No paid invites claimed. |

Detailed security coverage and limitations: SECURITY.md. Deployment and human actions: RELEASE.md. Repeatable commands are in package.json and the README. Tests use invented families and clean up their own accounts on success; failed-run fixtures are removed before delivery.
