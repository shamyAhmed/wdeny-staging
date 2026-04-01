"use client";
import { Col, Drawer, Row } from "antd";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { AirplaneForm } from "../homePage/forms/AirplaneForm";
import { AirplaneCard } from "./cards/AirplaneCard";
import { GiSettingsKnobs } from "react-icons/gi";
import { AirplaneFiltersSection } from "./sections/AirplaneFiltersSection";
import { ResultsHeader } from "./sections/results-header";
import style from "../discover/styles/discover.module.scss";
import "./styles/airplane-discover.scss";

export const DiscoverAirplanComponent = () => {
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

  const exampleFlights = [
    {
      id: "flight_001",
      airline: "الخطوط الجوية السعودية",
      airlineLogo: "/photos/saudi-airline-logo.png", // Placeholder
      flightNumber: "SV0310",
      class: "سياحية",
      departureTime: "10:40",
      departureCity: "القاهرة",
      arrivalTime: "23:35",
      arrivalCity: "حائل",
      duration: "5 س : 55 د",
      price: 1127.48,
      currency: "ر.س",
      isRefundable: true,
      stops: " (Direct)", // Or "1 توقف"
      date: "07 مارس 2026",
      returnFlight: {
        departureTime: "20:10",
        departureCity: "حائل",
        arrivalTime: "09:10",
        arrivalCity: "القاهرة",
        duration: "14 سا",
        date: "10 أبريل 2026",
        flightNumber: "SV1334",
        class: "سياحية",
      },
    },
    {
      id: "flight_002",
      airline: "طيران ناس",
      airlineLogo: "/photos/saudi-airline-logo.png",
      flightNumber: "XY0215",
      class: "سياحية",
      departureTime: "08:15",
      departureCity: "القاهرة",
      arrivalTime: "11:45",
      arrivalCity: "الرياض",
      duration: "2 س : 30 د",
      price: 850.0,
      currency: "ر.س",
      isRefundable: false,
      stops: "1 توقف (KWI)",
      date: "07 مارس 2026",
    },
  ];

  return (
    <main className={style.discover}>
      <PageBannerSection
        title="احجز الان"
        currentLink="/discover-airplan"
        currentPage="احجز الان"
      />
      <div className="container">
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <AirplaneForm />
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} xl={6} className="max-xl:!hidden">
            <div className="rounded-[20px] bg-white py-8 px-6 flex items-center justify-between mb-4">
              <h4 className="flex items-center gap-2 font-bold text-lg text-[#333]">
                <GiSettingsKnobs size={24} className="text-[#B6B6B6] rotate-90" />
                <p>
                  التصفية
                </p>
              </h4>
              <button className="text-primary">إعادة ضبط</button>
            </div>
            <div className="rounded-[20px] bg-white py-8 px-6 mb-6">
              <AirplaneFiltersSection />
            </div>
          </Col>
          <Col className="max-xl:!basis-full max-xl:!max-w-none" xs={24} xl={18}>
            <div className="flex py-8 flex-col gap-6">
              <button
                type="button"
                onClick={() => setIsFiltersDrawerOpen(true)}
                className="xl:hidden fixed bottom-6 end-6 z-40 h-12 px-5 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg">
                <FaFilter size={14} />
                التصفية
              </button>

              <ResultsHeader />
              {exampleFlights.map((flight) => (
                <AirplaneCard key={flight.id} flight={flight} />
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <Drawer
        title="التصفية"
        placement="right"
        width={360}
        open={isFiltersDrawerOpen}
        onClose={() => setIsFiltersDrawerOpen(false)}
        className="xl:!hidden"
        rootClassName="xl:!hidden">
        <div className="rounded-[20px] bg-white">
          <AirplaneFiltersSection />
        </div>
      </Drawer>
    </main>
  );
};
