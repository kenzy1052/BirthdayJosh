import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ROASTS = [
  "Joshua dances like buffering internet. 📶",
  "Bro rejects bad jokes like a youth pastor. 🙅🏾",
  "This man can turn motivation into a sermon. 📖",
  "Garri should sponsor him at this point. 🥣",
  "The old man shuffle needs to be studied scientifically. 🔬",
  "His facial expressions deserve their own documentary. 🎬",
  "Somehow always serious and unserious at the same time. 🌀",
];

const TINTS = ["bg-sun", "bg-mint", "bg-pink", "bg-sky", "bg-sun", "bg-mint", "bg-pink"];

export function RoastMode() {
  const [revealed, setRevealed] = useState<string[]>([]);
  const next = () => {
    if (revealed.length >= ROASTS.length) return;
    setRevealed((r) => [ROASTS[r.length], ...r]);
  };
  const done = revealed.length >= ROASTS.length;

  return (
    <section className="relative px-4 sm:px-8 py-24 max-w-3xl mx-auto text-center">
      <span className="sticker"><span>🌶️</span> file 02 · roast mode</span>
      <h2 className="mt-5 font-display text-5xl sm:text-6xl font-black leading-[0.95]">
        Tap the button.<br />
        <em className="text-primary glow-red-text not-italic">Get roasted.</em>
      </h2>
      <p className="mt-3 font-hand text-2xl text-muted-foreground">
        (lovingly, of course)
      </p>

      <motion.button
        whileTap={{ scale: 0.9, y: 4 }}
        whileHover={{ scale: 1.06, rotate: -2 }}
        onClick={next}
        disabled={done}
        className="animate-pulse-red glow-red mt-10 mx-auto h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-primary text-primary-foreground font-display font-black uppercase text-base disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {done ? "Mercy 🙏" : revealed.length === 0 ? "Roast him" : "Again!"}
      </motion.button>

      <div className="mt-12 space-y-4 text-left">
        <AnimatePresence>
          {revealed.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              className="card-soft rounded-2xl p-5 flex items-start gap-4 relative"
            >
              <span className={`shrink-0 h-10 w-10 rounded-full ${TINTS[i]} flex items-center justify-center font-display font-black text-lg`}>
                {i + 1}
              </span>
              <span className="font-display text-xl sm:text-2xl leading-snug">“{r}”</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}