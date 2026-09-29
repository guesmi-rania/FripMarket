import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import api from "../api";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await api.post("/api/contact", form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setError(t("contact.error"));
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">{t("contact.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">{t("contact.subtitle")}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex gap-4 rounded-xl border border-gray-100 p-5">
            <Mail className="mt-0.5 shrink-0 text-pink-600" size={22} />
            <div>
              <h3 className="font-semibold text-gray-900">{t("contact.emailLabel")}</h3>
              <p className="mt-1 text-sm text-gray-500">contact@fripmarket.com</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-xl border border-gray-100 p-5">
            <Phone className="mt-0.5 shrink-0 text-pink-600" size={22} />
            <div>
              <h3 className="font-semibold text-gray-900">{t("contact.phoneLabel")}</h3>
              <p className="mt-1 text-sm text-gray-500">+216 00 000 000</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-xl border border-gray-100 p-5">
            <MapPin className="mt-0.5 shrink-0 text-pink-600" size={22} />
            <div>
              <h3 className="font-semibold text-gray-900">{t("contact.addressLabel")}</h3>
              <p className="mt-1 text-sm text-gray-500">Tunis, Tunisie</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm lg:col-span-3 lg:p-8">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">✓</div>
              <h2 className="text-xl font-bold text-gray-900">{t("contact.successTitle")}</h2>
              <p className="mt-2 text-gray-500">{t("contact.successText")}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                {t("contact.sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("contact.formName")}</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact.formNamePlaceholder")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("contact.formEmail")}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="vous@exemple.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("contact.formSubject")}</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t("contact.formSubjectPlaceholder")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("contact.formMessage")}</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.formMessagePlaceholder")}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50 sm:w-auto sm:px-10"
              >
                {status === "loading" ? t("contact.sending") : t("contact.send")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}