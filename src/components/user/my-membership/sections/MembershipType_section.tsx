import { MembershipPlan } from "@/types/types";
import { Col, Row } from "antd";
import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";

// const defaultMembership: MembershipPlan = {
//   _id: 1,
//   type: "gold",
//   name: "Gold Membership",
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
//       titleAr: "ضمان استرجاع المبلغ",
//       titleEn: "Money Back Guarantee",
//       description: "إذا لم تكن راضيا خلال 30 يوم",
//     },
//     {
//       titleAr: "هدية ترحيبية",
//       titleEn: "Welcome Gift",
//       description: "مسكة شراء بقيمة 50 ريال",
//     },
//     {
//       titleAr: "نقاط ترحيبية",
//       titleEn: "Welcome Points",
//       description: "نقطة مجانية عند التسجيل 750",
//     },
//     {
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
//   displayName: "",
//   discountRate: 0,
//   pointsMultiplier: 0,
// };

export const MembershipType_section = ({
  membership,
}: {
  membership: MembershipPlan;
}) => {
  return (
    <section className={`single-plan single-plan-${membership?.type}`}>
      <div className={`top rounded-t-2xl p-8 text-white`}>
        <div className=" flex justify-between items-start gap-4 mb-8">
          <div className="flex-1">
            <h4 className="text-white/80">نادي الطائي</h4>
            <h2 className="text-3xl font-bold my-2 text-white">
              {membership?.displayName}
            </h2>
            <p className="text-sm opacity-90">{membership?.name}</p>
          </div>
          <div className="icon">
            {membership?.type === "gold" ? (
              <LuCrown />
            ) : membership?.type === "silver" ? (
              <FaRegStar />
            ) : (
              <IoDiamondOutline />
            )}
          </div>
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-white/70 mb-2">رقم العضوية</div>
              <div className="text-xl font-bold text-white">TAI-3742</div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-white/70 mb-2">تاريخ البدء</div>
              <div className="text-xl font-bold text-white">1 يناير 2026</div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-white/70 mb-2">تاريخ الانتهاء</div>
              <div className="text-xl font-bold text-white">30 دسيمبر 2026</div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-white/70 mb-2">الحالة</div>
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <span className="w-2 h-2 block rounded-full bg-[#22C55E]" />
                نشطة
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
