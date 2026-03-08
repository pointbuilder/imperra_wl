
CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  ip_address text
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no auth required for waitlist)
CREATE POLICY "Allow anonymous inserts" ON public.waitlist
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- No select/update/delete for anon
CREATE POLICY "No public read" ON public.waitlist
  FOR SELECT TO authenticated
  USING (false);
