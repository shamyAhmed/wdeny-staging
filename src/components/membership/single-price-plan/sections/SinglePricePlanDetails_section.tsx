import { MembershipPlan } from "@/types/types";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Row, Col, Button } from "antd";
import { FaCheck, FaRegStar } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";

// const defaultMembership: MembershipPlan = {
//   _id: 1,
//   name: "gold",
//   displayName: "Gold Membership",
//   price: 599,
//   currency: "ريال سعودي",
//   period: "سنويا",
//   metrics: [
//     { label: "خصم دائم", value: "20%" },
//     { label: "مضاعف النقاط", value: "1.5x", special: true },

//     { label: "يوم", value: 365 },
//   ],
//   benefits: [
//     "جميع مزايا العضوية الفضية",
//     "خصم %20 على جميع المنتجات",
//     "مضاعف نقاط 1.5x عند كل شراء",
//     "بطاقة عضوية فخمة مجانا",
//     "دعوة حضور لقاء اللاعبين السنوي",
//     "هدية ترحيبية حصرية",
//     "أولوية في شراء تذاكر الدراري",
//     "بطاقة VIP للمسابقات المنزلية",
//     "خصم %15 على الأكاديمية الرياضية",
//   ],
//   additionalBenefits: [
//     {
//       icon: <GiftOutlined className="text-2xl" />,
//       titleAr: "ضمان استرجاع المبلغ",
//       titleEn: "Money Back Guarantee",
//       description: "إذا لم تكن راضيا خلال 30 يوم",
//     },
//     {
//       icon: <GiftOutlined className="text-2xl" />,
//       titleAr: "هدية ترحيبية",
//       titleEn: "Welcome Gift",
//       description: "مسكة شراء بقيمة 50 ريال",
//     },
//     {
//       icon: <StarOutlined className="text-2xl" />,
//       titleAr: "نقاط ترحيبية",
//       titleEn: "Welcome Points",
//       description: "نقطة مجانية عند التسجيل 750",
//     },
//     {
//       icon: <ClockCircleOutlined className="text-2xl" />,
//       titleAr: "تفعيل فوري",
//       titleEn: "Instant Activation",
//       description: "بعد الاشتراك مباشرة يتم التفعيل",
//     },
//   ],
//   pointsSystem: {
//     title: "نظام النقاط مع عضويتك",
//     description:
//       "كعضو العضوية الذهبية، تسجل على 1.5x نقاط عند كل عملية شراء، كل 10 ريال = 15 نقطة",
//     example: " عند شراء منتج بقيمة 500 ريال، ستحصل على 750 نقطة + خصم 20%",
//   },
//   bgColor: "gold",
//   type: "",
//   discountRate: 0,
//   pointsMultiplier: 0,
// };

export const SinglePricePlanDetails_section = ({
  membership,
  details,
}: {
  membership?: MembershipPlan;
  details: {
    name: string;
    displayName: string;
    displayNameAr: string;
    price: number;
    period: string;
    currency: string;
    discountRate: number;
    pointsMultiplier: number;
    duration: number;
  };
}) => {
  console.log(details, membership);
  return (
    <section className="single-plan-details">
      {/* TODO:change this */}
      <div className={`single-plan single-plan-${details.name}`}>
        {/* Header Section */}
        <div className={`top rounded-t-2xl p-8 text-white`}>
          <div className=" flex justify-between items-start gap-4 mb-8">
            <div className="icon">
              {details.name === "gold" ? (
                <LuCrown />
              ) : details.name === "silver" ? (
                <FaRegStar />
              ) : (
                <IoDiamondOutline />
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1 text-white">
                {details.displayNameAr}
              </h2>
              <p className="text-sm opacity-90">{details.displayName}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-5xl font-bold">{details.price}</span>
            <span className="text-white/80 mr-3">
              / {details.period} {details.currency}
            </span>
          </div>
        </div>

        <div className="p-8">
          {/* Metrics Section */}
          <Row gutter={[24, 24]} justify="space-around">
            <Col xs={24} sm={8}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div className={`text-4xl font-bold text-primary mb-2`}>
                  {details.discountRate}%
                </div>
                <div className="text-sm text-gray-500">خصم دائم</div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div className={`text-4xl font-bold text-[#4BA246] mb-2`}>
                  {details.pointsMultiplier}x
                </div>
                <div className="text-sm text-gray-500">مضاعف النقاط </div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div className={`text-4xl font-bold text-primary mb-2`}>
                  {details.duration}
                </div>
                <div className="text-sm text-gray-500">يوم </div>
              </div>
            </Col>
          </Row>

          {/* Benefits Section */}
          {/* <div className="!border-0 rounded-none">
            <h3 className="text-right text-lg font-bold my-6 text-primary">
              المزايا المتخصصة:
            </h3>
            <div className="space-y-3">
              {details.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaCheck className="text-[#4BA246] text-lg" />
                  <span className="text-[#B0B0B3]">{benefit}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Additional Benefits Section */}
      <div className="additional-benefits">
        <h3 className="text-lg font-bold mb-6 text-primary">
          مزايا إضافية عند الاشتراك:
        </h3>
        <Row gutter={[24, 24]}>
          {/* {membership?.additionalBenefits.map((benefit, idx) => (
            <Col key={idx} xs={24} sm={12}>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-xl p-3 flex items-center justify-center text-xl flex-shrink-0">
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
          ))} */}
        </Row>
      </div>

      {/* Points System Section */}
      <div className={`points-system`}>
        <h3 className="font-bold mb-4 flex items-center gap-2 text-white text-xl">
          <StarOutlined />
          {/* {membership?.pointsSystem.title} */}
        </h3>
        <p className=" mb-4 text-white/90">
          {/* {membership?.pointsSystem.description} */}
        </p>
        <div className="bg-white/10 p-4 rounded-xl">
          <p className="mb-2">مثال:</p>
          {/* <p className="font-bold">{membership?.pointsSystem.example}</p> */}
        </div>
      </div>
    </section>
  );
};
