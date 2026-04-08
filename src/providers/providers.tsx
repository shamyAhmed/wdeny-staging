"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { Provider, useDispatch } from "react-redux";
import { appStore, AppDispatch } from "@/store/appStore";
import { clearFlight, clearSearchState } from "@/store/slices/flight/flightSlice";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

const BOOKING_PATH = "discover-airplan/booking";
const DISCOVER_AIRPLAN_PATH = "discover-airplan";

// Navigating to these paths from booking should NOT clear flight state
const AUTH_PATHS = ["user/login", "user/verify-otp", "user/register"];

const pathWithoutLocale = (pathname: string) =>
  pathname.replace(/^\//, "");

const isAuthPath = (path: string) =>
  AUTH_PATHS.some((authPath) => path.startsWith(authPath));

// Clears flight Redux slice whenever the user navigates away from the booking page,
// unless the destination is an authentication page (login / OTP / register).
const FlightCleanup = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    const prev = pathWithoutLocale(prevPathRef.current);
    const current = pathWithoutLocale(pathname);

    if (prev === BOOKING_PATH && current !== BOOKING_PATH && !isAuthPath(current)) {
      dispatch(clearFlight());
    }

    if (!(prev === DISCOVER_AIRPLAN_PATH || current === DISCOVER_AIRPLAN_PATH) || current === "") {
      dispatch(clearSearchState());
    }

    prevPathRef.current = pathname;
  }, [pathname, dispatch]);

  return null;
};

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const locale = useLocale();

  const theme = {
    token: {
      fontFamily:
        locale === "ar"
          ? "'Norsal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          : "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
  };

  return (
    <Provider store={appStore}>
      <FlightCleanup />
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
            theme={theme}
            direction={locale === "ar" ? "rtl" : "ltr"}
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </Provider>
  );
}
