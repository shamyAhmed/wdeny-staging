"use client";

import { useTranslations } from "next-intl";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { PiYoutubeLogo } from "react-icons/pi";
import { IoMoonOutline } from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";
import { BiCoin } from "react-icons/bi";
import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;

export const TopBar = () => {
  const t = useTranslations("topBar");
  const [currency, setCurrency] = useState("sar");

  const socialLinks = [
    { href: "#", icon: <FiFacebook /> },
    { href: "#", icon: <FaInstagram /> },
    { href: "#", icon: <FaXTwitter /> },
    { href: "#", icon: <PiYoutubeLogo /> },
  ];

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  return (
    <div className="bg-primary text-white py-2 md:block lg:px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Right Side: Social Icons & Follow Us */}
        <div className="items-center hidden md:flex gap-4">
          <span className="text-sm font-medium border-l border-white/30 pl-4">
            {t("followUs")}
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Left Side: Night Mode & Currency */}
        <div className="flex items-center justify-between w-full md:w-auto md:justify-normal gap-6">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity topbar-select">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.961 19.922C15.4492 19.922 19.922 15.4492 19.922 9.961C19.922 4.47275 15.4492 0 9.961 0C4.47275 0 0 4.47275 0 9.961C0 15.4492 4.47275 19.922 9.961 19.922ZM9.961 1.99215C14.3537 1.99215 17.9301 5.56853 17.9301 9.96126C17.9301 14.354 14.3537 17.9304 9.961 17.9304C5.56828 17.9304 1.99189 14.354 1.99189 9.96126C1.99189 5.56853 5.56828 1.99215 9.961 1.99215Z"
                fill="white"
              />
              <path
                d="M8.4665 15.9379H11.455C13.3772 15.9379 14.9412 14.3738 14.9412 12.4516C14.9412 10.5294 13.3772 8.96536 11.455 8.96536H10.9572V6.97337H8.96524V8.96536H8.46749C7.64095 8.96536 6.97325 8.29766 6.97325 7.47112C6.97325 6.64458 7.64095 5.97688 8.46749 5.97688H11.456C12.2825 5.97688 12.9502 6.64458 12.9502 7.47112V7.96887H14.9422V7.47112C14.9422 5.54893 13.3781 3.98486 11.4559 3.98486H8.46746C6.54527 3.98486 4.9812 5.54893 4.9812 7.47112C4.9812 9.39332 6.54527 10.9574 8.46746 10.9574H11.4559C12.2825 10.9574 12.9502 11.6251 12.9502 12.4516C12.9502 13.2782 12.2825 13.9459 11.4559 13.9459H10.9582V11.9539H8.9662V13.9459H8.46844C7.6419 13.9459 6.9742 13.2782 6.9742 12.4516V11.9539H4.98221V12.4516C4.98221 14.3738 6.54628 15.9379 8.46847 15.9379H8.4665Z"
                fill="white"
              />
            </svg>

            <Select
              value={currency}
              onChange={handleCurrencyChange}
              variant="borderless"
              className="currency-select text-white hover:text-white/80"
              suffixIcon={<GoChevronDown size={14} className="text-white" />}
              dropdownStyle={{ minWidth: 120 }}
            >
              <Option value="sar">{t("currencies.sar")}</Option>
              <Option value="usd">{t("currencies.usd")}</Option>
              <Option value="eur">{t("currencies.eur")}</Option>
              <Option value="egp">{t("currencies.egp")}</Option>
            </Select>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity bg-white/10 px-3 py-2 rounded-full">
            <IoMoonOutline size={18} />
            <span className="text-sm font-medium">{t("nightMode")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
