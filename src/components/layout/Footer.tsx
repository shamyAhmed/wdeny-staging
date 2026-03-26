"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BiLogoLinkedin } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { FiPhone, FiMapPin, FiMail, FiFacebook } from "react-icons/fi";
import { PiYoutubeLogo } from "react-icons/pi";

export const Footer = () => {
  const t = useTranslations("footer");
  const getLink = useLocalizedLink();

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
                  alt="logo"
                  className="mb-8"
                />
              </Link>
              <p className="!text-start !text-[#F1F1F1]">
                هي منصتك الذكية لحجز رحلات القطار، الباص، والسيارة الخاصة في أي
                وقت ومن أي مكان نوفر لك تجربة سفر سهلة، مريحة، وآمنة، تخليك
                تستمتع بكل لحظة في الطريق{" "}
              </p>
            </div>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <h5 className="mb-6 text-white">روابط هامة</h5>
            <div className="links flex flex-col  gap-3 ">
              <Link href={getLink("/about-us")}> - تعرف على وديني </Link>
              <Link href={getLink("/discover")}>- استكشف </Link>
              <Link href={getLink("/contact-us")}> - اتصل بنا</Link>
            </div>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <h5 className="mb-6 text-white "> المساعدة والدعم</h5>
            <div className="links flex flex-col  gap-3">
              <Link href={getLink("/terms-and-conditions")}>
                - شروط الأحكام{" "}
              </Link>

              <Link href={getLink("/privacy-policy")}> - سياسية الخصوصية</Link>
              <Link href={getLink("/")}>- الأسئلة الشائعة </Link>
            </div>
          </Col>
        </Row>

        <div className="bg-white/20 flex items-center justify-center p-2 mt-16 rounded-[59px] ">
          <ul className="social font-bold text-white">
            <li>تابعنا على :</li>
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
