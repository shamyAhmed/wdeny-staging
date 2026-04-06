const apiRoutes = {
    airports: "/flights/iata",
    countries: "/countries",
    searchFlight: "/flights/search",
    confirmOffer: (offerId: string) => `/flights/${offerId}/confirm`,
    offerBundles: (offerId: string) => `/flights/${offerId}/bundles`,
    submitPassengers: (offerId: string) => `/flights/${offerId}/passengers`,
    holdOffer: (offerId: string) => `/flights/${offerId}/hold`,
} as const;


export default apiRoutes;