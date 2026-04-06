"use client";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AirlinesFilter } from "./filter-section/AirlinesFilter";
import { BookingClassFilter } from "./filter-section/BookingClassFilter";
import { DepartureTimeFilter } from "./filter-section/DepartureTimeFilter";
import { FareTypeFilter } from "./filter-section/FareTypeFilter";
import { PriceRangeFilter } from "./filter-section/PriceRangeFilter";
import { StopAirportFilter } from "./filter-section/StopAirportFilter";

type FilterPanelHeaderProps = {
  title: string;
};

const FilterPanelHeader = ({ title }: FilterPanelHeaderProps) => {
  return <span className="font-medium text-base text-primary">{title}</span>;
};

export const AirplaneFiltersSection = () => {
  const searchParams = useSearchParams();
  const t = useTranslations("discoverAirplaneFilters");

  const tripType = searchParams.get("tripType");
  const departureTimeOptions = [
    t("timeRanges.option1"),
    t("timeRanges.option2"),
    t("timeRanges.option3"),
    t("timeRanges.option4"),
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <FilterPanelHeader title={t("panels.bookingClass.title")} />,
      children: (
        <BookingClassFilter
          searchPlaceholder={t("common.searchPlaceholder")}
          options={[
            t("panels.bookingClass.options.vip"),
            t("panels.bookingClass.options.second"),
            t("panels.bookingClass.options.third"),
          ]}
        />
      ),
    },
    {
      key: "2",
      label: <FilterPanelHeader title={t("panels.departureTime.title")} />,
      children: (
        <DepartureTimeFilter
          tripType={tripType}
          departureOriginLabel={t("panels.departureTime.origins.cairo")}
          returnOriginLabel={t("panels.departureTime.origins.hail")}
          timeOptions={departureTimeOptions}
        />
      ),
    },
    {
      key: "3",
      label: <FilterPanelHeader title={t("panels.fareType.title")} />,
      children: (
        <FareTypeFilter
          searchPlaceholder={t("common.searchPlaceholder")}
          options={[
            t("panels.fareType.options.refundable"),
            t("panels.fareType.options.refundableWithPenalty"),
            t("panels.fareType.options.nonRefundable"),
          ]}
        />
      ),
    },
    {
      key: "4",
      label: <FilterPanelHeader title={t("panels.priceRange.title")} />,
      className: "!border-t border-[#EAEAEA]",
      children: (
        <PriceRangeFilter
          fromLabel={t("panels.priceRange.from")}
          toLabel={t("panels.priceRange.to")}
        />
      ),
    },
    {
      key: "5",
      label: <FilterPanelHeader title={t("panels.airlines.title")} />,
      children: (
        <AirlinesFilter
          searchPlaceholder={t("common.searchPlaceholder")}
          options={[
            t("panels.airlines.options.saudiArabianAirlines"),
            t("panels.airlines.options.flynas"),
            t("panels.airlines.options.jazeeraAirways"),
          ]}
        />
      ),
    },
    {
      key: "6",
      label: <FilterPanelHeader title={t("panels.stopAirport.title")} />,
      children: (
        <StopAirportFilter
          searchPlaceholder={t("common.searchPlaceholder")}
          options={[
            t("panels.stopAirport.options.cairoInternationalAirport"),
            t("panels.stopAirport.options.hailAirport"),
            t("panels.stopAirport.options.kingFahadAirport"),
          ]}
        />
      ),
    },
  ];

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["1", "2", "3", "4", "5", "6"]}
        ghost
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <FaChevronDown
            className={`!text-primary transition-transform ${isActive ? "!rotate-180" : "!rotate-0"}`}
          />
        )}
        items={items}
      />
    </div>
  );
};
