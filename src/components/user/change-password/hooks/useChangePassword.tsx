import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const useChangePassword = () => {
  const pathname = usePathname();
  const router = useRouter();

  const {
    mutateAsync: changePasswordMutation,
    isPending: changePasswordLoading,
    error,
  } = useMutation({
    mutationFn: (values) => axiosInstance.post("/auth/change-password", values),
    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم تغيير كلمة المرور بنجاح");
    },
    onError: (error: { response: { data: { message?: string, error?: string } } }) => {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.error || "حدث خطأ. حاول مرة أخرى."
      );
    },
  });

  return {
    changePasswordMutation,
    changePasswordLoading,
    error,
  };
};
