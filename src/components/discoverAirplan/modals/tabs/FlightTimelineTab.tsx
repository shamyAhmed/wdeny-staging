"use client";
import Image from "next/image";
import { FaPlane } from "react-icons/fa";

export const FlightTimelineTab = ({ flight }: { flight: any }) => {
    return (
        <div className="flight-timeline">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-bold flex items-center gap-2 text-primary">
                    <FaPlane className="rotate-180" />
                    القاهرة إلى حائل
                </h4>
                <span className="text-gray-400 text-sm">05 مارس 2026</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">المدة الإجمالية : 5 س : 50 د</p>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1 bottom-1 right-[10px] w-[2px] bg-gray-100" />

                {/* First Segment */}
                <div className="relative pr-10 mb-8 pb-8 border-b border-dashed border-gray-100">
                    <div className="absolute top-1 right-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                    <div className="flex justify-between">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h5 className="font-bold text-lg mb-1">القاهرة (CAI) قاهرة مطار دولي</h5>
                                    <p className="text-xs text-gray-400">القاهرة . صالة المطار 3</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl">10:30</p>
                                    <p className="text-[10px] text-gray-400">5 مارس .</p>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-8 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border p-1 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center text-[10px] text-white">SA</div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">الخطوط الجوية السعودية</p>
                                        <p className="text-[10px] text-gray-400 uppercase">SAUDIA</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                    <p>وجبات : No Meals</p>
                                    <p>أمتعة اليد : بالغ 7kg</p>
                                    <p>تسجيل الحقائب : بالغ 0 PC</p>
                                    <p>رقم الرحلة الجوية 0264 XV</p>
                                    <p>حجز الدرجة : E</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="font-bold text-lg mb-1">الرياض (RUH) رياض الملك خالد مطار دولي</h5>
                                    <p className="text-xs text-gray-400">الرياض ، السعودية . صالة المطار 1</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl">14:05</p>
                                    <p className="text-[10px] text-gray-400">5 مارس .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transit Info */}
                <div className="relative pr-10 mb-8">
                    <div className="p-4 bg-red-50 rounded-2xl text-center text-sm font-bold text-gray-600">
                        وقت الترانزيت : الرياض ، 2 س : 50 د
                    </div>
                </div>

                {/* Second Segment */}
                <div className="relative pr-10">
                    <div className="absolute top-1 right-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                    <div className="flex justify-between">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h5 className="font-bold text-lg mb-1">الرياض (RUH) رياض الملك خالد مطار دولي</h5>
                                    <p className="text-xs text-gray-400">الرياض ، السعودية . صالة المطار 1</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl">10:30</p>
                                    <p className="text-[10px] text-gray-400">5 مارس .</p>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-8 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border p-1 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center text-[10px] text-white">SA</div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">الخطوط الجوية السعودية</p>
                                        <p className="text-[10px] text-gray-400 uppercase">SAUDIA</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                    <p>وجبات : No Meals</p>
                                    <p>أمتعة اليد : بالغ 7kg</p>
                                    <p>تسجيل الحقائب : بالغ 0 PC</p>
                                    <p>رقم الرحلة الجوية 0264 XV</p>
                                    <p>حجز الدرجة : E</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="font-bold text-lg mb-1">الرياض (RUH) رياض الملك خالد مطار دولي</h5>
                                    <p className="text-xs text-gray-400">الرياض ، السعودية . صالة المطار 1</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl">14:05</p>
                                    <p className="text-[10px] text-gray-400">5 مارس .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
