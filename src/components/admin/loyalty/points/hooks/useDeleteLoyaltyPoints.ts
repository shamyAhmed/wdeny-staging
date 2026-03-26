import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteLoyaltyPoint = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteLoyaltyPointMutation,
    isPending: deleteLoyaltyPointLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/products/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف نقاط الولاء بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "points"],
      });
    },
  });

  return {
    deleteLoyaltyPointMutation,
    deleteLoyaltyPointLoading,
    errors: error,
  };
};
