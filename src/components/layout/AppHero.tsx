"use client";

import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useTranslations } from "next-intl";

const AppHero = () => {
  const t = useTranslations("appHero");

  return (
    <section className="app-hero text-center lg:text-start">
      <div className="px-4">
        <div className="container rounded-[50px]">
          <Image
            src="/images/footer-bg.png"
            alt="footer-bg"
            fill
            className="object-cover rounded-[50px]"
          />
          <div className="app-hero__card">
            {/* Phone */}
            <div className="app-hero__phone hidden lg:flex absolute left-6 bottom-0">
              <Image
                src="/images/footer-app.png" // صورة الموبايل
                alt={t("imageAlt")}
                width={440}
                height={670}
                priority
              />
            </div>

            {/* Content */}
            <div className="app-hero__content mx-auto lg:mx-0">
              <h1 className="text-white">
                <span className="text-primary"> {t("titleHighlight")} </span>
                {t("titleRest")}
              </h1>

              <p>{t("description")}</p>

              <div className="store-buttons">
                <a
                  href=""
                  className="btn google"
                  aria-label={t("googlePlay")}>
                  <FaGooglePlay />
                  {t("googlePlay")}
                </a>

                <a
                  href=""
                  className="btn apple"
                  aria-label={t("appleStore")}>
                  <FaApple />
                  {t("appleStore")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHero;
