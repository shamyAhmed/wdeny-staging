import Image from "next/image";
import { Fa0, FaApplePay } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

export const AllRightRecieved = () => {
  const paymentMethods = [<FaApplePay />, <RiVisaLine />];
  return (
    <div className="bg-[#000D1B] text-white py-6 ">
      <div className="container flex items-center justify-between flex-col md:flex-row gap-2">
        <p>
          جميع الحقوق محفوظة <span className="text-primary"> لمنصة وديني </span>{" "}
          @ {new Date().getFullYear()}
        </p>
        <div className="flex gap-2">
          <Image
            src="/images/logo-white.png"
            alt="Logo"
            width={140}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};
