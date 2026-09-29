import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, ShoppingBag } from "lucide-react";
import api from "../api";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", { email });
      // We always show success, whether or not the account exists — this avoids
      // leaking which emails are registered.
      setSent(true);
    } catch (err) {
      // Even on a real server error we still show the generic message,
      // since the backend intentionally never reveals account existence.
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black">
            <ShoppingBag size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t("forgotPassword.title")}</h1>
          <p className="mt-2 text-sm text-gray-500">{t("forgotPassword.subtitle")}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">✓</div>
              <p className="text-sm text-gray-600">{t("forgotPassword.success")}</p>
              <Link to="/login" className="mt-6 inline-block text-sm font-semibold text-gray-900 hover:text-pink-600">
                {t("forgotPassword.backToLogin")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("forgotPassword.email")}</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
              >
                {loading ? t("forgotPassword.sending") : t("forgotPassword.send")}
              </button>

              <Link to="/login" className="block text-center text-sm text-gray-500 hover:text-pink-600">
                {t("forgotPassword.backToLogin")}
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}