import { useState } from "react";

const tabs = [
  {
    id: "borrow",
    label: "Borrow",
    badge: "UP TO 50% OF POSITION'S VALUE",
    title: "Borrow against your shares",
    description:
      "Use your Polymarket positions as collateral and borrow up to 50% of their current value. Enjoy capped interest rates and repay anytime. Available for selected markets.",
    image: "/images/borrow.png",
  },
  {
    id: "lend",
    label: "Lend",
    badge: "UP TO 30% APY",
    title: "Lend to Polymarket traders",
    description:
      "Supply USDC in one of our three curated funds and earn by lending to Polymarket traders. The yield is uncorrelated with the conditions of crypto market.",
    image: "/images/lend.png",
  },
  {
    id: "leverage",
    label: "Leverage",
    badge: "UP TO 2X",
    title: "Leverage your positions",
    description:
      "Trade on Polymarket with up to 2x leverage by looping your collateral in one click. Turn your existing Polymarket positions into 2x leverage exposure without any additional capital required.",
    image: "/images/leverage.png",
  },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("borrow");
  const activeFeature = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-16 sm:py-24">
      <div className="container-gondor">
        {/* Features banner */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          <img
            src="/images/features-img.png"
            alt="Features"
            className="w-full"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-navy-muted"
                >
                  OUR FEATURES
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors border ${
                activeTab === tab.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-border hover:border-foreground/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active feature content */}
        <div
          id={activeFeature.id}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-navy-light mb-4 block">
              {activeFeature.badge}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-foreground mb-6">
              {activeFeature.title}
            </h2>
            <p className="text-navy-light text-lg leading-relaxed mb-8 max-w-lg">
              {activeFeature.description}
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sign up
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src={activeFeature.image}
              alt={activeFeature.title}
              className="max-w-full rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
