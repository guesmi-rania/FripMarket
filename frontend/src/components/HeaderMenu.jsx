import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const menuItems = [
  "Nouveautés\u00A0",
  "Looks\u00A0de\u00A0fêtes",
  "\u00A0Marques",
  "\u00A0Vêtements",
  "\u00A0Chaussures",
  "\u00A0Sacs",
  "\u00A0Accessoires",
  "\u00A0Bijoux",
  "\u00A0Maison",
  "\u00A0Pre\u00A0owned",
  "\u00A0Soldes\u00A0"
];

export default function HeaderMenu() {
  return (
    <nav className="w-full border-b bg-white overflow-x-auto px-4 py-2">
    <ul className="flex gap-6 items-center whitespace-nowrap list-none">
      {menuItems.map(item => (
        <li key={item} className="text-sm font-medium cursor-pointer hover:underline min-w-max text-black">
          {item.split(" ").map((word, index, arr) => (
            <span key={index}>
              {word}
              {index < arr.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </li>
      ))}
     {/* Conteneur de la partie droite */}
     {/* Conteneur de la partie droite */}
     <li className="flex-1 flex justify-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Que recherchez-vous ?" 
              className="border rounded-full pl-10 pr-3 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center">
              <AiOutlineSearch className="text-gray-600" size={18} />
            </div>
          </div>
        </li>
    </ul>
  </nav>
  
  );
}
