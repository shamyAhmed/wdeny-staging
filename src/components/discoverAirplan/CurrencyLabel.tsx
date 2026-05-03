"use client";
import Image from "next/image";

interface CurrencyLabelProps {
  currency: string;
  className?: string;
}

export const CurrencyLabel = ({ currency, className = "" }: CurrencyLabelProps) => {
  if (currency === "SAR") {
    return (
      <Image
        src="/images/SAR.svg"
        alt="SAR"
        width={16}
        height={16}
        className={`inline-block object-contain align-middle ${className}`}
      />
    );
  }
  return <span className={className}>{currency}</span>;
};
