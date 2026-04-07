"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { FlightInfo } from "@/components/discoverAirplan/cards/AirplaneCard";

export const FlightSummaryCard = () => {
    const flight = useSelector((state: RootState) => state.flight.flight);

    if (!flight) return null;

    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-4">
            <div className="px-5 pt-2 pb-4">
                {flight.legs.map((leg, idx) => (
                    <FlightInfo
                        key={idx}
                        airline={flight.airline}
                        flightNumber={leg.flightNumber}
                        flightClass={leg.class}
                        stops={leg.stops}
                        flightInfo={leg}
                        isReturn={leg.isReturn}
                    />
                ))}
            </div>
        </div>
    );
};
