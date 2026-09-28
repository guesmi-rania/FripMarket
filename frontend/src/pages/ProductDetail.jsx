import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShieldCheck, Truck } from "lucide-react";
import api from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i._id === product._id);
    if (existing) {
      existing.qty = (existing.qty || 1) + qty;
    } else {
      cart.push({ _id: product._id, name: product.name, price: product.price, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <p className="mt-2 text-gray-500">Ce produit n'existe plus ou a été retiré.</p>
        <Link to="/products" className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
          Voir tous les produits
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p className="py-24 text-center text-gray-500">Chargement du produit...</p>;
  }

  const hasDiscount = product.onSale && product.oldPrice > product.price;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.imageUrl || "/images/placeholder.jpg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-pink-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">{product.price} €</span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">{product.oldPrice} €</span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-gray-600">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-gray-300">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg"
                aria-label="Diminuer"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2 text-lg"
                aria-label="Augmenter"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              className="flex-1 rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              {added ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
          </div>

          <div className="mt-8 space-y-3 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={18} className="text-gray-400" /> Livraison offerte dès 100 €
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck size={18} className="text-gray-400" /> Article vérifié par nos experts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}