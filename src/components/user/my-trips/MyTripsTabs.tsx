"use client";

import { useState } from "react";
import { MdFlight, MdDirectionsBus } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { FlightTicketsContent } from "@/components/user/flight-tickets/FlightTicketsContent";
import { BusTripsEmptyState } from "./BusTripsEmptyState";
import { PrivateTripsEmptyState } from "./PrivateTripsEmptyState";

type TripTab = "flights" | "buses" | "private";

const TABS: { key: TripTab; labelAr: string; icon: React.ReactNode }[] = [
  { key: "flights", labelAr: "الطيران",   icon: <MdFlight size={18} /> },
  { key: "buses",   labelAr: "الباصات",   icon: <MdDirectionsBus size={18} /> },
  { key: "private", labelAr: "الرحلات الخاصة", icon: <FaCar size={16} /> },
];

export const MyTripsTabs = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("flights");

  return (
    <div className="formS1 !border-none">
      <h2 className="text-2xl font-bold mb-6 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        رحلاتي
      </h2>

      {/* ── Trip-type tab bar ── */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#E2E2E2] overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative shrink-0 ${
              activeTab === tab.key
                ? "text-primary after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.labelAr}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {activeTab === "flights" && <FlightTicketsContent />}
      {activeTab === "buses"   && <BusTripsEmptyState />}
      {activeTab === "private" && <PrivateTripsEmptyState />}
    </div>
  );
};
