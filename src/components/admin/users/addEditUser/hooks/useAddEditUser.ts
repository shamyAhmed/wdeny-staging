import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useAddEditUser = () => {
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const {
    mutateAsync: addEditUserMutation,
    isPending: addEditUserLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (values: FormData) =>
      userId
        ? axiosInstance.patch(`/users/${userId}`, values)
        : axiosInstance.post(`/users`, values),
    onSuccess: ({ data }) => {
      toast.success(
        userId ? "تم تحديث المنتج بنجاح!" : "تم إضافة المنتج بنجاح!"
      );
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });

      return data.data;
    },
  });

  return {
    addEditUserMutation,
    addEditUserLoading,
    errors: error,
    data,
  };
};
