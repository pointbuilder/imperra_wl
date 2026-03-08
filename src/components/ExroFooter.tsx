const ExroFooter = () => {
  return (
    <footer className="border-t border-border mt-12">
      <div className="container-exro py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Markets</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">All Markets</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Politics</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Sports</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Crypto</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">How it works</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Blog</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">API Docs</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Careers</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Social</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Discord</a>
              <a href="#" className="text-sm text-exro-gray-500 hover:text-foreground transition-colors">Telegram</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-background text-[10px] font-bold">E</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Exro</span>
          </div>
          <p className="text-xs text-exro-gray-500">© 2026 Exro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ExroFooter;
