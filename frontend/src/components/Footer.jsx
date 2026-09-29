import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-xl font-bold text-white">FripMarket</h3>
          <p className="mt-3 text-sm text-gray-400">
            La mode d'occasion, sélectionnée avec soin. Des pièces uniques à prix juste.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Boutique</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/nouveautes" className="hover:text-white">Nouveautés</Link></li>
            <li><Link to="/products" className="hover:text-white">Tous les produits</Link></li>
            <li><Link to="/soldes" className="hover:text-white">Soldes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Aide</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cart" className="hover:text-white">Mon panier</Link></li>
            <li><Link to="/login" className="hover:text-white">Mon compte</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Paiement</h4>
          <p className="text-sm text-gray-400">Paiement sécurisé par carte via Stripe.</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FripMarket. Tous droits réservés.
      </div>
    </footer>
  );
}
