import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export function Ending({ onMusicFade }: { onMusicFade: () => void }) {
  const fired = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            onMusicFade();
            const burst = () => {
              confetti({
                particleCount: 120,
                spread: 90,
                origin: { y: 0.6 },
                colors: ["#e11d48", "#facc15", "#ffffff", "#f59e0b"],
              });
            };
            burst();
            setTimeout(burst, 600);
            setTimeout(burst, 1400);
          }
        });
      },
      { threshold: 0.4 }
    );
    const el = document.getElementById("finale");
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [onMusicFade]);

  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden"
    >
      {/* Soft floating lights */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-sun/60 blur-sm animate-float pointer-events-none"
          style={{
            width: `${4 + (i % 4) * 3}px`,
            height: `${4 + (i % 4) * 3}px`,
            left: `${(i * 47) % 100}%`,
            top: `${(i * 31) % 100}%`,
            animationDelay: `${i * 0.3}s`,
            ["--r" as never]: "0deg",
          }}
        />
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="font-display italic text-2xl sm:text-4xl max-w-3xl leading-snug"
      >
        Behind all the jokes… you're genuinely one of the realest people ever.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 1 }}
        className="mt-10 text-muted-foreground max-w-2xl text-lg"
      >
        Thank you for the laughs, the wisdom, the memories, and the presence you bring.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 2 }}
        className="mt-16 font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-ink"
      >
        HAPPY BIRTHDAY
        <br />
        <span className="text-primary glow-red-text">JOSHUA 🎉</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 3.5 }}
        className="mt-12 font-hand text-2xl text-muted-foreground"
      >
        Enjoy am! 🎉
      </motion.p>
    </section>
  );
}