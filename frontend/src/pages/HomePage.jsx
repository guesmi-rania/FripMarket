import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import HeaderTop from "../components/HeaderTop";
import HeaderMenu from "../components/HeaderMenu";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

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
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <HeaderTop />
      <HeaderMenu />
      <HeroSlider />
    

     
      {/* === SECTION PROMO === */}
      <section className="bg-gray-50 text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
        >
          Pre-owned : <span className="text-red-800">-15%</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 text-gray-800 text-xl md:text-2xl font-medium"
        >
          Sélection d'articles d'occasion de grandes maisons — sélection vérifiée.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 bg-black text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-all"
        >
          Explorez la sélection
        </motion.button>
      </section>

      {/* === PRODUITS === */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-gray-900"
          >
            Sélection Pre-Owned
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-14">
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

      <Footer />
    </div>
  );
}
