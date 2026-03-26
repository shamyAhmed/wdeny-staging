import { Col, Row } from "antd";
import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

export const AffiliateWithdrawingStatistics_section = () => {
  return (
    <section className="mt-24">
      <Row gutter={[32, 32]}>
        <Col span={24} lg={8}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">الرصيد المتاح للسحب</span>
            <p className="text-secondary font-bold text-2xl">12,500 ر.س</p>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <div className="cardS1">
            <div className="icon primary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">الحد الأدنى للسحب</span>
            <p className="text-secondary font-bold text-2xl">247</p>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">إجمالي المسحوبات</span>
            <p className="text-secondary font-bold text-2xl">3,250 ر.س</p>
          </div>
        </Col>{" "}
      </Row>
    </section>
  );
};
