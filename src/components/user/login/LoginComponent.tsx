"use client";
import { Login_form } from "./forms/Login_form";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const LoginComponent = () => {
  const t = useTranslations("auth.login");

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl mb-6 font-bold">{t("title")}</h2>
      <p className="text-[#888] mb-10">
        {t("noAccount")}
        <Link href="/auth/register" className="mb-6 text-primary font-bold">
          {" "}
          {t("createAccount")}
        </Link>
      </p>

      <Suspense>
        <Login_form />
      </Suspense>
    </div>
  );
};
