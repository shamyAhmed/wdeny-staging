"use client";
import { Col, Drawer, Row } from "antd";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { AirplaneForm } from "../homePage/forms/AirplaneForm";
import { AirplaneCard } from "./cards/AirplaneCard";
import { AirplaneCardSkeleton } from "./cards/AirplaneCardSkeleton";
import { GiSettingsKnobs } from "react-icons/gi";
import { AirplaneFiltersSection } from "./sections/AirplaneFiltersSection";
import { ResultsHeader } from "./sections/results-header";
import style from "../discover/styles/discover.module.scss";
import "./styles/airplane-discover.scss";
import { useSearchParams } from "next/navigation";
import useSearchFlights from "@/app/[locale]/_hooks/useSearchFlights";
import { CabinClass, SearchFlightPayload, TripType } from "@/app/[locale]/_types/SearchFlight";
import { FlightJourney, FlightOffer } from "@/app/[locale]/_types/FlightOffer";
import dayjs from "dayjs";

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDuration = (totalMinutes: number) => {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h} س : ${m} د`;
};

const getJourneyStops = (journey: FlightJourney): { code: string; duration: string }[] => {
  return journey.segment.slice(0, -1).map((seg, i) => {
    const nextSeg = journey.segment[i + 1];
    const layoverMinutes = dayjs(nextSeg.departureDateTime).diff(
      dayjs(seg.arrivalDateTime),
      "minute",
    );
    const h = Math.floor(layoverMinutes / 60);
    const m = layoverMinutes % 60;
    return { code: seg.destination, duration: `${h} س ${m} د` };
  });
};

const mapJourneyToLeg = (journey: FlightJourney) => {
  const first = journey.segment[0];
  const last = journey.segment[journey.segment.length - 1];
  const totalMinutes = dayjs(last.arrivalDateTime).diff(
    dayjs(first.departureDateTime),
    "minute",
  );
  return {
    departureTime: dayjs(first.departureDateTime).format("HH:mm"),
    departureCity: journey.origin,
    arrivalTime: dayjs(last.arrivalDateTime).format("HH:mm"),
    arrivalCity: journey.destination,
    duration: formatDuration(totalMinutes),
    date: dayjs(first.departureDateTime).format("DD MMMM YYYY"),
    flightNumber: `${first.marketingCarrierCode}${first.marketingFlightNumber}`,
    class: "سياحية",
  };
};

const mapOfferToFlight = (offer: FlightOffer) => {
  const outbound = offer.journeys[0];
  const returnJourney = offer.journeys[1];
  const outboundLeg = mapJourneyToLeg(outbound);
  return {
    id: offer.offerId,
    haveBundles: offer.haveBundles,
    airline:
      outbound.segment[0].operatingCarrierName ??
      outbound.segment[0].operatingCarrierCode,
    airlineLogo: "/photos/saudi-airline-logo.png",
    flightNumber: outboundLeg.flightNumber,
    class: outboundLeg.class,
    departureTime: outboundLeg.departureTime,
    departureCity: outboundLeg.departureCity,
    arrivalTime: outboundLeg.arrivalTime,
    arrivalCity: outboundLeg.arrivalCity,
    duration: outboundLeg.duration,
    price: offer.totalAmount,
    currency: offer.currency,
    isRefundable: offer.refundability === "Refundable",
    refundability: offer.refundability,
    stops: getJourneyStops(outbound),
    date: outboundLeg.date,
    returnFlight: returnJourney ? mapJourneyToLeg(returnJourney) : undefined,
    journeys: offer.journeys,
    baseAmount: offer.baseAmount,
    taxesAmount: offer.taxesAmount,
    discountAmount: offer.discountAmount,
    serviceChargeAmount: offer.serviceChargeAmount,
    beforeDiscountAmount: offer.beforeDiscountAmount,
  };
};

export const DiscoverAirplanComponent = () => {
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const searchParams = useSearchParams();

  const origin = searchParams.get("from_0") ?? "";
  const destination = searchParams.get("to_0") ?? "";
  const date = searchParams.get("date_0") ?? "";
  const returnDate = searchParams.get("returnDate_0");
  const tripType = (searchParams.get("tripType") ?? "one_way") as TripType;
  const cabinClass = (searchParams.get("class") ?? "CABIN_CLASS_ECONOMY") as CabinClass;
  const adt = Number(searchParams.get("adt") ?? 1);
  const chd = Number(searchParams.get("chd") ?? 0);
  const inf = Number(searchParams.get("inf") ?? 0);

  const passengers = [
    { passengerTypeCode: "ADT" as const, count: adt },
    { passengerTypeCode: "CHD" as const, count: chd },
    { passengerTypeCode: "INF" as const, count: inf },
  ].filter((p) => p.count > 0);

  const sharedPayload = {
    passengers,
    sortingCriteria: "CheapestFirst" as const,
    cabinClass,
    directFlightsOnly: false,
  };

  const payload: SearchFlightPayload | null = (() => {
    if (tripType === "multi_city") {
      const segments = [];
      let i = 0;
      while (searchParams.get(`from_${i}`) && searchParams.get(`to_${i}`)) {
        segments.push({
          origin: searchParams.get(`from_${i}`)!,
          destination: searchParams.get(`to_${i}`)!,
          date: searchParams.get(`date_${i}`) ?? "",
        });
        i++;
      }
      if (segments.length < 2) return null;
      return { ...sharedPayload, segments, trip_type: "multi_city" as const };
    }
    if (!origin || !destination || !date) return null;
    if (tripType === "round_trip") {
      if (!returnDate) return null;
      return { ...sharedPayload, origin, destination, date, return_date: returnDate, trip_type: "round_trip" as const };
    }
    return { ...sharedPayload, origin, destination, date, trip_type: "one_way" as const };
  })();

  const { data, isLoading } = useSearchFlights(payload);

  const flights = (data ?? [])
    .filter((offer) => offer.canBeHeld)
    .map(mapOfferToFlight);

  return (
    <main className={style.discover}>
      <PageBannerSection
        title="احجز الان"
        currentLink="/discover-airplan"
        currentPage="احجز الان"
      />
      <div className="container">
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <AirplaneForm readonly />
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
          <Col className="max-xl:!basis-full max-xl:!max-w-full" xs={24} xl={18}>
            <div className="flex py-8 flex-col gap-6">
              <button
                type="button"
                onClick={() => setIsFiltersDrawerOpen(true)}
                className="xl:hidden fixed bottom-6 end-6 z-40 h-12 px-5 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg">
                <FaFilter size={14} />
                التصفية
              </button>

              <ResultsHeader />
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <AirplaneCardSkeleton key={i} />
                  ))
                : flights.map((flight) => (
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
