// components/header/UserAuthButton.tsx
"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { RiMapPinLine, RiSuitcaseLine } from "react-icons/ri";
import { useLogout } from "@/hooks/auth/useLogout";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useAuth } from "@/hooks/auth/useAuth";
import { Button, Dropdown, Space, Avatar } from "antd";
import type { MenuProps } from "antd";
import { IoPersonOutline, IoChevronDown } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";

export default function UserAuthButton() {
  const { logout, isLoggingOut } = useLogout();
  const getLink = useLocalizedLink();
  const { isAuthenticated, isLoading } = useAuth();
  const { user } = useGetUserProfile();
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href={getLink("/user/profile")}>المعلومات الشخصية</Link>,
      icon: <FiUser />,
    },
    {
      key: "trips",
      label: <Link href={getLink("/user/my-trips")}>رحلاتي</Link>,
      icon: <RiSuitcaseLine />,
    },
    {
      key: "notifications",
      label: <Link href={getLink("/user/notifications")}>الإشعارات</Link>,
      icon: <FiBell />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "تسجيل الخروج",
      icon: <FiLogOut />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button
          type="primary"
          className="!h-11 !rounded-xl !px-4 flex items-center gap-2"
        >
          <Space>
            {user?.name || "الحساب"}
            <IoChevronDown size={14} />
          </Space>
        </Button>
      </Dropdown>
    );
  }

  return (
    <Button
      title="تسجيل الدخول"
      type="primary"
      onClick={() => router.push(getLink("/user/login"))}
      className="!h-11 !rounded-xl !px-6"
    >
      <IoPersonOutline size={20} />
      تسجيل الدخول
    </Button>
  );
}

