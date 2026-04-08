"use client";

import { TableProps, Dropdown } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname, Link } from "@/i18n/navigation";

import DeleteModal from "@/components/tools/modal/DeleteModal";
import { FiStar } from "react-icons/fi";
import { useGetAdminAffiliateWithdrawalRequests } from "../hooks/useGetAdminAffiliatePartners";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export const AffiliateWithdrawalRequests_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: loyaltyPoints, isLoading } =
    useGetAdminAffiliateWithdrawalRequests({
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
        </div>
      ),
    },

    {
      title: "المبلغ",
      key: "code",
      width: 140,
      render: (_, record: any) => (
        <div className=" text-[##111113]">
          <span className="font-bold">{record.price}</span>
        </div>
      ),
    },

    {
      title: "طريقة الدفع",
      dataIndex: "points",
      key: "points",
      width: 140,
      align: "center",
    },
    {
      title: "التاريخ",
      dataIndex: "points",
      key: "points",
      width: 120,
      align: "center",
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
          <div className="flex items-center gap-2">
            <button className="text-[#21C45D] bg-[#F7F7F7] border border-[#E1E7EF] p-3 rounded-lg text-lg">
              <FaCheck />
            </button>
            <button className="text-[#EF4343] bg-[#F7F7F7] border border-[#E1E7EF] p-3 rounded-lg text-lg">
              <IoCloseSharp />
            </button>
          </div>
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
