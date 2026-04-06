import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { FlightBundles } from "../_types/SearchFlight";

const useGetOfferBundles = (offerId: string, haveBundles?: boolean) => {
    return useQuery({
        enabled: !!(offerId && haveBundles),
        queryKey: [apiRoutes.offerBundles(offerId)],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse<FlightBundles[]>>(
                apiRoutes.offerBundles(offerId),
            );
            return response.data.data?.[0];
        },
    });
};

export default useGetOfferBundles;
