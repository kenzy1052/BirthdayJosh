import { motion } from "motion/react";

const PHOTOS = [
  { src: "/images/joshua/1.jpg", caption: "the church arc 🙏", rot: -4 },
  { src: "/images/joshua/2.jpg", caption: "the squad", rot: 3 },
  { src: "/images/joshua/3.jpg", caption: "serious mode activated", rot: -2 },
  { src: "/images/joshua/4.jpg", caption: "caught laughing 😂", rot: 5 },
  { src: "/images/joshua/5.jpg", caption: "casual king", rot: -3 },
  { src: "/images/joshua/6.jpg", caption: "natural habitat", rot: 2 },
];

export function MemoryWall() {
  return (
    <section className="relative px-4 sm:px-8 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="sticker"><span>📸</span> file 04 · archive</span>
        <h2 className="mt-5 font-display font-black text-5xl sm:text-7xl leading-[0.95]">
          Memory <em className="italic text-primary">Wall</em>
        </h2>
        <p className="mt-3 font-hand text-2xl text-muted-foreground">
          receipts. proof you've been a vibe this whole time.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
        {PHOTOS.map((p, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.rot }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
            className="bg-white p-3 pb-10 shadow-2xl relative"
            style={{ boxShadow: "0 20px 50px -10px oklch(0.6 0.28 27 / 25%)" }}
          >
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={p.src}
                alt={p.caption}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  (t.parentElement as HTMLElement).innerHTML =
                    `<div class="h-full w-full flex items-center justify-center text-black/40 text-xs font-mono-hack">photo ${i + 1}</div>`;
                }}
              />
            </div>
            <figcaption
              className="absolute bottom-2 left-0 right-0 text-center text-black/80 text-sm"
              style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
            >
              {p.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}