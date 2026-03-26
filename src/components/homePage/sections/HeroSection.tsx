// components/home/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FaBusAlt } from "react-icons/fa";
import { BsAirplaneFill } from "react-icons/bs";
import { PiCarSimpleFill } from "react-icons/pi";
import { useState } from "react";
import { BussForm } from "../forms/BussForm";
import { PrivetTripsForm } from "../forms/PrivetTripsForm";
import { AirplaneForm } from "../forms/AirplaneForm";

const tabs = [
  // { key: "bus", label: "باصات", icon: <FaBusAlt /> },
  // { key: "privatTrip", label: "رحلات خاصة", icon: <PiCarSimpleFill /> },
  { key: "airplan", label: "الطيران", icon: <BsAirplaneFill /> },
];

export function HeroSection() {
  const [currentTab, setCurrentTab] = useState("airplan");
  return (
    <section className="hero-section relative bg-[#edf2ee] w-full">
      <div className="container">
        <span className="px-4 py-3 bg-white/20 text-white rounded-[250px] block w-fit">
          مرحباً بك في منصة وديني ! 👋
        </span>
        <h1 className="font-bold text-5xl text-white my-2 mt-4">
          اين تفضل الذهاب اليوم؟
        </h1>
        <p className="mb-16 text-white">
          سافر لأي وجهة بنقرة وحدة️ رحلات مباشرة داخل وخارج المملكة{" "}
        </p>

        <div className="flex items-center gap-3 mb-3">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setCurrentTab(key)}
              className={` ${currentTab === key ? "bg-primary" : "bg-white/20"} backdrop-blur-sm rounded-[200px] px-6 py-3 flex items-center gap-3 text-lg font-medium hover:scale-105 text-white transition-all duration-200  `}
            >
              {icon}
              {label}
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
