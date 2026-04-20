import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { clearBusSearchState } from "@/store/slices/bus/busSlice";
import { clearSelectedBusJourney } from "@/store/slices/bus/busJourneySlice";
import { usePathname } from "@/i18n/navigation";

const DISCOVER_BUS_PATH        = "discover-bus";
const DISCOVER_BUS_SEAT_PREFIX = "discover-bus/";
const AUTH_PATHS               = ["auth/login", "auth/verify-otp", "auth/register", "user/login", "user/verify-otp", "user/register"];

const stripLocale = (pathname: string) => pathname.replace(/^\/[a-z]{2}\//, "").replace(/^\//, "");
const isAuthPath  = (path: string) => AUTH_PATHS.some((p) => path.startsWith(p));

export const useBusCleanup = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const prevRef  = useRef<string>("");

  useEffect(() => {
    const prev    = stripLocale(prevRef.current);
    const current = stripLocale(pathname);

    // Clear bus search cities when leaving the bus discovery list page
    if (!(prev === DISCOVER_BUS_PATH || current === DISCOVER_BUS_PATH) || current === "") {
      dispatch(clearBusSearchState());
    }

    // Clear selected journey when leaving a seat page,
    // but NOT if the user is navigating to/from an auth route
    // (they may be going to login and coming back)
    const prevIsSeatPage    = prev.startsWith(DISCOVER_BUS_SEAT_PREFIX) && prev !== DISCOVER_BUS_PATH;
    const currentIsSeatPage = current.startsWith(DISCOVER_BUS_SEAT_PREFIX) && current !== DISCOVER_BUS_PATH;

    if (
      prevIsSeatPage &&
      !currentIsSeatPage &&
      !isAuthPath(current) &&
      current !== DISCOVER_BUS_PATH
    ) {
      dispatch(clearSelectedBusJourney());
    }

    prevRef.current = pathname;
  }, [pathname, dispatch]);
};
