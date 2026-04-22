"use client";

import dayjs from "dayjs";
import { Button } from "antd";
import { MdFlight, MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { useRouter } from "@/i18n/navigation";
import type { FlightOrder, FlightPaymentTransaction } from "@/app/[locale]/_types/FlightOrder";

// ── Helpers ────────────────────────────────────────────────────────────────────

const resolvePaymentStatus = (
  transactions: FlightPaymentTransaction[],
): { label: string; color: string } | null => {
  if (!transactions.length) return null;

  const paid = transactions.find((t) => t.status === "paid");
  if (paid) return { label: "مدفوع", color: "green" };

  const latest = transactions.reduce((a, b) => (b.id > a.id ? b : a));
  const statusMap: Record<string, { label: string; color: string }> = {
    failed:  { label: "فشل الدفع",    color: "red"    },
    pending: { label: "قيد المعالجة", color: "yellow" },
  };
  return statusMap[latest.status] ?? { label: latest.status, color: "gray" };
};

const resolveOrderStatus = (
  order: FlightOrder,
): { label: string; color: string } => {
  const s = (order.order_status ?? order.status ?? "").toLowerCase();
  if (s.includes("hold") || s === "held")
    return { label: "قيد الانتظار", color: "yellow" };
  if (s.includes("book") || s === "booked")
    return { label: "تم الحجز", color: "green" };
  if (s.includes("cancel"))
    return { label: "ملغي", color: "red" };
  return { label: order.order_status || order.status, color: "gray" };
};

const StatusBadge = ({ label, color }: { label: string; color: string }) => {
  const classes: Record<string, string> = {
    green:  "bg-green-50  text-green-700  border-green-200",
    yellow: "bg-amber-50  text-amber-700  border-amber-200",
    red:    "bg-red-50    text-red-600    border-red-200",
    gray:   "bg-gray-50   text-gray-600   border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes[color] ?? classes.gray}`}>
      {label}
    </span>
  );
};

const formatMinutes = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}س ${m}د`;
};

// ── Card ───────────────────────────────────────────────────────────────────────

interface FlightTicketCardProps {
  order: FlightOrder;
}

export const FlightTicketCard = ({ order }: FlightTicketCardProps) => {
  const router       = useRouter();
  const orderStatus  = resolveOrderStatus(order);
  const payStatus    = resolvePaymentStatus(order.payment_transactions);

  // Use first journey for the route summary
  const firstJourney = order.journeys[0];
  const firstSeg     = order.segments[0];
  const lastSeg      = order.segments[order.segments.length - 1];

  const totalMinutes = order.segments.reduce(
    (sum, s) => sum + s.flight_time_in_minutes,
    0,
  );

  const carrierCode  = firstSeg?.marketing_carrier_code ?? "—";
  const flightNumber = firstSeg?.marketing_flight_number ?? "";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <MdFlight size={20} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">
              {carrierCode}{flightNumber && ` · ${flightNumber}`}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">
              {order.airline_pnr || order.ndc_booking_reference}
            </p>
          </div>
        </div>
        <StatusBadge label={orderStatus.label} color={orderStatus.color} />
      </div>

      {/* ── Route row ── */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">

          {/* Departure */}
          <div className="flex flex-col items-center min-w-[56px]">
            <MdFlightTakeoff size={18} className="text-primary mb-0.5 rtl:-scale-x-100 rtl:origin-center" />
            <p className="text-xl font-black text-gray-900 leading-tight">{firstSeg?.origin ?? firstJourney?.origin ?? "—"}</p>
            <p className="text-xs text-gray-500 font-medium">
              {firstSeg ? dayjs(firstSeg.departure_datetime).format("HH:mm") : "—"}
            </p>
            <p className="text-[10px] text-gray-400">
              {firstSeg ? dayjs(firstSeg.departure_datetime).format("D MMM YYYY") : ""}
            </p>
          </div>

          {/* Middle line + stops */}
          <div className="flex-1 flex flex-col items-center gap-1 px-2">
            <p className="text-[10px] text-gray-400">{formatMinutes(totalMinutes)}</p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              {firstJourney && firstJourney.number_of_stops > 0 ? (
                <div className="flex items-center gap-1">
                  {Array.from({ length: firstJourney.number_of_stops }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  ))}
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <p className="text-[10px] text-gray-400">
              {firstJourney
                ? firstJourney.number_of_stops === 0
                  ? "مباشر"
                  : `${firstJourney.number_of_stops} ${firstJourney.number_of_stops === 1 ? "توقف" : "توقفات"}`
                : ""}
            </p>
          </div>

          {/* Arrival */}
          <div className="flex flex-col items-center min-w-[56px]">
            <MdFlightLand size={18} className="text-primary mb-0.5 rtl:-scale-x-100 rtl:origin-center" />
            <p className="text-xl font-black text-gray-900 leading-tight">{lastSeg?.destination ?? firstJourney?.destination ?? "—"}</p>
            <p className="text-xs text-gray-500 font-medium">
              {lastSeg ? dayjs(lastSeg.arrival_datetime).format("HH:mm") : "—"}
            </p>
            <p className="text-[10px] text-gray-400">
              {lastSeg ? dayjs(lastSeg.arrival_datetime).format("D MMM YYYY") : ""}
            </p>
          </div>

        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <FiUsers size={14} className="text-gray-400" />
          <span>{order.passengers.length} {order.passengers.length === 1 ? "مسافر" : "مسافرين"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          <span>{order.total_amount.toLocaleString()}</span>
          <span className="text-gray-400 font-normal">{order.currency}</span>
        </div>
        {order.refundability && (
          <span className="text-xs text-gray-400">{order.refundability}</span>
        )}
      </div>

      {/* ── Footer: payment + actions ── */}
      <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap bg-gray-50/60">
        <div className="flex items-center gap-2">
          <BsCreditCard2Front size={15} className="text-gray-400" />
          <span className="text-xs text-gray-500">الدفع:</span>
          {payStatus ? (
            <StatusBadge label={payStatus.label} color={payStatus.color} />
          ) : (
            <span className="text-xs text-gray-400">لا توجد معاملات</span>
          )}
        </div>
        <Button
          size="small"
          className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold"
          onClick={() => router.push(`/user/flight-tickets/${order.id}`)}>
          التفاصيل
        </Button>
      </div>

    </div>
  );
};
