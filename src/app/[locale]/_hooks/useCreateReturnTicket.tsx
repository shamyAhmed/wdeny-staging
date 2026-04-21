import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import safariaAxios from "@/lib/safariaAxios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { CreateTicketPayload } from "../_types/BusOrder";
import { toastError } from "@/utils/toastError";
import { RootState } from "@/store/appStore";

const useCreateReturnTicket = (tripId: string | number) => {
  const bookingId = useSelector(
    (state: RootState) => state.busJourney.booking_id,
  );

  return useMutation({
    mutationFn: async (payload: CreateTicketPayload) => {
      const body = {
        trip_id: tripId,
        from_city_id: payload.from_city_id,
        to_city_id: payload.to_city_id,
        from_location_id: payload.from_location_id,
        to_location_id: payload.to_location_id,
        date: payload.date,
        seats: payload.seats,
      };
      const createResponse = await safariaAxios.post<
        ApiResponse<{ id: string }>
      >(apiRoutes.busReturnTicket(bookingId!), body);
      const orderId = createResponse.data.data.id;

      const payResponse = await safariaAxios.post<ApiResponse<{ url: string }>>(
        apiRoutes.busPayReturnOrder(orderId),
        {},
        {
          params: {
            payment_method: "easykash"
          }
        }
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

export default useCreateReturnTicket;
