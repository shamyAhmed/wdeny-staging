"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import { useTranslations } from "next-intl";

import useGetSafariaAddresses from "./_hooks/useGetSafariaAddresses";
import useCreateSafariaAddress from "./_hooks/useCreateSafariaAddress";
import useCreatePrivateTicket from "./_hooks/useCreatePrivateTicket";
import type { SafariaAddress } from "./_types/SafariaAddress";
import { AddressPickerModal, type PickerType } from "./_components/AddressPickerModal";
import { AddressCard } from "./_components/AddressCard";
import Image from "next/image";
import { Button, Checkbox, DatePicker, Skeleton } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdDirectionsCar, MdOutlineAddLocationAlt, MdOutlineLocationOff } from "react-icons/md";
import { AddAddressModal } from "@/components/user/saved-addresses/AddAddressModal";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";


const AddressCardSkeleton = () => (
  <div className="flex items-start gap-2 border border-gray-100 rounded-xl p-3">
    <Skeleton.Image active className="!w-[80px] !h-[60px] !rounded-lg" />
    <div className="flex-1 space-y-2 pt-1">
      <Skeleton.Input active size="small" className="!w-3/4 !rounded" />
      <Skeleton.Input active size="small" className="!w-full !rounded" />
    </div>
  </div>
);

const AddressEmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-200 rounded-xl p-4 text-center">
    <MdOutlineLocationOff size={28} className="text-gray-300" />
    <p className="text-xs text-gray-400">لا يوجد عنوان محفوظ</p>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const DiscoverPrivatePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t     = useTranslations("privateBooking");
  const trip     = useSelector((state: RootState) => state.privateTrip.trip);
  const price    = useSelector((state: RootState) => state.privateTrip.price);
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const { isAuthenticated, isLoading } = useGetUserProfile();
  const { data: addresses, isLoading: addressesLoading } = useGetSafariaAddresses();

  const tripType = searchParams.get("trip_type") ?? "single";
  const isRound  = tripType === "round_trip";

  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [pickerType, setPickerType]         = useState<PickerType | null>(null);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(() => {
    const d = searchParams.get("date");
    return d ? dayjs(d) : null;
  });
  const [returnDate, setReturnDate] = useState<Dayjs | null>(() => {
    const d = searchParams.get("return_date");
    return d ? dayjs(d) : null;
  });

  const [originAddress, setOriginAddress] = useState<SafariaAddress | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<SafariaAddress | null>(null);

  // Initialise once addresses load
  useEffect(() => {
    if (!addresses) return;
    setOriginAddress((prev) => prev ?? addresses[0] ?? null);
    setDestinationAddress((prev) => prev ?? addresses[1] ?? null);
  }, [addresses]);

  const { mutate: createAddress, isPending: creatingAddress } = useCreateSafariaAddress(
    () => setAddAddressOpen(false),
  );
  const { mutate: createTicket, isPending: creatingTicket } = useCreatePrivateTicket();

  const handleProceedToPay = () => {
    if (!trip || !originAddress) return;
    const depDate = departureDate?.format("YYYY-MM-DD") ?? "";
    const depTime = searchParams.get("time") ?? "00:00";
    createTicket({
      tripId: trip.id,
      isRound,
      boarding: {
        address_id: originAddress.id,
        date: `${depDate} ${depTime}`,
      },
      ...(isRound && returnDate && destinationAddress
        ? {
            return: {
              address_id: destinationAddress.id,
              date: `${returnDate.format("YYYY-MM-DD")} ${searchParams.get("return_time") ?? "00:00"}`,
            },
          }
        : {}),
    });
  };

  const handlePickerChange = (newSource: SafariaAddress | null, newDestination: SafariaAddress | null) => {
    setOriginAddress(newSource);
    setDestinationAddress(newDestination);
    setPickerType(null);
  };

  useEffect(() => {
    if (!trip) router.replace("/");
  }, [trip, router]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      const query = searchParams.toString();
      const fullPath = query ? `${pathname}?${query}` : pathname;
      router.replace({
        pathname: "/auth/login",
        query: { redirect: fullPath, provider: "safaria" },
      });
    }
  }, [isAuthenticated, isLoading, pathname, searchParams, router]);

  if (isLoading || !isAuthenticated || !trip) return null;

  const seatPrice = isRound ? trip.round_price : (price ?? trip.go_price);

  return (
    <div className="container p-6 space-y-4">

      {/* Company card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
          {trip.company_logo ? (
            <Image src={trip.company_logo} alt={trip.company_name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MdDirectionsCar size={26} className="text-gray-300" />
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">{trip.company_name}</p>
          <p className="text-xs text-gray-400">{trip.bus.type?.name_ar ?? trip.bus.name}</p>
        </div>
      </div>

      {/* Payment details card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-2">
        <p className="text-base font-bold text-gray-900">بيانات الدفع</p>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-500">سعر المقعد</span>
          <span className="text-sm font-semibold text-gray-800">{seatPrice} <CurrencyLabel currency={currency} /></span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-base font-bold text-gray-900">الإجمالي</span>
          <span className="text-lg font-bold text-primary">{seatPrice} <CurrencyLabel currency={currency} /></span>
        </div>
      </div>

      {/* Addresses section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-gray-900">العناوين</p>
          <Button
            type="primary"
            icon={<MdOutlineAddLocationAlt size={16} />}
            className="!rounded-xl !h-9 !px-4 flex items-center gap-1"
            onClick={() => setAddAddressOpen(true)}>
            إضافة عنوان جديد
          </Button>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Origin */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-800">اختر عنوان التحرك</p>
              <span
                className="text-xs text-primary cursor-pointer"
                onClick={() => setPickerType("source")}>
                اختر العنوان
              </span>
            </div>
            {addressesLoading ? (
              <AddressCardSkeleton />
            ) : originAddress ? (
              <AddressCard address={originAddress} />
            ) : (
              <AddressEmptyState />
            )}
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-800">اختر عنوان الوصول</p>
              <span
                className="text-xs text-primary cursor-pointer"
                onClick={() => setPickerType("destination")}>
                اختر العنوان
              </span>
            </div>
            {addressesLoading ? (
              <AddressCardSkeleton />
            ) : destinationAddress ? (
              <AddressCard address={destinationAddress} />
            ) : (
              <AddressEmptyState />
            )}
          </div>
        </div>
      </div>

      {/* Dates section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-2">
        <p className="text-base font-bold text-gray-900">التواريخ</p>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Departure date */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-800">تاريخ المغادرة</p>
            <div className="inputS1">
              <DatePicker
                className="w-full"
                placeholder="اختر تاريخ المغادرة"
                suffixIcon={<DatePickerIcon />}
                value={departureDate}
                disabledDate={(current) =>
                  current && current < dayjs().add(1, "day").startOf("day")
                }
                onChange={(val) => {
                  setDepartureDate(val);
                  if (returnDate && val && dayjs(returnDate).isBefore(dayjs(val).add(1, "day"), "day")) {
                    setReturnDate(null);
                  }
                }}
              />
            </div>
          </div>

          {/* Return date */}
          <div className="space-y-2">
            <p className={`text-sm font-bold ${isRound ? "text-gray-800" : "text-gray-400"}`}>
              تاريخ العودة
            </p>
            <div className={`inputS1 ${!isRound ? "disabled" : ""}`}>
              <DatePicker
                className="w-full"
                placeholder="اختر تاريخ العودة"
                suffixIcon={<DatePickerIcon />}
                disabled={!isRound}
                value={returnDate}
                defaultPickerValue={departureDate ?? undefined}
                disabledDate={(current) => {
                  const min = departureDate
                    ? dayjs(departureDate).add(1, "day").startOf("day")
                    : dayjs().add(2, "day").startOf("day");
                  return current && current < min;
                }}
                onChange={(val) => setReturnDate(val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span className="text-sm text-gray-600">
            الموافقة على{" "}
            <span className="text-primary cursor-pointer underline">الشروط والأحكام</span>
          </span>
        </div>
        <Button
          type="primary"
          block
          loading={creatingTicket}
          disabled={!agreed || !originAddress || !departureDate}
          onClick={handleProceedToPay}
          className="!rounded-xl !h-12 !text-base !font-bold">
          {t("proceedToPay")}
        </Button>
      </div>

      <AddAddressModal
        open={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
        mutate={createAddress}
        isPending={creatingAddress}
      />

      <AddressPickerModal
        type={pickerType}
        sourceAddress={originAddress}
        destinationAddress={destinationAddress}
        onChange={handlePickerChange}
        onClose={() => setPickerType(null)}
      />

    </div>
  );
};

export default DiscoverPrivatePage;
