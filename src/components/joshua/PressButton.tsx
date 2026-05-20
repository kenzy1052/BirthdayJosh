import { motion } from "motion/react";

interface Props {
  label: string;
  onPress: () => void;
  size?: "lg" | "md";
}

export function PressButton({ label, onPress, size = "lg" }: Props) {
  const dims =
    size === "lg"
      ? "h-56 w-56 sm:h-72 sm:w-72 text-2xl sm:text-3xl"
      : "h-40 w-40 text-xl";
  return (
    <motion.button
      onClick={onPress}
      whileTap={{ scale: 0.9, y: 6 }}
      whileHover={{ scale: 1.05, rotate: -1 }}
      className={`animate-pulse-red glow-red relative ${dims} rounded-full bg-primary text-primary-foreground font-display font-black uppercase tracking-tight select-none cursor-pointer`}
    >
      <span className="absolute inset-2 rounded-full border-2 border-white/40" />
      <span className="relative block leading-tight px-3">{label}</span>
    </motion.button>
  );
}