"use client";

import { TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";

import { useSearchParams } from "next/navigation";

import { useGetMembershipSubscribers } from "../hooks/useGetMembershipSubscribers";
import { record } from "zod";
import Link from "next/link";

export const MembershipSubscribers_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: loyaltyPoints, isLoading } = useGetMembershipSubscribers({
    search,
    page,
    limit: 10,
  });

  const columns: TableProps["columns"] = [
    {
      title: "المشترك",
      dataIndex: "user",
      key: "user",
      width: 120,
    },
    {
      title: "الخطة",
      dataIndex: "plan",
      key: "plan",
      width: 120,
    },
    {
      title: "تاريخ البداية",
      dataIndex: "startData",
      key: "startData",
      width: 120,
    },
    {
      title: "تاريخ الانتهاء",
      dataIndex: "endData",
      key: "endData",
      width: 120,
    },
    {
      title: "طريقة الدفع",
      dataIndex: "notes",
      key: "notes",
      width: 120,
    },
    {
      title: "الحالة",
      key: "status",
      width: 120,
      align: "center",
      render: (_, record: any) =>
        record.status === "active" ? (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
            نشط
          </span>
        ) : (
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            معطل
          </span>
        ),
    },
    {
      title: "إجراءات",
      dataIndex: "notes",
      key: "notes",
      width: 120,
      render: (_, record) => (
        <Link
          href={`/admin/memberships/subscribers/${record._id}`}
          className="text-[#155DFC]"
        >
          التفاصيل
        </Link>
      ),
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
