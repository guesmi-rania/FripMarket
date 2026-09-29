import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import api from "../api";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "Femme", image: "/images/cat-femme.jpg", to: "/categorie/femme" },
  { name: "Homme", image: "/images/cat-homme.jpg", to: "/categorie/homme" },
  { name: "Enfant", image: "/images/cat-enfant.jpg", to: "/categorie/enfant" },
  { name: "Nouveautés", image: "/images/cat-accessoires.jpg", to: "/nouveautes" },
];

const perks = [
  { icon: Truck, title: "Livraison rapide", text: "Offerte dès 100 €" },
  { icon: ShieldCheck, title: "Paiement sécurisé", text: "Cartes via Stripe" },
  { icon: BadgeCheck, title: "Articles vérifiés", text: "Contrôlés par nos experts" },
  { icon: RefreshCcw, title: "Retours faciles", text: "Sous 14 jours" },
];

const normalize = (p) => ({
  id: p._id || p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  oldPrice: p.oldPrice,
  isNew: p.isNew,
  onSale: p.onSale,
  image: p.imageUrl || p.image,
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      let data = [];
      try {
        data = (await api.get("/api/products")).data;
      } catch {
        /* API indisponible : on utilise le fichier de démo */
      }
      if (!data.length) {
        try {
          data = await (await fetch("/products.json")).json();
        } catch {
          data = [];
        }
      }
      setProducts(data.slice(0, 10).map(normalize));
    };
    load();
  }, []);

  return (
    <div>
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Explorer par catégorie</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((c) => (
            <Link key={c.name} to={c.to} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-200">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900">
          <img src="/images/promo.jpg" alt="Pre-owned" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="relative px-6 py-16 text-center text-white md:py-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-extrabold tracking-tight md:text-6xl"
            >
              Pre-owned : <span className="text-pink-400">-15%</span>
            </motion.h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-gray-200 md:text-xl">
              Sélection d'articles d'occasion de grandes maisons, vérifiés par nos experts. Des pièces uniques pour affirmer votre style.
            </p>
            <Link
              to="/soldes"
              className="mt-8 inline-block rounded-full bg-white px-9 py-4 text-base font-semibold text-black transition hover:bg-gray-100"
            >
              Explorer la sélection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Sélection Pre-Owned</h2>
          <Link to="/products" className="text-sm font-semibold underline underline-offset-4 hover:text-pink-600">
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-4 lg:px-8">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon size={30} className="mb-3 text-pink-600" />
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Restez informé</h2>
        <p className="mt-3 text-gray-600">Recevez nos nouveautés et offres exclusives.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-sm outline-none focus:border-gray-500"
          />
          <button className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800">
            S'inscrire
          </button>
        </form>
      </section>
    </div>
  );
}
