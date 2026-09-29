import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  { id: 1, image: "/images/slider1.webp", title: "Nouvelle collection hiver", subtitle: "Les tendances 2026 sont arrivées", to: "/nouveautes" },
  { id: 2, image: "/images/slider2.webp", title: "Promotions exclusives", subtitle: "Jusqu'à -50% sur les articles sélectionnés", to: "/soldes" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="mx-auto mt-4 w-full max-w-7xl px-4 lg:px-8">
      <div className="relative h-[60vh] max-h-[640px] min-h-[380px] overflow-hidden rounded-2xl bg-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex max-w-2xl flex-col justify-center px-6 text-white sm:px-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm">FripMarket</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">{slide.title}</h2>
              <p className="mt-3 text-base font-light sm:text-xl">{slide.subtitle}</p>
              <Link
                to={slide.to}
                className="mt-6 self-start rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Découvrir
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-5 flex w-full justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
