import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airport } from "@/app/[locale]/_types/Airport";
import { FlightJourneyLeg } from "@/app/[locale]/_types/FlightOffer";

export type FlightInformation = {
  id: string;
  haveBundles: boolean;
  airline: string;
  airlineLogo: string;
  price: number;
  currency: string;
  isRefundable: boolean;
  refundability: string;
  legs: FlightJourneyLeg[];
};

type FlightState = {
  // ── Booking state ──────────────────────────────
  flight: FlightInformation | null;
  confirmCode: string | null;
  bundleCode: string | null;
  bundleJourneyId: string | null;

  // ── Search state (per segment, by index) ───────
  origins: (Airport | null)[];
  destinations: (Airport | null)[];
  fromDates: (string | null)[];
};

const initialState: FlightState = {
  flight: null,
  confirmCode: null,
  bundleCode: null,
  bundleJourneyId: null,
  origins: [],
  destinations: [],
  fromDates: [],
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    // ── Booking actions ────────────────────────────
    setConfirmedFlight: (
      state,
      action: PayloadAction<{
        flight: FlightInformation;
        confirmCode: string;
        bundleCode?: string | null;
        bundleJourneyId?: string | null;
      }>,
    ) => {
      state.flight = action.payload.flight;
      state.confirmCode = action.payload.confirmCode;
      state.bundleCode = action.payload.bundleCode ?? null;
      state.bundleJourneyId = action.payload.bundleJourneyId ?? null;
    },
    clearFlight: (state) => {
      state.flight = null;
      state.confirmCode = null;
      state.bundleCode = null;
      state.bundleJourneyId = null;
    },

    // ── Search state actions ───────────────────────
    setOrigin: (
      state,
      action: PayloadAction<{ index: number; airport: Airport | null }>,
    ) => {
      const { index, airport } = action.payload;
      while (state.origins.length <= index) state.origins.push(null);
      state.origins[index] = airport;
    },
    setDestination: (
      state,
      action: PayloadAction<{ index: number; airport: Airport | null }>,
    ) => {
      const { index, airport } = action.payload;
      while (state.destinations.length <= index) state.destinations.push(null);
      state.destinations[index] = airport;
    },
    setFromDate: (
      state,
      action: PayloadAction<{ index: number; date: string | null }>,
    ) => {
      const { index, date } = action.payload;
      while (state.fromDates.length <= index) state.fromDates.push(null);
      state.fromDates[index] = date;
    },
    clearSearchState: (state) => {
      state.origins = [];
      state.destinations = [];
      state.fromDates = [];
    },
  },
});

export const {
  setConfirmedFlight,
  clearFlight,
  setOrigin,
  setDestination,
  setFromDate,
  clearSearchState,
} = flightSlice.actions;
export default flightSlice.reducer;
