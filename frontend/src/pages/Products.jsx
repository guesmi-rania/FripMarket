import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { ALL_SUBCATEGORIES } from "../data/categories";

const normalize = (p) => ({
  id: p._id || p.id,
  name: p.name,
  section: p.section,
  category: p.category,
  price: Number(p.price),
  oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
  isNew: !!p.isNew,
  onSale: !!p.onSale,
  image: p.imageUrl || p.image,
});

/**
 * Reusable product listing page.
 * - filterFn: optional predicate to pre-filter the catalog (used by Nouveautés / Soldes)
 * - demoProducts: fallback example products shown if filterFn matches nothing yet
 *   (e.g. Soldes/Nouveautés before any real product has the flag set)
 * - title / subtitle: page heading
 */
export default function Products({ filterFn, demoProducts, title = "Tous les produits", subtitle }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/api/products");
        if (!cancelled) setAllProducts(res.data.map(normalize));
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Impossible de charger les produits pour le moment.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("recent");
  };

  const filtered = useMemo(() => {
    let list = filterFn ? allProducts.filter(filterFn) : allProducts;

    // No real product has this flag yet (e.g. fresh store with no sale items) —
    // show curated examples instead of an empty page.
    if (filterFn && list.length === 0 && demoProducts?.length) {
      list = demoProducts;
    }

    if (q) list = list.filter((p) => p.name?.toLowerCase().includes(q));

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;
    if (min !== null) list = list.filter((p) => p.price >= min);
    if (max !== null) list = list.filter((p) => p.price <= max);

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [allProducts, filterFn, demoProducts, q, selectedCategories, minPrice, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex gap-10">
        <FilterSidebar
          categories={ALL_SUBCATEGORIES}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          sort={sort}
          onSortChange={setSort}
          onReset={resetFilters}
          mobileOpen={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {loading ? "Chargement…" : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}`}
            </p>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filtres
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Chargement… (le serveur peut mettre quelques secondes à se réveiller)</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
              Aucun produit ne correspond à ces filtres.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
