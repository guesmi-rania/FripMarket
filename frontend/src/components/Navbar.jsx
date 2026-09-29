import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { CATEGORY_TREE, SECTION_SLUGS } from "../data/categories";
import LanguageSwitcher from "./LanguageSwitcher";

const readCount = () => {
  try {
    return (JSON.parse(localStorage.getItem("cart")) || []).reduce(
      (sum, i) => sum + (i.qty || 1),
      0
    );
  } catch {
    return 0;
  }
};

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // "femme" | "homme" | "enfant" | null
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navigate = useNavigate();
  const closeTimer = useRef(null);

  const links = [
    { label: t("nav.new"), to: "/nouveautes" },
    { label: t("nav.sale"), to: "/soldes", accent: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onCart = () => setCount(readCount());
    onCart();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("storage", onCart);
    window.addEventListener("cart-updated", onCart);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", onCart);
      window.removeEventListener("cart-updated", onCart);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors hover:text-pink-600 ${
      isActive ? "text-pink-600" : "text-gray-800"
    }`;

  const openMenu = (slug) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(slug);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-center gap-4 bg-black px-4 py-2 text-center text-xs tracking-wide text-white">
        <span>{t("nav.announcement")}</span>
      </div>

      <div className={`border-b border-gray-100 bg-white transition-shadow ${scrolled ? "shadow-md" : ""}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
          <button
            className="-ml-2 p-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label={t("nav.openMenu")}
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="shrink-0">
            <img src="/images/logo.png" alt="FripMarket" className="h-9 w-auto object-contain lg:h-11" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {SECTION_SLUGS.map((slug) => (
              <div
                key={slug}
                className="relative"
                onMouseEnter={() => openMenu(slug)}
                onMouseLeave={scheduleClose}
              >
                <NavLink to={`/categorie/${slug}`} className={linkClass}>
                  <span className="flex items-center gap-1">
                    {CATEGORY_TREE[slug].label}
                    <ChevronDown size={14} />
                  </span>
                </NavLink>

                {openDropdown === slug && (
                  <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
                      {CATEGORY_TREE[slug].subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`/categorie/${slug}?cat=${encodeURIComponent(sub)}`}
                          onClick={() => setOpenDropdown(null)}
                          className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600"
                        >
                          {sub}
                        </Link>
                      ))}
                      <Link
                        to={`/categorie/${slug}`}
                        onClick={() => setOpenDropdown(null)}
                        className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {t("nav.viewAllSection", { section: CATEGORY_TREE[slug].label })}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={l.accent ? () => "text-sm font-semibold text-red-600 hover:underline underline-offset-4" : linkClass}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <form onSubmit={submitSearch} className="relative hidden w-48 xl:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </form>

            <button
              className="p-2 hover:text-pink-600 xl:hidden"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={t("nav.search")}
            >
              <Search size={22} />
            </button>
            <Link to="/products" className="hidden p-2 hover:text-pink-600 sm:block" aria-label={t("nav.wishlist")}>
              <Heart size={22} />
            </Link>
            <Link to="/login" className="hidden p-2 hover:text-pink-600 sm:block" aria-label={t("nav.account")}>
              <User size={22} />
            </Link>
            <Link to="/cart" className="relative p-2 hover:text-pink-600" aria-label={t("nav.cart")}>
              <ShoppingBag size={22} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="border-t border-gray-100 px-4 py-3 xl:hidden">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                className="w-full rounded-full border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-500"
              />
            </div>
          </form>
        )}
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <img src="/images/logo.png" alt="FripMarket" className="h-8 w-auto" />
            <button onClick={() => setOpen(false)} aria-label={t("nav.closeMenu")} className="p-1">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4">
            {SECTION_SLUGS.map((slug) => (
              <div key={slug} className="border-b border-gray-100">
                <button
                  onClick={() => setMobileExpanded((cur) => (cur === slug ? null : slug))}
                  className="flex w-full items-center justify-between py-4 text-base font-medium text-gray-900"
                >
                  {CATEGORY_TREE[slug].label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${mobileExpanded === slug ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileExpanded === slug && (
                  <div className="pb-3 pl-3">
                    {CATEGORY_TREE[slug].subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/categorie/${slug}?cat=${encodeURIComponent(sub)}`}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-gray-600"
                      >
                        {sub}
                      </Link>
                    ))}
                    <Link
                      to={`/categorie/${slug}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm font-semibold text-gray-900"
                    >
                      {t("nav.viewAllSection", { section: CATEGORY_TREE[slug].label })}
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block border-b border-gray-100 py-4 text-base font-medium ${
                  l.accent ? "text-red-600" : "text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="py-4">
              <LanguageSwitcher />
            </div>
          </nav>

          <div className="grid grid-cols-2 gap-3 border-t border-gray-100 p-5">
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-full border border-gray-300 py-3 text-center text-sm font-semibold">
              {t("nav.myAccount")}
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="rounded-full bg-black py-3 text-center text-sm font-semibold text-white">
              {t("nav.cart")} ({count})
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}