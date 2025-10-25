import React, { useState } from 'react';
import axios from 'axios';

export default function Sell() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form);
      alert("Produit ajouté avec succès !");
      setForm({ title: '', description: '', price: '', category: '', image: '' });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’ajout du produit");
    }
  };

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Mettre un article en vente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" name="title" placeholder="Titre" value={form.title} onChange={handleChange} />
        <textarea className="w-full border p-2 rounded" name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input className="w-full border p-2 rounded" name="price" placeholder="Prix (€)" value={form.price} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="category" placeholder="Catégorie (ex: robe, veste...)" value={form.category} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="image" placeholder="URL de l'image" value={form.image} onChange={handleChange} />
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Publier</button>
      </form>
    </section>
  );
}
