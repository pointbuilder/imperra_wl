import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredMarkets = [
  {
    id: 1,
    category: "Politics",
    question: "Will the US pass a crypto regulation bill by 2026?",
    yesPercent: 72,
    noPercent: 28,
    volume: "$4.2M",
    imageEmoji: "🏛️",
  },
  {
    id: 2,
    category: "Sports • NBA",
    question: "Will the Celtics win the 2026 NBA Championship?",
    yesPercent: 34,
    noPercent: 66,
    volume: "$1.8M",
    imageEmoji: "🏀",
  },
  {
    id: 3,
    category: "Crypto",
    question: "Will Bitcoin hit $200K by end of 2026?",
    yesPercent: 41,
    noPercent: 59,
    volume: "$12.5M",
    imageEmoji: "₿",
  },
];

const FeaturedCarousel = () => {
  const [current, setCurrent] = useState(0);
  const market = featuredMarkets[current];

  return (
    <section className="container-exro py-6">
      <div className="bg-exro-gray-50 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Left: content */}
          <div className="flex-1">
            <span className="text-xs font-medium text-exro-gray-500 uppercase tracking-wide">
              {market.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mt-2 mb-4 leading-tight">
              {market.question}
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-exro-green">{market.yesPercent}%</span>
                <span className="text-xs text-exro-gray-500">Yes</span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-exro-red">{market.noPercent}%</span>
                <span className="text-xs text-exro-gray-500">No</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2.5 rounded-lg bg-exro-green text-sm font-medium text-background hover:opacity-90 transition-opacity">
                Buy Yes
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-exro-red text-sm font-medium text-background hover:opacity-90 transition-opacity">
                Buy No
              </button>
              <span className="text-xs text-exro-gray-500 ml-2">{market.volume} Vol.</span>
            </div>
          </div>

          {/* Right: emoji visual */}
          <div className="hidden sm:flex items-center justify-center w-32 h-32 text-7xl rounded-2xl bg-background border border-border">
            {market.imageEmoji}
          </div>
        </div>

        {/* Navigation dots & arrows */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-1.5">
            {featuredMarkets.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-foreground" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrent((current - 1 + featuredMarkets.length) % featuredMarkets.length)}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrent((current + 1) % featuredMarkets.length)}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
