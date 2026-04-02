"use client";

import { useState, useMemo } from "react";
import { Table, Select, Button, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BsDownload } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { RiAddLine, RiMapPin2Fill } from "react-icons/ri";
import { TbWalletOff } from "react-icons/tb";
import { LuArrowDownToLine } from "react-icons/lu";

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Badge helper ─────────────────────────────────────────────────────────────

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

// ─── Table columns ────────────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

const TYPE_OPTIONS = [
  { value: "all", label: "كل الأنواع" },
  { value: "deposit", label: "إيداع" },
  { value: "booking", label: "حجز" },
  { value: "refund", label: "مسترد" },
];

const PAGE_SIZE = 5;

export const MyWalletContent = () => {
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

  const balance = 2500;
  const hasTransactions = filteredData.length > 0;

  return (
    <div className="formS1 !border-none">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4 border-b border-[#E2E2E2] pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold">محفظتي</h2>
          <p className="text-sm text-gray-400 mt-1">
            ادر اموالك واطلع على سجل عملياتك المالية
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            icon={<BsDownload />}
            iconPosition="end"
            className="!flex !items-center !gap-2 !text-gray-500 !border-gray-300"
          >
            تصدير الكاشف
          </Button>
          <Button
            type="primary"
            icon={<RiAddLine className="text-lg" />}
            iconPosition="end"
            className="!flex !items-center !gap-1"
          >
            إضافة رصيد
          </Button>
        </div>
      </div>

      {/* ── Balance Card ──────────────────────────────────────────────── */}
      <div className="bg-primary rounded-[24px] px-8 py-7 flex flex-col items-center justify-center text-white text-center mb-8 relative overflow-hidden mx-auto max-w-md">
        {/* decorative blobs */}
        <span className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
        <span className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />

        {/* brand row */}
        <div className="flex items-center gap-2 mb-5 relative z-10">
          <RiMapPin2Fill className="text-2xl" />
          <span className="font-bold text-lg">Wdeny Travel</span>
        </div>

        {/* label */}
        <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2 relative z-10">
          <LuArrowDownToLine className="text-base" />
          <span>إجمالي رصيدك الحالي</span>
        </div>

        {/* amount */}
        <p className="text-5xl font-black tracking-tight relative z-10">
          {balance.toLocaleString()}
          <span className="text-2xl font-semibold ms-2">ريال سعودي</span>
        </p>
      </div>

      {/* ── Transactions Section ──────────────────────────────────────── */}
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

      {hasTransactions ? (
        <>
          {/* Table */}
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

          {/* Pagination */}
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
        /* Empty State */
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
    </div>
  );
};
