"use client";

import { useMemo, useState } from "react";
import { Col, Drawer, Row } from "antd";
import { FaFilter } from "react-icons/fa6";
import { GiSettingsKnobs } from "react-icons/gi";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { BussForm } from "../homePage/forms/BussForm";
import { BusCard } from "./cards/BusCard";
import { BusFiltersSection } from "./sections/BusFiltersSection";
import style from "../discover/styles/discover.module.scss";
import { Link } from "@/i18n/navigation";
import { PiBusBold } from "react-icons/pi";
import { useTranslations } from "next-intl";
import useBusFilters from "@/hooks/useBusFilters";
import type { BusResult } from "@/app/[locale]/_types/Bus";
import "../discoverAirplan/styles/airplane-discover.scss";

// ─── Mock data (replace with real API hook) ───────────────────────────────────

const MOCK_BUSES: BusResult[] = [
  {
    id: "bus-001",
    companyName: "نورس باص",
    companyLogo: "/images/partners/partner-2.png",
    rating: 4.5,
    isFeatured: true,
    images: ["/photos/blue-bus.png", "/photos/blue-bus.png", "/photos/blue-bus.png"],
    departureTime: "03:50 مساءاً",
    departureDate: "24 أكتوبر",
    arrivalTime: "05:00 مساءاً",
    arrivalDate: "24 أكتوبر",
    duration: "3س 15د",
    classes: [
      { name: "درجة اولى", price: 130, currency: "ريال سعودي" },
      { name: "درجة مميزة", price: 240, currency: "ريال سعودي", isFeatured: true },
    ],
    from: {
      city: "الدمام",
      neighborhoods: [
        { id: "n1", name: "حي طيبة" },
        { id: "n2", name: "الروضة" },
        { id: "n3", name: "الفاخرية" },
        { id: "n4", name: "النزهة" },
        { id: "n5", name: "العزيزية" },
        { id: "n6", name: "الشاطئ" },
        { id: "n7", name: "المزروعية" },
        { id: "n8", name: "الخليج" },
        { id: "n9", name: "الأندلس" },
      ],
    },
    to: {
      city: "جدة",
      neighborhoods: [
        { id: "m1", name: "حي طيبة" },
        { id: "m2", name: "الروضة" },
        { id: "m3", name: "الفاخرية" },
        { id: "m4", name: "النزهة" },
        { id: "m5", name: "العزيزية" },
        { id: "m6", name: "البلد" },
        { id: "m7", name: "الصفا" },
        { id: "m8", name: "الحمراء" },
        { id: "m9", name: "الزهراء" },
      ],
    },
    seatsRemaining: 6,
    amenities: ["seat", "wifi", "ac", "accessible", "luggage"],
  },
  {
    id: "bus-002",
    companyName: "سابتكو",
    companyLogo: "/images/partners/partner-2.png",
    rating: 4.2,
    isFeatured: false,
    images: ["/photos/blue-bus.png", "/photos/blue-bus.png", "/photos/blue-bus.png"],
    departureTime: "07:00 صباحاً",
    departureDate: "24 أكتوبر",
    arrivalTime: "10:45 صباحاً",
    arrivalDate: "24 أكتوبر",
    duration: "3س 45د",
    classes: undefined,
    from: {
      city: "الرياض",
      neighborhoods: [
        { id: "r1", name: "العليا" },
        { id: "r2", name: "الملز" },
        { id: "r3", name: "النسيم" },
        { id: "r4", name: "الروضة" },
        { id: "r5", name: "النخيل" },
        { id: "r6", name: "الورود" },
        { id: "r7", name: "السليمانية" },
        { id: "r8", name: "الربوة" },
      ],
    },
    to: {
      city: "مكة المكرمة",
      neighborhoods: [
        { id: "k1", name: "العزيزية" },
        { id: "k2", name: "أجياد" },
        { id: "k3", name: "المسفلة" },
        { id: "k4", name: "الشبيكة" },
        { id: "k5", name: "النزهة" },
        { id: "k6", name: "الزاهر" },
        { id: "k7", name: "الهجرة" },
        { id: "k8", name: "جرول" },
      ],
    },
    seatsRemaining: 14,
    amenities: ["seat", "wifi", "accessible"],
  },
];

// ─── Derive unique filter options from the data ───────────────────────────────

const unique = (arr: string[]) => [...new Set(arr)];

