"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { setPassengers } from "@/store/slices/private/privateTripSlice";
import useGetSafariaAddresses from "./_hooks/useGetSafariaAddresses";
import useCreateSafariaAddress from "./_hooks/useCreateSafariaAddress";
import type { SafariaAddress } from "./_types/SafariaAddress";
import { AddressPickerModal, type PickerType } from "./_components/AddressPickerModal";
import Image from "next/image";
import { Button, Skeleton } from "antd";
import { MdDirectionsCar, MdOutlineAddLocationAlt, MdOutlineLocationOff } from "react-icons/md";
import { AddAddressModal } from "@/components/user/saved-addresses/AddAddressModal";

// ── Address card ──────────────────────────────────────────────────────────────

const AddressCard = ({ address }: { address: SafariaAddress }) => (
  <div className="flex items-start gap-2 border border-gray-100 rounded-xl p-3">
    <div className="relative w-[80px] h-[60px] rounded-lg overflow-hidden shrink-0">
      <Image src="/images/profile/map-image.png" alt="map" fill className="object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-800">{address.name}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{address.map_location.address_name}</p>
    </div>
  </div>
);

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

  const dispatch = useDispatch<AppDispatch>();
  const trip       = useSelector((state: RootState) => state.privateTrip.trip);
  const price      = useSelector((state: RootState) => state.privateTrip.price);
  const passengers = useSelector((state: RootState) => state.privateTrip.passengers);
  const { isAuthenticated, isLoading } = useGetUserProfile();
  const { data: addresses, isLoading: addressesLoading } = useGetSafariaAddresses();

  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [pickerType, setPickerType] = useState<PickerType | null>(null);

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

  const handlePickerChange = (address: SafariaAddress) => {
    if (pickerType === "source") setOriginAddress(address);
    else setDestinationAddress(address);
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

  const seatPrice = price ?? trip.go_price;
  const total     = seatPrice * passengers;

  return (
    <div className="container p-6 space-y-4">

      {/* Company card */}
      <div className="bg-white rounded-2xl shadow-sm py-4 flex items-center gap-4">
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
      <div className="bg-white rounded-2xl shadow-sm py-4 space-y-4">
        <p className="text-base font-bold text-gray-900">بيانات الدفع</p>

        <div className="h-px bg-gray-100" />

        {/* Passengers stepper */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(setPassengers(Math.max(1, passengers - 1)))}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors text-lg leading-none">
              −
            </button>
            <span className="text-base font-bold text-gray-900 min-w-[24px] text-center">{passengers}</span>
            <button
              type="button"
              onClick={() => dispatch(setPassengers(passengers + 1))}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors text-lg leading-none">
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">عدد المسافرين</span>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">{seatPrice} SAR</span>
          <span className="text-sm text-gray-500">سعر المقعد</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{total} SAR</span>
          <span className="text-base font-bold text-gray-900">الإجمالي</span>
        </div>
      </div>

      {/* Addresses section */}
      <div className="bg-white rounded-2xl shadow-sm py-4 space-y-4">
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

        <div className="grid grid-cols-2 gap-4">
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

      <AddAddressModal
        open={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
        onConfirm={() => setAddAddressOpen(false)}
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
