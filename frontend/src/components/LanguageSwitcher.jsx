import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 p-0.5 text-xs font-semibold">
      <button
        onClick={() => setLang("fr")}
        className={`rounded-full px-2.5 py-1 transition ${
          i18n.language === "fr" ? "bg-black text-white" : "text-gray-500 hover:text-gray-900"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition ${
          i18n.language === "en" ? "bg-black text-white" : "text-gray-500 hover:text-gray-900"
        }`}
      >
        EN
      </button>
    </div>
  );
}