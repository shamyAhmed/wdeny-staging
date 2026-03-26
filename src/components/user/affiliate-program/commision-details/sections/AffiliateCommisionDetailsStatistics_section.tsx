import { Col, Row } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { MdPercent } from "react-icons/md";

export const AffiliateCommisionDetailsStatistics_section = () => {
  return (
    <section className="mt-24">
      <Row gutter={[32, 32]}>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">إجمالي العمولات</span>
            <p className="text-secondary font-bold text-2xl">12,500 ر.س</p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon primary">
              <MdPercent />
            </div>
            <span className="text-[#B0B0B3]">متوسط نسبة العمولة</span>
            <p className="text-secondary font-bold text-2xl">14.2%</p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">العمولات المكتملة</span>
            <p className="text-secondary font-bold text-2xl">8,450 ر.س</p>
          </div>
        </Col>{" "}
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon primary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">قيد المعالجة</span>
            <p className="text-secondary font-bold text-2xl">4,050 ر.س</p>
          </div>
        </Col>{" "}
      </Row>
    </section>
  );
};
