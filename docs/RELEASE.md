# Deployment state

The public demo is https://shaadicard-taupe.vercel.app. The app's GitHub repository is private at https://github.com/SayedZahur786/shaadicard.

Neon exists and the local app connects to its production branch. Automatic approval review rejected uploading the database credential to Vercel, so the hosted app intentionally has no database credential. The public fictional invitation works; hosted account creation, real invitations and persistent RSVPs are unavailable. Do not describe this as a full commercial launch.

## Human activation
1. Approve transfer of this app's least-privilege DATABASE_URL into the shaadicard Vercel project's Production environment, or add it yourself in Vercel settings from the ignored local .env.local file. Never paste it into chat, a URL or a repository.
2. Redeploy using `vercel --prod --yes` from this directory. APP_URL must be https://shaadicard-taupe.vercel.app. Keep LOCAL_DATABASE unset on Vercel. Do not deploy the direct migration URL.
3. Run `TEST_BASE_URL=https://shaadicard-taupe.vercel.app npm run test:e2e`, then rerun the shared header and policy gates against HTTPS. Clean up test accounts as the test does on success.
4. Provide merchant/payment credentials, verified business identity, support ownership and refund/tax terms before accepting the planned ₹999 price. No payment provider, checkout or paid status mutation is exposed today.
5. Publish the prepared channel posts yourself after the hosted RSVP flow passes. Public source publication also needs explicit approval; automatic review required a private repository.

## Operations
Run `npm run db:maintenance` daily from a trusted environment with the direct administrator connection to expire sessions, rate buckets and support requests older than 90 days. Review support_requests using the Neon console; this is a manual inbox and sends no email. Never publish its contents. No scheduled runner has been activated.

Migrations: `npm run db:migrate` uses DATABASE_URL_UNPOOLED, not the app role. `scripts/provision-runtime.ts` creates a restricted runtime role with no schema permissions and no ability to set paid_at. Only the pooled runtime DATABASE_URL belongs on Vercel. Test migration changes on a Neon branch first. Current project recovery window is six hours; create a point-in-time recovery branch through Neon and verify data before changing application connections. Restore not exercised against real data because there are no real customers yet.

Week-one metrics are the three queries in scripts/metrics.sql. Exclude .invalid test accounts. Targets: 30 real invites, 10 verified paid invites, 60% of real invites with at least one family reply. Paid count stays zero until payment activation; it is never inferred from free preview usage.
