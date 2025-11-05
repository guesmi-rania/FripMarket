import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";

export default function HeaderTop() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center h-16 px-4 justify-between">

        {/* Menu gauche */}
        <nav className="flex space-x-4 sm:space-x-6 md:space-x-10">
  <a href="#" className="px-2 sm:px-4 hover:underline text-sm font-medium text-black">
    Mode&nbsp;femme&nbsp;
  </a>&nbsp;
  <a href="#" className="px-2 sm:px-4 hover:underline text-sm font-medium text-black">
    Mode&nbsp;homme&nbsp;
  </a>
  &nbsp; <a href="#" className="px-2 sm:px-4 hover:underline text-sm font-medium text-black">
    Mode&nbsp;enfant
  </a>
</nav>



        {/* Logo centré */}
        <div className="flex justify-center flex-1 md:flex-none">
          <img src="/images/logo.png" alt="FripMarket" className="h-10 object-contain" />
        </div>

        {/* Icônes droite */}
        <div className="flex items-center gap-3">

          {/* Favoris */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <AiOutlineHeart className="text-red-500 text-[20px] sm:text-[24px] md:text-[28px]" />
          </button>

          {/* Panier */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <AiOutlineShoppingCart className="text-green-600 text-[20px] sm:text-[24px] md:text-[28px]" />
          </button>

          {/* Menu mobile */}
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
            <AiOutlineMenu className="text-black text-[22px] sm:text-[26px]" />
          </button>

        </div>
      </div>
    </header>
  );
}
