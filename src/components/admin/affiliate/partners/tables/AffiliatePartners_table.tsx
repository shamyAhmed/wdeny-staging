"use client";

import { TableProps, Dropdown } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import DeleteModal from "@/components/tools/modal/DeleteModal";
import { FiStar } from "react-icons/fi";
import { useGetAdminAffiliatePartners } from "../hooks/useGetAdminAffiliatePartners";
import Link from "next/link";

export const AffiliatePartners_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: loyaltyPoints, isLoading } = useGetAdminAffiliatePartners({
    search,
    page,
    limit: 10,
  });

  const columns: TableProps["columns"] = [
    {
      title: "المسوق",
      dataIndex: "partner",
      key: "partner",
      width: 200,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-2">
          <span className="font-medium">{record.name}</span>
          <span className="text-[#6A7282]">{record.email}</span>
        </div>
      ),
    },

    {
      title: "الكود",
      key: "code",
      width: 140,
      render: (_, record: any) => (
        <div className="bg-[#EFF6FF] text-[#1447E6] rounded-lg text-center w-fit">
          <span className="font-medium">{record.items[0].sku}</span>
        </div>
      ),
    },

    {
      title: "العمولة",
      dataIndex: "points",
      key: "points",
      width: 120,
      align: "center",
    },
    {
      title: "الإحالات",
      dataIndex: "points",
      key: "points",
      width: 120,
      align: "center",
    },
    {
      title: "الأرباح",
      dataIndex: "earning",
      key: "earning",
      width: 120,
      align: "center",

      render: (_, record: any) => (
        <div className=" text-[#00A63E] rounded-lg text-center w-fit">
          <span className="font-medium">{record.earning} ر.س</span>
        </div>
      ),
    },
    {
      title: "الأرباح",
      dataIndex: "earning",
      key: "earning",
      width: 120,
      align: "center",

      render: (_, record: any) => (
        <div className=" text-[#00A63E] rounded-lg text-center w-fit">
          <span className="font-medium">{record.earning} ر.س</span>
        </div>
      ),
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
      key: "actions",
      align: "center",
      width: 170,
      render: (_, record: any) => {
        return (
          <Link href={``} className="text-[#155DFC]">
            الملف الشخصي
          </Link>
        );
      },
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
