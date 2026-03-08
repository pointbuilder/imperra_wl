const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-gondor">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span className="font-display text-lg font-medium text-foreground">Gondor</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-navy-light hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="text-sm text-navy-light hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="text-sm text-navy-light hover:text-foreground transition-colors">Documentation</a>
          </div>
          <p className="text-sm text-navy-muted">© 2025 Gondor</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
