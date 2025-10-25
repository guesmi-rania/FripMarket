import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="group text-center cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-lg font-medium">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.brand}</p>
      <p className="mt-1 font-semibold text-gray-800">{product.price} €</p>
      <p className="text-sm text-red-600 font-medium">-15% offerts</p>
    </div>
  );
}
