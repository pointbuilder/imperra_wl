import { useState } from "react";
import { Menu, X } from "lucide-react";

const ArkNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border">
      <div className="container-ark flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--ark-green))' }}>
            <span className="text-sm font-bold" style={{ color: 'hsl(var(--background))' }}>A</span>
          </div>
          <span className="text-base font-semibold text-foreground">Arkos</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
          <a href="#roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roadmap</a>
          <a href="https://twitter.com" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#waitlist" className="ark-btn-primary text-sm">
            Join Waitlist
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-5 py-4 flex flex-col gap-3">
          <a href="#features" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Features</a>
          <a href="#how" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>How it works</a>
          <a href="#roadmap" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Roadmap</a>
          <a href="#waitlist" className="ark-btn-primary text-sm mt-2 w-fit" onClick={() => setOpen(false)}>Join Waitlist</a>
        </div>
      )}
    </header>
  );
};

export default ArkNavbar;
