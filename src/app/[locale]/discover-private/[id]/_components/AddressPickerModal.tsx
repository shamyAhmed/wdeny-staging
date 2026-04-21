"use client";

import { Modal, Skeleton } from "antd";
import { MdOutlineLocationOff } from "react-icons/md";
import useGetSafariaAddresses from "../_hooks/useGetSafariaAddresses";
import type { SafariaAddress } from "../_types/SafariaAddress";
import { AddressCard } from "./AddressCard";

export type PickerType = "source" | "destination";

interface AddressPickerModalProps {
  type: PickerType | null;
  sourceAddress: SafariaAddress | null;
  destinationAddress: SafariaAddress | null;
  onChange: (newSource: SafariaAddress | null, newDestination: SafariaAddress | null) => void;
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

  const title = type === "source" ? "اختر عنوان التحرك" : "اختر عنوان الوصول";
  const activeAddress   = type === "source" ? sourceAddress   : destinationAddress;
  const opposingAddress = type === "source" ? destinationAddress : sourceAddress;

  const handleSelect = (addr: SafariaAddress) => {
    const isOpposingPick = opposingAddress?.id === addr.id;
    if (type === "source") {
      onChange(addr, isOpposingPick ? sourceAddress : destinationAddress);
    } else {
      onChange(isOpposingPick ? destinationAddress : sourceAddress, addr);
    }
  };

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
        ) : !addresses?.length ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <MdOutlineLocationOff size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">لا توجد عناوين متاحة</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isActive={activeAddress?.id === addr.id}
              isOpposing={opposingAddress?.id === addr.id}
              onClick={() => handleSelect(addr)}
            />
          ))
        )}
      </div>
    </Modal>
  );
};
