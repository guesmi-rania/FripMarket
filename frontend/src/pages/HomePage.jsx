import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import HeaderTop from "../components/HeaderTop";
import HeaderMenu from "../components/HeaderMenu";
import Footer from "../components/Footer";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex flex-col items-center bg-white text-gray-900 font-sans">
      {/* === HEADER === */}
      <div className="w-full flex justify-center bg-white sticky top-0 z-50">
        <div className="w-full max-w-[1200px]">
          <HeaderTop />
          <HeaderMenu />
        </div>
      </div>

      {/* === SLIDER === */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px]">
          <HeroSlider />
        </div>
      </div>

      {/* === SECTION PROMO === */}
      <section className="w-full flex justify-center bg-gray-50 py-20 px-6 text-center">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            Pre-owned : <span className="text-red-700">-15%</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 text-gray-700 text-lg md:text-2xl font-medium leading-relaxed"
          >
            Sélection d’articles d’occasion de grandes maisons, vérifiés par nos
            experts. Des pièces uniques pour affirmer votre style.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="mt-10 bg-black text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-all"
          >
            Explorer la sélection
          </motion.button>
        </div>
      </section>

      {/* === PRODUITS === */}
      <section className="w-full flex justify-center bg-white py-24">
        <div className="max-w-[1200px] w-full px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-16 tracking-tight text-gray-900"
          >
            Sélection Pre-Owned
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-14 justify-items-center">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <div className="w-full flex justify-center bg-gray-50">
        <div className="max-w-[1200px] w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
