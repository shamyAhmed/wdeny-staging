"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Badge, Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import UserAuthButton from "./UserAuthButton";
import { IoChevronDownCircleOutline, IoLanguage } from "react-icons/io5";
import { TopBar } from "./TopBar";

const { Option } = Select;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const getLink = useLocalizedLink();
  const locale = useLocale();

  // const { items } = useSelector((state: RootState) => state.cart);

  const handleChangeLang = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  };

  const navlinks = [
    { linkKey: "home", path: "" },
    { linkKey: "about", path: "/about-us" },
    { linkKey: "blogs", path: "/blogs" },
    { linkKey: "contactUs", path: "/contact-us" },
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

  return (
    <div
      className={`header fixed top-0 w-full z-20 transition-all duration-300 ease-in-out`}
      id={t("header.nav.home")}>
      <TopBar />
      <div className="bg-white py-1 lg:px-4">
        <div className="header_inner container relative">
          <div className="min-w-20">
            <Link href={getLink("/")}>
              <Image
                src="/images/logo-small.png"
                alt={t("header.logoAlt")}
                width={65}
                height={65}
              />
            </Link>
          </div>

          <button
            className=" w-full justify-end transition-all duration-200 flex md:hidden"
            onClick={toggleMenu}
            aria-label={t("header.mobileMenu.open")}>
            {!isOpen && (
              <RxHamburgerMenu
                className={`cursor-pointer text-3xl duration-300 active:scale-95 !text-white/60`}
              />
            )}
          </button>

          {/* Desktop Nav */}
          <nav className=" items-center gap-6 hidden md:flex">
            {navlinks.map((navlink, i) => {
              const segments = pathname.split("/");
              const currentLocale = segments[1];
              const fullPath = `/${currentLocale}${navlink.path}`;
              return (
                <Link
                  key={i}
                  href={fullPath}
                  className={`link ${pathname === fullPath ? "active" : ""}`}>
                  {t(`header.nav.${navlink.linkKey}`)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Badge
              count={4}
              color="#22c55e">
              <div
                className="w-[42px] h-[42px] bg-[#F9F9F9] rounded-xl flex items-center justify-center"
                aria-label={t("header.notifications")}
                title={t("header.notifications")}>
                <IoMdNotificationsOutline
                  size={20}
                  className="text-[#333] block"
                />
              </div>
            </Badge>
            <div className="selectS1">
              <Select
                value={locale}
                onChange={handleChangeLang}
                style={{ width: 160 }}
                prefix={
                  <IoLanguage
                    size={20}
                    className="text-primary"
                  />
                }
                suffixIcon={
                  <IoChevronDownCircleOutline
                    size={18}
                    className="text-primary"
                  />
                }>
                <Option value="en">{t("header.languages.english")}</Option>
                <Option value="ar">{t("header.languages.arabic")}</Option>
              </Select>
            </div>
            <UserAuthButton />
          </div>
        </div>
      </div>
        <div className="max-w-full overflow-hidden text-nowrap bg-brown py-[18px] text-[14px]">
          <div className="header-animate flex gap-5 text-white">
            {
              Array(8).fill(1).map((_, i) => {
                return (
                  <React.Fragment key={i}>
                  <p>
                    خصم ٢٠ في الميه عند حجز  رحلات بلو باص
                  </p>
                  <p>
                    &#x2022;
                  </p>
                  </React.Fragment>
                )
              })
            }
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
            className="bg-accent fixed -left-3 top-0 z-50 flex h-screen w-[105%] flex-col items-start bg-primary px-10 py-10">
            <div className="flex w-full justify-end pr-6 text-6xl">
              <IoMdClose
                className={`cursor-pointer text-white/60`}
                onClick={toggleMenu}
                aria-label={t("header.mobileMenu.close")}
              />
            </div>

            <div className="flex h-full flex-col items-start gap-10">
              {navlinks.map((navlink, i) => {
                const segments = pathname.split("/");
                const currentLocale = segments[1];
                const fullPath = `/${currentLocale}${navlink.path}`;
                return (
                  <motion.div
                    key={i}
                    variants={navLists}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <Link
                      href={fullPath}
                      onClick={toggleMenu}
                      className={`text-3xl font-light text-primary hover:text-gray-400 ${
                        pathname === fullPath
                          ? "font-semibold text-white"
                          : "text-primary"
                      }`}>
                      {t(`header.nav.${navlink.linkKey}`)}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
