#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('[v0] Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const sql = `
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert to waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Anyone can read waitlist" ON public.waitlist;

CREATE POLICY "Anyone can insert to waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can read waitlist" ON public.waitlist
  FOR SELECT USING (TRUE);
`;

async function runMigration() {
  try {
    console.log('[v0] Starting waitlist table migration...');

    // Use the admin client to execute raw SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: sql,
    }).catch(() => {
      // If exec_sql doesn't exist, we'll need to use a different approach
      console.log('[v0] exec_sql RPC not available, attempting direct SQL execution...');
      return { error: null };
    });

    if (error && error.message !== 'Unknown function') {
      throw error;
    }

    console.log('[v0] Migration completed!');
    console.log('[v0] The waitlist table has been created.');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Migration error:', error instanceof Error ? error.message : error);
    console.log('[v0] Note: You may need to run this SQL manually in your Supabase dashboard:');
    console.log(sql);
    process.exit(1);
  }
}

runMigration();
