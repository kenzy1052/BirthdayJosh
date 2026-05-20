import { motion } from "motion/react";

const HEADLINES = [
  "The man. The myth. The garri.",
  "Local legend spotted.",
  "“It's all in your head,” he insists.",
  "Experts confirm: too wholesome.",
];

export function Magazine() {
  return (
    <section className="relative px-4 sm:px-8 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="sticker"><span>📰</span> file 03 · joshua quarterly</span>
        <h2 className="mt-5 font-display font-black text-5xl sm:text-7xl leading-[0.95]">
          The <em className="italic text-primary">Magazine</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 relative aspect-[4/5] rounded-3xl overflow-hidden card-soft p-0"
        >
          <img
            src="/images/joshua/1.jpg"
            alt="Joshua, cover story"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
              (t.parentElement as HTMLElement).style.background =
                "linear-gradient(135deg, oklch(0.86 0.17 88), oklch(0.85 0.1 10))";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 p-6 sm:p-10 text-[oklch(0.99_0.01_80)]">
            <span className="sticker"><span>★</span> cover story</span>
            <h3 className="mt-4 font-display text-4xl sm:text-6xl font-black leading-[0.95]">
              {HEADLINES[0]}
            </h3>
            <p className="mt-4 max-w-md font-hand text-2xl">
              an unauthorized profile of the calmest chaos agent ever
            </p>
          </div>
          <span className="absolute top-4 right-4 sticker bg-primary text-primary-foreground border-primary">
            exclusive
          </span>
        </motion.div>

        <div className="md:col-span-5 space-y-5">
          {HEADLINES.slice(1).map((h, i) => (
            <motion.article
              key={h}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card-soft rounded-2xl p-5 flex gap-4 items-center"
            >
              <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0 bg-secondary">
                <img
                  src={`/images/joshua/${i + 2}.jpg`}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              </div>
              <div>
                <div className="font-mono-hack text-[10px] text-primary uppercase tracking-widest">
                  page {String(i + 12).padStart(2, "0")}
                </div>
                <h4 className="font-display text-xl font-bold leading-tight mt-1">{h}</h4>
              </div>
            </motion.article>
          ))}

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="card-soft rounded-2xl p-5 bg-sun"
          >
            <p className="font-display italic text-2xl text-ink">
              “He showed up, ate garri, dropped wisdom, left. Iconic.”
            </p>
            <footer className="font-hand text-xl text-ink/70 mt-2">— anonymous witness</footer>
          </motion.blockquote>
        </div>
      </div>

      <span className="absolute top-10 right-8 text-4xl animate-float" style={{ ["--r" as never]: "12deg" }}>⭐</span>
      <span className="absolute bottom-20 left-6 text-3xl animate-float" style={{ ["--r" as never]: "-18deg" }}>🔥</span>
      <span className="absolute top-1/2 right-2 text-2xl animate-float" style={{ ["--r" as never]: "8deg" }}>🥣</span>
    </section>
  );
}