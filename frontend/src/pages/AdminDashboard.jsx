import { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les produits.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold">Dashboard Admin</h2>
      {loading && <p className="text-gray-500">Chargement…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between p-4">
              <span>{p.name}</span>
              <span className="font-semibold">{p.price} €</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}