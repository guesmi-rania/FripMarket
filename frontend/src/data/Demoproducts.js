// Curated example products used as a fallback so the Nouveautés and Soldes
// pages never look empty before real flagged products exist in the database.

export const DEMO_NEW_ARRIVALS = [
  { id: "demo-n1", name: "Robe midi imprimée", section: "Femme", category: "Robes", price: 42, isNew: true, image: "/images/placeholder.jpg" },
  { id: "demo-n2", name: "Chemise en lin", section: "Homme", category: "Chemises", price: 38, isNew: true, image: "/images/placeholder.jpg" },
  { id: "demo-n3", name: "Sac bandoulière cuir", section: "Femme", category: "Sacs", price: 55, isNew: true, image: "/images/placeholder.jpg" },
  { id: "demo-n4", name: "Baskets enfant", section: "Enfant", category: "Chaussures", price: 28, isNew: true, image: "/images/placeholder.jpg" },
  { id: "demo-n5", name: "Veste denim", section: "Homme", category: "Vestes", price: 45, isNew: true, image: "/images/placeholder.jpg" },
  { id: "demo-n6", name: "Jupe plissée", section: "Femme", category: "Jupes", price: 32, isNew: true, image: "/images/placeholder.jpg" },
];

export const DEMO_SALE_PRODUCTS = [
  { id: "demo-s1", name: "Robe longue fleurie", section: "Femme", category: "Robes", price: 45, oldPrice: 70, onSale: true, image: "/images/placeholder.jpg" },
  { id: "demo-s2", name: "Sac à main cuir", section: "Femme", category: "Sacs", price: 60, oldPrice: 90, onSale: true, image: "/images/placeholder.jpg" },
  { id: "demo-s3", name: "Chemise oxford", section: "Homme", category: "Chemises", price: 35, oldPrice: 55, onSale: true, image: "/images/placeholder.jpg" },
  { id: "demo-s4", name: "Baskets blanches", section: "Homme", category: "Chaussures", price: 50, oldPrice: 80, onSale: true, image: "/images/placeholder.jpg" },
  { id: "demo-s5", name: "Veste en jean enfant", section: "Enfant", category: "Vêtements", price: 25, oldPrice: 40, onSale: true, image: "/images/placeholder.jpg" },
  { id: "demo-s6", name: "Collier doré", section: "Femme", category: "Bijoux", price: 20, oldPrice: 32, onSale: true, image: "/images/placeholder.jpg" },
];
