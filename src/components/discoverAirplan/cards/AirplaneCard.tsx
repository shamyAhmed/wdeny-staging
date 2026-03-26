"use client";
import { useState } from "react";
import { Button, Divider } from "antd";
import { FaChevronDown, FaPlane, FaSuitcase } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import Image from "next/image";
import { TbPointFilled } from "react-icons/tb";
import { FlightDetailsModal } from "../modals/FlightDetailsModal";

interface FlightInfo {
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  date: string;
  flightNumber: string;
  class: string;
}

interface AirplaneCardProps {
  flight: {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    class: string;
    departureTime: string;
    departureCity: string;
    arrivalTime: string;
    arrivalCity: string;
    duration: string;
    price: number;
    currency: string;
    isRefundable: boolean;
    stops: string;
    date: string;
    returnFlight?: FlightInfo;
  };
}
export const AirplaneCard = ({ flight }: AirplaneCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="airplane-card bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-6">
      <div className="flex items-center flex-col md:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Outbound */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary font-bold flex items-center gap-2">
                فصاعدا{" "}
                <span className="text-primary font-normal">
                  على {flight.date}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3  max-w-[180px]">
                <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
                  {/* Placeholder for Airline Logo */}
                  <div className="flex-1 bg-white rounded-sm flex items-center justify-center text-[8px] text-secondary">
                    <Image
                      src={"/images/saudi-airlines-logo.png"}
                      alt="SA Logo"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className=" text-sm text-wrap">{flight.airline}</p>
                  <p className="text-xs text-gray-400">
                    {flight.flightNumber} . {flight.class}
                  </p>
                </div>
              </div>

              <div className="text-center min-w-[80px]">
                <p className="text-xl font-bold">{flight.departureTime}</p>
                <p className="text-sm text-gray-500">{flight.departureCity}</p>
              </div>

              <div className="flex-1 px-8 relative flex flex-col items-center">
                <p className="text-xs text-gray-400 mb-1">{flight.stops}</p>

                <div className="w-full h-[1px] bg-gray-200 relative">
                  <div className="absolute top-1/2 right-0  -translate-y-1/2 ">
                    <TbPointFilled className="text-primary text-lg" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 border border-gray-300 h-[8px] rounded-lg w-20"></div>
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <FaPlane className="text-primary text-xs rotate-180" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  الوقت الكلي : {flight.duration}
                </p>
              </div>

              <div className="text-center min-w-[80px]">
                <p className="text-xl font-bold">{flight.arrivalTime}</p>
                <p className="text-sm text-gray-500">{flight.arrivalCity}</p>
              </div>
            </div>
          </div>

          {/* Return flight if exists */}
          {flight.returnFlight && (
            <div className="pt-6 border-t border-dashed">
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary font-bold flex items-center gap-2">
                  عودة{" "}
                  <span className="text-primary font-normal">
                    على {flight.returnFlight.date}
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3  max-w-[180px]">
                  <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
                    {/* Placeholder for Airline Logo */}
                    <div className="flex-1 bg-white rounded-sm flex items-center justify-center text-[8px] text-secondary">
                      <Image
                        src={"/images/saudi-airlines-logo.png"}
                        alt="SA Logo"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className=" text-sm text-wrap">{flight.airline}</p>
                    <p className="text-xs text-gray-400">
                      {flight.flightNumber} . {flight.class}
                    </p>
                  </div>
                </div>
                <div className="text-center min-w-[80px]">
                  <p className="text-xl font-bold">
                    {flight.returnFlight.departureTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    {flight.returnFlight.departureCity}
                  </p>
                </div>

                <div className="flex-1 px-8 relative flex flex-col items-center">
                  <p className="text-xs text-gray-400 mb-1">{flight.stops}</p>

                  <div className="w-full h-[1px] bg-gray-200 relative">
                    <div className="absolute top-1/2 right-0  -translate-y-1/2 ">
                      <TbPointFilled className="text-primary text-lg" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 border border-gray-300 h-[8px] rounded-lg w-20"></div>
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      <FaPlane className="text-primary text-xs rotate-180" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    الوقت الكلي : {flight.returnFlight.duration}
                  </p>
                </div>

                <div className="text-center min-w-[80px]">
                  <p className="text-xl font-bold">
                    {flight.returnFlight.arrivalTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    {flight.returnFlight.arrivalCity}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Actions */}
        <div
          className={`flex flex-col h-full  ${flight.returnFlight ? "min-h-[300px]" : "min-h-[200px]"}`}
        >
          <div className="w-full flex-1 md:w-[220px] bg-primary flex flex-col items-center justify-center p-6 text-white text-center relative">
            <p className="text-lg font-bold mb-1">
              {flight.price} {flight.currency}
            </p>
            <p className="text-[12px] opacity-80 mb-4 font-bold">
              قابل للاسترجاع
            </p>
            <p className="text-[12px]  mb-4">الطيران السعودي</p>
            <Button
              onClick={() => setExpanded(!expanded)}
              className="w-full rounded-xl bg-white text-primary border-none font-bold h-10 hover:!bg-gray-100"
            >
              اختيار الرحلة
            </Button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center font-bold text-center gap-1 text-md opacity-90 hover:opacity-100 transition-opacity bg-[#E9EDF0] w-full h-[40px]"
          >
            تفاصيل الرحلة
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="bg-[#FBFAFA] p-8 border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="max-w-[400px] mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center mb-6">
              <h5 className="font-bold text-lg mb-1">Basic ECO</h5>
              <p className="text-xs text-gray-400">فئة الحجز : سياحية</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-sm">
                القاهرة (CAI) - جدة (JED)
              </span>
            </div>

            <Divider className="my-4" />

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500">
                    الوزن المسموح به
                  </span>
                  <FaSuitcase className="text-gray-400" />
                </div>
                <p
                  className="text-[10px] text-gray-400 leading-relaxed text-left"
                  dir="ltr"
                >
                  Baggage Allowance: 1P, BAGGAGE DISCOUNTS MAY APPLY BASED ON
                  FREQUENT FLYER STATUS / ONLINE CHECKIN/FORM OF
                  PAYMENT/MILITARY/ETC.. UPTO 50LB/23KG AND UPTO 62LI/158LCM,
                  PRE PAID BAGGAGE Cabin Baggage Allowance: 1P, UPTO 15LB/7KG
                  AND UPTO 45LI/115LCM
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">نوع السعر</span>
                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                  قابل للاسترجاع
                  <IoCheckmarkCircle className="text-lg" />
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">قابل للتغيير</span>
                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                  قابل للاسترجاع
                  <IoCheckmarkCircle className="text-lg" />
                </span>
              </div>
            </div>

            <Divider className="my-6" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-black text-primary">
                {flight.price}
              </span>
              <span className="text-sm text-gray-400 font-bold">
                {flight.currency}
              </span>
            </div>

            <Button
              type="primary"
              className="w-full rounded-xl h-11 font-bold text-lg"
            >
              احجز الان
            </Button>
          </div>
        </div>
      )}

      {/* Flight Details Modal */}
      <FlightDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
      />
    </div>
  );
};
