import React from "react";

const menuItems = [
  "Nouveautés",
  "Looks de fêtes",
  "Marques",
  "Vêtements",
  "Chaussures",
  "Sacs",
  "Accessoires",
  "Bijoux",
  "Maison",
  "Pre-owned",
  "Soldes",
];

export default function HeaderMenu() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white flex justify-center overflow-x-auto scrollbar-hide">
      <ul className="flex gap-6 py-3 px-4 min-w-max text-gray-900">
        {menuItems.map((item) => (
          <li
            key={item}
            className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer transition-colors whitespace-nowrap"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
