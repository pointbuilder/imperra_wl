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
    "Layer 2 на Polymarket. Бери в долг, давай в долг, торгуй с плечом — всё на базе предикшн-маркетов.",
  statementText:
    "Предикшн-маркеты — крупнейший неиспользуемый залог в крипте. Arkos даёт тебе инструменты: плечо до 10×, пассивный доход от ликвидности и шеринг позиций с друзьями.",
  borrowDesc:
    "Используй позиции на Polymarket как залог. Бери до 50% от их стоимости. Фиксированные ставки. Верни в любой момент.",
  lendDesc:
    "Поставляй USDC в курированные пулы. Зарабатывай на трейдерах предикшн-маркетов. Некоррелированная доходность.",
  leverageDesc:
    "Одним кликом — 10× плечо на любую позицию. Автоматический лупинг залога. Без дополнительного капитала.",
  securityText:
    "Построено на Morpho — лендинг-протоколе с $5B+ депозитов, прошедшем 34 аудита от 14 фирм. Мы никогда не имеем доступа к твоим средствам. Твои позиции, твои ключи, твой контроль.",
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
