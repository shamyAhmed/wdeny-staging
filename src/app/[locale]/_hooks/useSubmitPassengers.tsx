import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { SubmitPassengersPayload } from "@/components/discoverAirplan/booking/types";

const useSubmitPassengers = (offerId: string) => {
    return useMutation({
        mutationFn: async (payload: SubmitPassengersPayload) => {
            const response = await axiosInstance.post<ApiResponse<unknown>>(
                apiRoutes.submitPassengers(offerId),
                payload,
            );
            return response.data.data;
        },
    });
};

export default useSubmitPassengers;
