"use client";

export const PriceSummaryTab = ({ flight }: { flight: any }) => {
    return (
        <div className="price-summary p-6 border rounded-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border">ركاب</th>
                            <th className="py-3 px-4 border">الاجرة الاساسية</th>
                            <th className="py-3 px-4 border">الضرائب والرسوم</th>
                            <th className="py-3 px-4 border">لكل مسافر</th>
                            <th className="py-3 px-4 border">السعر الكلي</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-4 px-4 border">بالغ (1)</td>
                            <td className="py-4 px-4 border">EGP 2079.50</td>
                            <td className="py-4 px-4 border">EGP 7202.80</td>
                            <td className="py-4 px-4 border">EGP 9282.30</td>
                            <td className="py-4 px-4 border font-bold">EGP 9282.30</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="py-4 text-right pr-6">
                                <span className="text-xl font-bold text-primary">EGP 9282.30</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mt-8 text-sm text-[#444] text-center">
                قد يكون هناك اختلاف بسيط في ملخص الأجرة بسبب التقريب للفئة التاليه.
            </p>
        </div>
    );
};
