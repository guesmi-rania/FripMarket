import { useTranslation } from "react-i18next";
import Products from "./Products";
import { DEMO_NEW_ARRIVALS } from "../data/demoProducts";

export default function NewArrivals() {
  const { t } = useTranslation();
  return (
    <Products
      filterFn={(p) => p.isNewArrival}
      demoProducts={DEMO_NEW_ARRIVALS}
      title={t("pages.newArrivals.title")}
      subtitle={t("pages.newArrivals.subtitle")}
    />
  );
}


