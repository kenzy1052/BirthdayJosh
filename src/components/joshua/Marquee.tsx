const ITEMS = [
  "wholesome king",
  "✦",
  "garri approved",
  "✦",
  "patois certified",
  "✦",
  "old man shuffle",
  "✦",
  "it's all in your head",
  "✦",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="border-y-2 border-ink/10 bg-primary text-primary-foreground overflow-hidden py-4 -rotate-2 my-8">
      <div className="flex animate-marquee whitespace-nowrap font-display font-black text-2xl sm:text-3xl italic">
        {row.map((t, i) => (
          <span key={i} className="mx-6">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}