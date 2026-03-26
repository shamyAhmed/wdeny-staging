import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { FaArrowTrendUp, FaChevronLeft, FaRegClock } from "react-icons/fa6";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import PointsItem from "./PointsItems";

const additionalBenefits = [
  {
    icon: <GiftOutlined className="text-2xl" />,
    titleAr: "خصم 20%",
    description: "على جميع المشتريات",
  },
  {
    icon: <FaArrowTrendUp className="text-2xl" />,
    titleAr: "نقاط 1.5x",
    description: "مضاعف النقاط",
  },
  {
    icon: <StarOutlined className="text-2xl" />,
    titleAr: "عروض حصرية",
    description: "للأعضاء فقط",
  },
  {
    icon: <ClockCircleOutlined className="text-2xl" />,
    titleAr: "مزايا VIP",
    description: "وصول مميز",
  },
];

export const AllMembershipDetails_section = () => {
  return (
    <section className="all-membership-details">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <div className="cardS1">
            <div className="mb-5 flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center bg-primary rounded-xl text-white text-2xl">
                <FaArrowTrendUp />
              </div>
              <div className="flex flex-col">
                <span className="text-[#B0B0B3]">رصيد النقاط</span>
                <span className="font-bold text-3xl">3,950</span>
              </div>
            </div>
            <Link
              href="/loyality-program"
              className="w-full flex items-center justify-center bg-transparent  text-primary hover:text-primary border-2 border-primary px-12 py-4 rounded-lg text-lg font-bold"
            >
              عرض نظام النقاط{" "}
            </Link>{" "}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="cardS1">
            <div className="mb-5 flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center bg-[#4BA246] rounded-xl text-white text-2xl">
                <FaRegClock />
              </div>
              <div className="flex flex-col">
                <span className="text-[#B0B0B3]">المدة المتبقية</span>
                <span className="font-bold text-3xl">365</span>
              </div>
            </div>
            <p className="font-bold text-[#B0B0B3]">يوم حتى التجديد</p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="additional-benefits cardS1">
            <h3 className="text-lg font-bold mb-6 text-primary">
              مزاياك الحالية{" "}
            </h3>
            <Row gutter={[24, 24]}>
              {additionalBenefits.map((benefit, idx) => (
                <Col key={idx} xs={24} sm={12}>
                  <div className=" flex items-start gap-4">
                    <div
                      className={`${idx % 2 ? "bg-[#4BA246]" : "bg-primary"} text-white rounded-xl p-3 flex items-center justify-center text-xl`}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary">
                        {benefit.titleAr}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        <Col xs={24}>
          <div className="cardS1">
            <div className="mb-6 flex items-center justify-between">
              <h5 className="font-bold text-xl text-[#111113]">
                النشاط الأخير
              </h5>
              <Link
                href={"/"}
                className="flex items-center gap-2 text-primary font-bold"
              >
                عرض الكل
                <FaChevronLeft />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <PointsItem
                date="10 يناير 2026"
                title="كسب نقاط"
                subtitle="عملية شراء - تيشيرت الطائي"
                points={150}
                type="earn"
              />

              <PointsItem
                date="15 يناير 2026"
                title="استبدال نقاط"
                subtitle="قسيمة خصم 20 ريال"
                points={200}
                type="redeem"
              />

              <PointsItem
                date="15 يناير 2026"
                title="كسب نقاط"
                subtitle="عملية شراء - طقم كامل"
                points={300}
                type="earn"
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Additional Benefits Section */}
    </section>
  );
};
