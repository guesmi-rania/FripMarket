import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="group cursor-pointer text-center">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge promo si présent */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Texte */}
      <div className="mt-4">
        <h3 className="text-[15px] font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 truncate">
          {product.category}
        </p>
        <p className="mt-2 font-semibold text-gray-900">
          {product.price}
        </p>
      </div>
    </div>
  );
}
