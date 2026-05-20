import { motion } from "motion/react";

const CARDS = [
  { k: "Favorite Catchphrase", v: "“It's all in your head.”", icon: "🧠", tint: "bg-sun" },
  { k: "Favorite Language", v: "Patois", icon: "🗣️", tint: "bg-mint" },
  { k: "Dance Move", v: "The old man shuffle", icon: "🕺", tint: "bg-pink" },
  { k: "Safe Place", v: "House of God", icon: "⛪", tint: "bg-sky" },
  { k: "Reacts to bad jokes by", v: "Calling you crazy & shaking his head", icon: "🙅🏾", tint: "bg-sun" },
  { k: "Favorite Food", v: "Garri 😂", icon: "🥣", tint: "bg-mint" },
  { k: "Personality Type", v: "Calm chaos", icon: "🌀", tint: "bg-pink" },
  { k: "Special Ability", v: "Turns any chat into a sermon", icon: "📖", tint: "bg-sky" },
  { k: "Threat Level", v: "Too wholesome", icon: "⚠️", tint: "bg-primary", danger: true },
];

export function ProfileCards() {
  return (
    <section className="relative px-4 sm:px-8 py-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="sticker"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> top-secret · file 01</span>
        <h2 className="mt-5 font-display font-black text-5xl sm:text-7xl leading-[0.95]">
          The Joshua <span className="text-primary glow-red-text italic">Files</span>
        </h2>
        <p className="mt-4 font-hand text-2xl text-muted-foreground">
          everything we know (so far) ✨
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 80 }}
            whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
            className="card-soft rounded-3xl p-6 relative overflow-hidden"
          >
            <div className={`absolute -top-6 -right-6 h-24 w-24 rounded-full ${c.tint} opacity-70 blur-md`} />
            <div className="relative">
              <div className="text-4xl mb-3">{c.icon}</div>
              <div className="text-[10px] font-mono-hack uppercase tracking-widest text-muted-foreground">
                {c.k}
              </div>
              <div className={`mt-2 font-display text-2xl leading-tight ${c.danger ? "text-primary" : "text-ink"}`}>
                {c.v}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}