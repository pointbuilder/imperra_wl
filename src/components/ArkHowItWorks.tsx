const steps = [
  {
    num: "01",
    title: "Connect your Polymarket account",
    description: "Link your wallet or email-based Polymarket account to Arkos. Your positions are automatically detected and valued in real-time.",
  },
  {
    num: "02",
    title: "Choose your strategy",
    description: "Borrow against existing positions, supply USDC to earn yield, or leverage your trades with one-click loops.",
  },
  {
    num: "03",
    title: "Deploy capital instantly",
    description: "Funds are available immediately. Manage positions, monitor health factors, and adjust strategies — all from one dashboard.",
  },
];

const ArkHowItWorks = () => {
  return (
    <section id="how" className="py-20 sm:py-28">
      <div className="container-ark">
        <div className="text-center mb-16">
          <p className="ark-section-label">How it works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Three steps to unlock<br className="hidden sm:block" />
            <span className="text-muted-foreground"> your capital</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              <div className="ark-card p-8 h-full">
                <span
                  className="text-5xl font-extrabold block mb-6"
                  style={{ color: 'hsl(var(--ark-green) / 0.15)' }}
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px" style={{ background: 'hsl(var(--ark-green) / 0.3)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArkHowItWorks;
