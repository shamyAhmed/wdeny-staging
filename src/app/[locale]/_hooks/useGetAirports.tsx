import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { Airport } from "../_types/Airport";
import { ApiResponse } from "../_types/Api";

const useGetAirports = (query?: string) => {
    const locale = useLocale();
    return useQuery({
        enabled: !!query,
        queryKey: [apiRoutes.airports, locale, query],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse<Airport[]>>(apiRoutes.airports, {
                params: { search: query },
            });
            return response.data.data;
        },
    });
};

export default useGetAirports;
