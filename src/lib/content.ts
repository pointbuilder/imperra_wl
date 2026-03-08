export interface SiteContent {
  heroSubtitle: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  borrowDesc: string;
  lendDesc: string;
  leverageDesc: string;
  sendDesc: string;
  moreDesc: string;
  securityText: string;
  maxLtv: string;
  projectedApy: string;
  maxLeverage: string;
  targetTvl: string;
}

const STORAGE_KEY = "arkos-content";

export const defaultContent: SiteContent = {
  heroSubtitle:
    "A leverage protocol built on top of prediction markets.",
  problemTitle: "Billions locked. Zero utility.",
  problemText:
    "Prediction markets hold over $10B in open interest. Yet every dollar sitting in a position is dead capital — it can't be borrowed against, can't earn yield, can't be leveraged. Traders are forced to choose between conviction and capital efficiency. That's broken.",
  solutionTitle: "We built the fix.",
  solutionText:
    "Arkos turns prediction market positions into productive collateral. Borrow against them, earn yield from them, leverage them up to 10×. One protocol, purpose-built for a new asset class — no compromises, no custody risk.",
  borrowDesc:
    "Use your Polymarket portfolio as collateral. Access up to 50% LTV with fixed rates. No liquidation cascades — our risk model adapts to market resolution timelines.",
  lendDesc:
    "Supply USDC to prediction-market-backed pools. Earn yield from trader leverage demand — returns uncorrelated with broader DeFi.",
  leverageDesc:
    "One click. Up to 10× exposure. Our automated looping engine handles the complexity — no manual position management required.",
  sendDesc:
    "Share positions, split conviction across wallets, or gift leveraged exposure. Social trading in one transaction.",
  moreDesc:
    "Portfolio analytics, position alerts, auto-rebalancing, limit orders, and cross-market arbitrage tools. The full-stack trading layer prediction markets deserve.",
  securityText:
    "Built on Morpho — a battle-tested lending primitive with $5B+ in deposits and 34 audits from 14 firms. Non-custodial by design. Your positions, your keys, your control.",
  maxLtv: "50%",
  projectedApy: "~45%",
  maxLeverage: "10×",
  targetTvl: "$50M+",
};

export function getContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultContent, ...JSON.parse(stored) };
  } catch {}
  return defaultContent;
}

export function saveContent(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
