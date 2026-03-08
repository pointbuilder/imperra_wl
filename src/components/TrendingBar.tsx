const trendingTopics = [
  { name: "Crypto", volume: "$24M today", emoji: "₿", hot: true },
  { name: "NBA", volume: "$8.2M today", emoji: "🏀", hot: true },
  { name: "US Politics", volume: "$15M today", emoji: "🏛️", hot: false },
  { name: "AI", volume: "$6.1M today", emoji: "🤖", hot: true },
  { name: "Oil", volume: "$3.4M today", emoji: "🛢️", hot: false },
];

const TrendingBar = () => {
  return (
    <section className="container-exro py-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
        <span className="text-sm font-medium text-foreground shrink-0">Trending</span>
        <div className="w-px h-4 bg-border shrink-0" />
        {trendingTopics.map((topic, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-exro-gray-50 hover:bg-exro-gray-100 transition-colors shrink-0"
          >
            <span className="text-sm">{topic.emoji}</span>
            <span className="text-sm text-foreground font-medium">{topic.name}</span>
            <span className="text-xs text-exro-gray-500">{topic.volume}</span>
            {topic.hot && <span className="text-xs">🔥</span>}
          </a>
        ))}
      </div>
    </section>
  );
};

export default TrendingBar;
