import React from "react";
import { Row, Col } from "antd";

interface AffiliateStep {
  id: number;
  titleAr: string;
  descriptionAr: string;
}

const affiliateSteps: AffiliateStep[] = [
  {
    id: 1,
    titleAr: "سجل في البرنامج",
    descriptionAr: "قم بالتسجيل والتوصيل وإنشاء حساب أميني مجاني",
  },
  {
    id: 2,
    titleAr: "احصل على رابط الإحالة",
    descriptionAr: "احصل على رابط فريد لتشاركه مع متابعيك",
  },
  {
    id: 3,
    titleAr: "شارك واجبد الكسب",
    descriptionAr: "شارك الرابط وأجبد عمولة على كل عملية شراء",
  },
  {
    id: 4,
    titleAr: "اسحب أرباحك",
    descriptionAr: "اسحب أرباحك لحسابك البنكي",
  },
];

export const HowAffiliateProgramWorks_section = () => {
  return (
    <div className="cardS1 container my-24">
      <div className="py-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 mt-4">
          كيف يعمل البرنامج؟
        </h2>

        {/* Steps Container */}
        <Row gutter={[16, 32]} justify="center" className="w-full">
          {affiliateSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Card */}
              <Col xs={24} sm={12} md={6}>
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Circle with Number */}
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {step.id}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 text-center">
                    {step.titleAr}
                  </h3>

                  {/* Description */}
                  <p className=" text-[#B0B0B3] text-center leading-relaxed">
                    {step.descriptionAr}
                  </p>
                </div>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </div>
    </div>
  );
};
