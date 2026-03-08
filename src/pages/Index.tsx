import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getContent, type SiteContent } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

const smoothScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
    <div className="ark-container flex items-center justify-between h-16 sm:h-20">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground text-lg font-bold uppercase tracking-wider">
        Arkos
      </button>
      <div className="flex items-center gap-6 sm:gap-10">
        <button onClick={() => smoothScroll('problem')} className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Problem</button>
        <button onClick={() => smoothScroll('protocol')} className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Protocol</button>
        <a href="https://twitter.com" target="_blank" className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Twitter ↗</a>
      </div>
    </div>
  </nav>
);

const WAITLIST_OPEN_DATE = new Date('2026-03-25T00:00:00Z');

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = WAITLIST_OPEN_DATE.getTime() - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const CountdownTimer = () => {
  const countdown = useCountdown();

  if (!countdown) {
    return <WaitlistForm />;
  }

  const units = [
    { value: countdown.days, label: 'Days' },
    { value: countdown.hours, label: 'Hours' },
    { value: countdown.minutes, label: 'Min' },
    { value: countdown.seconds, label: 'Sec' },
  ];

  return (
    <div>
      <div className="flex items-start gap-4 sm:gap-8">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-4 sm:gap-8">
            <div className="text-center">
              <span className="ark-display text-foreground text-4xl sm:text-6xl lg:text-7xl block tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="ark-mono text-[10px] sm:text-xs uppercase tracking-widest text-foreground/30 mt-2 block">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="ark-display text-foreground/20 text-3xl sm:text-5xl lg:text-6xl mt-0.5">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const WaitlistForm = ({ compact = false }: { compact?: boolean }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'exists' | 'error' | 'rate_limited'>('idle');
  const [retryMsg, setRetryMsg] = useState('');

  return (
    <form
      className={`flex flex-col items-start gap-4 ${compact ? 'max-w-md' : 'max-w-lg'}`}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const emailInput = form.querySelector('input') as HTMLInputElement;
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          emailInput.setCustomValidity('Enter a valid email');
          emailInput.reportValidity();
          return;
        }
        emailInput.setCustomValidity('');
        setStatus('loading');

        try {
          const { error } = await supabase.functions.invoke('telegram-waitlist', {
            body: { email },
          });
          if (error) throw error;
          setStatus('done');
          emailInput.value = '';
        } catch (err: any) {
          let msg = '';
          try {
            msg = err?.context?.body ? await err.context.text() : '';
          } catch {}

          if (msg.includes('already_registered')) {
            setStatus('exists');
          } else if (msg.includes('rate_limited')) {
            setStatus('rate_limited');
            try {
              const parsed = JSON.parse(msg);
              const mins = parsed.retry_after_minutes || 60;
              if (mins >= 60) {
                const hrs = Math.ceil(mins / 60);
                setRetryMsg(`Try again in ${hrs}h`);
              } else {
                setRetryMsg(`Try again in ${mins}min`);
              }
            } catch {
              setRetryMsg('Try again later');
            }
          } else {
            setStatus('error');
          }
        }

        setTimeout(() => { setStatus('idle'); setRetryMsg(''); }, 5000);
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="w-full sm:flex-1 bg-transparent border-b border-foreground/30 pb-3 text-foreground text-base ark-mono outline-none placeholder:text-foreground/15 focus:border-foreground transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'rate_limited'}
          className="text-foreground text-sm ark-mono uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity shrink-0 disabled:opacity-30"
        >
          {status === 'idle' && '→ Submit'}
          {status === 'loading' && '→ ...'}
          {status === 'done' && '→ Done ✓'}
          {status === 'exists' && '→ Already in'}
          {status === 'error' && '→ Error'}
          {status === 'rate_limited' && '→ Limit reached'}
        </button>
      </div>
      {status === 'rate_limited' && retryMsg && (
        <p className="text-destructive/70 text-xs ark-mono">{retryMsg}</p>
      )}
    </form>
  );
};

const Hero = ({ content }: { content: SiteContent }) => (
  <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
    <div className="ark-container py-32">
      <motion.h1
        className="ark-display text-foreground text-[clamp(3rem,12vw,11rem)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Arkos
      </motion.h1>
      <motion.div
        className="mt-8 sm:mt-12 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-foreground/50 text-lg sm:text-xl leading-relaxed">
          {content.heroSubtitle}
        </p>
      </motion.div>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="ark-mono text-xs uppercase tracking-widest text-foreground/25 mb-5">
          Waitlist opens March 25
        </p>
        <CountdownTimer />
      </motion.div>
    </div>
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <div className="w-px h-16 bg-foreground/30 mx-auto" />
    </motion.div>
  </section>
);

