import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Chargement du produit...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.title}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-green-600 font-bold text-xl mb-2">{product.price} €</p>
      <p className="text-sm text-gray-500 mb-4">
        Catégorie : {product.category || "Non spécifiée"}
      </p>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Ajouter au panier
      </button>
    </div>
  );
}
