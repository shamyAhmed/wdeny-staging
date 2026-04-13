import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsLogged, setUserInfo } from "@/store/slices/auth/authSlice";
export const useUserLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: async (values: { mobile: string; password: string, phonecode: string }) => {
      const response = await  axiosInstance.post("/auth/login", values)
      if(response.status === 200 && response.data?.message?.toLowerCase?.() === "otp code sent" && !response.data.api_token) {
        const redirect = searchParams.get("redirect");
        const redirectParam = redirect ? `&redirect=${encodeURIComponent(redirect)}` : "";
        router.push(`/auth/verify-otp?mobile=${values.mobile}&phonecode=${values.phonecode}${redirectParam}`);
        return;
      }
      return response;
    },
    onSuccess: (response) => {
      if(!response) return;
      const data = response.data;
      const userData = data?.data || {};
      const { api_token } = userData;
      if (!api_token) {
        toast.error("لم يتم استلام رمز الوصول");
        return;
      }
      // Store access token (30 days as it seems to be the main token now)
      setCookie("UserToken", api_token, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
      });
      // Update axios default headers immediately
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${api_token}`;
      // Update Redux state
      dispatch(setIsLogged(true));
      dispatch(setUserInfo(userData));
      // Invalidate cart queries to fetch fresh data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success(data?.message || "تم تسجيل الدخول بنجاح");
      // Get redirect URL from query params or default to home
      const redirectUrl = searchParams.get("redirect") || "/";
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ. حاول مرة أخرى.");
    },
  });
  return {
    loginMutation,
    loginLoading,
    error,
  };
};
