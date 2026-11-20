-- Run against the production database. Test accounts use the reserved .invalid domain.
SELECT count(*) AS real_invites_created FROM invites i JOIN accounts a ON a.id=i.owner_id WHERE a.email NOT LIKE '%.invalid' AND i.created_at >= now()-interval '7 days';
SELECT count(*) AS verified_paid_invites FROM invites i JOIN accounts a ON a.id=i.owner_id WHERE a.email NOT LIKE '%.invalid' AND i.paid_at >= now()-interval '7 days';
SELECT round(100.0*count(*) FILTER (WHERE EXISTS(SELECT 1 FROM replies r WHERE r.invite_id=i.id))/NULLIF(count(*),0),1) AS invites_with_response_percent FROM invites i JOIN accounts a ON a.id=i.owner_id WHERE a.email NOT LIKE '%.invalid' AND i.created_at >= now()-interval '7 days';
