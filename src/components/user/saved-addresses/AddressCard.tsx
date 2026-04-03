"use client";

import Image from "next/image";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export type Address = {
  id: number;
  city: string;
  fullAddress: string;
};

interface AddressCardProps {
  address: Address;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      label: "تعديل",
      icon: <FiEdit2 />,
      onClick: () => onEdit(address.id),
    },
    {
      key: "delete",
      label: "حذف",
      icon: <FiTrash2 />,
      danger: true,
      onClick: () => onDelete(address.id),
    },
  ];

  return (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-[#E2E2E2] last:border-b-0">
      <div className="w-[90px] h-[65px] rounded-xl overflow-hidden shrink-0">
        <Image
          src="/images/profile/map-image.png"
          alt="map"
          width={90}
          height={65}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="font-bold text-gray-800 mb-1">{address.city}</p>
        <p className="text-sm text-gray-400 leading-relaxed">{address.fullAddress}</p>
      </div>

      <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomLeft">
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
          <BsThreeDotsVertical className="text-lg" />
        </button>
      </Dropdown>
    </div>
  );
};
