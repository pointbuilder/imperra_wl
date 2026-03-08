import { ArrowUpRight } from "lucide-react";

const ArkHero = () => {
  return (
    <section className="pt-32 pb-20 sm:pt-44 sm:pb-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--ark-green) / 0.3), transparent 70%)' }}
      />

      <div className="container-ark relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ark-badge mb-6 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--ark-green))' }} />
            Pre-Seed — Coming Soon
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-6">
            The liquidity layer for{" "}
            <span className="ark-gradient-text">Polymarket</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Borrow, lend, and leverage your prediction market positions. 
            Unlock capital efficiency on the world's largest prediction market.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="#waitlist" className="ark-btn-primary">
              Join Waitlist
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="#features" className="ark-btn-secondary">
              Learn More
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 ark-card p-6 sm:p-8 ark-glow">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: "Target TVL", value: "$50M+", sub: "at launch" },
              { label: "Max LTV", value: "50%", sub: "on positions" },
              { label: "Lending APY", value: "~30%", sub: "projected" },
              { label: "Leverage", value: "Up to 2x", sub: "one click" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--ark-green))' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArkHero;
