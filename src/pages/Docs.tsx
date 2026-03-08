import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: [
      {
        heading: "What is Ardento?",
        text: "Ardento is a leverage protocol purpose-built for prediction markets. It transforms idle Polymarket positions into productive collateral — enabling borrowing, lending, and leveraged trading up to 25×. One protocol, one mission: unlock the capital efficiency that prediction markets deserve.",
      },
      {
        heading: "Why Ardento?",
        text: "Prediction markets hold over $850M in open interest, yet every dollar locked in a position remains dead capital. Ardento fixes this by creating a financial layer on top of prediction markets — allowing traders to borrow against their positions, earn yield, and amplify exposure without sacrificing conviction.",
      },
      {
        heading: "Key Principles",
        text: "Non-custodial by design. No centralized control over user funds. Transparent risk parameters. Automated liquidation engine with configurable thresholds. Built for composability with existing DeFi infrastructure.",
      },
    ],
  },
  {
    id: "borrowing",
    title: "Borrowing",
    content: [
      {
        heading: "How Borrowing Works",
        text: "Deposit your Polymarket positions as collateral into Ardento vaults. Our risk engine evaluates position health based on market resolution timelines, liquidity depth, and volatility metrics to determine your borrowing capacity.",
      },
      {
        heading: "Collateral Requirements",
        text: "Each market has dynamic collateral factors based on time-to-resolution, liquidity, and historical volatility. Longer-dated markets with deep liquidity receive higher collateral ratios (up to 80%), while short-dated or illiquid markets have conservative ratios (40–60%).",
      },
      {
        heading: "Interest Rates",
        text: "Interest rates are determined algorithmically based on pool utilization. Low utilization → low rates to incentivize borrowing. High utilization → elevated rates to attract more lender supply. Rates update in real-time with each block.",
      },
      {
        heading: "Liquidation Mechanics",
        text: "If a position's health factor drops below 1.0, it becomes eligible for liquidation. Liquidators repay a portion of the debt and receive collateral at a discount. The protocol enforces a liquidation penalty (typically 5–10%) to incentivize timely liquidations and protect lenders.",
      },
    ],
  },
  {
    id: "lending",
    title: "Lending",
    content: [
      {
        heading: "Supply & Earn",
        text: "Supply USDC to prediction-market-backed lending pools. Earn yield generated from borrower interest payments. Returns are uncorrelated with traditional DeFi yields since they're driven by prediction market trading demand rather than token emissions.",
      },
      {
        heading: "Pool Architecture",
        text: "Each lending pool is isolated by market category (politics, sports, crypto, etc.) to contain risk. Lenders choose which pools to supply based on their risk appetite. Pool parameters — including caps, rates, and collateral factors — are governed by the protocol's risk framework.",
      },
      {
        heading: "Withdrawal",
        text: "Withdrawals are instant when pool liquidity is available. During high utilization periods, a withdrawal queue ensures fair ordering. Interest accrues continuously and is claimable at any time.",
      },
    ],
  },
  {
    id: "leverage",
    title: "Leverage Trading",
    content: [
      {
        heading: "One-Click Leverage",
        text: "Amplify your prediction market exposure up to 25× with a single transaction. Ardento's automated looping engine handles the complexity — depositing collateral, borrowing, purchasing additional positions, and re-collateralizing — all in one atomic operation.",
      },
      {
        heading: "How It Works",
        text: "1. Select a Polymarket position and desired leverage multiplier.\n2. Ardento flash-borrows USDC, acquires additional position tokens, deposits them as collateral, and borrows again — repeating until target leverage is reached.\n3. Your leveraged position is represented as a single vault with clear health metrics.",
      },
      {
        heading: "Risk Management",
        text: "Each leveraged position has a liquidation price clearly displayed. Auto-deleverage mechanisms trigger at configurable health factor thresholds. Stop-loss orders can be set to automatically unwind positions before liquidation.",
      },
      {
        heading: "Leverage Limits",
        text: "Maximum leverage varies by market: high-liquidity, long-dated markets support up to 25×, while volatile or short-dated markets cap at 5–10×. These limits are dynamically adjusted based on real-time market conditions.",
      },
    ],
  },
  {
    id: "send",
    title: "Send & Social",
    content: [
      {
        heading: "Position Transfers",
        text: "Transfer leveraged positions between wallets in a single transaction. Share conviction with friends, split exposure across accounts, or gift leveraged positions. All position metadata — including health factors and liquidation prices — transfers seamlessly.",
      },
      {
        heading: "Social Trading",
        text: "Follow top traders' leveraged positions (coming soon). Copy-trade functionality allows one-click mirroring of successful strategies. Leaderboards rank traders by risk-adjusted returns across prediction market categories.",
      },
    ],
  },
  {
    id: "risk",
    title: "Risk Framework",
    content: [
      {
        heading: "Risk Engine",
        text: "Ardento's risk engine continuously evaluates every position across multiple dimensions: market liquidity, time-to-resolution, historical volatility, correlation between collateral assets, and oracle reliability. Parameters are updated in real-time.",
      },
      {
        heading: "Oracle Design",
        text: "Price feeds are sourced directly from Polymarket's on-chain order books, supplemented by a time-weighted average price (TWAP) mechanism to resist manipulation. Oracle updates are validated against multiple data sources before being accepted by the protocol.",
      },
      {
        heading: "Emergency Procedures",
        text: "In extreme market conditions, the protocol can pause new borrowing, reduce leverage limits, or increase collateral requirements. These circuit breakers are automated and trigger based on predefined volatility thresholds.",
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    content: [
      {
        heading: "Smart Contract Design",
        text: "Ardento is built as a modular smart contract system. Core modules: Vault Manager (collateral custody), Rate Engine (interest rate computation), Liquidation Engine (health factor monitoring and execution), and Router (one-click leverage orchestration).",
      },
      {
        heading: "Security",
        text: "All contracts will undergo multiple independent audits before mainnet launch. Bug bounty program with significant rewards. Formal verification of critical mathematical invariants. Time-locked upgrades with community governance oversight.",
      },
      {
        heading: "Supported Networks",
        text: "Ardento will launch on Polygon (where Polymarket operates). Cross-chain expansion is planned post-launch to support prediction markets on other networks.",
      },
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap",
    content: [
      {
        heading: "Phase 1 — Foundation (Q2 2026)",
        text: "Core protocol development. Lending and borrowing for top Polymarket positions. Private testnet with select partners. Security audits initiated.",
      },
      {
        heading: "Phase 2 — Launch (Q3 2026)",
        text: "Public testnet launch. One-click leverage engine. Mainnet deployment with limited markets. Bug bounty program launch.",
      },
      {
        heading: "Phase 3 — Expansion (Q4 2026)",
        text: "Full market coverage on Polymarket. Social trading features. Advanced order types (limit, stop-loss, take-profit). Portfolio analytics dashboard.",
      },
      {
        heading: "Phase 4 — Scale (2027)",
        text: "Cross-chain prediction market support. Governance token launch. Protocol-owned liquidity strategies. Institutional-grade API and SDK.",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    content: [
      {
        heading: "Is Ardento custodial?",
        text: "No. Ardento is fully non-custodial. Your assets remain in smart contract vaults that only you control. The protocol never has unilateral access to user funds.",
      },
      {
        heading: "What happens if a market resolves while I have a leveraged position?",
        text: "When a market resolves, winning positions increase in value (up to $1 per share) and losing positions go to $0. Ardento's resolution engine automatically settles positions, repays outstanding debt, and returns remaining collateral to the user.",
      },
      {
        heading: "What are the fees?",
        text: "Borrowers pay variable interest rates based on pool utilization. Leveraged positions incur a small protocol fee (0.1% of notional). There are no deposit or withdrawal fees. Liquidations carry a 5–10% penalty.",
      },
      {
        heading: "Is there a token?",
        text: "Not yet. A governance token is planned for Phase 4 (2027). There will be no pre-sale. Details will be announced through official channels only.",
      },
    ],
  },
];

const SideNav = ({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) => (
  <nav className="hidden lg:block sticky top-24 w-56 shrink-0">
    <div className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className={`block w-full text-left px-3 py-2 ark-mono text-xs uppercase tracking-widest transition-all duration-300 ${
            activeSection === section.id
              ? "text-foreground border-l-2 border-foreground"
              : "text-foreground/25 hover:text-foreground/50 border-l border-border"
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  </nav>
);

const MobileNav = ({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) => {
  const [open, setOpen] = useState(false);
  const current = sections.find((s) => s.id === activeSection);

  return (
    <div className="lg:hidden sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="ark-container py-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 ark-mono text-xs uppercase tracking-widest text-foreground/60"
        >
          <span>{current?.title || "Navigate"}</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        </button>
        {open && (
          <div className="mt-3 pb-2 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onNavigate(section.id);
                  setOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 ark-mono text-xs uppercase tracking-widest ${
                  activeSection === section.id ? "text-foreground" : "text-foreground/30"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Docs = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`doc-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="ark-container flex items-center justify-between h-16">
          <Link to="/" className="text-foreground text-lg font-bold uppercase tracking-wider hover:opacity-60 transition-opacity">
            Ardento
          </Link>
          <span className="ark-mono text-xs uppercase tracking-widest text-foreground/40">Documentation</span>
        </div>
      </nav>

      <MobileNav activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="ark-container pt-24 pb-20 flex gap-12">
        <SideNav activeSection={activeSection} onNavigate={handleNavigate} />

        <main className="flex-1 min-w-0">
          {/* Hero */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="ark-display text-foreground text-4xl sm:text-6xl lg:text-7xl normal-case mb-6">
              Documentation
            </h1>
            <p className="text-foreground/40 text-lg leading-relaxed max-w-2xl">
              Everything you need to understand the Ardento protocol — from core mechanics to risk management and roadmap.
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, sIdx) => (
            <motion.section
              key={section.id}
              id={`doc-${section.id}`}
              className="mb-20 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              onViewportEnter={() => setActiveSection(section.id)}
            >
              <div className="ark-divider mb-10" />
              <div className="flex items-baseline gap-4 mb-10">
                <span className="ark-mono text-xs text-foreground/20">
                  ({String(sIdx + 1).padStart(2, "0")})
                </span>
                <h2 className="ark-display text-foreground text-2xl sm:text-4xl normal-case">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-10">
                {section.content.map((block) => (
                  <div key={block.heading}>
                    <h3 className="text-foreground text-lg font-semibold mb-3">{block.heading}</h3>
                    <p className="text-foreground/40 text-base leading-relaxed max-w-2xl whitespace-pre-line">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}

          {/* Footer */}
          <div className="ark-divider mt-20 mb-10" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/"
              className="ark-mono text-xs uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="ark-mono text-xs text-foreground/15">© 2026 Ardento</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
