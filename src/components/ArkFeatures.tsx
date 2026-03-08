import { Layers, TrendingUp, Shield, Zap, BarChart3, Lock } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Borrow Against Positions",
    description: "Use your Polymarket shares as collateral. Borrow up to 50% of their value with capped interest rates. Repay anytime.",
  },
  {
    icon: TrendingUp,
    title: "Lend & Earn Yield",
    description: "Supply USDC to curated lending pools. Earn uncorrelated yield from prediction market traders — up to 30% APY.",
  },
  {
    icon: Zap,
    title: "One-Click Leverage",
    description: "Loop your collateral with a single click. Get 2x exposure on your Polymarket positions without additional capital.",
  },
  {
    icon: Shield,
    title: "Non-Custodial",
    description: "Your positions are stored in audited smart contracts. Only you can withdraw. We never have access to your funds.",
  },
  {
    icon: BarChart3,
    title: "Risk Engine",
    description: "Advanced risk scoring for every market. Automated liquidation protection and real-time position monitoring.",
  },
  {
    icon: Lock,
    title: "Built on Morpho",
    description: "Battle-tested lending infrastructure with $5B+ in deposits. Audited 34 times by 14 security firms.",
  },
];

const ArkFeatures = () => {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container-ark">
        <div className="text-center mb-16">
          <p className="ark-section-label">Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Everything you need to maximize<br className="hidden sm:block" />
            <span className="text-muted-foreground"> capital efficiency</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="ark-card p-6 sm:p-8 group hover:border-[hsl(var(--ark-green)_/_0.2)] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'hsl(var(--ark-green) / 0.1)' }}
              >
                <feature.icon className="w-5 h-5" style={{ color: 'hsl(var(--ark-green))' }} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArkFeatures;
