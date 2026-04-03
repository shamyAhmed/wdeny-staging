"use client";
import Image from "next/image";
import { Button, Divider } from "antd";
// Row/Col removed — using flex layout per design requirement
import { FaCheck, FaDownload } from "react-icons/fa6";
import { PageBannerSection } from "@/components/tools/sections/PageBannerSection";
import style from "@/components/discover/styles/discover.module.scss";
import "../../styles/airplane-discover.scss";

// RTL: first child → RIGHT, last child → LEFT
// Label (right) first, Value (left) last
const InfoRow = ({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-400 text-sm">{label}</span>
    <span
      className={`font-bold text-base ${valueClassName || "text-[#111113]"}`}>
      {value}
    </span>
  </div>
);

export const InvoiceComponent = () => {
  return (
    <main className={style.discover}>
      <PageBannerSection
        title="تذكرة الحجز"
        currentLink="/discover-airplan/booking"
        currentPage="احجز الان"
      />

      <div className="container py-12">
        <div className="flex gap-6 mb-16 items-start flex-col lg:flex-row">
          <div className="flex-1 w-full shrink-0 bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-7 pt-7 pb-7">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl font-bold text-[#111113]">
                  تذكرة حجز الباص
                </h2>
                <div className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-full">
                  <span className="text-xs font-normal opacity-90">
                    كود الدفع
                  </span>
                  <span className="font-bold text-base">321352</span>
                </div>
              </div>

              <Divider className="!my-0" />

              {/* Info rows */}
              <div className="mt-6 space-y-5">
                <InfoRow
                  label="نوع الرحلة"
                  value="رحلة ذهاب"
                />
                <InfoRow
                  label="وقت العملية"
                  value="الأربعاء 15 أكتوبر 2025"
                />
                <InfoRow
                  label="رقم المقعد"
                  value="23"
                  valueClassName="text-primary"
                />
              </div>
            </div>

            <Divider className="!my-0 !mx-0" />

            {/* ── Section 2: Route ── */}
            <div className="px-7 py-7">
              {/* RIGHT (first): direction + date + time | LEFT (last): city + badge rows */}
              <div className="flex items-start justify-between">
                {/* RIGHT: green label + date + big time */}
                <div className="flex flex-col space-y-3 items-start gap-1">
                  <span className="text-[#22863a] font-bold text-lg flex items-center gap-1">
                    <div className="flex justify-center items-center bg-[#22863a] rounded size-5 me-2">
                      <FaCheck
                        size={11}
                        className="text-white"
                      />
                    </div>
                    رحلة ذهاب
                  </span>
                  <p className="text-gray-400 text-sm">
                    الأربعاء 15 أكتوبر 2025
                  </p>
                  <span>
                    <span className="text-black font-bold me-2 text-xl leading-tight mt-1">
                      12:00
                    </span>
                    <span className="text-gray-400 text-lg">صباحاً</span>
                  </span>
                </div>

                {/* LEFT: from/to city rows */}
                <div className="flex flex-col gap-4">
                  {/* "عن جدة" — text (RIGHT, first) | badge (LEFT, last) */}
                  <div className="flex items-center gap-3">
                    <p className="flex text-sm gap-2">
                      <span className="text-gray-400 w-4 text-xs block">من</span>
                      <span className="font-bold text-[#111113] w-10">جدة</span>
                    </p>
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        القللى
                    </span>
                  </div>
                  {/* "إلى الدمام" */}
                  <div className="flex items-center gap-3">
                    <p className="flex text-sm gap-2">
                      <span className="text-gray-400 w-4 text-xs block">الى</span>
                      <span className="font-bold text-[#111113] w-10">الدمام</span>
                    </p>
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        القللى
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Divider className="!my-0 !mx-0" />

            {/* ── Section 3: Payment + Pricing ── */}
            <div className="px-7 py-7 space-y-5">
              {/* طريقة الدفع — standalone right-aligned gray label */}
              <p className="text-gray-400 text-sm">طريقة الدفع</p>

              {/* فوري/أمان (RIGHT, first) | icons (LEFT, last) */}
              <div className="flex !mt-2 items-center gap-4">
                <span className="text-primary font-semibold text-lg">
                  فوري/أمان
                </span>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/payments/payment-4.png"
                    alt="payment card"
                    width={32}
                    height={26}
                    className="object-contain h-6 w-8"
                  />
                  <Image
                    src="/images/payments/payment-3.png"
                    alt="payment card"
                    width={32}
                    height={26}
                    className="object-contain h-6 w-8"
                  />
                </div>
              </div>

              {/* Pricing: label (RIGHT, first) | bold value (LEFT, last) */}
              <div className="space-y-4 text-base font-semibold">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-lg font-normal">
                    سعر تذكرة الذهاب
                  </span>
                  <span className="font-bold text-black">200 SAR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-lg font-normal">
                    الخصم
                  </span>
                  <span className="font-bold text-black">0 SAR</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span className="font-bold text-[#111113] text-lg">
                    الإجمالي
                  </span>
                  <span className="text-primary font-bold text-xl">
                    240 SAR
                  </span>
                </div>
              </div>
            </div>

            <Divider className="!my-0 !mx-0" />

            {/* ── Section 4: Passenger info ── */}
            <div className="px-7 py-7 space-y-5">
              {/* Standalone gray label — same style as طريقة الدفع */}
              <p className="text-gray-400 text-sm text-right">بيانات المسافر</p>

              <InfoRow
                label="الاسم بالكامل"
                value="كمال مصطفى"
              />
              <InfoRow
                label="رقم الجوال المحمول"
                value="00965058436554"
              />
              <InfoRow
                label="البريد الإلكتروني"
                value="Abdoelziady@gmail.com"
              />
            </div>
          </div>

          {/* ── SECOND in DOM → LEFT in RTL: QR + Instructions ── */}
          <div className="flex-1 w-full flex flex-col gap-5">
            {/* Barcode card */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
              <div className="w-full mb-4 flex justify-center">
                <Image
                  src="/images/bar-code.png"
                  alt="Barcode"
                  width={200}
                  height={100}
                  className="object-center object-contain"
                />
              </div>

              {/* Serial & date: label (RIGHT, first) | value (LEFT, last) */}
              <div className="w-full space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">الرقم التسلسلي</span>
                  <span className="font-semibold text-[#111113]">
                    1234567892
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">تاريخ الإصدار</span>
                  <span className="font-semibold text-[#111113]">
                    02/01/2025
                  </span>
                </div>
              </div>

              <Button
                type="primary"
                icon={<FaDownload size={13} />}
                className="!w-full !rounded-full !font-bold !h-10 flex items-center justify-center gap-2">
                تحميل التذكرة
              </Button>
            </div>

            {/* Trip instructions */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6">
              <h4 className="font-bold text-[#111113] text-base text-right mb-4">
                تعليمات الرحلة
              </h4>
              <ul className="space-y-2">
                {[
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلةراجع تاريخ وموعد الرحلةراجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلةراجع تاريخ وموعد الرحلةراجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    <span className="text-right">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complaints */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6">
              <h4 className="font-bold text-[#111113] text-base text-right mb-4">
                للأستفسارات والشكاوى
              </h4>
              <ul className="space-y-2">
                {[
                  "راجع تاريخ وموعد الرحلةراجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلة",
                  "راجع تاريخ وموعد الرحلةراجع تاريخ وموعد الرحلة",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    <span className="text-right">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
