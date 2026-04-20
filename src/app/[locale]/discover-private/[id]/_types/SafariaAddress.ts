export type SafariaAddressMapLocation = {
  lat: number;
  lng: number;
  address_name: string;
};

export type SafariaAddress = {
  id: number;
  city: string | null;
  name: string;
  phone: string;
  notes: string | null;
  whatsapp_share_link: string;
  map_location: SafariaAddressMapLocation;
};
