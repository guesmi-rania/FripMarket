// Central definition of the site's category structure.
// "section" = Femme / Homme / Enfant (used for the top-level navbar and category pages)
// "subcategories" = the filter options shown inside each section (and inside "Tous les produits")

export const CATEGORY_TREE = {
  femme: {
    label: "Femme",
    subcategories: ["Robes", "Jupes", "Sets", "Chemises", "Vestes", "Sacs", "Chaussures", "Bijoux", "Parfums"],
  },
  homme: {
    label: "Homme",
    subcategories: ["Chemises", "T-shirts", "Pantalons", "Vestes", "Chaussures", "Accessoires"],
  },
  enfant: {
    label: "Enfant",
    subcategories: ["Vêtements", "Chaussures", "Accessoires", "Jouets"],
  },
};

export const SECTION_SLUGS = Object.keys(CATEGORY_TREE); // ["femme", "homme", "enfant"]

export function sectionLabel(slug) {
  return CATEGORY_TREE[slug]?.label || slug;
}

export function subcategoriesFor(slug) {
  return CATEGORY_TREE[slug]?.subcategories || [];
}

// All subcategories across every section, deduplicated and sorted — used on the
// "Tous les produits" page where items from every section are mixed together.
export const ALL_SUBCATEGORIES = Array.from(
  new Set(Object.values(CATEGORY_TREE).flatMap((s) => s.subcategories))
).sort((a, b) => a.localeCompare(b, "fr"));
