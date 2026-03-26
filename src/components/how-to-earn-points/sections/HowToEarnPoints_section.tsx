import { Col, Row } from "antd";
import { CiCalendar } from "react-icons/ci";
import { FaPercent, FaRegStar } from "react-icons/fa6";
import { FiGift } from "react-icons/fi";
import { GoPersonAdd } from "react-icons/go";
import { MdOutlineShare } from "react-icons/md";
import { PiShoppingBagBold } from "react-icons/pi";

export const HowToEarnPoints_section = () => {
  return (
    <section className="how-earn-points py-20">
      <div className="container">
        <h3 className="text-center text-secondary mb-8 text-2xl font-bold">
          طرق كسب النقاط الرئيسية{" "}
        </h3>

        <Row gutter={[24, 24]}>
          <Col span={24} lg={8}>
            <div className="how-earn-points-card">
              <div className="icon primary">
                <PiShoppingBagBold />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                التسوق من المتجر
              </h5>
              <p className="font-bold text-[#B0B0B3]">
                <span className="text-4xl text-[#58BC52]">15</span>
                نقطة
              </p>
              <p className=" text-[#B0B0B3]">كل 10 ريال تنفقها في المتجر</p>
              <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                <span className="text-[#B0B0B3]">مثال:</span>
                <span> عند شراء منتج بـ 500 ريال = 750 نقطة</span>{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-earn-points-card">
              <div className="icon secondary">
                <GoPersonAdd />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                الاشتراك في العضوية{" "}
              </h5>
              <p className="font-bold text-[#B0B0B3]">
                <span className="text-4xl text-[#58BC52]">750</span>
                نقطة
              </p>
              <p className=" text-[#B0B0B3]">عند الاشتراك في أي عضوية</p>
              <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                <span className="text-[#B0B0B3]">مثال:</span>
                <span> مكافأة ترحيبية فورية</span>{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-earn-points-card">
              <div className="icon primary">
                <CiCalendar />
              </div>
              <h5 className="text-secondary font-bold text-xl">عيد ميلادك </h5>
              <p className="font-bold text-[#B0B0B3]">
                <span className="text-4xl text-[#58BC52]">300</span>
                نقطة
              </p>
              <p className=" text-[#B0B0B3]">نقاط مجانية في يوم ميلادك</p>
              <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                <span className="text-[#B0B0B3]">مثال:</span>
                <span> هدية سنوية من نادي الطائي</span>{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-earn-points-card">
              <div className="icon secondary">
                <MdOutlineShare />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                دعوة الأصدقاء{" "}
              </h5>
              <p className="font-bold text-[#B0B0B3]">
                <span className="text-4xl text-[#58BC52]">150</span>
                نقطة
              </p>
              <p className=" text-[#B0B0B3]">عن كل صديق يقوم بالشراء</p>
              <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                <span className="text-[#B0B0B3]">مثال:</span>
                <span> شارك رمز الإحالة الخاص بك</span>{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-earn-points-card">
              <div className="icon primary">
                <FiGift />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                العروض الموسمية{" "}
              </h5>
              <p className="font-bold text-[#B0B0B3]">
                <span className="text-4xl text-[#58BC52]">متغير</span>
                نقطة
              </p>
              <p className=" text-[#B0B0B3]">نقاط مضاعفة في المناسبات</p>
              <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                <span className="text-[#B0B0B3]">مثال:</span>
                <span> عروض خاصة طوال العام</span>{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-earn-points-card">
              <div className="icon secondary">
                <FaRegStar />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                تقييم المنتجات{" "}
              </h5>
              <p className="font-bold text-[#B0B0B3]">
                <span className="text-4xl text-[#58BC52]">30</span>
                نقطة
              </p>
              <p className=" text-[#B0B0B3]">عن كل تقييم تكتبه</p>
              <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                <span className="text-[#B0B0B3]">مثال:</span>
                <span> ساعدنا في تحسين الخدمة</span>{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
