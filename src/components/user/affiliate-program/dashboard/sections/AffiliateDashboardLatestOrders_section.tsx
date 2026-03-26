"use client";

import React from "react";
import { Table, ConfigProvider, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface OrderRecord {
  key: number;
  orderId: string;
  customer: string;
  product: string;
  amount: number;
  commission: number;
  status: "مكتمل" | "قيد المعالجة" | "ملغى";
  date: string;
}

const dummyOrders: OrderRecord[] = [
  {
    key: 1,
    orderId: "#12345",
    customer: "أحمد محمد",
    product: "طقم نادي الطالب الرسمي",
    amount: 450,
    commission: 67.5,
    status: "مكتمل",
    date: "2024-01-20",
  },
  {
    key: 2,
    orderId: "#12344",
    customer: "فاطمة علي",
    product: "بلايرت نادي الطالب",
    amount: 180,
    commission: 27,
    status: "قيد المعالجة",
    date: "2024-01-19",
  },
  {
    key: 3,
    orderId: "#12343",
    customer: "محمد سالم",
    product: "بطاقة عضوية ذهبية",
    amount: 800,
    commission: 120,
    status: "مكتمل",
    date: "2024-01-18",
  },
  {
    key: 4,
    orderId: "#12342",
    customer: "سارة خالد",
    product: "شال رياضي",
    amount: 250,
    commission: 37.5,
    status: "مكتمل",
    date: "2024-01-17",
  },
  {
    key: 5,
    orderId: "#12341",
    customer: "علي محمود",
    product: "حقيبة رياضية",
    amount: 320,
    commission: 48,
    status: "قيد المعالجة",
    date: "2024-01-16",
  },
];

export const AffiliateDashboardLatestOrders_section = () => {
  const columns: ColumnsType<OrderRecord> = [
    {
      title: "رقم الطلب",
      dataIndex: "orderId",
      key: "orderId",
      width: 120,
      render: (text) => <span className="font-bold text-gray-900">{text}</span>,
    },
    {
      title: "العميل",
      dataIndex: "customer",
      key: "customer",
      width: 150,
      render: (text) => (
        <span className="text-gray-800 font-medium">{text}</span>
      ),
    },
    {
      title: "المنتج",
      dataIndex: "product",
      key: "product",
      width: 200,
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "المبلغ",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (amount) => <span>{amount} رس</span>,
    },
    {
      title: "العمولة",
      dataIndex: "commission",
      key: "commission",
      width: 120,
      render: (commission) => (
        <span className="text-green-600 font-semibold">
          {commission.toFixed(2)} رس
        </span>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        let bg = "#EAF7EA";
        let text = "#2E7D32";

        if (status === "قيد المعالجة") {
          bg = "#E7F3F8";
          text = "#4A6F7C";
        }

        if (status === "ملغى") {
          bg = "#FDEAEA";
          text = "#C62828";
        }

        return (
          <Tag
            className="!border-0 !rounded-full !px-4 !py-1 text-sm font-medium"
            style={{
              backgroundColor: bg,
              color: text,
            }}
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
      width: 100,
      render: (text) => <span className="text-gray-600 text-sm">{text}</span>,
    },
  ];

  return (
    <div className="cardS1">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-right text-gray-900 mb-8">
        آخر الإحالات{" "}
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
