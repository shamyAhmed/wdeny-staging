"use client";

import { TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";

import { useSearchParams } from "next/navigation";

import { FiStar } from "react-icons/fi";
import { useGetAdminLoyaltyPointsHistory } from "../hooks/useGetAdminLoyaltyPointsHistory";

export const LoyaltyPointsHistory_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: loyaltyPoints, isLoading } = useGetAdminLoyaltyPointsHistory({
    search,
    page,
    limit: 10,
  });

  const columns: TableProps["columns"] = [
    {
      title: "المستخدم",
      dataIndex: "user",
      key: "user",
      width: 120,
    },
    {
      title: "العملية",
      dataIndex: "transaction",
      key: "transaction",
      width: 120,
    },
    {
      title: "النقاط",
      dataIndex: "transaction",
      key: "transaction",
      width: 120,
      render: (_, record) => (
        <span
          className={`font-semibold ${
            record.transaction === "addition"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {record.points}
        </span>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "الملاحظات",
      dataIndex: "notes",
      key: "notes",
      width: 180,
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={loyaltyPoints?.items || []}
      isLoading={isLoading}
      exportedName="Products"
      totalItems={loyaltyPoints?.total || 0}
    />
  );
};
