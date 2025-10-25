import React from "react";

export default function HeaderTop() {
  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex items-center h-16 px-4 justify-between">

        {/* Menu gauche */}
        <nav className="flex gap-6">
          <a href="#" className="hover:underline text-sm font-medium text-black">Mode femme</a>
          <a href="#" className="hover:underline text-sm font-medium text-black">Mode homme</a>
          <a href="#" className="hover:underline text-sm font-medium text-black">Mode enfant</a>
        </nav>

        {/* Logo centré */}
        <div className="flex justify-center flex-1 md:flex-none">
          <img src="/images/logo.png" alt="FripMarket" className="h-10" />
        </div>

        {/* Icônes droite */}
        <div className="flex items-center gap-3">

{/* Favoris / cœur */}
<button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
</button>

{/* Panier */}
<button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M17 13l2 9M9 21h6" />
  </svg>
</button>

{/* Menu mobile */}
<button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

</div>

      </div>
    </header>
  );
}
