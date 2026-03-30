// components/home/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaBusAlt } from "react-icons/fa";
import { BsAirplaneFill } from "react-icons/bs";
import { PiCarSimpleFill } from "react-icons/pi";
import { useState } from "react";
import { BussForm } from "../forms/BussForm";
import { PrivetTripsForm } from "../forms/PrivetTripsForm";
import { AirplaneForm } from "../forms/AirplaneForm";

export function HeroSection() {
  const t = useTranslations("homePage.hero");
  const [currentTab, setCurrentTab] = useState("airplan");

  const tabs = [
    { key: "bus", label: t("tabs.bus"), icon: <FaBusAlt /> },
    {
      key: "privatTrip",
      label: t("tabs.privateTrip"),
      icon: <PiCarSimpleFill />,
    },
    { key: "airplan", label: t("tabs.airplan"), icon: <BsAirplaneFill /> },
  ];

  return (
    <section className="hero-section relative w-full overflow-hidden">
      <div
        className="hero-media"
        aria-hidden="true">
        <Image
          src="/images/home-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="hero-media-shade" />
      </div>
      <div
        className="hero-gradient"
        aria-hidden="true"
      />

      <div className="container relative z-[1]">
        <span className="px-4 py-3 bg-white/20 backdrop-blur-md border font-bold border-white text-white rounded-[250px] block w-fit">
          {t("badge")}
        </span>
        <h1 className="font-bold text-5xl text-white my-2 mt-4">
          {t("title")}
        </h1>
        <p className="mb-16 text-white text-lg">{t("description")}</p>

        <div className="flex items-center gap-3 mb-9">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setCurrentTab(key)}
              className={`${currentTab === key ? "bg-primary cursor-auto relative" : "bg-white/20 hover:scale-105 cursor-pointer"} backdrop-blur-sm rounded-[200px] px-12 py-[18px] flex items-center gap-3 text-lg font-medium text-white transition-all duration-200`}>
              <div className="relative z-10">{icon}</div>
              <div className="relative z-10">{label}</div>
              <div className={`bg-primary h-10 w-10 rotate-45 top-1/2 left-1/2 -translate-x-1/2 transition-all duration-200 absolute z-0 ${currentTab === key ? "opacity-100" : "opacity-0"}`} />
            </button>
          ))}
        </div>
        <div className="cardS1 bg-white !rounded-[30px]">
          {currentTab === "bus" && <BussForm />}
          {currentTab === "privatTrip" && <PrivetTripsForm />}
          {currentTab === "airplan" && <AirplaneForm />}
        </div>
      </div>
    </section>
  );
}
