export type PassengerTypeCode = "ADT" | "CHD" | "INF";

export type CabinClass =
  | "CABIN_CLASS_ECONOMY"
  | "CABIN_CLASS_PREMIUM_ECONOMY"
  | "CABIN_CLASS_BUSINESS"
  | "CABIN_CLASS_FIRST"
  | "CABIN_CLASS_UNSPECIFIED";

export type SortingCriteria =
  | "CheapestFirst"
  | "FastestFirst"
  | "SlowestFirst"
  | "MostExpensiveFirst"
  | "EarliestDepartureFirst"
  | "LatestDepartureFirst";

export type TripType = "one_way" | "round_trip" | "multi_city";

type SharedFlightFields = {
  passengers: { passengerTypeCode: PassengerTypeCode; count: number }[];
  sortingCriteria: SortingCriteria;
  cabinClass: CabinClass;
  directFlightsOnly: boolean;
};

type PointToPointBase = SharedFlightFields & {
  origin: string;
  destination: string;
  date: string;
};

export type OneWaySearchFlightPayload = PointToPointBase & {
  trip_type: "one_way";
};

export type RoundTripSearchFlightPayload = PointToPointBase & {
  return_date: string;
  trip_type: "round_trip";
};

export type MultiCitySegment = {
  origin: string;
  destination: string;
  date: string;
};

export type MultiCitySearchFlightPayload = SharedFlightFields & {
  segments: MultiCitySegment[];
  trip_type: "multi_city";
};

export type SearchFlightPayload =
  | OneWaySearchFlightPayload
  | RoundTripSearchFlightPayload
  | MultiCitySearchFlightPayload;
