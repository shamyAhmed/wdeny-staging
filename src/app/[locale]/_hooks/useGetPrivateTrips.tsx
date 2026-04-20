import apiRoutes from "@/lib/apiRoutes";
import safariaAxios from "@/lib/safariaAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedApiResponse } from "../_types/Api";
import { PrivateTrip } from "../_types/PrivateTrip";

export type PrivateTripsFilters = {
  from_location_id?: number | string;
  to_location_id?: number | string;
  date?: string;
  tripType?: "one-way" | "round-trip";
  return_date?: string;
};

const useGetPrivateTrips = (filters: PrivateTripsFilters) => {
  return useInfiniteQuery({
    queryKey: [apiRoutes.privateTrips, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      if (filters.from_location_id) params.set("from_location_id", String(filters.from_location_id));
      if (filters.to_location_id)   params.set("to_location_id",   String(filters.to_location_id));
      if (filters.date)             params.set("date",             filters.date);
      if (filters.tripType)         params.set("tripType",         filters.tripType);
      if (filters.return_date)      params.set("return_date",      filters.return_date);
      params.set("page", String(pageParam));

      const response = await safariaAxios.get<PaginatedApiResponse<PrivateTrip[]>>(
        `${apiRoutes.privateTrips}?${params.toString()}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, lastPage: totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!(filters.from_location_id && filters.to_location_id && filters.date && filters.tripType),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetPrivateTrips;
