import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // animation fade-up
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
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

  // Animation fade-up
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* === HEADER === */}
      <HeaderTop />
      <HeaderMenu />

      {/* === SLIDER === */}
      <HeroSlider />

      {/* === SECTION PROMO === */}
      <section className="bg-gray-50 text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Pre-owned : <span className="text-red-600">-15%</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 text-gray-600 text-lg"
        >
          Sélection d'articles d'occasion de grandes maisons — sélection vérifiée.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all"
        >
          Explorez la sélection
        </motion.button>
      </section>

      {/* === CATÉGORIES === */}
      <Categories />

      {/* === PRODUITS === */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-light text-center mb-14 tracking-tight"
          >
            Sélection Pre-Owned
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
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
      <Footer />
    </div>
  );
}
