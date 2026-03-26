"use client";
import { Button, Divider } from "antd";

export const PriceRulesTab = ({ flight }: { flight: any }) => {
    return (
        <div className="price-rules">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                {/* Price Breakdown */}
                <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-6">تقسيمة السعر</h4>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="font-bold">تقسيمة السعر</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-400">
                            <span>بالغ x 1</span>
                            <span>1147.85 ر.س</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-400">
                            <span>الضرائب والرسوم</span>
                            <span>1147.85 ر.س</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold">السعر الكلي</span>
                            <span className="text-2xl font-black text-secondary">2285.85 ر.س</span>
                        </div>
                    </div>
                </div>

                {/* Cancellation Rules Card */}
                <div className="w-full md:w-[320px]">
                    <h4 className="text-2xl font-bold mb-6">رسوم الالغاء</h4>
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-bold">السعر الكلي</span>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">CAI -HAS <br /> HAS -CAI</span>
                                <span className="font-bold text-gray-600">قابل للاسترجاع</span>
                            </div>
                            <Divider className="my-0" />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">رسوم تغيير التاريخ</span>
                                <span className="font-bold text-gray-600"></span>
                            </div>
                            <Divider className="my-0" />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">CAI -HAS <br /> HAS -CAI</span>
                                <span className="font-bold text-gray-600">لا توجد معلومات متاحة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
                <p className="text-[10px] text-gray-400 leading-relaxed mb-6 text-center">
                    تتوقف شركات الطيران عن قبول طلبات الإلغاء أو التغيير قبل 4 - 72 ساعة من مغادرة الرحلة حسب شركة الطيران. تعتبر رسوم شركة الطيران إرشادية بناءً على التفسير الآلي لقواعد أسعار تذاكر الطيران. Wonder Travel لا يضمن دقة هذه المعلومات. قد تختلف رسوم التغيير أو الإلغاء أيضًا بناءً على التقلبات في أسعار تحويل العملات. لمعرفة رسوم الإلغاء أو التغيير بالضبط، يرجى الاتصال بنا على رقم خدمة العملاء لدينا.
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-600">
                        للمزيد من التفاصيل ، <button className="text-primary underline">انقر هنا</button>
                    </span>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <span className="text-2xl font-black text-primary">2285.85 ر.س</span>
                            <p className="text-xs text-gray-400">السعر الكلي</p>
                        </div>
                        <Button type="primary" className="h-12 px-10 rounded-xl font-bold text-lg">احجز الان</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
