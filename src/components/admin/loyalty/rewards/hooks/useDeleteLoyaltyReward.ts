import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteLoyaltyReward = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteLoyaltyRewardMutation,
    isPending: deleteLoyaltyRewardLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/rewards/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف المكافأه بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "rewards"],
      });
    },
  });

  return {
    deleteLoyaltyRewardMutation,
    deleteLoyaltyRewardLoading,
    errors: error,
  };
};
