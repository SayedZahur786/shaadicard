CREATE TABLE IF NOT EXISTS accounts (id text PRIMARY KEY, email text UNIQUE NOT NULL, password text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS sessions (hash text PRIMARY KEY, account_id text NOT NULL REFERENCES accounts(id) ON DELETE CASCADE, expires_at timestamptz NOT NULL);
CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);
CREATE TABLE IF NOT EXISTS invites (id text PRIMARY KEY, slug text UNIQUE NOT NULL, owner_id text NOT NULL REFERENCES accounts(id) ON DELETE CASCADE, data jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), paid_at timestamptz);
CREATE INDEX IF NOT EXISTS invites_owner ON invites(owner_id);
CREATE TABLE IF NOT EXISTS replies (id text PRIMARY KEY, invite_id text NOT NULL REFERENCES invites(id) ON DELETE CASCADE, visitor_hash text NOT NULL, name text NOT NULL, answers jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(invite_id,visitor_hash));
CREATE TABLE IF NOT EXISTS rate_limits (key text PRIMARY KEY, hits integer NOT NULL, expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS support_requests (id text PRIMARY KEY, email text NOT NULL, message text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
