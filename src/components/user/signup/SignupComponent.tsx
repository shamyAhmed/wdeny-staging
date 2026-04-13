"use client";
import { Signup_form } from "./forms/Signup_form";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const RegisterComponent = () => {
  const t = useTranslations("auth.register");

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl mb-6 font-bold">{t("title")}</h2>
      <p className="text-[#888] mb-10">
        {t("hasAccount")}{" "}
        <Link href="/auth/login" className="mb-6 text-primary font-bold">
          {t("login")}{" "}
        </Link>
      </p>

      <Suspense>
        <Signup_form />
      </Suspense>
    </div>
  );
};
