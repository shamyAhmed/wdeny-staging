import { Col, Row } from "antd";
import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

export const AffiliateDashboardStatistics_section = () => {
  return (
    <section className="my-24">
      <Row gutter={[32, 32]}>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">إجمالي الأرباح</span>
            <p className="text-secondary font-bold text-2xl">12,500 ر.س</p>
            <p className="text-[#4BA246]">+18% عن الشهر الماضي </p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon primary">
              <GoPeople />
            </div>
            <span className="text-[#B0B0B3]">عدد الإحالات</span>
            <p className="text-secondary font-bold text-2xl">247</p>
            <p className="text-[#4BA246]">+12 هذا الأسبوع</p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">الرصيد المتاح</span>
            <p className="text-secondary font-bold text-2xl">3,250 ر.س</p>
            <p className="text-[#4BA246]">جاهز للسحب</p>
          </div>
        </Col>{" "}
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon primary">
              <FiShoppingCart />
            </div>
            <span className="text-[#B0B0B3]">الطلبات المكتملة</span>
            <p className="text-secondary font-bold text-2xl">186</p>
            <p className="text-[#4BA246]">+24 هذا الشهر</p>
          </div>
        </Col>{" "}
      </Row>
    </section>
  );
};
