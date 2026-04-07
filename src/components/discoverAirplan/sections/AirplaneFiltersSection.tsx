"use client";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { BookingClassFilter } from "./filter-section/BookingClassFilter";
import { PriceRangeFilter } from "./filter-section/PriceRangeFilter";

const FilterPanelHeader = ({ title }: { title: string }) => (
  <span className="font-medium text-base text-primary">{title}</span>
);

interface AirplaneFiltersSectionProps {
  onPriceRangeChange: (from: number | null, to: number | null) => void;
  minPrice?: number;
  maxPrice?: number;
}

export const AirplaneFiltersSection = ({
  onPriceRangeChange,
  minPrice,
  maxPrice,
}: AirplaneFiltersSectionProps) => {
  const t = useTranslations("discoverAirplaneFilters");

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <FilterPanelHeader title={t("panels.bookingClass.title")} />,
      children: (
        <BookingClassFilter
          searchPlaceholder={t("common.searchPlaceholder")}
          options={[
            t("panels.bookingClass.options.economy"),
            t("panels.bookingClass.options.premiumEconomy"),
            t("panels.bookingClass.options.business"),
            t("panels.bookingClass.options.first"),
          ]}
        />
      ),
    },
    {
      key: "2",
      label: <FilterPanelHeader title={t("panels.priceRange.title")} />,
      children: (
        <PriceRangeFilter
          fromLabel={t("panels.priceRange.from")}
          toLabel={t("panels.priceRange.to")}
          min={minPrice}
          max={maxPrice}
          onChange={onPriceRangeChange}
        />
      ),
    },
  ];

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["1", "2"]}
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
