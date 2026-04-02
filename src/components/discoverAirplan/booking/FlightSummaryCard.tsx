import { FlightInfo } from "@/components/discoverAirplan/cards/AirplaneCard";

export const FlightSummaryCard = () => {
    const outboundLeg = {
        departureTime: "10:40",
        departureCity: "القاهرة",
        arrivalTime: "23:35",
        arrivalCity: "حائل",
        duration: "5 س : 55 د",
        date: "27 مارس 2026",
        flightNumber: "SV0310",
        class: "سياحية",
    };

    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-4">
            <div className="px-5 pt-2 pb-4">
                <FlightInfo
                    airline="الخطوط الجوية السعودية"
                    flightNumber="SV0310"
                    flightClass="سياحية"
                    stops="Direct"
                    flightInfo={outboundLeg}
                />
            </div>
        </div>
    );
};
