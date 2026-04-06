import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import cartSlice from "./slices/auth/cartSlice";
import flightReducer from "./slices/flight/flightSlice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    flight: flightReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
