export type BusOrderStation = {
    id: string;
    station_id: string;
    name: string;
    city_id: number;
    city_name: string;
    latitude: string | number;
    longitude: string | number;
    arrival_at: string;
};

export type BusOrderTicket = {
    id: number;
    seat_number: string;
    price: string;
};

export type BusOrderCompanyData = {
    name: string;
    avatar: string;
    bus_image: string;
    pin: string;
};

export type BusOrderPaymentData = {
    status: string;
    status_code: string;
    invoice_id: number;
    gateway: string;
    invoice_url: string;
    data: { notes: string };
};

export type BusOrder = {
    number: string;
    id: number;
    trip_id: string;
    gateway_order_id: string;
    company_data: BusOrderCompanyData;
    status: string;
    status_code: string;
    gateway_id: string;
    company_name: string;
    category: string;
    can_be_cancel: boolean;
    trip_type: string;
    is_confirmed: number;
    review: null | unknown;
    can_review: boolean;
    payment_data: BusOrderPaymentData;
    invoice_url: string;
    station_from: BusOrderStation;
    station_to: BusOrderStation;
    tickets: BusOrderTicket[];
    date: string;
    date_time: string;
    payment_url: string;
    cancel_url: string;
    original_tickets_totals: string;
    discount: string;
    wallet_discount: string;
    tickets_totals_after_discount: string;
    payment_fees: string;
    total: string;
};

export type CreateTicketPayload = {
    date: string;
    from_city_id: string | number;
    from_location_id: string | number;
    to_city_id: string | number;
    to_location_id: string | number;
    seats: { seat_type_id: string; seat_id: string }[];
};
