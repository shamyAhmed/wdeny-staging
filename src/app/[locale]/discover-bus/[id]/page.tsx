"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import useGetSeats from "@/app/[locale]/_hooks/useGetSeats";
import useCreateTicket from "@/app/[locale]/_hooks/useCreateTicket";
import useCreateReturnTicket from "@/app/[locale]/_hooks/useCreateReturnTicket";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import SeatMap from "./_components/SeatMap";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { Button, Checkbox } from "antd";
import { Link } from "@/i18n/navigation";
import { PiBusBold } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";

// ── Booking Summary Panel ─────────────────────────────────────────────────────

const BookingSummaryPanel = ({
  seatCount,
  selectedSeats,
}: {
  seatCount: number;
  selectedSeats: string[];
}) => {
  const journey    = useSelector((state: RootState) => state.busJourney.journey)!;
  const bookingId  = useSelector((state: RootState) => state.busJourney.booking_id);
  const { isAuthenticated } = useGetUserProfile();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [agreed, setAgreed] = useState(false);

  const tripType = searchParams.get("trip_type") ?? "one-way";
  const returnDate = searchParams.get("return_date") ?? undefined;

  const { mutate: createTicket, isPending: creatingTicket } = useCreateTicket(journey.tripId, {
    tripType,
    returnDate,
  });
  const { mutate: createReturnTicket, isPending: creatingReturn } = useCreateReturnTicket(journey.tripId);
  const isPending = creatingTicket || creatingReturn;

  const seatPrice = journey.price;
  const total = seatPrice * seatCount;

  const handleConfirm = () => {
    const payload = {
      date: journey.date,
      from_city_id: journey.fromCityId,
      from_location_id: journey.fromLocationId,
      to_city_id: journey.toCityId,
      to_location_id: journey.toLocationId,
      seats: selectedSeats.map((id) => ({ seat_type_id: id, seat_id: id })),
    };
    if (bookingId) {
      createReturnTicket(payload);
      return;
    }
    createTicket(payload);
  };

  const query = searchParams.toString();
  const fullPath = query ? `${pathname}?${query}` : pathname;
  const loginHref = {
    pathname: "/auth/login" as const,
    query: { redirect: fullPath, provider: "safaria" },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Map placeholder */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <p className="text-base font-bold text-gray-900 px-4 pt-4 pb-2">
          الموقع على الخريطة
        </p>
        <div className="relative w-full h-[180px]">
          <Image
            src="/images/map.png"
            alt="map"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Company + Route */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4">
        {/* Company */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
            {journey.companyAvatar ? (
              <Image
                src={journey.companyAvatar}
                alt={journey.company}
                width={40}
                height={40}
                className="object-contain p-1"
              />
            ) : (
              <PiBusBold
                size={20}
                className="text-primary"
              />
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base">
              {journey.company}
            </p>
            <p className="text-xs text-gray-400">{journey.category}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center w-full gap-3">
          {/* From city */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white bg-primary rounded-full px-2 py-0.5 leading-none">
                من
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {journey.fromCityName}
              </span>
            </div>
            {journey.fromStationName && (
              <span className="text-[10px] text-white bg-primary rounded-full px-2 py-1 self-start">
                {journey.fromStationName}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <IoCalendarOutline size={11} />
              <span>
                {journey.date} — {journey.departureTime}
              </span>
            </div>
          </div>

          {/* Connector line */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <PiBusBold
              className="text-primary"
              size={20}
            />
            <div className="flex items-center w-full">
              <div className="w-2 h-2 rounded-full shrink-0 border-2 border-gray-300 bg-white" />
              <div className="flex-1 h-px bg-gray-200" />
              <div className="w-2 h-2 rounded-full shrink-0 bg-primary border-2 border-primary/20" />
            </div>
          </div>

          {/* To city */}
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white bg-gray-400 rounded-full px-2 py-0.5 leading-none">
                إلى
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {journey.toCityName}
              </span>
            </div>
            {journey.toStationName && (
              <span className="text-[10px] text-white bg-primary rounded-full px-2 py-1 self-end">
                {journey.toStationName}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <span>
                {journey.arrivalTime} — {journey.date}
              </span>
              <IoCalendarOutline size={11} />
            </div>
          </div>
        </div>
      </div>

      {/* Passengers count */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center justify-between">
        <p className="text-base font-bold text-gray-900">عدد المسافرين</p>
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          {seatCount}
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">سعر المقعد</span>
          <span className="text-gray-500 text-sm font-medium">
            {seatPrice} EGP
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">عدد المقاعد</span>
          <span className="text-gray-500 text-sm font-medium">{seatCount}</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">الإجمالي</span>
          <span className="text-primary text-lg font-bold">{total} EGP</span>
        </div>
      </div>

      {/* Terms + Confirm */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                الموافقة على{" "}
                <span className="text-primary cursor-pointer underline">
                  الشروط والأحكام
                </span>
              </span>
            </div>
            <Button
              type="primary"
              block
              loading={isPending}
              disabled={!agreed || seatCount === 0}
              onClick={handleConfirm}
              className="!rounded-xl !h-12 !text-base !font-bold">
              تأكيد {seatCount} مقعد
            </Button>
          </>
        ) : (
          <Link href={loginHref}>
            <Button
              block
              className="!rounded-xl !h-12 !text-base !font-bold !bg-orange-500 !text-white !border-orange-500 hover:!bg-orange-400">
              سجّل دخولك للمتابعة
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const DiscoverBusSeatPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  const journey = useSelector((state: RootState) => state.busJourney.journey);

  const fromCityId = searchParams.get("from_city_id") ?? undefined;
  const toCityId = searchParams.get("to_city_id") ?? undefined;
  const fromLocationId = searchParams.get("from_location_id") ?? undefined;
  const toLocationId = searchParams.get("to_location_id") ?? undefined;
  const date = searchParams.get("date") ?? undefined;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  const { data } = useGetSeats(id, {
    from_city_id: fromCityId,
    to_city_id: toCityId,
    from_location_id: fromLocationId,
    to_location_id: toLocationId,
    date,
  });

  useEffect(() => {
    if (!journey) {
      router.replace("/");
    }
  }, [journey, router]);

  if (!journey) return null;

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-sm gap-3">
        <h2 className="text-xl font-bold text-gray-900">اختيار مقعدك</h2>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">المقعد خاصتك</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">متاحة</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600">محجوزة</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left — seat map */}
        <div className="flex-1 bg-white w-full rounded-2xl shadow-sm p-0 sm:p-6 min-h-[400px]">
          {data ? (
            <SeatMap
              data={data}
              selectedSeats={selectedSeats}
              onToggleSeat={toggleSeat}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-sm">
              جاري تحميل المقاعد...
            </div>
          )}
        </div>

        {/* Right — booking summary */}
        <div className="flex-1 w-full">
          <BookingSummaryPanel
            seatCount={selectedSeats.length}
            selectedSeats={selectedSeats}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverBusSeatPage;
