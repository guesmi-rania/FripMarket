import { useTranslation } from "react-i18next";
import Products from "./Products";
import { DEMO_SALE_PRODUCTS } from "../data/demoProducts";

export default function Sale() {
  const { t } = useTranslation();
  return (
    <Products
      filterFn={(p) => p.onSale}
      demoProducts={DEMO_SALE_PRODUCTS}
      title={t("pages.sale.title")}
      subtitle={t("pages.sale.subtitle")}
    />
  );
}