// src/components/Categories.jsx
import React from "react";

const categories = [
  { id: 1, name: "Robes", image: "/images/cat1.jpg" },
  { id: 2, name: "Sacs", image: "/images/cat2.jpg" },
  { id: 3, name: "Chaussures", image: "/images/cat3.jpg" },
  { id: 4, name: "Vêtements", image: "/images/cat4.jpg" },
];

export default function Categories() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <h3 className="text-3xl font-light mb-6 text-center">Catégories Populaires</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <img src={cat.image} alt={cat.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xl font-semibold">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
