import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  "✨ Booting up the Joshua-meter...",
  "🔍 Scanning legendary human data...",
  "📚 Detecting excessive wisdom...",
  "⛪ Too much church energy detected!",
  "🥣 Garri reserves: CRITICAL",
  "🗣️ Subject may say: “It's all in your head.”",
  "💯 Threat level: TOO WHOLESOME",
  "🎉 ACCESS GRANTED — opening the files!",
];

export function ScanScene({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= LINES.length) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 380);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="card-soft rounded-3xl p-7 sm:p-10 max-w-xl w-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono-hack text-[11px] uppercase tracking-widest text-muted-foreground">
            joshua.sys · loading legend
          </span>
        </div>
        <div className="space-y-3 min-h-[18rem]">
          <AnimatePresence>
            {LINES.slice(0, i).map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-lg sm:text-xl"
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden mt-6">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${(i / LINES.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}