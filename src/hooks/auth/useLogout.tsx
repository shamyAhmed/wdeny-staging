// hooks/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useRouter, usePathname } from "next/navigation";
import { logoutAPI } from "@/apiCalls/auth/authApi";
import toast from "react-hot-toast";

export const useLogout = () => {
  const [, , removeCookie] = useCookies([
    "UserToken",
    "RefreshToken",
    "AdminToken",
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const locale = pathname.split("/")[1] || "ar";

  const {
    mutate: logout,
    mutateAsync: logoutAsync,
    isPending: isLoggingOut,
  } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // Clear tokens
      removeCookie("UserToken", { path: "/" });
      removeCookie("RefreshToken", { path: "/" });
      removeCookie("AdminToken", { path: "/" });

      // Clear all queries
      queryClient.clear();

      if (pathname.startsWith(`/${locale}/admin`)) {
        router.push(`/${locale}/admin/login`);
        toast.success("تم تسجيل الخروج بنجاح");
        return;
      } else {
        router.push(`/${locale}/user/login`);
        toast.success("تم تسجيل الخروج بنجاح");
      }
    },
    onError: () => {
      // Even if API call fails, clear tokens locally
      removeCookie("UserToken", { path: "/" });
      removeCookie("RefreshToken", { path: "/" });
      removeCookie("AdminToken", { path: "/" });
      queryClient.clear();

      if (pathname.startsWith(`/${locale}/admin`)) {
        router.push(`/${locale}/admin/login`);
        return;
      } else {
        router.push(`/${locale}/user/login`);
      }
    },
  });

  return { logout, logoutAsync, isLoggingOut };
};
