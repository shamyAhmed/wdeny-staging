const apiRoutes = {
  airports: "/flights/iata",
  countries: "/countries",
  searchFlight: "/flights/search",
  confirmOffer: (offerId: string) => `/flights/${offerId}/confirm`,
  offerBundles: (offerId: string) => `/flights/${offerId}/bundles`,
  submitPassengers: (offerId: string) => `/flights/${offerId}/passengers`,
  holdOffer: (offerId: string) => `/flights/${offerId}/hold`,
  settings: "/settings",
  contact: "/contact",
  notifications: "/profile/notifications",
  wallet: "/profile/wallet",
  flightOrders: "/profile/orders/flights",
  flightOrderById: (id: number | string) => `/profile/orders/flights/${id}`,
  // ── Bus (Safaria API) ──────────────────────────────────────────────────────
  busLocations: "/transports/locations",
  busTrips: "/transports/trips",
  privateTrips: "/transports/private/trips",
  privateCreateTicket: (id: string | number) =>
    `/transports/private/trips/${id}/create-ticket`,
  safariaAddresses: "/transports/profile/address-book",
  busCreateRoundTicket: "/v2/transports/buses/create-ticket",
  busReturnTicket: (id: string | number) =>
    `/v2/transports/buses/orders/${id}/return-ticket`,
  busPayReturnOrder: (uuid: string | number) =>
    `/v2/transports/orders/${uuid}/pay`,
  busSeats: (id: string | number) => `/transports/trips/${id}/seats`,
  busCreateTicket: (id: string | number) =>
    `/transports/trips/${id}/create-ticket`,
  busPayOrder: (orderId: string | number) =>
    `/transports/orders/${orderId}/pay`,
  
} as const;

export default apiRoutes;