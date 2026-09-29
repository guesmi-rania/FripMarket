import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import api from "../api";

export default function Cart() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const persist = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const updateQty = (id, delta) => {
    const items = cartItems.map((item) =>
      item._id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item
    );
    persist(items);
  };

  const removeItem = (id) => persist(cartItems.filter((item) => item._id !== id));

  const total = cartItems.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  const handleCheckout = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/api/orders", { items: cartItems, userEmail: email });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      setError(t("cart.error"));
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">{t("cart.title")}</h1>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">{t("cart.empty")}</p>
          <Link to="/products" className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
            {t("cart.seeProducts")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => updateQty(item._id, -1)} className="h-7 w-7 rounded-full border border-gray-300 text-sm">−</button>
                    <span className="w-6 text-center text-sm">{item.qty || 1}</span>
                    <button onClick={() => updateQty(item._id, 1)} className="h-7 w-7 rounded-full border border-gray-300 text-sm">+</button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{item.price * (item.qty || 1)} €</span>
                  <button onClick={() => removeItem(item._id)} aria-label="Retirer" className="text-gray-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right text-lg font-bold">{t("cart.total")} : {total} €</p>

          {error && <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("cart.emailOptional")}
            className="mt-4 w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none focus:border-gray-500"
          />
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? t("cart.redirecting") : t("cart.pay")}
          </button>
        </>
      )}
    </div>
  );
}