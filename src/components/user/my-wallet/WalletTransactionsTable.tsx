"use client";

import { useState, useMemo } from "react";
import { Table, Select, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CiCalendar } from "react-icons/ci";
import { TbWalletOff } from "react-icons/tb";

// ─── Types ────────────────────────────────────────────────────────────────────

type TxType = "deposit" | "booking" | "refund";

type Transaction = {
  key: number;
  ref: string;
  type: TxType;
  description: string;
  date: string;
  amount: number;
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALL_TRANSACTIONS: Transaction[] = [
  {
    key: 1,
    ref: "#25835634",
    type: "deposit",
    description: "شحن المحفظة - بطاقة الائتمان",
    date: "25 أكتوبر 2025، 01:22 صباحاً",
    amount: 3500,
  },
  {
    key: 2,
    ref: "#25835634",
    type: "booking",
    description: "من جدة إلى الدمام",
    date: "25 أكتوبر 2025، 01:22 صباحاً",
    amount: -3500,
  },
  {
    key: 3,
    ref: "#25835634",
    type: "refund",
    description: "BK 9912# مسترد - إلغاء حجز",
    date: "25 أكتوبر 2025، 01:22 صباحاً",
    amount: 3500,
  },
  {
    key: 4,
    ref: "#25835634",
    type: "refund",
    description: "BK 9912# مسترد - إلغاء حجز",
    date: "25 أكتوبر 2025، 01:22 صباحاً",
    amount: 3500,
  },
  {
    key: 5,
    ref: "#25835634",
    type: "refund",
    description: "BK 9912# مسترد - إلغاء حجز",
    date: "25 أكتوبر 2025، 01:22 صباحاً",
    amount: 3500,
  },
];

// ─── Badge ────────────────────────────────────────────────────────────────────

const TYPE_META: Record<TxType, { label: string; className: string }> = {
  deposit: {
    label: "إيداع",
    className: "bg-green-50 text-green-600 border border-green-200",
  },
  booking: {
    label: "حجز",
    className: "bg-rose-50 text-rose-400 border border-rose-200",
  },
  refund: {
    label: "مسترد",
    className: "bg-orange-50 text-orange-400 border border-orange-200",
  },
};

const TxBadge = ({ type }: { type: TxType }) => {
  const { label, className } = TYPE_META[type];
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: ColumnsType<Transaction> = [
  {
    title: "رقم العملية",
    dataIndex: "ref",
    key: "ref",
    align: "right",
    minWidth: 200,
    render: (ref: string) => (
      <span className="font-semibold text-gray-700">{ref}</span>
    ),
  },
  {
    title: "نوع العملية",
    dataIndex: "type",
    key: "type",
    align: "center",
    minWidth: 200,
    render: (type: TxType) => <TxBadge type={type} />,
  },
  {
    title: "الوصف",
    dataIndex: "description",
    key: "description",
    align: "center",
    minWidth: 200,
    render: (desc: string) => (
      <span className="text-gray-500 text-sm">{desc}</span>
    ),
  },
  {
    title: "تاريخ العملية",
    dataIndex: "date",
    key: "date",
    align: "center",
    minWidth: 200,
    render: (date: string) => (
      <span className="flex items-center justify-center gap-2 text-gray-400 text-sm">
        <CiCalendar className="text-base shrink-0" />
        {date}
      </span>
    ),
  },
  {
    title: "المبلغ",
    dataIndex: "amount",
    key: "amount",
    align: "left",
    minWidth: 200,
    render: (amount: number) => (
      <span
        className={`font-bold text-sm ${amount > 0 ? "text-green-500" : "text-rose-500"}`}
      >
        {amount > 0 ? `+${amount.toLocaleString()}` : amount.toLocaleString()}{" "}
        <span className="font-normal text-xs">ريال سعودي</span>
      </span>
    ),
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const TYPE_OPTIONS = [
  { value: "all", label: "كل الأنواع" },
  { value: "deposit", label: "إيداع" },
  { value: "booking", label: "حجز" },
  { value: "refund", label: "مسترد" },
];

const PAGE_SIZE = 5;

// ─── Component ────────────────────────────────────────────────────────────────

export const WalletTransactionsTable = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (typeFilter === "all") return ALL_TRANSACTIONS;
    return ALL_TRANSACTIONS.filter((tx) => tx.type === typeFilter);
  }, [typeFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h3 className="text-lg font-bold text-gray-700">سجل العمليات</h3>
        <Select
          value={typeFilter}
          onChange={(v) => {
            setTypeFilter(v);
            setCurrentPage(1);
          }}
          options={TYPE_OPTIONS}
          className="sort-dropdown !min-w-[130px]"
          popupMatchSelectWidth={false}
        />
      </div>

      {filteredData.length > 0 ? (
        <>
          <div className="rounded-2xl overflow-x-auto border border-gray-100 max-w-full">
            <Table<Transaction>
              dataSource={paginatedData}
              columns={columns}
              pagination={false}
              bordered={false}
              className="wallet-table"
              rowKey="key"
            />
          </div>

          <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={filteredData.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
              className="wallet-pagination"
            />
            <span className="text-xs text-gray-400">
              عرض{" "}
              <span className="font-semibold text-gray-600">
                {Math.min(currentPage * PAGE_SIZE, filteredData.length)}
              </span>{" "}
              من{" "}
              <span className="font-semibold text-gray-600">
                {filteredData.length}
              </span>
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <TbWalletOff className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد عمليات بعد
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            لم يتم تسجيل أي عمليات في محفظتك حتى الآن. أضف رصيداً للبدء.
          </p>
        </div>
      )}
    </>
  );
};
