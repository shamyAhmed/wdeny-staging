"use client";
import { Collapse } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AirlinesFilter } from "./filter-section/AirlinesFilter";
import { BookingClassFilter } from "./filter-section/BookingClassFilter";
import { DepartureTimeFilter } from "./filter-section/DepartureTimeFilter";
import { FareTypeFilter } from "./filter-section/FareTypeFilter";
import { PriceRangeFilter } from "./filter-section/PriceRangeFilter";
import { StopAirportFilter } from "./filter-section/StopAirportFilter";

const { Panel } = Collapse;

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
        )}>
        <Panel
          header={<FilterPanelHeader title={t("panels.bookingClass.title")} />}
          key="1">
          <BookingClassFilter
            searchPlaceholder={t("common.searchPlaceholder")}
            options={[
              t("panels.bookingClass.options.vip"),
              t("panels.bookingClass.options.second"),
              t("panels.bookingClass.options.third"),
            ]}
          />
        </Panel>

        <Panel
          header={<FilterPanelHeader title={t("panels.departureTime.title")} />}
          key="2">
          <DepartureTimeFilter
            tripType={tripType}
            departureOriginLabel={t("panels.departureTime.origins.cairo")}
            returnOriginLabel={t("panels.departureTime.origins.hail")}
            timeOptions={departureTimeOptions}
          />
        </Panel>

        <Panel
          header={<FilterPanelHeader title={t("panels.fareType.title")} />}
          key="3">
          <FareTypeFilter
            searchPlaceholder={t("common.searchPlaceholder")}
            options={[
              t("panels.fareType.options.refundable"),
              t("panels.fareType.options.refundableWithPenalty"),
              t("panels.fareType.options.nonRefundable"),
            ]}
          />
        </Panel>

        <div className="w-full h-px bg-[#EAEAEA]" />

        <Panel
          header={<FilterPanelHeader title={t("panels.priceRange.title")} />}
          key="4">
          <PriceRangeFilter
            fromLabel={t("panels.priceRange.from")}
            toLabel={t("panels.priceRange.to")}
          />
        </Panel>

        <Panel
          header={<FilterPanelHeader title={t("panels.airlines.title")} />}
          key="5">
          <AirlinesFilter
            searchPlaceholder={t("common.searchPlaceholder")}
            options={[
              t("panels.airlines.options.saudiArabianAirlines"),
              t("panels.airlines.options.flynas"),
              t("panels.airlines.options.jazeeraAirways"),
            ]}
          />
        </Panel>

        <Panel
          header={<FilterPanelHeader title={t("panels.stopAirport.title")} />}
          key="6">
          <StopAirportFilter
            searchPlaceholder={t("common.searchPlaceholder")}
            options={[
              t("panels.stopAirport.options.cairoInternationalAirport"),
              t("panels.stopAirport.options.hailAirport"),
              t("panels.stopAirport.options.kingFahadAirport"),
            ]}
          />
        </Panel>
      </Collapse>
    </div>
  );
};
