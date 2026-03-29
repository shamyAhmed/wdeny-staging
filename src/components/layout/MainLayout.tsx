"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { AllRightRecieved } from "./AllRightRecieved";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import AppHero from "./AppHero";
// import { useGetUserData } from "@/hooks/useGetUserData";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // useGetUserData();
  const locales = ["en", "ar"];
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^/(${locales.join("|")})`),
    ""
  );
  const loginPaths = [
    "/admin",
    // "/user/login",
    // "/user/register",
    // "/user/forget-password",
    // "/user/verify-otp",
    // "/user/reset-password",
  ];

  const { isAuthenticated } = useAuth();

  useTokenRefresh(isAuthenticated);

  const isAuthLayout = loginPaths.some((path) =>
    pathnameWithoutLocale.startsWith(path)
  );

  return (
    <>
      {isAuthLayout ? (
        children
      ) : (
        <>
          <Header />
          <div
            className={`w-full ${pathname.includes(`/admin`) ? "" : "pt-[150px] lg:pt-[183px]"}`}
          >
            {children}
          </div>

          <AppHero />
          <Footer />
          <AllRightRecieved />
        </>
      )}
    </>
  );
}
