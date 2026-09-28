const fs = require('fs');

const categories = ['Robes', 'Sacs', 'Chaussures', 'Vêtements', 'Accessoires'];
const products = [];

for (let i = 1; i <= 100; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const product = {
    id: i,
    name: `${category} ${i}`,
    category,
    price: Math.floor(Math.random() * 500) + 20, // prix entre 20 et 520 €
    image: `/images/prod${(i % 20) + 1}.jpg` // réutilisation de 20 images
  };
  products.push(product);
}

fs.writeFileSync('public/products.json', JSON.stringify(products, null, 2));
console.log('products.json généré avec succès !');
