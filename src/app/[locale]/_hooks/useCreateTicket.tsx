import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "@/i18n/navigation";
import safariaAxios from "@/lib/safariaAxios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { BusOrder, CreateTicketPayload } from "../_types/BusOrder";
import { toastError } from "@/utils/toastError";
import { AppDispatch, RootState } from "@/store/appStore";
import { setBookingId } from "@/store/slices/bus/busJourneySlice";
import { flipBusCities } from "@/store/slices/bus/busSlice";

interface UseCreateTicketOptions {
  tripType?: string;
  returnDate?: string;
}

const useCreateTicket = (
  tripId: string | number,
  options?: UseCreateTicketOptions,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const journey = useSelector((state: RootState) => state.busJourney.journey);
  const isRound = options?.tripType === "round-trip";

  return useMutation({
    mutationFn: async (payload: CreateTicketPayload) => {
      if (isRound) {
        const body = {
          round: 1,
          boarding: {
            trip_id: tripId,
            from_city_id: payload.from_city_id,
            to_city_id: payload.to_city_id,
            from_location_id: payload.from_location_id,
            to_location_id: payload.to_location_id,
            date: payload.date,
            seats: payload.seats,
          },
        };
        const response = await safariaAxios.post<ApiResponse<{ id: string }>>(
          apiRoutes.busCreateRoundTicket,
          body,
        );
        return response.data.data as unknown as BusOrder;
      }
      const response = await safariaAxios.post<ApiResponse<BusOrder>>(
        apiRoutes.busCreateTicket(tripId),
        payload,
      );
      return response.data.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: async (order) => {
      if (isRound) {
        dispatch(setBookingId(String((order as unknown as { id: string }).id)));
        dispatch(flipBusCities());

        const query = new URLSearchParams();
        query.set("city_from", String(journey?.toCityId ?? ""));
        query.set("city_to", String(journey?.fromCityId ?? ""));
        if (options?.returnDate) query.set("date", options.returnDate);

        router.push(`/discover-bus?${query.toString()}`);
        return;
      }

      try {
        const payResponse = await safariaAxios.post<
          ApiResponse<{ url: string }>
        >(apiRoutes.busPayOrder(order.id));
        const url = payResponse.data?.data?.url;
        if (url) window.location.href = url;
      } catch (err) {
        toastError(err);
      }
    },
  });
};

export default useCreateTicket;
