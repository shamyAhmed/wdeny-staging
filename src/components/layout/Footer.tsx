"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useGetPages } from "@/hooks/useGetPages";
import { FiFacebook } from "react-icons/fi";
import { PiYoutubeLogo } from "react-icons/pi";

export const Footer = () => {
  const t = useTranslations("footer");
  const getLink = useLocalizedLink();
  const { data: pages, isLoading: isLoadingPages } = useGetPages();

  const socialLinks = [
    {
      href: "",
      icon: <FiFacebook />,
    },
    {
      href: "",
      icon: <FaXTwitter />,
    },
    {
      href: "",
      icon: <FaInstagram />,
    },
    {
      href: "",
      icon: <PiYoutubeLogo />,
    },
  ];

  return (
    <footer className="footer relative flex overflow-hidden" id="contactus">
      <div className="container">
        <Row gutter={[70, 30]} className="">
          <Col xs={24} md={12} lg={8}>
            <div className="flex flex-col gap-4 sm:justify-between">
              <Link href={getLink("/")}>
                <Image
                  src={"/images/logo-white.png"}
                  width={200}
                  height={60}
                  alt={t("logoAlt")}
                  className="mb-8"
                />
              </Link>
              <p className="!text-start !text-[#F1F1F1]">{t("description")}</p>
            </div>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <h5 className="mb-6 text-white">{t("importantLinksTitle")}</h5>
            <div className="links flex flex-col  gap-3 ">
              <Link href={getLink("/about-us")}> - {t("importantLinks.about")}</Link>
              <Link href={getLink("/discover")}>- {t("importantLinks.explore")}</Link>
              <Link href={getLink("/contact-us")}> - {t("importantLinks.contact")}</Link>
            </div>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <h5 className="mb-6 text-white ">{t("supportTitle")}</h5>
            <div className="links flex flex-col  gap-3">
              {isLoadingPages
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 rounded animate-pulse bg-white/20"
                      style={{ width: `${60 + i * 10}%` }}
                    />
                  ))
                : <>
                    {pages?.map((page) => (
                      <Link key={page.id} href={getLink(`/pages/${page.slug}`)}>
                        - {page.title}
                      </Link>
                    ))}
                    <Link href={getLink("/faqs")}>- {t("supportLinks.faq")}</Link>
                  </>}
            </div>
          </Col>
        </Row>

        <div className="bg-white/20 flex items-center justify-center p-2 mt-16 rounded-[59px] ">
          <ul className="social font-bold text-white">
            <li>{t("followUs")}</li>
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
