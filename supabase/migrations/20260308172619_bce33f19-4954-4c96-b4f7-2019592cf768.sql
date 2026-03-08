
CREATE TABLE public.waitlist_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  ip_address text,
  attempts int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '10 minutes'),
  verified boolean NOT NULL DEFAULT false
);

ALTER TABLE public.waitlist_verifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and updates (edge function uses service role, but just in case)
CREATE POLICY "Service role only" ON public.waitlist_verifications
  FOR ALL TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Index for lookup
CREATE INDEX idx_verifications_email_code ON public.waitlist_verifications(email, code);

-- Auto-cleanup expired codes (optional: can also do in edge function)
