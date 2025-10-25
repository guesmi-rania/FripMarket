import React from "react";

const menuItems = [
  "Nouveautés", "Looks de fêtes", "Marques", "Vêtements", "Chaussures",
  "Sacs", "Accessoires", "Bijoux", "Maison", "Pre-owned", "Soldes"
];

export default function HeaderMenu() {
  return (
    <nav className="w-full border-b bg-white overflow-x-auto px-4 py-2">
      <ul className="flex gap-6 items-center whitespace-nowrap">
        {menuItems.map(item => (
          <li key={item} className="text-sm font-medium cursor-pointer hover:underline min-w-max text-black">
            {item}
          </li>
        ))}
        <li>
          <input 
            type="text" 
            placeholder="Que recherchez-vous ?" 
            className="border rounded-full px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </li>
      </ul>
    </nav>
  );
}
