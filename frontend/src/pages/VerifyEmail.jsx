import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ShoppingBag, XCircle } from "lucide-react";
import api from "../api";

export default function VerifyEmail() {
  const { t } = useTranslation();
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/api/auth/verify-email/${token}`)
      .then(() => {
        if (!cancelled) setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black">
          <ShoppingBag size={26} className="text-white" />
        </div>

        {status === "loading" && <p className="text-gray-600">{t("verifyEmail.verifying")}</p>}

        {status === "success" && (
          <>
            <CheckCircle2 size={40} className="mx-auto mb-3 text-green-600" />
            <h1 className="text-xl font-bold text-gray-900">{t("verifyEmail.success")}</h1>
            <p className="mt-2 text-sm text-gray-500">{t("verifyEmail.successText")}</p>
            <Link to="/login" className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-900">
              {t("verifyEmail.goToLogin")}
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={40} className="mx-auto mb-3 text-red-600" />
            <h1 className="text-xl font-bold text-gray-900">{t("verifyEmail.error")}</h1>
            <p className="mt-2 text-sm text-gray-500">{t("verifyEmail.errorText")}</p>
            <Link to="/register" className="mt-6 inline-block text-sm font-semibold text-gray-900 hover:text-pink-600">
              {t("register.title")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}