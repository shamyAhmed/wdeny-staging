"use client";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { BussForm } from "../homePage/forms/BussForm";
import style from "../discover/styles/discover.module.scss";
import { Link } from "@/i18n/navigation";
import { PiBusBold } from "react-icons/pi";
import { useTranslations } from "next-intl";

export const DiscoverBusComponent = () => {
  const t = useTranslations("discoverBus");

  return (
    <main className={style.discover}>
      <PageBannerSection
        title="احجز الان"
        currentLink="/discover-bus"
        currentPage="احجز الان"
      />
      <div className="container">
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <BussForm />
        </div>

        <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary">
            <PiBusBold size={44} />
          </div>
          <h3 className="text-xl font-bold text-[#111113]">
            {t("emptyState.title")}
          </h3>
          <p className="text-[#B0B0B3] max-w-sm text-sm leading-relaxed">
            {t("emptyState.description")}
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            {t("emptyState.backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
};
