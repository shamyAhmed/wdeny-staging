import React from "react";
import { FiChevronLeft, FiRefreshCw } from "react-icons/fi";
import { AiOutlineCrown } from "react-icons/ai";
import { BsAward, BsGem, BsCheckCircle } from "react-icons/bs";
import { LuCrown } from "react-icons/lu";
import { Link } from "@/i18n/navigation";

export const FastActions_section: React.FC = () => {
  return (
    <section className="fast-actions flex flex-col gap-8">
      <div className="cardS1">
        <h3 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h3>

        <div className="space-y-3">
          {/* Renew Membership */}
          <button className="w-full flex items-center justify-between bg-gradient-to-b from-green-500 to-green-600 text-white rounded-xl px-4 py-3 font-medium">
            <div className="flex items-center gap-2">
              <FiRefreshCw className="text-lg" />
              <span>تجديد العضوية</span>
            </div>
            <FiChevronLeft className="text-lg" />
          </button>

          {/* Upgrade to Diamond */}
          <button className="w-full flex items-center justify-between bg-slate-600 text-white rounded-xl px-4 py-3 font-medium">
            <div className="flex items-center gap-2">
              <LuCrown className="text-lg" />
              <span>ترقية للعضوية الماسية</span>
            </div>
            <FiChevronLeft className="text-lg" />
          </button>

          {/* Points System */}
          <Link
            href={"/loyality-program"}
            className="w-full flex items-center justify-between border border-slate-400 text-slate-700 rounded-xl px-4 py-3 font-medium"
          >
            <div className="flex items-center gap-2">
              <BsAward className="text-lg" />
              <span>نظام النقاط</span>
            </div>
            <FiChevronLeft className="text-lg" />
          </Link>
        </div>
      </div>

      <div className="upgrade-card ">
        <div className="flex items-center gap-4 mb-4">
          <BsGem className="text-3xl opacity-90" />

          <div>
            <p className="text-sm opacity-90 mb-1">قم بالترقية إلى</p>
            <h3 className="text-xl text-white font-bold">العضوية الماسية</h3>
          </div>
        </div>

        <ul className="space-y-3 text-sm mb-6">
          <li className="flex items-center gap-2">
            <BsCheckCircle />
            <span>خصم 30% بدلًا من 20%</span>
          </li>
          <li className="flex items-center gap-2">
            <BsCheckCircle />
            <span>نقاط 2x بدلًا من 1.5x</span>
          </li>
          <li className="flex items-center gap-2">
            <BsCheckCircle />
            <span>مزايا إضافية حصرية</span>
          </li>
        </ul>

        <button className="w-full bg-white text-green-700 rounded-xl py-3 font-semibold hover:bg-gray-50 transition">
          ترقية الآن
        </button>
      </div>

      <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#F3F4F6]">
        <h3 className="text-lg font-bold text-gray-900 mb-2">تحتاج مساعدة؟</h3>
        <p className="text-gray-400 text-sm mb-4">
          فريق الدعم جاهز لمساعدتك في أي وقت
        </p>

        <button className="w-full border border-slate-400 text-slate-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition">
          تواصل معنا
        </button>
      </div>
    </section>
  );
};
