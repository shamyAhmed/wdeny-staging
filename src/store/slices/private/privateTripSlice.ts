import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";

type PrivateTripState = {
  trip: PrivateTrip | null;
  price: number | null;
  passengers: number;
};

const initialState: PrivateTripState = {
  trip: null,
  price: null,
  passengers: 1,
};

const privateTripSlice = createSlice({
  name: "privateTrip",
  initialState,
  reducers: {
    setSelectedPrivateTrip: (state, action: PayloadAction<PrivateTrip>) => {
      state.trip = action.payload;
      state.price = action.payload.go_price;
      state.passengers = 1;
    },
    setPassengers: (state, action: PayloadAction<number>) => {
      state.passengers = action.payload;
    },
    clearSelectedPrivateTrip: (state) => {
      state.trip = null;
      state.price = null;
      state.passengers = 1;
    },
  },
});

export const { setSelectedPrivateTrip, setPassengers, clearSelectedPrivateTrip } = privateTripSlice.actions;
export default privateTripSlice.reducer;
