import { BusLocation } from "./BusLocation";

export type PrivateTripBusType = {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
  seats_number: number;
};

export type PrivateTripBus = {
  id: number;
  name: string;
  type: PrivateTripBusType;
  seats_number: string;
  license_plate: string;
  vin: string;
  mileage: string;
  engine_hours: string;
  model: string;
  year: string;
  color: string | null;
  notes: string | null;
  status: string;
  featured_image: string;
  images: string[];
};

export type PrivateTrip = {
  id: number;
  company_name: string;
  company_logo: string;
  date: string;
  from_location: BusLocation;
  to_location: BusLocation;
  bus: PrivateTripBus;
  rounded: boolean;
  original_price: number;
  discount: string;
  price: number;
  go_price: number;
  round_price: number;
};
