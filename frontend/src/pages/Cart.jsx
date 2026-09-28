import { useEffect, useState } from "react";
import api from "../api";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const total = cartItems.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/orders", { items: cartItems, userEmail: email });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Erreur lors du paiement");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Mon panier</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between p-4">
                <span>{item.name} × {item.qty || 1}</span>
                <span className="font-semibold">{item.price * (item.qty || 1)} €</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-lg font-bold">Total : {total} €</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email (optionnel)"
            className="mt-4 w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none"
          />
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full rounded-full bg-black py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Redirection…" : "Payer avec Stripe"}
          </button>
        </>
      )}
    </div>
  );
}