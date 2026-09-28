import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products.json")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <h3 className="text-3xl font-light mb-8 text-center">Nos Produits</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(prod => (
          <div key={prod.id} className="group border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-500">
            <img src={prod.image} alt={prod.name} className="w-full h-72 object-cover mb-4 rounded-md transition-transform duration-500 group-hover:scale-105" />
            <h4 className="font-light text-lg">{prod.name}</h4>
            <p className="text-gray-700 mt-2 mb-4">{prod.price} €</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
