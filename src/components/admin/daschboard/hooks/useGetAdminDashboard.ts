import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/dashboard`)
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};
