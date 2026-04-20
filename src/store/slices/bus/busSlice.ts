import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BusCity = {
  id: number;
  name: string;
};

type BusState = {
  fromCity: BusCity | null;
  toCity:   BusCity | null;
};

const initialState: BusState = {
  fromCity: null,
  toCity:   null,
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setBusCities: (
      state,
      action: PayloadAction<{ fromCity: BusCity; toCity: BusCity }>,
    ) => {
      state.fromCity = action.payload.fromCity;
      state.toCity   = action.payload.toCity;
    },
    flipBusCities: (state) => {
      const tmp      = state.fromCity;
      state.fromCity = state.toCity;
      state.toCity   = tmp;
    },
    clearBusSearchState: (state) => {
      state.fromCity = null;
      state.toCity   = null;
    },
  },
});

export const { setBusCities, flipBusCities, clearBusSearchState } = busSlice.actions;
export default busSlice.reducer;
