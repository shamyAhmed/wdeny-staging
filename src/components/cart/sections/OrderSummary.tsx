import { Button } from "antd";
import { Link } from "@/i18n/navigation";
import { FaCheck } from "react-icons/fa6";

interface OrderSummaryProps {
  cart: {
    subtotal: number;
    shippingFee: number;
    total: number;
    currency: string;
  };
}

export const OrderSummary = ({ cart }: OrderSummaryProps) => {
  return (
    <div className="order-summary">
      <h5 className="text-primary text-2xl font-bold mb-6">ملخص الطلب</h5>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">المجموع الفرعي</span>
        <span className="text-secondary text-lg">
          {cart.subtotal} {cart.currency}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">الشحن</span>
        <span className="text-secondary text-lg">
          {cart.shippingFee === 0
            ? "مجاني"
            : `${cart.shippingFee} ${cart.currency}`}
        </span>
      </div>
      <hr className="border-[1px] border-[#E0E0E1] my-4" />
      <div className="flex items-center justify-between mb-6">
        <span className="text-secondary text-xl font-bold">الإجمالي</span>
        <span className="text-secondary text-xl font-bold">
          {" "}
          {cart.total} {cart.currency}
        </span>
      </div>
      <Link
        href="/checkout"
        className="flex items-center justify-center w-full bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-2 rounded-lg text-lg font-medium transition-colors text-center"
      >
        إتمام الشراء
      </Link>
      <hr className="border-[1px] border-[#E0E0E1] my-6" />
      <ul className="flex gap-2 flex-col">
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>دفع آمن ومشفر</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>شحن سريع خلال 2-3 أيام</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>إرجاع مجاني خلال 14 يوم</span>
        </li>
      </ul>
    </div>
  );
};
