export interface SiteContent {
  heroSubtitle: string;
  statementText: string;
  borrowDesc: string;
  lendDesc: string;
  leverageDesc: string;
  securityText: string;
  maxLtv: string;
  projectedApy: string;
  maxLeverage: string;
  targetTvl: string;
}

const STORAGE_KEY = "arkos-content";

export const defaultContent: SiteContent = {
  heroSubtitle:
    "The first leverage protocol built on top of prediction markets. We redesigned borrowing, lending, and leverage from scratch — purpose-built for a new asset class.",
  statementText:
    "Prediction markets hold billions in untapped capital. Every other protocol ignores them. We built Arkos to unlock that value — a novel collateral engine that turns positions into productive assets with up to 10× leverage, passive yield, and zero custody risk.",
  borrowDesc:
    "We engineered a unique borrowing mechanism designed specifically for prediction market positions. Use your Polymarket portfolio as collateral, access up to 50% LTV with fixed rates, and repay on your terms. No liquidation cascades — our risk model adapts to market resolution timelines.",
  lendDesc:
    "Supply USDC to prediction-market-backed pools and earn yield from an entirely new source — trader leverage demand. Returns are uncorrelated with broader DeFi, giving your capital a differentiated risk profile that traditional lending protocols simply can't offer.",
  leverageDesc:
    "One click. Up to 10× exposure. Our automated collateral looping engine handles the complexity — no manual position management, no additional capital required. We built the infrastructure that lets you express conviction at scale.",
  securityText:
    "Built on Morpho — a battle-tested lending primitive with $5B+ in deposits and 34 audits from 14 firms. We never touch your funds. Non-custodial by design, transparent by default. Your positions, your keys, your control — always.",
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
