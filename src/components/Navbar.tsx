import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-gondor flex items-center justify-between h-16">
        <nav className="hidden sm:flex items-center gap-8">
          <a href="#borrow" className="text-sm text-foreground hover:text-navy-light transition-colors">Borrow</a>
          <a href="#lend" className="text-sm text-foreground hover:text-navy-light transition-colors">Lend</a>
          <a href="#leverage" className="text-sm text-foreground hover:text-navy-light transition-colors">Leverage</a>
        </nav>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          <span className="font-display text-xl font-medium text-foreground">Gondor</span>
        </div>

        <nav className="hidden sm:flex items-center gap-8">
          <a href="#" className="text-sm text-foreground hover:text-navy-light transition-colors">Discord</a>
          <a href="#" className="text-sm text-foreground hover:text-navy-light transition-colors">Twitter</a>
          <a href="#" className="text-sm text-foreground hover:text-navy-light transition-colors">Sign in</a>
          <a href="#" className="text-sm text-foreground hover:text-navy-light transition-colors">Sign up</a>
        </nav>

        <button
          className="sm:hidden text-foreground absolute right-5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden bg-background border-t border-border px-5 py-4 flex flex-col gap-3">
          <a href="#borrow" className="text-sm text-foreground" onClick={() => setMobileOpen(false)}>Borrow</a>
          <a href="#lend" className="text-sm text-foreground" onClick={() => setMobileOpen(false)}>Lend</a>
          <a href="#leverage" className="text-sm text-foreground" onClick={() => setMobileOpen(false)}>Leverage</a>
          <hr className="border-border" />
          <a href="#" className="text-sm text-foreground">Discord</a>
          <a href="#" className="text-sm text-foreground">Twitter</a>
          <a href="#" className="text-sm text-foreground">Sign in</a>
          <a href="#" className="text-sm text-foreground">Sign up</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
