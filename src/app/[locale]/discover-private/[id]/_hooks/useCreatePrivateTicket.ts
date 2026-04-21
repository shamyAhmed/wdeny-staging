import { useMutation } from "@tanstack/react-query";
import safariaAxios from "@/lib/safariaAxios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { toastError } from "@/utils/toastError";

export type CreatePrivateTicketPayload = {
  tripId: string | number;
  isRound: boolean;
  boarding: {
    address_id: number;
    date: string; // "YYYY-MM-DD HH:mm"
  };
  return?: {
    address_id: number;
    date: string; // "YYYY-MM-DD HH:mm"
  };
};

const useCreatePrivateTicket = () => {
  return useMutation({
    mutationFn: async (payload: CreatePrivateTicketPayload) => {
      const body: Record<string, unknown> = {
        round: payload.isRound ? 2 : 1,
        boarding: payload.boarding,
      };

      if (payload.isRound && payload.return) {
        body.return = payload.return;
      }

      const createResponse = await safariaAxios.post<ApiResponse<{ id: string }>>(
        apiRoutes.privateCreateTicket(payload.tripId),
        body,
      );
      const orderId = createResponse.data.data.id;

      const payResponse = await safariaAxios.post<ApiResponse<{ url: string }>>(
        apiRoutes.busPayOrder(orderId),
      );
      return payResponse.data.data.url;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: (url) => {
      if (url) window.location.href = url;
    },
  });
};

export default useCreatePrivateTicket;
