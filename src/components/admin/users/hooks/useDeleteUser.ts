import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteUserMutation,
    isPending: deleteUserLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/users/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف المستخدم بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });

  return {
    deleteUserMutation,
    deleteUserLoading,
    errors: error,
  };
};
