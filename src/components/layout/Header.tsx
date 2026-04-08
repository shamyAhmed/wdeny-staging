"use client";

import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import UserAuthButton from "./UserAuthButton";
import { TopBar } from "./TopBar";
import LanguageSelect from "./language-select/LanguageSelect";
import NotificationButton from "./NotificationButton";
import { useAuth } from "@/hooks/auth/useAuth";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const t = useTranslations();
  const { isAuthenticated } = useAuth();

  const navlinks = [
    { linkKey: "home", path: "" },
    { linkKey: "about", path: "/about-us" },
    { linkKey: "blogs", path: "/blogs" },
    { linkKey: "contactUs", path: "/contact-us" },
  ];

  const profileSidebarLinks = [
    { name: "المعلومات الشخصية", path: "/user/profile" },
    { name: "تغيير كلمة المرور", path: "/user/change-password" },
    { name: "رحلاتي", path: "/user/my-trips" },
    { name: "العناوين المحفوظة", path: "/user/saved-addresses" },
    { name: "الإشعارات", path: "/user/notifications" },
    { name: "محفظتي", path: "/user/my-wallet" },
    { name: "حذف الحساب", path: "/user/delete-account" },
  ];

  const navVariants = {
    hidden: { y: "-200%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.3 },
    },
  };

  const navLists = {
    hidden: { x: "100%" },
    visible: {
      x: "1%",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        delay: 0.3,
      },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 70, damping: 25, delay: 0.3 },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`header fixed top-0 w-full z-20 transition-all duration-300 ease-in-out`}
      id={t("header.nav.home")}>
      <TopBar />
      <div className="bg-white py-1">
        <div className="header_inner container relative">
          <div className="flex gap-2 items-center">
            <button
              className="transition-all duration-200 lg:hidden"
              onClick={toggleMenu}
              aria-label={t("header.mobileMenu.open")}>
              {!isOpen && (
                <RxHamburgerMenu
                  className={`cursor-pointer text-3xl duration-300 active:scale-95 text-black`}
                />
              )}
            </button>
            <div className="size-[35px] min-w-[35px] lg:size-[68px]">
              <Link href={"/"}>
                <Image
                  src="/images/logo-small.png"
                  alt={t("header.logoAlt")}
                  width={68}
                  height={68}
                />
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="items-center gap-11 hidden lg:flex">
            {navlinks.map((navlink, i) => {
              const path = navlink.path || "/";
              return (
                <Link
                  key={i}
                  href={path}
                  className={`link ${pathname === path ? "!text-primary rounded-lg lg:rounded-2xl bg-primary/20 px-5 py-2 lg:px-[30px] lg:py-[14px] font-bold" : "font-bolder"}`}>
                  {t(`header.nav.${navlink.linkKey}`)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="hidden sm:block">
                <NotificationButton href={"/user/notifications"} />
              </div>
            )}
            <LanguageSelect className="hidden sm:block" />
            <div className={isAuthenticated ? "" : "hidden sm:block"}>
              <UserAuthButton />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-hidden text-nowrap bg-brown py-[18px] text-[14px]">
        <div className="header-animate flex gap-5 text-white">
          {Array(8)
            .fill(1)
            .map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <p>خصم ٢٠ في الميه عند حجز رحلات شركة سابتكو لشهر ابريل</p>
                  <p>&#x2022;</p>
                </React.Fragment>
              );
            })}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 z-50 flex h-screen w-[100%] flex-col items-start bg-white px-10 py-10">
            <div className="flex w-full justify-end pr-6 text-3xl mb-4">
              <IoMdClose
                className={`cursor-pointer text-primary`}
                onClick={toggleMenu}
                aria-label={t("header.mobileMenu.close")}
              />
            </div>

            <div className="flex h-full w-full flex-col items-start gap-4">
              {navlinks.map((navlink, i) => {
                const path = navlink.path || "/";
                return (
                  <motion.div
                    key={i}
                    variants={navLists}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full">
                    <Link
                      href={path}
                      onClick={toggleMenu}
                      className={`text-xl block text-center py-2 rounded-xl font-light w-full hover:text-gray-400 ${
                        pathname === path
                          ? "font-semibold bg-primary/10 text-primary"
                          : "text-primary"
                      }`}>
                      {t(`header.nav.${navlink.linkKey}`)}
                    </Link>
                  </motion.div>
                );
              })}

              {isAuthenticated &&
                profileSidebarLinks.map((profileLink) => {
                  return (
                    <motion.div
                      key={profileLink.path}
                      variants={navLists}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full">
                      <Link
                        href={profileLink.path}
                        onClick={toggleMenu}
                        className={`text-xl block text-center py-2 rounded-xl font-light w-full hover:text-gray-400 ${
                          pathname === profileLink.path
                            ? "font-semibold bg-primary/10 text-primary"
                            : "text-primary"
                        }`}>
                        {profileLink.name}
                      </Link>
                    </motion.div>
                  );
                })}

              <div className="mt-auto flex w-full gap-2 items-center flex-col">
                {isAuthenticated && (
                  <NotificationButton href={"/user/notifications"} />
                )}
                <div className="w-full">
                  <LanguageSelect className="!w-full" />
                </div>
                {!isAuthenticated && <UserAuthButton />}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
