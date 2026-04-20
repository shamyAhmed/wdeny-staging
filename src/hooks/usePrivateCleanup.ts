import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { clearSelectedPrivateTrip } from "@/store/slices/private/privateTripSlice";
import { usePathname } from "@/i18n/navigation";

const DISCOVER_PRIVATE_PREFIX = "discover-private/";
const AUTH_PATHS = ["auth/login", "auth/verify-otp", "auth/register", "user/login", "user/verify-otp", "user/register"];

const stripLocale = (pathname: string) => pathname.replace(/^\/[a-z]{2}\//, "").replace(/^\//, "");
const isAuthPath  = (path: string) => AUTH_PATHS.some((p) => path.startsWith(p));

export const usePrivateCleanup = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const prevRef  = useRef<string>("");

  useEffect(() => {
    const prev    = stripLocale(prevRef.current);
    const current = stripLocale(pathname);

    const prevIsPrivatePage    = prev.startsWith(DISCOVER_PRIVATE_PREFIX);
    const currentIsPrivatePage = current.startsWith(DISCOVER_PRIVATE_PREFIX);

    if (prevIsPrivatePage && !currentIsPrivatePage && !isAuthPath(current)) {
      dispatch(clearSelectedPrivateTrip());
    }

    prevRef.current = pathname;
  }, [pathname, dispatch]);
};
