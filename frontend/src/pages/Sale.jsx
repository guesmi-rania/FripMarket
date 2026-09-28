import Products from "./Products";

export default function Sale() {
  return (
    <Products
      filterFn={(p) => p.onSale}
      title="Soldes"
      subtitle="Jusqu'à -50% sur une sélection d'articles pre-owned."
    />
  );
}