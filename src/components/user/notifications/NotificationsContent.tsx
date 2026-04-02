"use client";

import { RiBellLine, RiDeleteBin6Line } from "react-icons/ri";

export const NotificationsContent = () => {
  const hasNotifications = false;

  return (
    <div className="formS1 !border-none">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        الإشعارات
      </h2>

      {hasNotifications ? (
        <>
          {/* Notifications toolbar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-sm text-gray-400">اليوم</span>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-75">
              <RiDeleteBin6Line className="text-base" />
              <span>مسح الكل</span>
            </button>
          </div>
          {/* notification items would go here */}
        </>
      ) : (
        <>
          {/* Notifications toolbar — always visible */}
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-sm text-gray-400">اليوم</span>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-75">
              <RiDeleteBin6Line className="text-base" />
              <span>مسح الكل</span>
            </button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <RiBellLine className="text-4xl text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              لا توجد إشعارات
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              ستظهر هنا جميع الإشعارات المتعلقة بحجوزاتك وتحديثات حسابك.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
