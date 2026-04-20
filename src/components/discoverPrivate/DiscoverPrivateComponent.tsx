"use client";
import { Col, Drawer, Row } from "antd";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdDirectionsCar } from "react-icons/md";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { PrivetTripsForm } from "../homePage/forms/PrivetTripsForm";
import { PrivateFiltersSection } from "./sections/PrivateFiltersSection";
import { PrivateCard } from "./cards/PrivateCard";
import { PrivateCardSkeleton } from "./cards/PrivateCardSkeleton";
import style from "../discover/styles/discover.module.scss";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import useGetPrivateTrips from "@/app/[locale]/_hooks/useGetPrivateTrips";
import "../discoverAirplan/styles/airplane-discover.scss";

export const DiscoverPrivateComponent = () => {
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const searchParams = useSearchParams();

  const fromLocationId = searchParams.get("from_location_id") ?? undefined;
  const toLocationId   = searchParams.get("to_location_id")   ?? undefined;
  const date           = searchParams.get("date")             ?? undefined;
  const rawTripType    = searchParams.get("trip_type")        ?? undefined;
  const returnDate     = searchParams.get("return_date")      ?? undefined;

  const tripType =
    rawTripType === "round-trip" || rawTripType === "one-way"
      ? rawTripType
      : undefined;

  const { data, isLoading } = useGetPrivateTrips({
    from_location_id: fromLocationId,
    to_location_id:   toLocationId,
    date,
    tripType,
    return_date:      returnDate,
  });

  const trips = data?.pages.flatMap((page) => page.data) ?? [];
  const hasSearch = !!(fromLocationId && toLocationId && date && tripType);

  const filterSidebar = <PrivateFiltersSection />;

  return (
    <main className={style.discover}>
      <PageBannerSection
        title="رحلات خاصة"
        currentLink="/discover-private"
        currentPage="رحلات خاصة"
      />

      <div className="container">
        {/* Search form card */}
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <PrivetTripsForm />
        </div>

        <Row gutter={[24, 24]}>
          {/* Filters sidebar — desktop only */}
          <Col xs={24} xl={6} className="max-xl:!hidden">
            <div className="rounded-[20px] bg-white py-8 px-6 flex items-center justify-between mb-4">
              <h4 className="flex items-center gap-2 font-bold text-lg text-[#333]">
                <GiSettingsKnobs size={24} className="text-[#B6B6B6] rotate-90" />
                <p>التصفية</p>
              </h4>
              <button className="text-primary">إعادة ضبط</button>
            </div>
            <div className="rounded-[20px] bg-white py-8 px-6 mb-6">
              {filterSidebar}
            </div>
          </Col>

          {/* Results area */}
          <Col className="max-xl:!basis-full max-xl:!max-w-full" xs={24} xl={18}>
            <div className="flex py-8 flex-col gap-6">
              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setIsFiltersDrawerOpen(true)}
                className="xl:hidden fixed bottom-6 end-6 z-40 h-12 px-5 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg">
                <FaFilter size={14} />
                التصفية
              </button>

              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <PrivateCardSkeleton key={i} />
                ))
              ) : trips.length > 0 ? (
                trips.map((trip) => <PrivateCard key={trip.id} trip={trip} />)
              ) : (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center rounded-[20px] bg-white">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary">
                    <MdDirectionsCar size={44} />
                  </div>
                  <h3 className="text-xl font-bold text-[#111113]">
                    {hasSearch ? "لا توجد رحلات متاحة" : "ابحث عن رحلتك الخاصة"}
                  </h3>
                  <p className="text-[#B0B0B3] max-w-sm text-sm leading-relaxed">
                    {hasSearch
                      ? "لم نجد رحلات تطابق بحثك، حاول تغيير التاريخ أو الوجهة"
                      : "أدخل بيانات رحلتك في النموذج أعلاه وسنعرض لك أفضل الخيارات المتاحة"}
                  </p>
                  {hasSearch && (
                    <Link
                      href="/"
                      className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                      العودة للرئيسية
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* Mobile filters drawer */}
      <Drawer
        title="التصفية"
        placement="right"
        width={360}
        open={isFiltersDrawerOpen}
        onClose={() => setIsFiltersDrawerOpen(false)}
        className="xl:!hidden"
        rootClassName="xl:!hidden">
        <div className="rounded-[20px] bg-white">
          {filterSidebar}
        </div>
      </Drawer>
    </main>
  );
};
