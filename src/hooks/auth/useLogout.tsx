// hooks/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useRouter, usePathname } from "@/i18n/navigation";
import { logoutAPI } from "@/apiCalls/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/store/slices/auth/authSlice";

export const useLogout = () => {
  const [, , removeCookie] = useCookies([
    "UserToken",
    "RefreshToken",
    "AdminToken",
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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

      if (pathname.startsWith("/admin")) {
        router.push("/admin/login");
        toast.success("تم تسجيل الخروج بنجاح");
        return;
      } else {
        router.push("/auth/login");
        toast.success("تم تسجيل الخروج بنجاح");
      }
    },
    onError: () => {
      // Even if API call fails, clear tokens locally
      removeCookie("UserToken", { path: "/" });
      removeCookie("RefreshToken", { path: "/" });
      removeCookie("AdminToken", { path: "/" });
      queryClient.clear();

      if (pathname.startsWith("/admin")) {
        router.push("/admin/login");
        return;
      } else {
        router.push("/auth/login");
      }
    },
    onMutate: () => {
      dispatch(logoutAction());
    }
  });

  return { logout, logoutAsync, isLoggingOut };
};
