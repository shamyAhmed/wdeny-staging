import { Col, Row } from "antd";
import { FaPlaneDeparture, FaUsers, FaCity } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";

const STATS = [
  { icon: FaPlaneDeparture, value: "+200,000", label: "رحلات تم حجزها" },
  { icon: FaCity, value: "+120", label: "مدن نغطيها بخدماتنا" },
  { icon: MdStarRate, value: "96%", label: "نسبة رضا عملائنا" },
  { icon: FaUsers, value: "+12,656", label: "عدد عملائنا" },
];

export default function StatsSection() {
  return (
    <div className="container py-12">
      <Row gutter={[16, 32]}>
        {STATS.map(({ icon: Icon, value, label }) => (
          <Col key={label} xs={24} md={12} lg={6}>
            <div className="flex itmes-center gap-3 md:justify-center">
              <div className="relative w-14 h-14 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-red-100" />
                <div className="absolute inset-2 rounded-full bg-red-600 flex items-center justify-center">
                  <Icon size={20} color="white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">{value}</p>
                <p className="text-sm text-gray-400 mt-1">{label}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
