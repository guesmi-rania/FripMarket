import React, { useEffect, useState } from "react";
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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* === HEADER === */}
      <HeaderTop />
      <HeaderMenu />

      {/* === SLIDER === */}
      <HeroSlider />

      {/* === SECTION PROMO === */}
      <section className="bg-gray-50 text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Pre-owned : <span className="text-red-600">-15%</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Sélection d'articles d'occasion de grandes maisons — sélection vérifiée.
        </p>
        <button className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all">
          Explorez la sélection
        </button>
      </section>

      {/* === CATÉGORIES === */}
      <Categories />

      {/* === PRODUITS === */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center mb-10">
            Sélection Pre-Owned
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <Footer />
    </div>
  );
}
