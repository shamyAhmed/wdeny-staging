"use client";

import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { FaChevronUp, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { SortingCriteria } from "@/app/[locale]/_types/SearchFlight";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

const SORT_LABELS: Record<SortingCriteria, string> = {
  CheapestFirst:          "الأقل سعرا",
  MostExpensiveFirst:     "الأعلى سعرا",
  FastestFirst:           "الأسرع أولاً",
  SlowestFirst:           "الأبطأ أولاً",
  EarliestDepartureFirst: "أبكر مغادرة أولاً",
  LatestDepartureFirst:   "اخر مغادرة",
};

const sortMenuItems: MenuProps["items"] = (
  Object.entries(SORT_LABELS) as [SortingCriteria, string][]
).map(([key, label]) => ({ key, label }));

const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}س : ${m}د`;
};

const formatDeparture = (iso: string) => dayjs(iso).format("HH:mm");

interface ResultsHeaderProps {
  onSortChange: (sort: SortingCriteria) => void;
  currentSort: SortingCriteria;
  cheapestPrice: number | null;
  mostExpensivePrice: number | null;
  shortestDuration: number | null;
  longestDuration: number | null;
  earliestDeparture: string | null;
  latestDeparture: string | null;
}

// Derives the stat panel state from a SortingCriteria value
const deriveStatState = (sort: SortingCriteria) => ({
  selectedStat:       sort.includes("Cheapest") || sort.includes("Expensive") ? "cheapest"
                    : sort.includes("Fastest")  || sort.includes("Slowest")   ? "fastest"
                    : "departure",
  priceAscending:     sort === "CheapestFirst",
  durationAscending:  sort === "FastestFirst",
  departureAscending: sort === "EarliestDepartureFirst",
});

export const ResultsHeader = ({
  onSortChange,
  currentSort,
  cheapestPrice,
  mostExpensivePrice,
  shortestDuration,
  longestDuration,
  earliestDeparture,
  latestDeparture,
}: ResultsHeaderProps) => {
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const initial = deriveStatState(currentSort);
  const [selectedStat,       setSelectedStat]       = useState(initial.selectedStat);
  const [priceAscending,     setPriceAscending]     = useState(initial.priceAscending);
  const [durationAscending,  setDurationAscending]  = useState(initial.durationAscending);
  const [departureAscending, setDepartureAscending] = useState(initial.departureAscending);

  // Keep stat panel in sync when currentSort changes externally (e.g. URL param)
  useEffect(() => {
    const s = deriveStatState(currentSort);
    setSelectedStat(s.selectedStat);
    setPriceAscending(s.priceAscending);
    setDurationAscending(s.durationAscending);
    setDepartureAscending(s.departureAscending);
  }, [currentSort]);

  const applySort = (sort: SortingCriteria) => {
    const s = deriveStatState(sort);
    setSelectedStat(s.selectedStat);
    setPriceAscending(s.priceAscending);
    setDurationAscending(s.durationAscending);
    setDepartureAscending(s.departureAscending);
    onSortChange(sort);
  };

  const handleStatClick = (key: string) => {
    if (key === "cheapest") {
      const next = selectedStat === "cheapest" ? !priceAscending : true;
      applySort(next ? "CheapestFirst" : "MostExpensiveFirst");
    } else if (key === "fastest") {
      const next = selectedStat === "fastest" ? !durationAscending : true;
      applySort(next ? "FastestFirst" : "SlowestFirst");
    } else if (key === "departure") {
      const next = selectedStat === "departure" ? !departureAscending : true;
      applySort(next ? "EarliestDepartureFirst" : "LatestDepartureFirst");
    }
  };

  const priceDisplayValue    = (priceAscending     ? cheapestPrice    : mostExpensivePrice) ?? null;
  const durationDisplayValue = (durationAscending  ? shortestDuration : longestDuration)    ?? null;
  const departureDisplayValue = (departureAscending ? earliestDeparture : latestDeparture)  ?? null;

  const stats = [
    {
      key:       "cheapest",
      label:     priceAscending ? "الأقل سعرا" : "الأعلى سعرا",
      value:     priceDisplayValue != null ? `${priceDisplayValue.toFixed(2)} ${currency}` : "—",
      ascending: priceAscending,
    },
    {
      key:       "fastest",
      label:     durationAscending ? "الأسرع" : "الأبطأ",
      value:     durationDisplayValue != null ? formatMinutes(durationDisplayValue) : "—",
      ascending: durationAscending,
    },
    {
      key:       "departure",
      label:     departureAscending ? "أبكر مغادرة" : "اخر مغادرة",
      value:     departureDisplayValue != null ? formatDeparture(departureDisplayValue) : "—",
      ascending: departureAscending,
    },
  ];

  return (
    <div className="results-header">
      <Dropdown
        trigger={["click"]}
        menu={{
          items: sortMenuItems,
          selectable: true,
          selectedKeys: [currentSort],
          onClick: ({ key }) => applySort(key as SortingCriteria),
        }}>
        <button type="button" className="results-sort-button">
          <span className="results-sort-label">
            <span>{SORT_LABELS[currentSort]}</span>
            <span>: فرز</span>
          </span>
          <FaChevronUp size={12} />
        </button>
      </Dropdown>

      <div className="results-stats-bar" role="list">
        {stats.map((item) => (
          <button
            key={item.key}
            type="button"
            role="listitem"
            onClick={() => handleStatClick(item.key)}
            className={`results-stat-item ${selectedStat === item.key ? "is-active" : ""}`}>
            <span className="results-stat-value flex items-center gap-1">
              {item.value}
              {selectedStat === item.key && (
                item.ascending ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />
              )}
            </span>
            <span className="results-stat-label">: {item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
