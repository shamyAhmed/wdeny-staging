"use client";
import { Col, Row } from "antd";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaEye, FaMessage } from "react-icons/fa6";

interface OurMissionSectionProps {
  data: {
    about_our_mission_title_desc_en: string;
    about_our_mission_title_desc_ar: string;
    about_our_mission_description_desc_en: string;
    about_our_mission_description_desc_ar: string;
  };
}

export const OurVisionSection = () => {
  return (
    <section className="container py-[100px]">
      <Row gutter={[30, 30]}>
        <Col span={24} lg={14}>
          <div className="border border-[#e1d6d6] rounded-[30px] p-8 bg-[#faeeee]">
            <div className="flex items-center gap-4 border-b border-[#e1d6d6] pb-6 mb-6">
              <div className="bg-white border border-[#e1d6d6] rounded-full text-primary w-[68px] h-[68px] flex items-center justify-center text-3xl">
                <FaEye />
              </div>

              <h4 className="text-primary font-bold text-3xl">الرؤيــة </h4>
            </div>
            <p className="font-bold text-xl lg:w-[90%] leading-10">
              أن تصير وديني المنصة الأولى في المملكة لتجربة سفر ذكية ومريحة،
              تجمع كل وسائل النقل في تطبيق واحد يسهل على الجميع التنقّل بثقة
              وراحة
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

              <h4 className="text-primary font-bold text-3xl">الرســالة</h4>
            </div>
            <p className="font-bold text-xl lg:w-[90%] leading-10">
              نعمل على تبسيط تجربة السفر داخل المملكة، من خلال توفير حجز فوري
              وآمن لجميع وسائل النقل، مع ضمان أفضل الأسعار وسهولة الاستخدام في
              كل رحلة{" "}
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
};
