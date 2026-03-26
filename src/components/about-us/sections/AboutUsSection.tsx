"use client";
import { Col, Row } from "antd";
import Image from "next/image";

export const AboutUsSection = () => {
  return (
    <section className="bg-[#FBFBFD] py-20">
      <div className="container">
        <Row gutter={[50, 50]}>
          <Col span={24} lg={6}>
            <div className="bg-white rounded-3xl h-full flex items-center justify-center">
              <Image
                src={"/images/logo-s2.png"}
                alt="loog"
                width={198}
                height={116}
              />
            </div>
          </Col>
          <Col span={24} lg={18}>
            <div className="">
              <h4 className="text-primary text-lg mb-2">عن وديني</h4>
              <p className="font-bold text-2xl mb-6">
                ودّيني هي منصة وموقع يسهّل تخطيط رحلاتك، من خلال حجز الإقامة
                بسهولة عبر منصتنا. قارن بين خيارات النقل، الأسعار، والتواريخ،
                واحجز رحلتك كاملة وأنت مرتاح من بيتك
              </p>
              <p className="text-xl mb-6">
                شركة رائدة في مجال النقل بالمملكة، أحدثت تغييرات كبيرة في
                القطاع.
              </p>
              <p className="text-xl">
                نسهل عليك تجربة السفر، ابحث عن تذاكر الطيران، الباصات، والسيارات
                الخاصة اللي ما تلقاها في أي مكان ثاني
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
