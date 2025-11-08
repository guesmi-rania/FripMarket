import React from "react";
import { ShoppingBag, ShoppingBasket, Shirt, Gift, Watch, Star } from "lucide-react";

const categories = [
  { id: 1, name: "Chaussures", icon: <ShoppingBag size={40} /> },
  { id: 2, name: "Sacs", icon: <ShoppingBasket size={40} /> },
  { id: 3, name: "Robes", icon: <Shirt size={40} /> },
  { id: 4, name: "Vestes", icon: <Gift size={40} /> },
  { id: 5, name: "Accessoires", icon: <Watch size={40} /> },
  { id: 6, name: "Nouveautés", icon: <Star size={40} /> },
];

export default function Categories() {
  return (
    <div className="flex justify-center items-center gap-24 flex-wrap md:flex-nowrap overflow-x-auto px-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center group transition-transform duration-300"
        >
          {/* Cercle rose clair */}
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-all duration-300">
            <div className="text-pink-500">{category.icon}</div>
          </div>

          {/* Nom de la catégorie */}
          <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500 transition-colors duration-300">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
}
