import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const ArkWaitlist = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="waitlist" className="py-20 sm:py-28">
      <div className="container-ark">
        <div className="ark-card p-8 sm:p-14 text-center relative overflow-hidden ark-glow">
          {/* Background glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-30 blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, hsl(var(--ark-green) / 0.2), transparent 70%)' }}
          />

          <div className="relative z-10">
            <p className="ark-section-label">Early Access</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get early access to Arkos
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
              Be among the first to unlock capital efficiency on Polymarket. Join 2,000+ traders on the waitlist.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--ark-green) / 0.15)' }}>
                  <Check className="w-4 h-4" style={{ color: 'hsl(var(--ark-green))' }} />
                </div>
                <span className="text-foreground font-medium">You're on the list. We'll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 h-12 px-4 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[hsl(var(--ark-green)_/_0.5)] transition-colors"
                />
                <button type="submit" className="ark-btn-primary h-12 px-6 shrink-0">
                  Join
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArkWaitlist;
