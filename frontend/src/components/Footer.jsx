import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-12 bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-xl font-bold text-white">FripMarket</h3>
          <p className="mt-3 text-sm text-gray-400">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{t("footer.shopHeading")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/nouveautes" className="hover:text-white">{t("footer.newArrivals")}</Link></li>
            <li><Link to="/products" className="hover:text-white">{t("footer.allProducts")}</Link></li>
            <li><Link to="/soldes" className="hover:text-white">{t("footer.sale")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{t("footer.helpHeading")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cart" className="hover:text-white">{t("footer.myCart")}</Link></li>
            <li><Link to="/login" className="hover:text-white">{t("footer.myAccountLink")}</Link></li>
            <li><Link to="/contact" className="hover:text-white">{t("footer.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{t("footer.paymentHeading")}</h4>
          <p className="text-sm text-gray-400">{t("footer.paymentText")}</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FripMarket . {t("footer.rights")}
      </div>
    </footer>
  );
}