const getFilterOptions = (buses: BusResult[]) => ({
  companies: unique(buses.map((b) => b.companyName)),
  fromStations: unique(buses.map((b) => b.from.city)),
  toStations: unique(buses.map((b) => b.to.city)),
  minPrice: Math.min(...buses.flatMap((b) => (b.classes ?? []).map((c) => c.price))),
  maxPrice: Math.max(...buses.flatMap((b) => (b.classes ?? []).map((c) => c.price))),
});

// ─── Component ────────────────────────────────────────────────────────────────

export const DiscoverBusComponent = () => {
  const t = useTranslations("discoverBus");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { filters, deferredFilters, onChange, reset } = useBusFilters();

  // TODO: replace with real API hook
  const buses = MOCK_BUSES;
  const isLoading = false;

  const filterOptions = useMemo(() => getFilterOptions(buses), [buses]);

  const visibleBuses = useMemo(() => {
    return buses.filter((bus) => {
      if (deferredFilters.companies.length > 0 && !deferredFilters.companies.includes(bus.companyName))
        return false;
      if (deferredFilters.fromStations.length > 0 && !deferredFilters.fromStations.includes(bus.from.city))
        return false;
      if (deferredFilters.toStations.length > 0 && !deferredFilters.toStations.includes(bus.to.city))
        return false;

      const busMinPrice = Math.min(...(bus.classes ?? []).map((c) => c.price));
      if (deferredFilters.priceRange.from !== null && busMinPrice < deferredFilters.priceRange.from)
        return false;
      if (deferredFilters.priceRange.to !== null && busMinPrice > deferredFilters.priceRange.to)
        return false;

      return true;
    });
  }, [buses, deferredFilters]);

  const filterSidebar = (
    <BusFiltersSection
      filters={filters}
      onChange={onChange}
      companyOptions={filterOptions.companies}
      fromStationOptions={filterOptions.fromStations}
      toStationOptions={filterOptions.toStations}
      minPrice={filterOptions.minPrice}
      maxPrice={filterOptions.maxPrice}
    />
  );

  return (
    <main className={style.discover}>
      <PageBannerSection
        title="احجز الان"
        currentLink="/discover-bus"
        currentPage="احجز الان"
      />

      <div className="container">
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <BussForm />
        </div>

        <Row gutter={[24, 24]}>
          {/* ── Filters sidebar (desktop) ── */}
          <Col xs={24} xl={6} className="max-xl:!hidden">
            <div className="rounded-[20px] bg-white py-8 px-6 flex items-center justify-between mb-4">
              <h4 className="flex items-center gap-2 font-bold text-lg text-[#333]">
                <GiSettingsKnobs size={24} className="text-[#B6B6B6] rotate-90" />
                التصفية
              </h4>
              <button onClick={reset} className="text-primary text-sm">
                إعادة ضبط
              </button>
            </div>
            <div className="rounded-[20px] bg-white py-8 px-6 mb-6">
              {filterSidebar}
            </div>
          </Col>

          {/* ── Results ── */}
          <Col className="max-xl:!basis-full max-xl:!max-w-full" xs={24} xl={18}>
            <div className="flex py-8 flex-col gap-6">
              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="xl:hidden fixed bottom-6 end-6 z-40 h-12 px-5 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg">
                <FaFilter size={14} />
                التصفية
              </button>

              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-[280px] bg-white rounded-[20px] animate-pulse border border-gray-100"
                  />
                ))
              ) : visibleBuses.length > 0 ? (
                visibleBuses.map((bus) => <BusCard key={bus.id} bus={bus} />)
              ) : (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary">
                    <PiBusBold size={44} />
                  </div>
                  <h3 className="text-xl font-bold text-[#111113]">
                    {t("emptyState.title")}
                  </h3>
                  <p className="text-[#B0B0B3] max-w-sm text-sm leading-relaxed">
                    {t("emptyState.description")}
                  </p>
                  <Link
                    href="/"
                    className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                    {t("emptyState.backToHome")}
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* ── Filters drawer (mobile) ── */}
      <Drawer
        title="التصفية"
        placement="right"
        width={360}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="xl:!hidden"
        rootClassName="xl:!hidden"
        footer={
          <button
            onClick={() => { reset(); setIsDrawerOpen(false); }}
            className="w-full text-center text-primary font-medium py-2">
            إعادة ضبط الفلاتر
          </button>
        }>
        <div className="rounded-[20px] bg-white">
          {filterSidebar}
        </div>
      </Drawer>
    </main>
  );
};
