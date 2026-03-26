import Link from "next/link";
import React from "react";
import { MdOutlineLoyalty } from "react-icons/md";

export const LoyalityProgramBanner_section = () => {
  return (
    <section className="loyality-program-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#FFF0CD] text-[#B59819] px-4 py-2 rounded-[9999px]">
            <MdOutlineLoyalty className="text-lg" /> برنامج المكافآت
          </div>
          <h1 className="text-secondary text-6xl font-bold">
            برنامج ولاء <span className="text-[#096748]">الطائي</span>
          </h1>
          <p className="text-secondary text-xl">
            اكسب نقاط مع كل عملية شراء واستبدلها بمكافآت حصرية ومميزات لا تُنسى
          </p>
          <div className="flex gap-4 sm:flex-col mb-6 max-w-[500px] min-w-[330px]">
            <Link
              href="/how-to-earn-points"
              className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-4 py-2 rounded-lg text-md font-medium transition-colors"
            >
              كيف اكسب المزيد{" "}
            </Link>
            <Link
              href="/user/my-membership"
              className="flex flex-1 items-center gap-4 justify-center bg-transparent hover:bg-transparent border-primary border-2 hover:text-primary text-primary px-4 py-2 rounded-lg text-md font-medium transition-colors"
            >
              عرض عضويتي{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
