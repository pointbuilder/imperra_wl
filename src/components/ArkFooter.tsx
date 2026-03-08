const ArkFooter = () => {
  return (
    <footer className="border-t border-border">
      <div className="container-ark py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--ark-green))' }}>
              <span className="text-xs font-bold" style={{ color: 'hsl(var(--background))' }}>A</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Arkos</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
          </div>

          <p className="text-xs text-muted-foreground">© 2026 Arkos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ArkFooter;
