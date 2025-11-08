import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/slider1.webp",
    title: "Nouvelle collection hiver",
    subtitle: "Les tendances 2026 sont arrivées",
  },
  {
    id: 2,
    image: "/images/slider2.webp",
    title: "Promotions exclusives",
    subtitle: "Jusqu’à -50% sur les articles sélectionnés",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] flex justify-center">
      <div className="max-w-[1200px] w-full relative overflow-hidden rounded-xl shadow-md">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === current && (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.08 }}
                    transition={{ duration: 6 }}
                  />

                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-lg md:text-2xl font-light">{slide.subtitle}</p>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Indicateurs */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-gray-400/70"} transition-all`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
