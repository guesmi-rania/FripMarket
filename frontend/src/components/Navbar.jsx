import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const links = [
  { key: "women", to: "/categorie/femme" },
  { key: "men", to: "/categorie/homme" },
  { key: "children", to: "/categorie/enfant" },
  { key: "newArrivals", to: "/nouveautes" },
  { key: "sale", to: "/soldes", accent: true },
];

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
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-black px-4 py-2 text-center text-xs tracking-wide text-white">
        {t("shipping")}
      </div>

      <div
        className={`border-b border-gray-100 bg-white transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
          <button
            className="-ml-2 p-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label={t("menuOpen")}
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="FripMarket"
              className="h-9 w-auto object-contain lg:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.key}
                to={l.to}
                className={
                  l.accent
                    ? () =>
                        "text-sm font-semibold text-red-600 hover:underline underline-offset-4"
                    : linkClass
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">

            {/* Language selector */}
            <div className="hidden items-center gap-1 rounded-full border border-gray-200 p-1 sm:flex">
              <button
                type="button"
                onClick={() => changeLanguage("fr")}
                className={`rounded-full px-2 py-1 text-xs font-semibold transition ${
                  i18n.language === "fr"
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                FR
              </button>

              <button
                type="button"
                onClick={() => changeLanguage("en")}
                className={`rounded-full px-2 py-1 text-xs font-semibold transition ${
                  i18n.language === "en"
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                EN
              </button>
            </div>

            <form
              onSubmit={submitSearch}
              className="relative hidden w-56 xl:block"
            >
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search")}
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </form>

            <button
              className="p-2 hover:text-pink-600 xl:hidden"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={t("searchButton")}
            >
              <Search size={22} />
            </button>

            <Link
              to="/products"
              className="hidden p-2 hover:text-pink-600 sm:block"
              aria-label={t("favorites")}
            >
              <Heart size={22} />
            </Link>

            <Link
              to="/login"
              className="hidden p-2 hover:text-pink-600 sm:block"
              aria-label={t("account")}
            >
              <User size={22} />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:text-pink-600"
              aria-label={t("cart")}
            >
              <ShoppingBag size={22} />

              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form
            onSubmit={submitSearch}
            className="border-t border-gray-100 px-4 py-3 xl:hidden"
          >
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search")}
                className="w-full rounded-full border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-500"
              />
            </div>
          </form>
        )}
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <img
              src="/images/logo.png"
              alt="FripMarket"
              className="h-8 w-auto"
            />

            <button
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="p-1"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.key}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block border-b border-gray-100 py-4 text-base font-medium ${
                  l.accent ? "text-red-600" : "text-gray-900"
                }`}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-3 border-t border-gray-100 p-5">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-gray-300 py-3 text-center text-sm font-semibold"
            >
              {t("account")}
            </Link>

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="rounded-full bg-black py-3 text-center text-sm font-semibold text-white"
            >
              {t("cart")} ({count})
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
