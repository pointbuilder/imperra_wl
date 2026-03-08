import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return new Response(JSON.stringify({ error: 'Email and code required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const trimmed = email.trim().toLowerCase();
    const trimmedCode = code.trim();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find the latest valid verification for this email
    const { data: verification, error: fetchError } = await supabase
      .from('waitlist_verifications')
      .select('*')
      .eq('email', trimmed)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!verification) {
      return new Response(JSON.stringify({ error: 'expired' }), {
        status: 410,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Max 5 attempts per code
    if (verification.attempts >= 5) {
      return new Response(JSON.stringify({ error: 'too_many_attempts' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Increment attempts
    await supabase
      .from('waitlist_verifications')
      .update({ attempts: verification.attempts + 1 })
      .eq('id', verification.id);

    // Check code
    if (verification.code !== trimmedCode) {
      return new Response(JSON.stringify({ error: 'invalid_code' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mark as verified
    await supabase
      .from('waitlist_verifications')
      .update({ verified: true })
      .eq('id', verification.id);

    // Check if already on waitlist (race condition guard)
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', trimmed)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: 'already_registered' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Add to waitlist
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email: trimmed, ip_address: ip });

    if (insertError) throw insertError;

    // Send Telegram notification
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const text = `✅ New verified waitlist\n${trimmed}\n${date} ${time}`;

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
