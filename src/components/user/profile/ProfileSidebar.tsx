"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useLogout } from "@/hooks/auth/useLogout";
import {
  FiUser,
  FiLock,
  FiBell,
  FiMapPin,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";
import {
  RiLockPasswordFill,
  RiSuitcaseLine,
  RiWalletLine,
} from "react-icons/ri";
import { FaPlane } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export const ProfileSidebar = () => {
  const pathname = usePathname();
  const getLink = useLocalizedLink();
  const { logout } = useLogout();

  const menuItems = [
    {
      name: "المعلومات الشخصية",
      path: "/user/profile",
      icon: <FiUser />,
    },
    {
      name: "تغيير كلمة المرور",
      path: "/user/change-password",
      icon: <RiLockPasswordFill />,
    },
    {
      name: "رحلاتي",
      path: "/user/my-trips",
      icon: <FaPlane />,
    },
    {
      name: "العناوين المحفوظة",
      path: "/user/saved-addresses",
      icon: <FaMapMarkerAlt />,
    },
    {
      name: "الإشعارات",
      path: "/user/notifications",
      icon: <FiBell />,
    },
    {
      name: "محفظتي",
      path: "/user/my-wallet",
      icon: <RiWalletLine />,
    },
    {
      name: "حذف الحساب",
      path: "/user/delete-account",
      icon: <FiTrash2 />,
      danger: true,
    },
  ];

  return (
    <div className="bg-white rounded-[30px] py-5 px-6 h-fit">
      <ul className="flex flex-col">
        {menuItems.map((item) => {
          const fullPath = getLink(item.path);
          const isActive = pathname === fullPath;

          return (
            <li key={item.path}>
              <Link
                href={fullPath}
                className={`flex items-center justify-between py-[30px] transition-all duration-200 border-b hover:text-primary  ${
                  isActive
                    ? " text-primary  border-primary"
                    : "text-gray-600 hover:!text-primary border-[#E2E2E2]"
                } ${item.danger ? "hover:text-red-500" : ""}`}
              >
                <div className="flex items-center gap-[10px]">
                  <span className={`text-xl`}>{item.icon}</span>
                  <span className={`${isActive ? "font-semibold" : "" }`}>{item.name}</span>
                </div>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-gray-600 hover:bg-red-50 hover:text-red-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl text-gray-400">
                <FiLogOut />
              </span>
              <span className="font-bold text-base">تسجيل الخروج</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};
