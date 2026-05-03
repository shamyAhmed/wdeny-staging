"use client";

import { Collapse } from "antd";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import style from "./styles/faqs.module.scss";
import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import useGetFaqs from "@/app/[locale]/_hooks/useGetFaqs";

const { Panel } = Collapse;

export const FaqsComponent: React.FC = () => {
  const t = useTranslations("faqs");
  const { data: sections = [], isLoading } = useGetFaqs();

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

          {!isLoading && (
            <div className="faqs-categories">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="faq-category">
                  <h3 className="category-title">
                    <span className="category-dot" />
                    {section.section_name}
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
                    {section.faq.map((item, idx) => (
                      <Panel
                        header={item.question}
                        key={`${sectionIdx}-${idx}`}
                        className="faq-panel"
                      >
                        <p>{item.answer}</p>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ))}
            </div>
          )}

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
