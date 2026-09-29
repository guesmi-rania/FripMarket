import Products from "./Products";
import { DEMO_SALE_PRODUCTS } from "../data/demoProducts";

export default function Sale() {
  return (
    <Products
      filterFn={(p) => p.onSale}
      demoProducts={DEMO_SALE_PRODUCTS}
      title="Soldes"
      subtitle="Jusqu'à -50% sur une sélection d'articles pre-owned."
    />
  );
}
