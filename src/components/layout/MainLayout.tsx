"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePathname } from "@/i18n/navigation";
import { AllRightRecieved } from "./AllRightRecieved";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useScrollTop } from "@/hooks/useScrollTop";
import AppHero from "./AppHero";
// import { useGetUserData } from "@/hooks/useGetUserData";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // useGetUserData();
  const pathnameWithoutLocale = pathname;
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
  useScrollTop();

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
            className={`w-full ${pathname.includes(`/admin`) ? "" : "pt-[150px] lg:pt-[183px] pb-6 lg:pb-0"}`}
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
