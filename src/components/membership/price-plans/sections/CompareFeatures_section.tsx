"use client";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { FaCheck, FaOutdent } from "react-icons/fa6";

type FeatureValue = boolean | string;

interface CompareFeatureRow {
  key: number;
  feature: string;
  silver: FeatureValue;
  gold: FeatureValue;
  diamond: FeatureValue;
}

const data: CompareFeatureRow[] = [
  {
    key: 1,
    feature: "الخصم على المشتريات",
    silver: "10%",
    gold: "20%",
    diamond: "30%",
  },
  {
    key: 2,
    feature: "مضاعفة نقاط الولاء",
    silver: "1x",
    gold: "1.5x",
    diamond: "2x",
  },
  {
    key: 3,
    feature: "بطاقة عضوية فعلية",
    silver: false,
    gold: true,
    diamond: true,
  },
  {
    key: 4,
    feature: "لقاءات اللاعبين",
    silver: false,
    gold: true,
    diamond: true,
  },
  {
    key: 5,
    feature: "مقاعد VIP",
    silver: false,
    gold: true,
    diamond: "✔ (5 مباريات)",
  },
  {
    key: 6,
    feature: "طقم الموسم الجديد",
    silver: false,
    gold: false,
    diamond: true,
  },
];

const columns: ColumnsType<CompareFeatureRow> = [
  {
    title: "الميزة",
    dataIndex: "feature",
    key: "feature",
    align: "right",
    className: "font-semibold",
  },
  {
    title: "الفضية",
    dataIndex: "silver",
    key: "silver",
    align: "center",
    render: (value: boolean) => renderCell(value),
  },
  {
    title: "الذهبية",
    dataIndex: "gold",
    key: "gold",
    align: "center",
    render: (value: boolean) => renderCell(value),
  },
  {
    title: "الماسية",
    dataIndex: "diamond",
    key: "diamond",
    align: "center",
    render: (value: boolean) => renderCell(value),
  },
];

const renderCell = (value: boolean) => {
  if (value === true) {
    return <span>✅</span>;
  }

  if (value === false) {
    return <span>❌</span>;
  }

  return <span className="text-gray-400 font-medium">{value}</span>;
};

export const CompareFeatures_section = () => {
  return (
    <section className="compare-features mb-24">
      <div className="container">
        <h3 className="text-center text-secondary text-2xl font-bold mb-8">
          مقارنة المزايا{" "}
        </h3>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered={false}
          className="points-table"
        />
      </div>
    </section>
  );
};
