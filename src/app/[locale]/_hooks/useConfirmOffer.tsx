import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { ConfirmResponse } from "../_types/FlightOffer";
import { toastError } from "@/utils/toastError";

const useConfirmOffer = (offerId: string) => {
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post<ApiResponse<ConfirmResponse>>(
                apiRoutes.confirmOffer(offerId),
            );
            return response.data.data;
        },
        onError: (error: unknown) => {
            toastError(error);
        },
    });
};

export default useConfirmOffer;
