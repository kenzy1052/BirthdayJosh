export function Footer() {
  return (
    <footer className="relative px-4 sm:px-8 py-12 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
        <span className="font-hand text-lg text-muted-foreground">made by</span>
        <a
          href="https://kenzyverse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img
            src="/logo.png"
            alt="Kenzyverse"
            className="h-6 w-auto"
          />
          <span className="font-display font-black text-sm uppercase tracking-wide">Kenzyverse</span>
        </a>
      </div>
    </footer>
  );
}
