import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import cartSlice from "./slices/auth/cartSlice";
import flightReducer from "./slices/flight/flightSlice";
import busReducer from "./slices/bus/busSlice";
import busJourneyReducer from "./slices/bus/busJourneySlice";
import privateTripReducer from "./slices/private/privateTripSlice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    flight: flightReducer,
    bus: busReducer,
    busJourney: busJourneyReducer,
    privateTrip: privateTripReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
