export type FlightSegment = {
  id: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  departureTerminal: string;
  arrivalTerminal: string;
  flightTimeInMinutes: number;
  operatingCarrierCode: string;
  operatingCarrierName: string | null;
  operatingCarrierLogo: string | null;
  operatingFlightNumber: string;
  marketingCarrierCode: string;
  marketingFlightNumber: string;
  equipment: string;
};

export type FlightJourney = {
  id: string;
  origin: string;
  destination: string;
  numberOfStops: number;
  segment: FlightSegment[];
};

export type FlightPriceClass = {
  classId: string;
  priceClassName: string;
  fareType: "PublicFare" | "PrivateFare" | string;
  rulesAndPenalties: string | null;
};

export type FlightOffer = {
  offerId: string;
  haveBundles: boolean;
  canBeHeld: boolean;
  refundability: "NotRefundable" | "Refundable" | "PartiallyRefundable" | string;
  journeys: FlightJourney[];
  totalAmount: number;
  taxesAmount: number;
  baseAmount: number;
  discountAmount: number;
  beforeDiscountAmount: number;
  serviceChargeAmount: number;
  currency: string;
  priceClasses: FlightPriceClass[];
};
