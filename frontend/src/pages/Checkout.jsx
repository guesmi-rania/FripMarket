import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    setOrderInfo({ count: cart.length, total });
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={34} className="text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Paiement réussi !</h1>
        <p className="mt-3 text-gray-500">
          Merci pour votre achat sur FripMarket. Un email de confirmation vous sera envoyé sous peu.
        </p>

        {orderInfo && orderInfo.count > 0 && (
          <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Package size={16} />
              Résumé de la commande
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span>{orderInfo.count} article{orderInfo.count > 1 ? "s" : ""}</span>
              <span className="font-semibold text-gray-900">{orderInfo.total} €</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="flex-1 rounded-full border border-gray-300 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Continuer mes achats
          </Link>
          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            <ShoppingBag size={16} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
