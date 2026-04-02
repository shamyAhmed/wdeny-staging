"use client";

import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";

const sortLabels: Record<string, string> = {
  price: "السعر",
  duration: "المدة",
  best: "القيمة الأفضل",
};

const sortMenuItems: MenuProps["items"] = [
  {
    key: "price",
    label: sortLabels.price,
  },
  {
    key: "duration",
    label: sortLabels.duration,
  },
  {
    key: "best",
    label: sortLabels.best,
  },
];

const resultStats = [
  {
    key: "best",
    label: "القيمة الأفضل",
    value: "1408.44",
  },
  {
    key: "fastest",
    label: "الأسرع",
    value: "5س : 5د",
  },
  {
    key: "cheapest",
    label: "الأرخص",
    value: "1127.48",
  },
];

export const ResultsHeader = () => {
  const [sortBy, setSortBy] = useState("price");
  const [selectedStat, setSelectedStat] = useState("cheapest");
  const selectedSortLabel = sortLabels[sortBy] ?? sortLabels.price;

  return (
    <div className="results-header">
      <Dropdown
        trigger={["click"]}
        menu={{
          items: sortMenuItems,
          selectable: true,
          selectedKeys: [sortBy],
          onClick: ({ key }) => setSortBy(String(key)),
        }}>
        <button type="button" className="results-sort-button">
          <span className="results-sort-label">
            <span>{selectedSortLabel}</span>
            <span>: فرز</span>
          </span>
          <FaChevronUp size={12} />
        </button>
      </Dropdown>

      <div className="results-stats-bar" role="list">
        {resultStats.map((item) => (
          <button
            key={item.key}
            type="button"
            role="listitem"
            onClick={() => setSelectedStat(item.key)}
            className={`results-stat-item ${selectedStat === item.key ? "is-active" : ""}`}>
            <span className="results-stat-value">{item.value}</span>
            <span className="results-stat-label">: {item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};