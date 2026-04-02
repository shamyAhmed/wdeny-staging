"use client";
import { Col, Row } from "antd";
import Image from "next/image";

export const AboutUsSection = () => {
  return (
    <section className="bg-[#FBFBFD] py-20">
      <div className="container">
        <Row gutter={[50, 50]}>
          <Col span={24} lg={7}>
            <div dir="ltr" className="bg-white rounded-3xl min-w-fit h-full flex items-center justify-center py-6">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/logo-small.png"}
                  alt="Wdeny logo"
                  width={58}
                  height={58}
                  className="size-[58]"
                />
                <h3 className="text-primary text-2xl text-nowrap font-bold">Wdeny Travel</h3>
              </div>
            </div>
          </Col>
          <Col span={24} lg={17}>
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
