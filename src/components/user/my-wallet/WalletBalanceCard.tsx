"use client";

import Image from "next/image";
import { LuArrowDownToLine } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";

export const WalletBalanceCard = () => {
  const balance = 2500;

  return (
    <div className="bg-primary rounded-[24px] px-6 py-4 pb-12 flex flex-col items-center justify-center text-white text-center mb-8 relative overflow-hidden mx-auto max-w-md">
      <IoLocationSharp
        className="absolute bottom-2 end-2 opacity-10"
        size={140}
      />

      {/* brand row */}
      <div
        dir="ltr"
        className="flex items-center w-full justify-start gap-2 mb-5 relative z-10"
      >
        <Image
          src="/images/logo-small.png"
          alt="logo"
          height={24}
          width={24}
          className="size-[24px]"
        />
        <p className="font-bold">Wdeny Travel</p>
      </div>

      {/* label */}
      <div className="flex w-full justify-start items-center gap-1.5 text-white/70 text-xs mb-2 relative z-10">
        <LuArrowDownToLine className="text-base" />
        <span>إجمالي رصيدك الحالي</span>
      </div>

      {/* amount */}
      <p className="text-5xl w-full flex items-center mt-5 font-semibold tracking-tight relative z-10">
        {balance.toLocaleString()}
        <span className="text-base ms-2">ريال سعودي</span>
      </p>
    </div>
  );
};
