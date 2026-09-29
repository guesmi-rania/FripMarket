import Products from "./Products";
import { DEMO_NEW_ARRIVALS } from "../data/demoproducts";

export default function NewArrivals() {
  return (
    <Products
      filterFn={(p) => p.isNewArrival}
      demoProducts={DEMO_NEW_ARRIVALS}
      title="Nouveautés"
      subtitle="Les dernières pièces ajoutées à notre sélection."
    />
  );
}
