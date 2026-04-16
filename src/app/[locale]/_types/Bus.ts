export type BusClass = {
  name: string;
  price: number;
  currency: string;
  isFeatured?: boolean;
};

export type BusNeighborhood = {
  id: string;
  name: string;
};

export type BusTerminal = {
  city: string;
  neighborhoods: BusNeighborhood[];
};

export type BusAmenity = "seat" | "wifi" | "ac" | "accessible" | "luggage";

export type BusResult = {
  id: string;
  companyName: string;
  companyLogo: string;
  rating: number;
  images: string[];
  isFeatured?: boolean;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  duration: string;
  classes?: BusClass[];
  from: BusTerminal;
  to: BusTerminal;
  seatsRemaining: number;
  amenities: BusAmenity[];
};
