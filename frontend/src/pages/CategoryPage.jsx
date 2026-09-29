import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSideBar";
import { CATEGORY_TREE, sectionLabel, subcategoriesFor } from "../data/categories";
import { demoForSection } from "../data/demoProducts";

const normalize = (p) => ({
  id: p._id || p.id,
  name: p.name,
  section: p.section,
  category: p.category,
  price: Number(p.price),
  oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
  isNewArrival: !!p.isNewArrival,
  onSale: !!p.onSale,
  image: p.imageUrl || p.image,
});

export default function CategoryPage() {
  const { t } = useTranslation();
  const { section } = useParams(); // "femme" | "homme" | "enfant"
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const presetCat = params.get("cat"); // set when arriving from a navbar submenu link

  const label = sectionLabel(section);
  const subcategories = subcategoriesFor(section);
  const isValidSection = Boolean(CATEGORY_TREE[section]);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategories, setSelectedCategories] = useState(presetCat ? [presetCat] : []);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Reset filters whenever the person switches section (Femme -> Homme, etc.)
  // or arrives via a submenu link carrying a different ?cat=
  useEffect(() => {
    setSelectedCategories(presetCat ? [presetCat] : []);
    setMinPrice("");
    setMaxPrice("");
    setSort("recent");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, presetCat]);

  useEffect(() => {
    if (!isValidSection) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/api/products");
        if (!cancelled) setAllProducts(res.data.map(normalize));
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(t("errors.loadProducts"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [isValidSection, t]);

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
    let list = allProducts.filter(
      (p) => (p.section || "").toLowerCase() === section?.toLowerCase()
    );

    // No real product is categorized into this section yet — fall back to
    // curated examples so the page is never empty.
    if (list.length === 0) {
      list = demoForSection(section);
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
  }, [allProducts, section, q, selectedCategories, minPrice, maxPrice, sort]);

  if (!isValidSection) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">{t("category.notFound")}</h1>
        <p className="mt-2 text-gray-500">{t("category.notFoundText")}</p>
        <Link to="/products" className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
          {t("category.seeAll")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{label}</h1>
        <p className="mt-2 text-gray-500">
          {t("category.subtitle", { section: label.toLowerCase() })} {subcategories.slice(0, 4).join(", ")}…
        </p>
      </div>

      <div className="flex gap-10">
        <FilterSidebar
          categories={subcategories}
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
              {loading ? t("common.loading") : t("common.articleCount", { count: filtered.length })}
            </p>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal size={16} /> {t("common.filters")}
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">{t("common.loadingSlow")}</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
              {t("common.noResults")}
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