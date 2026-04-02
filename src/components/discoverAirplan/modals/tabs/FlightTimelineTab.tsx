"use client";
import Image from "next/image";
import { FaPlane } from "react-icons/fa";

export const FlightTimelineTab = ({ flight }: { flight: any }) => {
  const routeTitle = `${flight?.departureCity ?? "القاهرة"} إلى ${flight?.arrivalCity ?? "حائل"}`;
  const dateLabel = flight?.date ?? "05 مارس 2026";
  const durationLabel = flight?.duration ?? "5 س : 50 د";

  const segments = [
    {
      id: "outbound",
      departTime: "10:30",
      arriveTime: "14:05",
      departDate: "5 مارس",
      arriveDate: "5 مارس",
      stopBadge: "20 د",
      stopPrefix: "ر.س",
      fromTitle: "القاهرة (CAI) قاهرة مطار دولي",
      fromSubTitle: "القاهرة . صالة المطار 3",
      toTitle: "الرياض (RUH) رياض الملك خالد مطار دولي",
      toSubTitle: "الرياض، السعودية . صالة المطار 1",
    },
    {
      id: "inbound",
      departTime: "10:30",
      arriveTime: "14:05",
      departDate: "5 مارس",
      arriveDate: "5 مارس",
      stopBadge: "25 د",
      stopPrefix: "ر.س",
      fromTitle: "الرياض (RUH) رياض الملك خالد مطار دولي",
      fromSubTitle: "الرياض، السعودية . صالة المطار 1",
      toTitle: "حائل (HAS) مطار حائل الدولي",
      toSubTitle: "حائل، السعودية . صالة المطار 1",
    },
  ];

  return (
    <div className="flight-timeline">
      <div className="mb-8 border-b border-[#e9e9e9] pb-4">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl mb-2">
          <span>{routeTitle}</span>
          <FaPlane className="text-lg" />
        </div>
        <div className="flex items-center justify-between text-[#888] text-sm">
          <span>{dateLabel}</span>
          <span>المدة الإجمالية: {durationLabel}</span>
        </div>
      </div>

      <div className="space-y-7">
        {segments.map((segment, idx) => (
          <div key={segment.id}>
            <div className="grid grid-cols-[70px_54px_1fr] sm:grid-cols-[84px_62px_1fr] gap-2 sm:gap-4">
              <div className="flex flex-col justify-between text-right min-h-[188px] py-1">
                <div>
                  <p className="text-xl leading-none text-[#666]">
                    {segment.departTime}
                  </p>
                  <p className="text-xs text-[#9b9b9b]">
                    {segment.departDate}.
                  </p>
                </div>


                <div>
                  <p className="text-xl leading-none text-[#666]">
                    {segment.arriveTime}
                  </p>
                  <p className="text-xs text-[#9b9b9b]">
                    {segment.arriveDate}.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col items-center justify-between py-1 min-h-[188px]">
                <div className="absolute top-4 bottom-4 w-[1.5px] bg-[#d2d2d2]" > 
                <span className="inline-flex absolute top-1/2 -translate-y-1/2 w-fit text-nowrap items-center justify-center self-end h-8 min-w-[72px] left-full rounded-s-full bg-primary text-white text-xs px-4">
                  {segment.stopPrefix} {segment.stopBadge}
                </span>

                </div>
                <span className="relative z-10 size-8 rounded-full bg-primary" />
                <span className="relative z-10 size-8 rounded-full bg-primary" />
              </div>

              <div className="text-right space-y-5">
                <div>
                  <p className="text-base sm:text-lg leading-none text-[#777] font-light">
                    {segment.fromTitle}
                  </p>
                  <p className="text-xs text-[#9b9b9b]">
                    {segment.fromSubTitle}
                  </p>
                </div>

                <div className="flex items-center gap-5 py-1">
                  <div className="relative w-[132px] h-[54px] shrink-0">
                    <Image
                      src="/images/partners/saudi-airlines.png"
                      alt="Saudia"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#8d8d8d] leading-6 text-right">
                    <p>وجبات: No Meals</p>
                    <p>تسجيل الحقائب: بالغ PC,0</p>
                    <p>أمتعة اليد: بالغ 7kg</p>
                    <p>رقم الرحلة الجوية xv 0264</p>
                    <p>حجز الدرجة: E</p>
                  </div>
                </div>

                <div>
                  <p className="text-base sm:text-lg leading-none text-[#777] font-light">
                    {segment.toTitle}
                  </p>
                  <p className="text-xs text-[#9b9b9b]">{segment.toSubTitle}</p>
                </div>
              </div>
            </div>

            {idx === 0 && (
              <div className="bg-[#edd0d0] rounded-xl text-center text-sm text-[#6b6b6b] py-3 mt-5">
                وقت الترانزيت: الرياض، 2 س : 50 د
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
