"use client";

import Image from "next/image";
import { Modal, Skeleton } from "antd";
import { MdOutlineLocationOff } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import useGetSafariaAddresses from "../_hooks/useGetSafariaAddresses";
import type { SafariaAddress } from "../_types/SafariaAddress";

export type PickerType = "source" | "destination";

interface AddressPickerModalProps {
  type: PickerType | null;
  sourceAddress: SafariaAddress | null;
  destinationAddress: SafariaAddress | null;
  onChange: (address: SafariaAddress) => void;
  onClose: () => void;
}

export const AddressPickerModal = ({
  type,
  sourceAddress,
  destinationAddress,
  onChange,
  onClose,
}: AddressPickerModalProps) => {
  const { data: addresses, isLoading } = useGetSafariaAddresses({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const excludedId =
    type === "source" ? destinationAddress?.id : sourceAddress?.id;

  const filtered = (addresses ?? []).filter((a) => a.id !== excludedId);

  const title = type === "source" ? "اختر عنوان التحرك" : "اختر عنوان الوصول";
  const activeAddress = type === "source" ? sourceAddress : destinationAddress;

  return (
    <Modal
      open={Boolean(type)}
      onCancel={onClose}
      footer={null}
      centered
      title={<p className="text-black text-start font-bold">{title}</p>}
    >
      <div className="space-y-3 max-h-[420px] overflow-y-auto pe-1">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2 border border-gray-100 rounded-xl p-3">
              <Skeleton.Image active className="!w-[80px] !h-[60px] !rounded-lg" />
              <div className="flex-1 space-y-2 pt-1">
                <Skeleton.Input active size="small" className="!w-3/4 !rounded" />
                <Skeleton.Input active size="small" className="!w-full !rounded" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <MdOutlineLocationOff size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">لا توجد عناوين متاحة</p>
          </div>
        ) : (
          filtered.map((addr) => {
            const isActive = activeAddress?.id === addr.id;
            return (
              <button
                key={addr.id}
                type="button"
                onClick={() => onChange(addr)}
                className={`w-full flex items-start gap-2 border rounded-xl p-3 transition-colors text-start ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="relative w-[80px] h-[60px] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/images/profile/map-image.png"
                    alt="map"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{addr.name}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {addr.map_location.address_name}
                  </p>
                </div>
                {isActive && (
                  <BsCheckCircleFill size={16} className="text-primary shrink-0 mt-1" />
                )}
              </button>
            );
          })
        )}
      </div>
    </Modal>
  );
};
