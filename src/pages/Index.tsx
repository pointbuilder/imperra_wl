import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
        Ardento
      </button>
      <div className="flex items-center gap-6 sm:gap-10">
        <button onClick={() => smoothScroll('problem')} className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Problem</button>
        <button onClick={() => smoothScroll('solution')} className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Solution</button>
        <span className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-30 cursor-not-allowed" title="Coming soon">Docs</span>
        <span className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-30 cursor-not-allowed" title="Coming soon">Twitter</span>
      </div>
    </div>
  </nav>
);

const WAITLIST_OPEN_DATE = new Date('2026-04-10T00:00:00Z');

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.message.includes('unique constraint')) {
          setErrorMessage('This email is already on the waitlist');
          setStatus('error');
          setTimeout(() => {
            setStatus('idle');
            setErrorMessage('');
          }, 3000);
        } else {
          throw error;
        }
      } else {
        setStatus('done');
        emailInput.value = '';
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('[v0] Waitlist signup error:', error);
      setErrorMessage('Failed to join waitlist. Please try again.');
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <form
      className={`flex flex-col items-start gap-4 ${compact ? 'max-w-md' : 'max-w-lg'}`}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="w-full sm:flex-1 bg-transparent border-b border-foreground/30 pb-3 text-foreground text-base ark-mono outline-none placeholder:text-foreground/15 focus:border-foreground transition-colors disabled:opacity-50"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="text-foreground text-sm ark-mono uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity shrink-0 disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'idle' ? '→ Submit' : status === 'loading' ? '→ Loading...' : status === 'done' ? '→ Done ✓' : '→ Error'}
        </button>
      </div>
      {errorMessage && (
        <p className="text-sm ark-mono text-foreground/50">{errorMessage}</p>
      )}
    </form>
  );
};

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
    <div className="ark-container py-32">
      <motion.h1
        className="ark-display text-foreground text-[clamp(3rem,12vw,11rem)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Ardento
      </motion.h1>
      <motion.div
        className="mt-8 sm:mt-12 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-foreground/50 text-lg sm:text-xl leading-relaxed">
          A leverage protocol built on top of prediction markets. Borrow, lend, and trade with up to 25× leverage — all powered by your Polymarket positions.
        </p>
      </motion.div>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="ark-mono text-xs uppercase tracking-widest text-foreground/25 mb-5">
          Waitlist opens April 10
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

const Problem = () => (
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
              Hundreds of millions locked. Zero utility.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              Prediction markets hold over $850M in open interest. Yet every dollar sitting in a position is dead capital — it can't be borrowed against, can't earn yield, can't be leveraged. Traders are forced to choose between conviction and capital efficiency. That's broken.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Solution = () => (
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
              We built the fix.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              Ardento turns prediction market positions into productive collateral. Borrow against them, earn yield from them, leverage them up to 25×. One protocol, purpose-built for a new asset class — no compromises, no custody risk.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Protocol = () => {
  const items = [
    { num: "(A)", title: "Borrow", desc: "Use your Polymarket portfolio as collateral. Our risk engine adapts to market resolution timelines — no liquidation cascades, no surprises. Just capital working for you." },
    { num: "(B)", title: "Lend", desc: "Supply USDC to prediction-market-backed pools. Earn yield from trader leverage demand — returns uncorrelated with broader DeFi." },
    { num: "(C)", title: "Leverage", desc: "One click. Up to 25× exposure. Our automated looping engine handles the complexity — no manual position management required." },
    { num: "(D)", title: "Send", desc: "Share positions, split conviction across wallets, or gift leveraged exposure. Social trading in one transaction." },
    { num: "(E)", title: "& More", desc: "Portfolio analytics, position alerts, auto-rebalancing, limit orders, and cross-market arbitrage tools. The full-stack trading layer prediction markets deserve." },
  ];

  return (
    <section id="solution" className="py-24 sm:py-40">
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

const ComingSoon = () => (
  <section className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <FadeIn>
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(004) Stay tuned</span>
          </FadeIn>
        </div>
        <div className="md:col-span-9">
          <FadeIn>
            <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-7xl normal-case mb-8">
              More info<br />
              <span className="text-foreground/20">coming soon.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              We're building something big. Security details, roadmap, and technical documentation will be shared as we approach launch.
            </p>
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
        <span className="text-foreground font-bold uppercase tracking-wider text-sm">Ardento</span>
        <div className="flex items-center gap-8">
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/15 cursor-not-allowed" title="Coming soon">Twitter</span>
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/15 cursor-not-allowed" title="Coming soon">Discord</span>
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/15 cursor-not-allowed" title="Coming soon">Docs</span>
        </div>
        <span className="ark-mono text-xs text-foreground/15">© 2026</span>
      </div>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Protocol />
      <ComingSoon />
      <Footer />
    </div>
  );
};

export default Index;
