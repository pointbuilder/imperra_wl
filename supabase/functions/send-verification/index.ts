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
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if already on waitlist
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

    // Rate limit: max 3 verification requests per email per 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60_000).toISOString();
    const { count: recentCount } = await supabase
      .from('waitlist_verifications')
      .select('id', { count: 'exact', head: true })
      .eq('email', trimmed)
      .gte('created_at', tenMinutesAgo);

    if ((recentCount ?? 0) >= 3) {
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // IP rate limit: max 10 verifications per IP per hour
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const oneHourAgo = new Date(Date.now() - 60 * 60_000).toISOString();
    const { count: ipCount } = await supabase
      .from('waitlist_verifications')
      .select('id', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .gte('created_at', oneHourAgo);

    if ((ipCount ?? 0) >= 10) {
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));

    // Save to DB
    const { error: insertError } = await supabase
      .from('waitlist_verifications')
      .insert({ email: trimmed, code, ip_address: ip });

    if (insertError) throw insertError;

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ardento <onboarding@resend.dev>',
        to: [trimmed],
        subject: 'Your Ardento verification code',
        html: `
          <div style="font-family: 'Space Grotesk', Arial, sans-serif; background: #000; color: #fff; padding: 40px; max-width: 480px;">
            <h1 style="font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 24px;">Ardento</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0 0 24px;">Your verification code:</p>
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Space Mono', monospace; margin: 0 0 24px;">${code}</div>
            <p style="color: rgba(255,255,255,0.25); font-size: 12px; margin: 0;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error('Resend error:', errBody);
      throw new Error(`Email send failed: ${emailRes.status}`);
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
