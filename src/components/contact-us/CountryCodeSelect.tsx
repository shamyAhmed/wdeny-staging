"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";

type CountryOption = {
  value: string;
  label: string;
  dialCode: string;
  flag: React.ReactNode;
};

const countryOptions: CountryOption[] = [
  {
    value: "sa",
    label: "Saudi Arabia",
    dialCode: "966",
    flag: (
        <Image src="/flags/sa.svg" alt="Saudi Arabia" width={35} height={22} />
    ),
  },
  {
    value: "ae",
    label: "UAE",
    dialCode: "971",
    flag: <span className="text-lg leading-none">🇦🇪</span>,
  },
  {
    value: "eg",
    label: "Egypt",
    dialCode: "20",
    flag: <span className="text-lg leading-none">🇪🇬</span>,
  },
  {
    value: "kw",
    label: "Kuwait",
    dialCode: "965",
    flag: <span className="text-lg leading-none">🇰🇼</span>,
  },
];

type CountryCodeSelectProps = {
  value: string;
  onChange: (countryValue: string, dialCode: string) => void;
};

export function CountryCodeSelect({
  value,
  onChange,
}: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const selected =
    countryOptions.find((country) => country.value === value) ?? countryOptions[0];

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseDown={(event) => event.preventDefault()}
    >
      <button
        type="button"
        className="flex h-10 gap-2 items-center justify-between rounded-full border border-[#E7E7E7] bg-white px-2 text-[#4A4A4A]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FiChevronDown className="text-base text-[#8E8E93]" />
        <span className="text-xs leading-none w-[4ch]">+{selected.dialCode}</span>
        <span className="flex shrink-0 h-[22px] w-[35px] items-center justify-center overflow-hidden rounded-full">
            {selected.flag}
        </span>
      </button>

      {isOpen ? (
        <ul className="absolute right-0 top-full z-[1200] mt-2 max-h-64 min-w-[150px] overflow-auto rounded-2xl border border-[#E7E7E7] bg-white p-1 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
          {countryOptions.map((country) => (
            <li key={country.value}>
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-right transition-colors ${
                  country.value === selected.value
                    ? "border-[#CFE5DA] bg-[#F3FAF6]"
                    : "border-transparent hover:bg-[#F7F7F8]"
                }`}
                onClick={() => {
                  onChange(country.value, country.dialCode);
                  setIsOpen(false);
                }}
              >
                <span className="flex h-[22px] w-[35px] items-center justify-center overflow-hidden rounded-full">
                    {country.flag}
                </span>
                <span
                  className={`text-sm ${
                    country.value === selected.value
                      ? "font-semibold text-[#1F3A2F]"
                      : "font-medium text-[#4A4A4A]"
                  }`}
                >
                  +{country.dialCode}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}