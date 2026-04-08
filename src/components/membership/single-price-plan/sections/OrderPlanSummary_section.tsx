import { MembershipPlan } from "@/types/types";
import { Link } from "@/i18n/navigation";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FiGift, FiShield } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { LuBadgeCheck } from "react-icons/lu";

interface OrderPlanSummaryProps {
  details: MembershipPlan;
}

export const OrderPlanSummary_section = ({
  details,
}: OrderPlanSummaryProps) => {
  return (
    <section className="order-plan-summary">
      <div className="summary-card">
        <h3 className="bg-primary text-xl font-bold p-6 text-white">
          ملخص الطلب
        </h3>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#B0B0B3]">العضوية</span>
            <span className="text-primary font-bold">
              {details.displayNameAr}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#B0B0B3]">المدة</span>
            <span className="text-primary font-bold">{details.duration}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#B0B0B3]">يبدأ من</span>
            <span className="text-primary font-bold">اليوم</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#B0B0B3]">ينتهي في</span>
            <span className="text-primary font-bold">---</span>
          </div>
          <hr className="my-6 border-[#F3F4F6]" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#B0B0B3]">السعر</span>
            <span className="text-primary">
              {details.price} {details.currency}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#B0B0B3]">الضريبة (15%)</span>
            <span className="text-primary">---</span>
          </div>
          <hr className="my-6 border-[#F3F4F6]" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary font-bold text-xl">الإجمالي</span>
            <span className="text-primary font-bold text-lg">688.85 ر.س</span>
          </div>

          <div className="reward my-4">
            <h5 className="flex items-center gap-2 mb-3 font-bold">
              <FiGift />
              مكافأة الاشتراك
            </h5>
            <ul className="flex gap-2 flex-col">
              <li className="flex items-center gap-2 text-[#B0B0B3]">
                <FaCheck className="text-[#4BA246]" />
                <span className="text-[#B0B0B3]">دفع آمن ومشفر</span>
              </li>
              <li className="flex items-center gap-2 text-[#B0B0B3]">
                <FaCheck />
                <span>شحن سريع خلال 2-3 أيام</span>
              </li>
              <li className="flex items-center gap-2 text-[#B0B0B3]">
                <FaCheck />
                <span>إرجاع مجاني خلال 14 يوم</span>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="flex items-center justify-center w-full bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-2 rounded-lg text-lg font-medium transition-colors text-center "
          >
            متابعة الدفع{" "}
          </Link>
          <Link
            href={"/membership/price-plans"}
            className="font-bold text-[#B0B0B3] block text-center mt-4"
          >
            اختيار عضوية أخرى
          </Link>
        </div>
      </div>
      <ul className="features">
        <li>
          <span>
            <FiShield className="text-[#4BA246] text-xl" />
          </span>
          <span className="text-[#B0B0B3]">دفع آمن</span>
        </li>
        <li>
          <span>
            <IoMdTime className="text-[#4BA246] text-xl" />
          </span>
          <span className="text-[#B0B0B3]">تفعيل فوري</span>
        </li>
        <li>
          <span>
            <LuBadgeCheck className="text-[#4BA246] text-xl" />
          </span>
          <span className="text-[#B0B0B3]">ضمان الجودة</span>
        </li>
      </ul>
    </section>
  );
};
