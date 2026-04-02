"use client";
import { useState } from "react";
import { Button, Divider, Input } from "antd";
import { FaSuitcase } from "react-icons/fa6";

export const PriceSummary = () => {
    const [couponCode, setCouponCode] = useState("");

    return (
        <>
            <div className="bg-white rounded-[20px] px-6 py-6 mb-4 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#333] text-base mb-4 text-right">ادخل رمز الكوبون</h4>
                <div className="flex gap-2">
                    <Input
                        placeholder="ادخل رمز الكوبون"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 rounded-xl"
                    />
                    <Button type="primary" className="!rounded-xl !font-bold !h-[38px] shrink-0">
                        تاكيد الاختيار
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[20px] px-6 py-6 border border-gray-100 shadow-sm sticky top-[170px] lg:top-[200px]">
                <h4 className="font-bold text-[#333] text-lg mb-5 flex items-center gap-2 justify-end">
                    ملخص السعر
                    <FaSuitcase className="text-primary" />
                </h4>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-[#555]">36292.72 EGP</span>
                    <span className="text-[#333] font-medium">سعر شركة الطيران</span>
                </div>
                <Divider className="!my-3" />
                <div className="flex items-center justify-between py-2">
                    <span className="text-primary font-bold text-lg">36292.72 EGP</span>
                    <span className="font-bold text-[#333] text-lg">السعر الكلي</span>
                </div>
            </div>
        </>
    );
};
