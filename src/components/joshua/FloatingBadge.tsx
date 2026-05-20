import { motion } from "motion/react";

export function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      className="fixed top-16 right-4 sm:right-8 z-50 pointer-events-none"
    >
      <motion.a
        href="https://kenzyverse.com"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ 
          y: [0, -10, 0],
          rotate: [-1, 1, -1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-primary/20 hover:border-primary/50 transition shadow-lg group"
      >
        <img
          src="/logo.png"
          alt="Kenzyverse"
          className="h-4 w-auto group-hover:scale-110 transition"
        />
        <div className="flex flex-col -space-y-1">
          <span className="font-hand text-[10px] text-muted-foreground leading-none">made by</span>
          <span className="font-display font-black text-[10px] uppercase tracking-wider text-primary">Kenzyverse</span>
        </div>
      </motion.a>
    </motion.div>
  );
}
