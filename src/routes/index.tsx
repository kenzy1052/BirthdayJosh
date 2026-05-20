import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PressButton } from "@/components/joshua/PressButton";
import { ScanScene } from "@/components/joshua/ScanScene";
import { ProfileCards } from "@/components/joshua/ProfileCards";
import { RoastMode } from "@/components/joshua/RoastMode";
import { Magazine } from "@/components/joshua/Magazine";
import { MemoryWall } from "@/components/joshua/MemoryWall";
import { Ending } from "@/components/joshua/Ending";
import { Marquee } from "@/components/joshua/Marquee";
import { MusicToggle, type MusicHandle } from "@/components/joshua/MusicToggle";
import { Footer } from "@/components/joshua/Footer";
import { FloatingBadge } from "@/components/joshua/FloatingBadge";

export const Route = createFileRoute("/")({
  component: Index,
});

/**
 * Flow: intro → press 1 → roast/dare popup → press 2 → roast/dare popup
 *       → press 3 → scanning → full revealed experience.
 */
type Stage = "intro" | "popup" | "scanning" | "revealed";

const PROMPTS = [
  {
    btn: "DO NOT PRESS",
    hint: "Seriously Joshua… don't do it.",
  },
  {
    btn: "I dare you",
    hint: "okay, you actually pressed it. brave.",
  },
  {
    btn: "One more time…",
    hint: "third time's a charm — or chaos.",
  },
];

const POPUPS = [
  {
    title: "You really pressed it?",
    line: "Bro acts wholesome but his curiosity = unmatched.",
    dare: "Press it again. I dare you. 😏",
    emoji: "👀",
  },
  {
    title: "Two for two.",
    line: "Joshua, this is exactly how the “old man shuffle” started.",
    dare: "One more press unlocks the truth. Do it.",
    emoji: "🕺",
  },
];

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  const [presses, setPresses] = useState(0); // 0..3
  const musicRef = useRef<MusicHandle>(null);

  const handlePress = () => {
    const next = presses + 1;
    setPresses(next);
    if (next < 3) {
      setStage("popup");
    } else {
      setStage("scanning");
    }
  };

  const handlePopupDismiss = () => {
    const next = presses + 1;
    if (next < 3) {
      setStage("popup");
      setPresses(next);
    } else {
      setStage("scanning");
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <MusicToggle ref={musicRef} />
      <FloatingBadge />

      {/* Header — small, no SSR-unstable values */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3 card-soft border-0 border-b border-border/40 font-mono-hack text-[10px] uppercase tracking-widest rounded-none">
        <span className="text-primary">● joshua.sys</span>
        <span className="text-muted-foreground hidden sm:inline">a top-secret birthday experience</span>
        <span className="text-ink/60">v3.0</span>
      </div>

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16"
          >
            {/* Floating playful stickers */}
            <span className="absolute top-24 left-6 text-3xl animate-float" style={{ ["--r" as never]: "-12deg" }}>🎈</span>
            <span className="absolute top-32 right-8 text-4xl animate-float" style={{ ["--r" as never]: "10deg", animationDelay: "0.6s" }}>🎉</span>
            <span className="absolute bottom-32 left-10 text-3xl animate-float" style={{ ["--r" as never]: "8deg", animationDelay: "1.2s" }}>🥣</span>
            <span className="absolute bottom-24 right-6 text-3xl animate-float" style={{ ["--r" as never]: "-6deg", animationDelay: "0.3s" }}>✨</span>

            <div className="text-center mb-10 relative">
              <span className="sticker animate-wiggle"><span>⚠️</span> restricted · clearance JSH</span>
              <h1 className="mt-6 font-display font-black text-[3.2rem] sm:text-8xl leading-[0.9]">
                <span className="block text-primary glow-red-text">Do not</span>
                <span className="block italic">press the button</span>
              </h1>
              <p className="mt-5 font-hand text-2xl sm:text-3xl text-muted-foreground max-w-md mx-auto">
                {PROMPTS[Math.min(presses, 2)].hint}
              </p>
            </div>

            <PressButton label={PROMPTS[Math.min(presses, 2)].btn} onPress={handlePress} />

            <div className="mt-10 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i < presses ? "bg-primary" : "bg-ink/15"
                  }`}
                />
              ))}
              <span className="ml-2 font-mono-hack text-[10px] text-muted-foreground">
                {presses}/3 to unlock
              </span>
            </div>
          </motion.section>
        )}

        {stage === "popup" && (
          <motion.section
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex items-center justify-center px-4 pt-16"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 14 }}
              className="card-soft rounded-3xl p-8 sm:p-10 max-w-md w-full text-center relative"
            >
              <span className="absolute -top-5 -left-5 text-5xl animate-wiggle">
                {POPUPS[presses - 1].emoji}
              </span>
              <span className="absolute -top-4 -right-4 sticker bg-primary text-primary-foreground border-primary">
                roast {presses}/2
              </span>

              <h2 className="font-display font-black text-4xl sm:text-5xl leading-tight">
                {POPUPS[presses - 1].title}
              </h2>
              <p className="mt-4 font-display text-xl text-muted-foreground">
                {POPUPS[presses - 1].line}
              </p>
              <p className="mt-6 font-hand text-2xl text-primary">
                {POPUPS[presses - 1].dare}
              </p>

              <motion.button
                onClick={handlePopupDismiss}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 glow-red bg-primary text-primary-foreground font-display font-black uppercase px-8 py-4 rounded-full"
              >
                {presses === 1 ? "I dare you" : "One more time"} →
              </motion.button>

              <div className="mt-5 font-mono-hack text-[10px] text-muted-foreground">
                step {presses} of 3
              </div>
            </motion.div>
          </motion.section>
        )}

        {stage === "scanning" && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-16"
          >
            <ScanScene onDone={() => setStage("revealed")} />
          </motion.div>
        )}

        {stage === "revealed" && (
          <motion.div
            key="rev"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 pt-20"
          >
            {/* Hero of revealed experience */}
            <section className="relative text-center px-4 pt-10 pb-16 max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90 }}
                className="inline-block"
              >
                <span className="sticker bg-primary text-primary-foreground border-primary">
                  ★ access granted
                </span>
              </motion.div>
              <h1 className="mt-6 font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.9]">
                The <em className="italic text-primary glow-red-text">Joshua</em><br />
                Experience
              </h1>
              <p className="mt-5 font-hand text-2xl text-muted-foreground max-w-lg mx-auto">
                scroll slowly. it gets better.
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-10 text-3xl"
              >
                ↓
              </motion.div>
            </section>

            <ProfileCards />
            <Marquee />
            <RoastMode />
            <Magazine />
            <Marquee />
            <MemoryWall />
            <Ending onMusicFade={() => musicRef.current?.fadeOut()} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* hidden easter egg */}
      <button
        onClick={() => alert("🥣 You found the garri. +10 wisdom.")}
        className="fixed bottom-5 left-5 text-xs opacity-20 hover:opacity-100 transition font-mono-hack z-50"
        aria-label="easter egg"
      >
        ·
      </button>
    </main>
  );
}
