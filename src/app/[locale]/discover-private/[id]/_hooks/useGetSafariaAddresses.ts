import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import safariaAxios from "@/lib/safariaAxios";
import apiRoutes from "@/lib/apiRoutes";
import { PaginatedApiResponse } from "@/app/[locale]/_types/Api";
import { SafariaAddress } from "../_types/SafariaAddress";

export const SAFARIA_ADDRESSES_KEY = [apiRoutes.safariaAddresses] as const;

type Options = Omit<UseQueryOptions<SafariaAddress[]>, "queryKey" | "queryFn">;

const useGetSafariaAddresses = (options?: Options) => {
  return useQuery({
    queryKey: SAFARIA_ADDRESSES_KEY,
    queryFn: async () => {
      const response = await safariaAxios.get<PaginatedApiResponse<SafariaAddress[]>>(
        apiRoutes.safariaAddresses,
      );
      return response.data.data;
    },
    ...options,
  });
};

export default useGetSafariaAddresses;
