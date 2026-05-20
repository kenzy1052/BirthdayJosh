import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export interface MusicHandle {
  fadeOut: () => void;
}

export const MusicToggle = forwardRef<MusicHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const a = new Audio("/music.mp3");
    a.loop = true;
    a.volume = 0;
    audioRef.current = a;

    // Auto-play on load
    setTimeout(() => {
      a.volume = 0;
      a.play().catch(() => {});
      const target = 0.35;
      const steps = 20;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        a.volume = Math.min(target, (target * i) / steps);
        if (i >= steps) clearInterval(iv);
      }, 80);
    }, 500);

    return () => {
      a.pause();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    fadeOut: () => {
      const a = audioRef.current;
      if (!a) return;
      const start = a.volume;
      const steps = 30;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        a.volume = Math.max(0, start * (1 - i / steps));
        if (i >= steps) {
          clearInterval(iv);
          a.pause();
          setOn(false);
        }
      }, 120);
    },
  }));

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.volume = 0;
      a.play().catch(() => {});
      const target = 0.35;
      const steps = 20;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        a.volume = Math.min(target, (target * i) / steps);
        if (i >= steps) clearInterval(iv);
      }, 80);
      setOn(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 glass rounded-full px-4 py-2.5 text-xs font-mono-hack flex items-center gap-2 hover:border-primary/60 transition"
      aria-label="Toggle background music"
    >
      <span
        className={`h-2 w-2 rounded-full ${on ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
      />
      {on ? "music on" : "music off"}
    </button>
  );
});

MusicToggle.displayName = "MusicToggle";
