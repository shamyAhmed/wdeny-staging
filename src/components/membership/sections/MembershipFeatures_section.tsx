import { Col, Row } from "antd";
import { FaArrowTrendUp, FaRegStar } from "react-icons/fa6";
import { FiGift } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineLoyalty } from "react-icons/md";
import { PiShoppingBagBold } from "react-icons/pi";

export const MembershipFeatures_section = () => {
  return (
    <section className="membership-features py-24">
      <div className="container">
        <h3 className="text-center text-secondary text-2xl font-bold">
          مميزات الاشتراك{" "}
        </h3>
        <p className="text-center text-lg text-[#9D9DA1] mt-4 mb-10">
          احصل على تجربة فريدة ومميزات لا محدودة عند الانضمام لبرنامج
          العضوية{" "}
        </p>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon primary">
                <PiShoppingBagBold />
              </div>
              <h5 className="text-secondary font-bold text-xl">خصومات حصرية</h5>
              <p className="text-[#B0B0B3]">
                احصل على خصومات تصل إلى 30% على جميع منتجات المتجر{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon secondary">
                <FaArrowTrendUp />{" "}
              </div>
              <h5 className="text-secondary font-bold text-xl">نقاط إضافية</h5>
              <p className="text-[#B0B0B3]">
                اكسب نقاط مضاعفة مع كل عملية شراء{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon primary">
                <FiGift />
              </div>
              <h5 className="text-secondary font-bold text-xl">عروض خاصة </h5>
              <p className="text-[#B0B0B3]">عروض وهدايا حصرية للأعضاء فقط </p>
            </div>
          </Col>{" "}
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon primary">
                <PiShoppingBagBold />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                فعاليات حصرية
              </h5>
              <p className="text-[#B0B0B3]">دعوات لفعاليات ولقاءات اللاعبين </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon secondary">
                <LuBadgeCheck />{" "}
              </div>
              <h5 className="text-secondary font-bold text-xl">نقاط إضافية</h5>
              <p className="text-[#B0B0B3]">أولوية في حجز تذاكر المباريات </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon primary">
                <FaRegStar />
              </div>
              <h5 className="text-secondary font-bold text-xl">عروض خاصة</h5>
              <p className="text-[#B0B0B3]">مقاعد مميزة وخدمات راقية </p>
            </div>
          </Col>{" "}
        </Row>

        <Row gutter={[32, 32]} className="mt-24">
          <Col span={24} lg={6}>
            <div className="feature-card text-center">
              <p className="text-primary font-bold text-3xl">15K+</p>
              <p className="text-[#B0B0B3] text-xl">عضو نشط </p>
            </div>
          </Col>
          <Col span={24} lg={6}>
            <div className="feature-card text-center">
              <p className="text-primary font-bold text-3xl">30%</p>
              <p className="text-[#B0B0B3] text-xl">خصم حصري</p>
            </div>
          </Col>
          <Col span={24} lg={6}>
            <div className="feature-card text-center">
              <p className="text-primary font-bold text-3xl">100+</p>
              <p className="text-[#B0B0B3] text-xl">فعالية سنوية</p>
            </div>
          </Col>
          <Col span={24} lg={6}>
            <div className="feature-card text-center">
              <p className="text-primary font-bold text-3xl">24/7</p>
              <p className="text-[#B0B0B3] text-xl">دعم مستمر</p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
