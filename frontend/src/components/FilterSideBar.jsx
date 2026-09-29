import { useTranslation } from "react-i18next";
import { SlidersHorizontal, X } from "lucide-react";

export default function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sort,
  onSortChange,
  onReset,
  mobileOpen,
  onCloseMobile,
}) {
  const { t } = useTranslation();

  const SORT_OPTIONS = [
    { value: "recent", label: t("filters.sortRecent") },
    { value: "price-asc", label: t("filters.sortPriceAsc") },
    { value: "price-desc", label: t("filters.sortPriceDesc") },
  ];

  const content = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">{t("filters.sortBy")}</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">{t("filters.category")}</h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">{t("filters.price")}</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder={t("filters.min")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder={t("filters.max")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
          />
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full rounded-full border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        {t("filters.reset")}
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      <div className={`fixed inset-0 z-[70] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={onCloseMobile}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white p-6 shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <SlidersHorizontal size={18} /> {t("common.filters")}
            </h2>
            <button onClick={onCloseMobile} aria-label={t("nav.closeMenu")}>
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{content}</div>
        </aside>
      </div>
    </>
  );
}