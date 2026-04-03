"use client";

import { useState } from "react";
import { Button } from "antd";
import { RiMapPinAddLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { AddressCard, type Address } from "./AddressCard";
import { AddAddressModal } from "./AddAddressModal";

const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    city: "جدة",
    fullAddress:
      "طريق الملك عبد العزيز، برج سازار أفيبو، الطابق العاشر، حي الزهراء، جدة.",
  },
  {
    id: 2,
    city: "جدة",
    fullAddress:
      "طريق الملك عبد العزيز، برج سازار أفيبو، الطابق العاشر، حي الزهراء، جدة.",
  },
  {
    id: 3,
    city: "جدة",
    fullAddress:
      "طريق الملك عبد العزيز، برج سازار أفيبو، الطابق العاشر، حي الزهراء، جدة.",
  },
  {
    id: 4,
    city: "جدة",
    fullAddress:
      "طريق الملك عبد العزيز، برج سازار أفيبو، الطابق العاشر، حي الزهراء، جدة.",
  },
];

export const SavedAddressesContent = () => {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (city: string, fullAddress: string) => {
    setAddresses((prev) => [
      ...prev,
      { id: Date.now(), city, fullAddress },
    ]);
  };

  const handleEdit = (_id: number) => {
    // placeholder — wire up later
  };

  const handleDelete = (_id: number) => {
    // placeholder — wire up later
  };

  return (
    <div className="formS1 !border-none">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E2E2] pb-6 mb-6">
        <h2 className="text-2xl font-bold">العناوين المحفوظة</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">
          يوجد{" "}
          <span className="font-semibold text-gray-600">{addresses.length}</span>{" "}
          من النتائج
        </span>
        <Button
          type="primary"
          icon={<RiMapPinAddLine className="text-base" />}
          iconPosition="end"
          className="!flex !items-center !gap-2"
          onClick={() => setModalOpen(true)}
        >
          إضافة عنوان جديد
        </Button>
      </div>

      {/* ── Address list / empty state ────────────────────────────────── */}
      {addresses.length > 0 ? (
        <div>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <FiMapPin className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد عناوين محفوظة
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            لم تقم بحفظ أي عنوان حتى الآن. أضف عنوانك الأول لتسهيل عمليات الحجز.
          </p>
        </div>
      )}

      <AddAddressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAdd}
      />
    </div>
  );
};
