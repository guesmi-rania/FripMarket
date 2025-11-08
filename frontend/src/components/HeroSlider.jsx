import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/slider1.webp",
    title: "Nouvelle collection hiver",
    subtitle: "Tendances 2026",
  },
  {
    id: 2,
    image: "/images/slider2.webp",
    title: "Promotions exclusives",
    subtitle: "Jusqu'à -50%",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  // Animation du texte selon la direction
  const textVariants = (direction) => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? 100 : -100,
      transition: { duration: 0.6 },
    },
  });

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Effet Ken Burns (zoom lent sur l’image) */}
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{ duration: 6, ease: "easeInOut" }}
                />

                {/* Overlay noir + texte centré animé */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                  <motion.h2
                    variants={textVariants(index % 2 === 0 ? "left" : "right")}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-white text-4xl md:text-6xl font-bold mb-4"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    variants={textVariants(index % 2 === 0 ? "left" : "right")}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: 0.2 }}
                    className="text-white text-lg md:text-2xl"
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Indicateurs de position (petits points blancs) */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white" : "bg-gray-400/70"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