const Problem = ({ content }: { content: SiteContent }) => (
  <section id="problem" className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <FadeIn>
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(001) The Problem</span>
          </FadeIn>
        </div>
        <div className="md:col-span-9">
          <FadeIn>
            <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-6xl leading-[1.1] normal-case mb-8">
              {content.problemTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              {content.problemText}
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Solution = ({ content }: { content: SiteContent }) => (
  <section className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <FadeIn>
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(002) The Solution</span>
          </FadeIn>
        </div>
        <div className="md:col-span-9">
          <FadeIn>
            <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-6xl leading-[1.1] normal-case mb-8">
              {content.solutionTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              {content.solutionText}
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Protocol = ({ content }: { content: SiteContent }) => {
  const items = [
    { num: "(A)", title: "Borrow", desc: content.borrowDesc },
    { num: "(B)", title: "Lend", desc: content.lendDesc },
    { num: "(C)", title: "Leverage", desc: content.leverageDesc },
    { num: "(D)", title: "Send", desc: content.sendDesc },
    { num: "(E)", title: "& More", desc: content.moreDesc },
  ];

  return (
    <section id="protocol" className="py-24 sm:py-40">
      <div className="ark-container">
        <div className="ark-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <FadeIn>
              <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(003) Protocol</span>
            </FadeIn>
          </div>
          <div className="md:col-span-9">
            <FadeIn>
              <h2 className="ark-display text-foreground text-3xl sm:text-5xl normal-case">
                What you can do
              </h2>
            </FadeIn>
          </div>
        </div>
        <div className="space-y-0">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <div className="border-t border-border py-10 sm:py-14 group">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-1">
                    <span className="ark-mono text-xs text-foreground/30">{item.num}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="ark-display text-foreground text-4xl sm:text-6xl lg:text-7xl normal-case group-hover:opacity-60 transition-opacity duration-500">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7 md:pt-4">
                    <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

const Metrics = ({ content }: { content: SiteContent }) => {
  const metrics = [
    { val: content.maxLtv, label: "Max LTV", desc: "Borrow up to half the value of your positions" },
    { val: content.projectedApy, label: "Projected APY", desc: "Expected yield for USDC lenders" },
    { val: content.maxLeverage, label: "Max Leverage", desc: "Amplify your conviction with one click" },
    { val: content.targetTvl, label: "Target TVL", desc: "First-year protocol capacity goal" },
  ];

  return (
    <section className="py-24 sm:py-40">
      <div className="ark-container">
        <div className="ark-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <FadeIn>
              <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(004) By the numbers</span>
            </FadeIn>
          </div>
          <div className="md:col-span-9">
            <FadeIn>
              <h2 className="ark-display text-foreground text-3xl sm:text-5xl normal-case">
                Built to perform
              </h2>
            </FadeIn>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.1}>
              <div className="group">
                <span className="ark-display text-foreground text-5xl sm:text-6xl lg:text-7xl block mb-4 group-hover:opacity-60 transition-opacity duration-500">
                  {m.val}
                </span>
                <span className="ark-mono text-xs uppercase tracking-widest text-foreground/50 block mb-2">{m.label}</span>
                <p className="text-foreground/25 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Security = ({ content }: { content: SiteContent }) => (
  <section className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <FadeIn>
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(005) Security</span>
          </FadeIn>
        </div>
        <div className="md:col-span-9">
          <FadeIn>
            <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-7xl normal-case mb-12">
              Non-custodial.<br />
              <span className="text-foreground/20">Always.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              {content.securityText}
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Waitlist = () => (
  <section id="waitlist" className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <FadeIn>
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(006) Access</span>
          </FadeIn>
        </div>
        <div className="md:col-span-9">
          <FadeIn>
            <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-7xl normal-case mb-4">
              Early access
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-foreground/30 text-base mb-10 max-w-lg">
              Waitlist opens March 25. Be among the first to leverage prediction markets.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <CountdownTimer />
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10">
    <div className="ark-container">
      <div className="ark-divider mb-10" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="text-foreground font-bold uppercase tracking-wider text-sm">Arkos</span>
        <div className="flex items-center gap-8">
          <a href="https://twitter.com" target="_blank" className="ark-mono text-xs uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="ark-mono text-xs uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors">Discord</a>
          <a href="#" className="ark-mono text-xs uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors">Docs</a>
        </div>
        <span className="ark-mono text-xs text-foreground/15">© 2026</span>
      </div>
    </div>
  </footer>
);

const Index = () => {
  const [content, setContent] = useState(getContent());

  useEffect(() => {
    const handleStorage = () => setContent(getContent());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero content={content} />
      <Problem content={content} />
      <Solution content={content} />
      <Protocol content={content} />
      <Metrics content={content} />
      <Security content={content} />
      <Waitlist />
      <Footer />
    </div>
  );
};

export default Index;
