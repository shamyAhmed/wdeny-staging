"use client";

import React from "react";
import { Table, ConfigProvider, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface OrderRecord {
  key: number;
  orderId: string;
  product: string;
  category: string;
  orderAmount: number;
  commissionRate: number;
  commissionValue: number;
  status: "مكتمل" | "قيد المعالجة" | "ملغى";
  date: string;
}
const dummyOrders: OrderRecord[] = [
  {
    key: 1,
    orderId: "#12345",
    product: "طقم نادي الطالب الرسمي",
    category: "ملابس رياضية",
    orderAmount: 450,
    commissionRate: 15,
    commissionValue: 67.5,
    status: "مكتمل",
    date: "2024-01-20",
  },
  {
    key: 2,
    orderId: "#12344",
    product: "بلايرت نادي الطالب",
    category: "ملابس",
    orderAmount: 180,
    commissionRate: 15,
    commissionValue: 27,
    status: "قيد المعالجة",
    date: "2024-01-19",
  },
  {
    key: 3,
    orderId: "#12343",
    product: "بطاقة عضوية ذهبية",
    category: "اشتراكات",
    orderAmount: 800,
    commissionRate: 15,
    commissionValue: 120,
    status: "مكتمل",
    date: "2024-01-18",
  },
];

export const AffiliateCommisionDetailsLatestOrders_section = () => {
  const columns: ColumnsType<OrderRecord> = [
    {
      title: "رقم الطلب",
      dataIndex: "orderId",
      key: "orderId",
      width: 120,
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "المنتج",
      dataIndex: "product",
      key: "product",
      width: 220,
    },
    {
      title: "التصنيف",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (text) => <span className="text-[#B0B0B3]">{text}</span>,
    },
    {
      title: "مبلغ الطلب",
      dataIndex: "orderAmount",
      key: "orderAmount",
      width: 130,
      render: (amount) => <span>{amount} ر.س</span>,
    },
    {
      title: "نسبة العمولة",
      dataIndex: "commissionRate",
      key: "commissionRate",
      width: 130,
      render: (rate) => <span className="">{rate}%</span>,
    },
    {
      title: "قيمة العمولة",
      dataIndex: "commissionValue",
      key: "commissionValue",
      width: 140,
      render: (value) => (
        <span className="text-green-600 font-semibold">
          {value.toFixed(2)} ر.س
        </span>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => {
        let bg = "#EAF7EA";
        let text = "#2E7D32";

        if (status === "قيد المعالجة") {
          bg = "#ebeeef";
          text = "#3A5762";
        }

        if (status === "ملغى") {
          bg = "#FDEAEA";
          text = "#C62828";
        }

        return (
          <Tag
            className="!border-0 !rounded-full !px-4 !py-1 text-sm font-medium"
            style={{ backgroundColor: bg, color: text }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (text) => <span className="text-[#B0B0B3] text-sm">{text}</span>,
    },
  ];

  return (
    <div className="cardS1">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-right text-gray-900 mb-8">
        سجل العمولات{" "}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dummyOrders}
          pagination={false}
          bordered={false}
          className="latest-orders-table"
          rowClassName={() => "hover:bg-gray-50 transition-colors"}
          style={{
            fontSize: "14px",
          }}
        />
      </div>
    </div>
  );
};
