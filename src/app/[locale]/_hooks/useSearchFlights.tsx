import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { SearchFlightPayload } from "../_types/SearchFlight";
import { FlightOffer } from "../_types/FlightOffer";

const useSearchFlights = (payload: SearchFlightPayload | null) => {
    return useQuery({
        enabled: !!payload,
        queryKey: [apiRoutes.searchFlight, payload],
        queryFn: async () => {
            const response = await axiosInstance.post<ApiResponse<FlightOffer[]>>(
                apiRoutes.searchFlight,
                payload,
            );
            return response.data.data;
        },
    });
};

export default useSearchFlights;
