"use client";
import { Divider } from "antd";
import { FaSuitcase } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const PriceSummary = () => {
    const flight = useSelector((state: RootState) => state.flight.flight);
    if (!flight) return null;
    const { baseAmount, taxesAmount, discountAmount, serviceChargeAmount, price, currency } = flight;
    const fmt = (val: number) => `${val.toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
    return (
        <div className="bg-white rounded-[20px] px-6 py-6 border border-gray-100 shadow-sm sticky top-[170px] lg:top-[200px]">
            <h4 className="font-bold text-[#333] text-lg mb-5 flex items-center gap-2 justify-end">
                ملخص السعر <FaSuitcase className="text-primary" />
            </h4>
            <div className="flex items-center justify-between py-2">
                <span className="text-[#555]">{fmt(baseAmount)}</span>
                <span className="text-[#333] font-medium">السعر الأساسي</span>
            </div>
            <div className="flex items-center justify-between py-2">
                <span className="text-[#555]">{fmt(taxesAmount)}</span>
                <span className="text-[#333] font-medium">الضرائب والرسوم</span>
            </div>
            {serviceChargeAmount > 0 && (
                <div className="flex items-center justify-between py-2">
                    <span className="text-[#555]">{fmt(serviceChargeAmount)}</span>
                    <span className="text-[#333] font-medium">رسوم الخدمة</span>
                </div>
            )}
            {discountAmount > 0 && (
                <div className="flex items-center justify-between py-2">
                    <span className="text-green-600 font-medium">- {fmt(discountAmount)}</span>
                    <span className="text-[#333] font-medium">الخصم</span>
                </div>
            )}
            <Divider className="!my-3" />
            <div className="flex items-center justify-between py-2">
                <span className="text-primary font-bold text-lg">{fmt(price)}</span>
                <span className="font-bold text-[#333] text-lg">السعر الكلي</span>
            </div>
        </div>
    );
};
