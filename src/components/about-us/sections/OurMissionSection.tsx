"use client";
import { Col, Row } from "antd";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaEye, FaMessage } from "react-icons/fa6";
import { useTranslations } from "next-intl";

interface OurMissionSectionProps {
  data: {
    about_our_mission_title_desc_en: string;
    about_our_mission_title_desc_ar: string;
    about_our_mission_description_desc_en: string;
    about_our_mission_description_desc_ar: string;
  };
}

export const OurVisionSection = () => {
  const t = useTranslations("aboutUs");
  return (
    <section className="container py-[100px]">
      <Row gutter={[30, 30]}>
        <Col span={24} lg={14}>
          <div className="border border-[#e1d6d6] rounded-[30px] p-8 bg-[#faeeee]">
            <div className="flex items-center gap-4 border-b border-[#e1d6d6] pb-6 mb-6">
              <div className="bg-white border border-[#e1d6d6] rounded-full text-primary w-[68px] h-[68px] flex items-center justify-center text-3xl">
                <FaEye />
              </div>

              <h4 className="text-primary font-bold text-3xl">{t("vision.title")}</h4>
            </div>
            <p className="font-bold text-xl lg:w-[90%] leading-10">
              {t("vision.description")}
            </p>
          </div>
        </Col>
        <Col span={24} lg={10}>
          <div className="content our-mission-content flex min-h-full relative rounded-[30px] overflow-hidden">
            <Image
              src={"/photos/our-vision-1.png"}
              fill
              objectFit="cover"
              alt=""
            />
          </div>
        </Col>

        <Col span={24} lg={10}>
          <div className="content our-mission-content flex min-h-full relative rounded-[30px] overflow-hidden">
            <Image
              src={"/photos/our-vision-2.png"}
              fill
              objectFit="cover"
              alt=""
            />
          </div>
        </Col>
        <Col span={24} lg={14}>
          <div className="border border-[#e1d6d6] rounded-[30px] p-8 bg-[#faeeee]">
            <div className="flex items-center gap-4 border-b border-[#e1d6d6] pb-6 mb-6">
              <div className="bg-white border border-[#e1d6d6] rounded-full text-primary w-[68px] h-[68px] flex items-center justify-center text-3xl">
                <FaMessage />
              </div>

              <h4 className="text-primary font-bold text-3xl">{t("mission.title")}</h4>
            </div>
            <p className="font-bold text-xl lg:w-[90%] leading-10">
              {t("mission.description")}
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
};
