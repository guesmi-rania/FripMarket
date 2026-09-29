import Products from "./Products";
import { DEMO_NEW_ARRIVALS } from "../data/demoProducts";

export default function NewArrivals() {
  return (
    <Products
      filterFn={(p) => p.isNew}
      demoProducts={DEMO_NEW_ARRIVALS}
      title="Nouveautés"
      subtitle="Les dernières pièces ajoutées à notre sélection."
    />
  );
}
