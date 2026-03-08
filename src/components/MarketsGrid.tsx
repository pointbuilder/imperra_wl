import { useState } from "react";

const categories = [
  "All", "Trending", "Politics", "Sports", "Crypto", "Finance",
  "Tech", "Culture", "Climate", "Geopolitics",
];

const allMarkets = [
  { id: 1, category: "Politics", question: "Will Trump run for president in 2028?", yes: 18, volume: "$890K", emoji: "🇺🇸", hot: false },
  { id: 2, category: "Crypto", question: "Ethereum above $10K by Dec 2026?", yes: 29, volume: "$3.1M", emoji: "⟠", hot: true },
  { id: 3, category: "Sports", question: "Will Messi retire in 2026?", yes: 55, volume: "$420K", emoji: "⚽", hot: false },
  { id: 4, category: "Finance", question: "US recession in 2026?", yes: 32, volume: "$7.8M", emoji: "📉", hot: true },
  { id: 5, category: "Tech", question: "Will Apple release AR glasses in 2026?", yes: 63, volume: "$1.2M", emoji: "🕶️", hot: false },
  { id: 6, category: "Crypto", question: "Solana flips Ethereum by market cap?", yes: 8, volume: "$2.4M", emoji: "◎", hot: false },
  { id: 7, category: "Politics", question: "Will Ukraine join NATO by 2027?", yes: 12, volume: "$560K", emoji: "🇺🇦", hot: false },
  { id: 8, category: "Climate", question: "2026 hottest year on record?", yes: 78, volume: "$340K", emoji: "🌡️", hot: true },
  { id: 9, category: "Sports", question: "Lakers win 2026 NBA Finals?", yes: 14, volume: "$950K", emoji: "🏀", hot: false },
  { id: 10, category: "Tech", question: "GPT-5 released before July 2026?", yes: 67, volume: "$5.6M", emoji: "🤖", hot: true },
  { id: 11, category: "Culture", question: "Will a Marvel movie gross $2B in 2026?", yes: 22, volume: "$180K", emoji: "🎬", hot: false },
  { id: 12, category: "Finance", question: "Fed cuts rates below 3% in 2026?", yes: 41, volume: "$4.3M", emoji: "🏦", hot: false },
];

const MarketCard = ({ market }: { market: typeof allMarkets[0] }) => {
  const no = 100 - market.yes;
  return (
    <div className="bg-background border border-border rounded-xl p-4 hover:shadow-sm transition-shadow group">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-exro-gray-100 flex items-center justify-center text-lg shrink-0">
          {market.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:underline">
            {market.question}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-exro-gray-500">{market.volume} Vol.</span>
            {market.hot && <span className="text-xs">🔥</span>}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-exro-gray-100 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-exro-green transition-all"
          style={{ width: `${market.yes}%` }}
        />
      </div>

      {/* Yes / No buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-between px-3 py-2 rounded-lg bg-exro-green-light text-exro-green text-sm font-medium hover:opacity-80 transition-opacity">
          <span>Yes</span>
          <span>{market.yes}¢</span>
        </button>
        <button className="flex items-center justify-between px-3 py-2 rounded-lg bg-exro-red-light text-exro-red text-sm font-medium hover:opacity-80 transition-opacity">
          <span>No</span>
          <span>{no}¢</span>
        </button>
      </div>
    </div>
  );
};

const MarketsGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allMarkets
    : activeCategory === "Trending"
    ? allMarkets.filter((m) => m.hot)
    : allMarkets.filter((m) => m.category === activeCategory);

  return (
    <section className="container-exro py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">All markets</h2>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-foreground text-background font-medium"
                : "bg-exro-gray-100 text-exro-gray-700 hover:bg-exro-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-exro-gray-500 text-sm">
          No markets in this category yet.
        </div>
      )}
    </section>
  );
};

export default MarketsGrid;
