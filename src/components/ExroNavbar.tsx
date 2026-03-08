import { Search } from "lucide-react";
import { useState } from "react";

const ExroNavbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container-exro flex items-center h-14 gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 shrink-0 mr-4">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background text-xs font-bold">E</span>
          </div>
          <span className="text-base font-semibold text-foreground hidden sm:block">Exro</span>
        </a>

        {/* Search */}
        <div className={`relative flex-1 max-w-md transition-all ${searchFocused ? "max-w-lg" : ""}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-exro-gray-500" />
          <input
            type="text"
            placeholder="Search markets"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted text-sm text-foreground placeholder:text-exro-gray-500 outline-none focus:ring-2 focus:ring-foreground/10 transition-all"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-exro-gray-500 bg-background border border-border rounded px-1.5 py-0.5">/</kbd>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {["Markets", "Elections", "Sports", "Crypto"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-exro-gray-500 hover:text-foreground px-3 py-1.5 rounded-md hover:bg-exro-gray-50 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button className="text-sm text-exro-gray-700 hover:text-foreground px-3 py-1.5 transition-colors hidden sm:block">
            Log in
          </button>
          <button className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};

export default ExroNavbar;
