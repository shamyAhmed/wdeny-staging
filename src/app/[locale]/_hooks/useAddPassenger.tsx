import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/appStore";
import { clearFlight, clearSearchState } from "@/store/slices/flight/flightSlice";
import { ApiResponse } from "../_types/Api";
import { HoldResponse } from "../_types/FlightOffer";
import { SubmitPassengersPayload } from "@/components/discoverAirplan/booking/types";
import toast from "react-hot-toast";

type AddPassengerResult = { offerId: string };

type HoldBundleBody = {
    _selectedBundles: {
        journeyKey: string;
        selectedBundleCode: string;
    }[];
};

const useAddPassenger = (offerId: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const bundleCode      = useSelector((state: RootState) => state.flight.bundleCode);
    const bundleJourneyId = useSelector((state: RootState) => state.flight.bundleJourneyId);

    return useMutation({
        mutationFn: async (payload: SubmitPassengersPayload) => {
            // Step 1 — submit passengers
            const passengersRes = await axiosInstance.post<ApiResponse<AddPassengerResult>>(
                apiRoutes.submitPassengers(offerId),
                payload,
            );
            const { offerId: returnedOfferId } = passengersRes.data.data;

            // Step 2 — hold offer (with bundle body only when a bundle is selected)
            const holdBody: HoldBundleBody | undefined =
                bundleCode && bundleJourneyId
                    ? {
                          _selectedBundles: [
                              {
                                  journeyKey: bundleJourneyId,
                                  selectedBundleCode: bundleCode,
                              },
                          ],
                      }
                    : undefined;

            const holdRes = await axiosInstance.post<ApiResponse<HoldResponse>>(
                apiRoutes.holdOffer(returnedOfferId),
                holdBody,
            );

            return holdRes.data.data;
        },
        onSuccess: (data) => {
            console.log("booking result", data);

            // Clear all flight & search state from Redux
            dispatch(clearFlight());
            dispatch(clearSearchState());

            toast.success("تم الحجز بنجاح! جارٍ تحويلك إلى صفحة الدفع...");

            // Navigate to the payment invoice URL returned by the hold endpoint
            window.location.href = data.transaction.invoice_url;
        },
    });
};

export default useAddPassenger;
