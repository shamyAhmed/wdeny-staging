import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface UseGetAdminProductsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminLoyaltyPoints = (
  params?: UseGetAdminProductsParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "points", params],
    queryFn: async () => {
      // Build query string
      const queryParams = new URLSearchParams();

      if (params?.search) {
        queryParams.append("search", params.search);
      }
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }
      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      const queryString = queryParams.toString();
      const url = queryString ? `/products?${queryString}` : `/products`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetAdminLoyaltyPoint = () => {
  const { productId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "points", productId],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/products/${productId}`)
        .then((response) => response.data);

      return response.data;
    },
    enabled: !!productId,
  });
  return { productData: data, isLoading, error };
};
