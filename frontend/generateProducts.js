// Regenerates public/products.json with random demo data using the
// Femme/Homme/Enfant section + subcategory structure (see src/data/categories.js).
// Run with: node generateProducts.js

const fs = require("fs");

const CATEGORY_TREE = {
  Femme: ["Robes", "Jupes", "Sets", "Chemises", "Vestes", "Sacs", "Chaussures", "Bijoux", "Parfums"],
  Homme: ["Chemises", "T-shirts", "Pantalons", "Vestes", "Chaussures", "Accessoires"],
  Enfant: ["Vêtements", "Chaussures", "Accessoires", "Jouets"],
};

const sections = Object.keys(CATEGORY_TREE);
const products = [];

for (let i = 1; i <= 60; i++) {
  const section = sections[Math.floor(Math.random() * sections.length)];
  const categories = CATEGORY_TREE[section];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = Math.floor(Math.random() * 60) + 15;
  const onSale = Math.random() < 0.25;

  products.push({
    id: i,
    name: `${category} ${section} ${i}`,
    section,
    category,
    price,
    ...(onSale ? { oldPrice: Math.round(price * 1.5) } : {}),
    onSale,
    isNewArrival: Math.random() < 0.2,
    image: "/images/placeholder.jpg",
  });
}

fs.writeFileSync("public/products.json", JSON.stringify(products, null, 2));
console.log("products.json généré avec succès !");
