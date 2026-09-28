import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const id = product.id ?? product._id;
  const image = product.image || product.imageUrl || "/images/placeholder.jpg";

  return (
    <Link to={`/product/${id}`} className="group block text-left">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded bg-black px-2 py-1 text-xs font-medium text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="truncate text-[15px] font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-0.5 truncate text-sm text-gray-500">{product.category}</p>
        <p className="mt-1.5 font-semibold text-gray-900">{Number(product.price)} €</p>
      </div>
    </Link>
  );
}