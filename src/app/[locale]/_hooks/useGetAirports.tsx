import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { Airport } from "../_types/Airport";
import { ApiResponse } from "../_types/Api";

const USE_OLD_AIRPORTS = process.env.NEXT_PUBLIC_AIRPORT_SEARCH === "old";

const useGetAirports = (query?: string) => {
    const locale = useLocale();

    return useQuery({
        enabled: !!query,
        queryKey: USE_OLD_AIRPORTS
            ? [apiRoutes.airports, locale, query]
            : [apiRoutes.airportsSearch, locale, query],
        queryFn: async () => {
            if (USE_OLD_AIRPORTS) {
                const response = await axiosInstance.get<ApiResponse<Airport[]>>(
                    apiRoutes.airports,
                    { params: { search: query } },
                );
                return response.data.data;
            }

            const response = await axiosInstance.get<ApiResponse<Airport[]>>(
                apiRoutes.airportsSearch,
                { params: { term: query } },
            );
            return response.data.data;
        },
    });
};

export default useGetAirports;
