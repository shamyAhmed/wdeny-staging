import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedBusJourney = {
  tripId: number;
  fromCityId: string | number;
  toCityId: string | number;
  fromLocationId: string | number;
  toLocationId: string | number;
  date: string;
  fromCityName: string;
  toCityName: string;
  company: string;
  companyAvatar: string;
  category: string;
  departureTime: string;
  arrivalTime: string;
  fromStationName: string;
  toStationName: string;
  price: number;
};

type BusJourneyState = {
  journey: SelectedBusJourney | null;
  booking_id: string | null;
};

const initialState: BusJourneyState = {
  journey: null,
  booking_id: null,
};

const busJourneySlice = createSlice({
  name: "busJourney",
  initialState,
  reducers: {
    setSelectedBusJourney: (
      state,
      action: PayloadAction<SelectedBusJourney>,
    ) => {
      state.journey = action.payload;
    },
    setBookingId: (state, action: PayloadAction<string>) => {
      state.booking_id = action.payload;
    },
    clearJourneyKeepBookingId: (state) => {
      state.journey = null;
    },
    clearSelectedBusJourney: (state) => {
      state.journey = null;
      state.booking_id = null;
    },
  },
});

export const {
  setSelectedBusJourney,
  setBookingId,
  clearJourneyKeepBookingId,
  clearSelectedBusJourney,
} = busJourneySlice.actions;
export default busJourneySlice.reducer;
