import { useState } from "react";
import api from "../api";
import { CATEGORY_TREE, SECTION_SLUGS, sectionLabel, subcategoriesFor } from "../data/categories";

const initialForm = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  section: "",
  category: "",
  imageUrl: "",
  isNew: false,
  onSale: false,
};

export default function Sell() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  const availableSubcategories = form.section ? subcategoriesFor(form.section) : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "section") {
      // Reset the subcategory whenever the section changes, since the options differ.
      setForm({ ...form, section: value, category: "" });
      return;
    }
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      setLoading(true);
      await api.post("/api/products", {
        ...form,
        section: sectionLabel(form.section),
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      });
      setMessage({ type: "success", text: "Produit ajouté avec succès !" });
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      const text =
        err.response?.status === 401
          ? "Vous devez être connecté en tant qu'admin pour publier un article."
          : err.response?.data?.message || "Erreur lors de l'ajout du produit.";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-14">
      <h1 className="mb-2 text-center text-3xl font-bold">Mettre un article en vente</h1>
      <p className="mb-8 text-center text-sm text-gray-500">
        Réservé aux comptes administrateur — connectez-vous d'abord.
      </p>

      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Titre</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Robe fleurie vintage"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Décrivez l'état, la matière, la taille..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Prix (€)</label>
            <input
              type="number"
              min="0"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
              placeholder="35"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Prix barré (optionnel)</label>
            <input
              type="number"
              min="0"
              name="oldPrice"
              value={form.oldPrice}
              onChange={handleChange}
              placeholder="50"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Section</label>
            <select
              name="section"
              required
              value={form.section}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
            >
              <option value="">Choisir</option>
              {SECTION_SLUGS.map((slug) => (
                <option key={slug} value={slug}>
                  {CATEGORY_TREE[slug].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Sous-catégorie</label>
            <select
              name="category"
              required
              disabled={!form.section}
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">{form.section ? "Choisir" : "Choisir une section d'abord"}</option>
              {availableSubcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">URL de l'image</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} />
            Marquer comme nouveauté
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="onSale" checked={form.onSale} onChange={handleChange} />
            Mettre en solde
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? "Publication…" : "Publier l'article"}
        </button>
      </form>
    </section>
  );
}
