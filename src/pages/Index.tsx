import { motion } from "framer-motion";

const smoothScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
    <div className="ark-container flex items-center justify-between h-16 sm:h-20">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground text-lg font-bold uppercase tracking-wider">
        Arkos
      </button>
      <div className="flex items-center gap-6 sm:gap-10">
        <button onClick={() => smoothScroll('about')} className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">About</button>
        <button onClick={() => smoothScroll('protocol')} className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Protocol</button>
        <a href="https://twitter.com" target="_blank" className="text-foreground text-xs sm:text-sm ark-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Twitter ↗</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
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
        <p className="text-foreground/50 text-base sm:text-lg leading-relaxed">
          The liquidity layer for prediction markets. Borrow, lend, and leverage your Polymarket positions.
        </p>
      </motion.div>
      <motion.div
        className="mt-12 flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <a href="#waitlist" className="text-foreground text-sm ark-mono uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
          Join Waitlist
        </a>
        <span className="text-foreground/20 ark-mono text-xs">Pre-Seed 2026</span>
      </motion.div>
    </div>

    {/* Scroll indicator */}
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

const Statement = () => (
  <section id="about" className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(001)</span>
        </div>
        <div className="md:col-span-9">
          <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-6xl leading-[1.1] normal-case">
            Prediction markets are the largest untapped collateral base in crypto. Arkos unlocks it.
          </h2>
        </div>
      </div>
    </div>
  </section>
);

const Protocol = () => {
  const items = [
    { num: "(A)", title: "Borrow", desc: "Use Polymarket positions as collateral. Borrow up to 50% of their value. Capped rates. Repay anytime." },
    { num: "(B)", title: "Lend", desc: "Supply USDC to curated pools. Earn yield from prediction market traders. Uncorrelated returns up to 30% APY." },
    { num: "(C)", title: "Leverage", desc: "One-click 2x leverage on any position. Loop collateral automatically. No additional capital required." },
  ];

  return (
    <section id="protocol" className="py-24 sm:py-40">
      <div className="ark-container">
        <div className="ark-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(002)</span>
          </div>
          <div className="md:col-span-9">
            <h2 className="ark-display text-foreground text-3xl sm:text-5xl normal-case">
              Protocol
            </h2>
          </div>
        </div>

        <div className="space-y-0">
          {items.map((item) => (
            <div key={item.title} className="border-t border-border py-10 sm:py-14 group">
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
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

const Numbers = () => (
  <section className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(003)</span>
        </div>
        <div className="md:col-span-9">
          <h2 className="ark-display text-foreground text-3xl sm:text-5xl normal-case">
            Numbers
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {[
          { val: "50%", label: "Max LTV" },
          { val: "~30%", label: "Projected APY" },
          { val: "2×", label: "Max Leverage" },
          { val: "$50M+", label: "Target TVL" },
        ].map((s) => (
          <div key={s.label} className="bg-background p-8 sm:p-12">
            <span className="ark-display text-foreground text-4xl sm:text-6xl lg:text-7xl block mb-3">{s.val}</span>
            <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Security = () => (
  <section className="py-24 sm:py-40">
    <div className="ark-container">
      <div className="ark-divider mb-16" />
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(004)</span>
        </div>
        <div className="md:col-span-9">
          <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-7xl normal-case mb-12">
            Non-custodial.<br />
            <span className="text-foreground/20">Always.</span>
          </h2>
          <p className="text-foreground/40 text-base sm:text-lg leading-relaxed max-w-2xl">
            Built on Morpho — a lending protocol with $5B+ in deposits, audited 34 times by 14 security firms. We never have access to your funds. Your positions, your keys, your control.
          </p>
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
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/30">(005)</span>
        </div>
        <div className="md:col-span-9">
          <h2 className="ark-display text-foreground text-3xl sm:text-5xl lg:text-7xl normal-case mb-10">
            Early access
          </h2>
          <form
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              const btn = (e.target as HTMLFormElement).querySelector('button');
              if (btn) btn.textContent = '→ Done';
            }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full sm:flex-1 bg-transparent border-b border-foreground/30 pb-3 text-foreground text-base ark-mono outline-none placeholder:text-foreground/15 focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="text-foreground text-sm ark-mono uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity shrink-0"
            >
              → Submit
            </button>
          </form>
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

const Index = () => (
  <div className="min-h-screen bg-background">
    <Nav />
    <Hero />
    <Statement />
    <Protocol />
    <Numbers />
    <Security />
    <Waitlist />
    <Footer />
  </div>
);

export default Index;
