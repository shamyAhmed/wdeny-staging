"use client";

import { Collapse } from "antd";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import style from "./styles/faqs.module.scss";
import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";

const { Panel } = Collapse;

export const FaqsComponent: React.FC = () => {
  const t = useTranslations("faqs");

  const categories = [
    {
      key: "general",
      label: t("categories.general.title"),
      items: [
        { q: t("categories.general.q1"), a: t("categories.general.a1") },
        { q: t("categories.general.q2"), a: t("categories.general.a2") },
        { q: t("categories.general.q3"), a: t("categories.general.a3") },
      ],
    },
    {
      key: "booking",
      label: t("categories.booking.title"),
      items: [
        { q: t("categories.booking.q1"), a: t("categories.booking.a1") },
        { q: t("categories.booking.q2"), a: t("categories.booking.a2") },
        { q: t("categories.booking.q3"), a: t("categories.booking.a3") },
        { q: t("categories.booking.q4"), a: t("categories.booking.a4") },
      ],
    },
    {
      key: "payment",
      label: t("categories.payment.title"),
      items: [
        { q: t("categories.payment.q1"), a: t("categories.payment.a1") },
        { q: t("categories.payment.q2"), a: t("categories.payment.a2") },
        { q: t("categories.payment.q3"), a: t("categories.payment.a3") },
      ],
    },
    {
      key: "cancellation",
      label: t("categories.cancellation.title"),
      items: [
        { q: t("categories.cancellation.q1"), a: t("categories.cancellation.a1") },
        { q: t("categories.cancellation.q2"), a: t("categories.cancellation.a2") },
        { q: t("categories.cancellation.q3"), a: t("categories.cancellation.a3") },
      ],
    },
    {
      key: "loyalty",
      label: t("categories.loyalty.title"),
      items: [
        { q: t("categories.loyalty.q1"), a: t("categories.loyalty.a1") },
        { q: t("categories.loyalty.q2"), a: t("categories.loyalty.a2") },
        { q: t("categories.loyalty.q3"), a: t("categories.loyalty.a3") },
      ],
    },
  ];

  return (
    <main className={style.faqs}>
      <PageBannerSection
        title={t("banner.title")}
        currentLink="/faqs"
        currentPage={t("banner.breadcrumb")}
      />

      <section className="faqs-section">
        <div className="container">
          <div className="faqs-header">
            <h2 className="section-title">{t("section.title")}</h2>
            <p className="section-subtitle">{t("section.subtitle")}</p>
          </div>

          <div className="faqs-categories">
            {categories.map((category) => (
              <div key={category.key} className="faq-category">
                <h3 className="category-title">
                  <span className="category-dot" />
                  {category.label}
                </h3>
                <Collapse
                  accordion
                  ghost
                  expandIcon={({ isActive }) => (
                    <FiChevronDown
                      className={`expand-icon ${isActive ? "active" : ""}`}
                    />
                  )}
                  expandIconPosition="end"
                  className="faq-collapse"
                >
                  {category.items.map((item, idx) => (
                    <Panel
                      header={item.q}
                      key={`${category.key}-${idx}`}
                      className="faq-panel"
                    >
                      <p>{item.a}</p>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            ))}
          </div>

          <div className="faqs-cta">
            <p>{t("cta.text")}</p>
            <a href="/contact-us" className="cta-btn">
              {t("cta.button")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
