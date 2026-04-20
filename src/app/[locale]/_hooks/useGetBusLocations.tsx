import apiRoutes from "@/lib/apiRoutes";
import safariaAxios from "@/lib/safariaAxios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { BusLocation } from "../_types/BusLocation";

const useGetBusLocations = () => {
    return useQuery({
        queryKey: [apiRoutes.busLocations],
        queryFn: async () => {
            const response = await safariaAxios.get<ApiResponse<BusLocation[]>>(apiRoutes.busLocations);
            return response.data.data;
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });
};

export default useGetBusLocations;
