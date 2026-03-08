const milestones = [
  { quarter: "Q1 2026", title: "Private Alpha", items: ["Core lending contracts", "Polymarket integration", "Invite-only testing"], done: true },
  { quarter: "Q2 2026", title: "Public Beta", items: ["Open access", "Leverage engine", "Risk dashboard"], done: false },
  { quarter: "Q3 2026", title: "V1 Launch", items: ["Multi-market support", "Institutional pools", "API access"], done: false },
  { quarter: "Q4 2026", title: "Expansion", items: ["Cross-platform collateral", "Governance framework", "Mobile app"], done: false },
];

const ArkRoadmap = () => {
  return (
    <section id="roadmap" className="py-20 sm:py-28">
      <div className="container-ark">
        <div className="text-center mb-16">
          <p className="ark-section-label">Roadmap</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Where we're <span className="text-muted-foreground">headed</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div key={m.quarter} className="ark-card p-6 relative overflow-hidden">
              {m.done && (
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'hsl(var(--ark-green))' }} />
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold" style={{ color: m.done ? 'hsl(var(--ark-green))' : 'hsl(var(--ark-text-secondary))' }}>
                  {m.quarter}
                </span>
                {m.done && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: 'hsl(var(--ark-green) / 0.1)', color: 'hsl(var(--ark-green))' }}>
                    Active
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3">{m.title}</h3>
              <ul className="space-y-2">
                {m.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: m.done ? 'hsl(var(--ark-green))' : 'hsl(var(--border))' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArkRoadmap;
