import React, { useState, useEffect } from "react";

const slides = [
  { id: 1, image: "/images/slider1.webp", title: "Nouvelle collection été", subtitle: "Tendances 2025" },
  { id: 2, image: "/images/slider2.webp", title: "Promotions exclusives", subtitle: "Jusqu'à -50%" }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
            <p className="text-white text-lg md:text-2xl">{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSlider;
