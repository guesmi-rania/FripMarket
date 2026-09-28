import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const id = product.id ?? product._id;
  const image = product.image || product.imageUrl || "/images/placeholder.jpg";
  const hasDiscount = product.onSale && product.oldPrice > product.price;

  return (
    <Link to={`/product/${id}`} className="group block text-left">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded bg-black px-2 py-1 text-xs font-medium text-white">Nouveau</span>
          )}
          {hasDiscount && (
            <span className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
              -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="truncate text-[15px] font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-0.5 truncate text-sm text-gray-500">{product.category}</p>
        <p className="mt-1.5 flex items-center gap-2 font-semibold text-gray-900">
          {Number(product.price)} €
          {hasDiscount && (
            <span className="text-sm font-normal text-gray-400 line-through">{Number(product.oldPrice)} €</span>
          )}
        </p>
      </div>
    </Link>
  );
}