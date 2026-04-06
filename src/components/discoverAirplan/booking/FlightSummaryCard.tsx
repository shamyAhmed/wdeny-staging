"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { FlightInfo } from "@/components/discoverAirplan/cards/AirplaneCard";

export const FlightSummaryCard = () => {
    const flight = useSelector((state: RootState) => state.flight.flight);

    if (!flight) return null;

    const outboundLeg = {
        departureTime: flight.departureTime,
        departureCity: flight.departureCity,
        arrivalTime: flight.arrivalTime,
        arrivalCity: flight.arrivalCity,
        duration: flight.duration,
        date: flight.date,
        flightNumber: flight.flightNumber,
        class: flight.class,
    };

    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-4">
            <div className="px-5 pt-2 pb-4">
                <FlightInfo
                    airline={flight.airline}
                    flightNumber={flight.flightNumber}
                    flightClass={flight.class}
                    stops={flight.stops}
                    flightInfo={outboundLeg}
                />
                {flight.returnFlight && (
                    <FlightInfo
                        airline={flight.airline}
                        flightNumber={flight.returnFlight.flightNumber}
                        flightClass={flight.returnFlight.class}
                        stops={[]}
                        flightInfo={flight.returnFlight}
                        isReturn
                    />
                )}
            </div>
        </div>
    );
};
