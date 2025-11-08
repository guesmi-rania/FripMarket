import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

export default function HeaderTop() {
  return (
    <header className="w-full flex justify-center bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] w-full flex items-center justify-between px-4 py-3">

        {/* Menu gauche */}
        <nav className="flex space-x-4 text-sm font-medium text-black">
          <a href="#" className="hover:underline">Mode femme</a>
          <a href="#" className="hover:underline">Mode homme</a>
          <a href="#" className="hover:underline">Mode enfant</a>
        </nav>

        {/* Logo centré */}
        <img src="/images/logo.png" alt="FripMarket" className="h-10 object-contain" />

        {/* Barre de recherche + icônes droite */}
        <div className="flex items-center gap-10">
          {/* Barre de recherche avec icône à gauche */}
          <div className="relative mr-12">
          <AiOutlineSearch
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 text-gray-700"
              size={23}
            />
            <input
              type="text"
              placeholder="Rechercher un article"
              className="border border-gray-300 rounded-full pl-16 pr-4 py-2 text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-300 outline-none w-48"
            />
          </div>

          {/* Icônes droite */}
          <AiOutlineHeart className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition-transform" />
          <AiOutlineShoppingCart className="text-green-600 text-2xl cursor-pointer hover:scale-110 transition-transform" />
          <AiOutlineMenu className="text-black text-2xl md:hidden cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </header>
  );
}
