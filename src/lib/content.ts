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
    "Layer 2 on Polymarket. Borrow, lend, and trade with leverage — all powered by prediction markets.",
  statementText:
    "Prediction markets are the largest untapped collateral in crypto. Arkos gives you the tools: up to 10× leverage, passive yield from liquidity provision, and social position sharing with friends.",
  borrowDesc:
    "Use your Polymarket positions as collateral. Borrow up to 50% of their value. Fixed rates. Repay anytime.",
  lendDesc:
    "Supply USDC to curated pools. Earn yield from prediction market traders. Uncorrelated returns.",
  leverageDesc:
    "One click — 10× leverage on any position. Automated collateral looping. No additional capital required.",
  securityText:
    "Built on Morpho — a lending protocol with $5B+ in deposits and 34 audits from 14 firms. We never have access to your funds. Your positions, your keys, your control.",
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
