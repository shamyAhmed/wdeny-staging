import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import type { SafariaAddress } from "../_types/SafariaAddress";

interface AddressCardProps {
  address: SafariaAddress;
  isActive?: boolean;
  isOpposing?: boolean;
  onClick?: () => void;
}

export const AddressCard = ({ address, isActive, isOpposing, onClick }: AddressCardProps) => {
  const inner = (
    <>
      <div className="relative w-[80px] h-[60px] rounded-lg overflow-hidden shrink-0">
        <Image src="/images/profile/map-image.png" alt="map" fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{address.name}</p>
        {address.notes && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{address.notes}</p>
        )}
      </div>
      {isActive && (
        <BsCheckCircleFill size={16} className="text-primary shrink-0 mt-1" />
      )}
      {isOpposing && !isActive && (
        <BsCheckCircleFill size={16} className="text-secondary shrink-0 mt-1" />
      )}
    </>
  );

  if (onClick) {
    const borderClass = isActive
      ? "border-primary bg-primary/5"
      : isOpposing
        ? "border-secondary bg-secondary/5"
        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50";

    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-start gap-2 border rounded-xl p-3 transition-colors text-start ${borderClass}`}>
        {inner}
      </button>
    );
  }

  return (
    <div className="flex items-start gap-2 border border-gray-100 rounded-xl p-3">
      {inner}
    </div>
  );
};
