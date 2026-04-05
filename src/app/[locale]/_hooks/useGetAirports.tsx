import apiRoutes from "@/lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { airports } from "../_data/airports";
import { Airport } from "../_types/Airport";

const useGetAirports = (query?: string) => {
    const locale = useLocale();
    return useQuery({
        enabled: !!query,
        queryKey: [apiRoutes.airports, locale, query],
        queryFn: async () => {
            const response = await new Promise<Airport[]>(res => {
                setTimeout(() => {
                    if(!query) return res(airports);
                    res(airports.filter(airport => airport.name.toLowerCase().includes(query) || airport.code.toLowerCase().includes(query) || airport.country.toLocaleLowerCase().includes(query) || airport.city.toLowerCase().includes(query)))
                }, 500);
            });
            return response
        }
    });
}

export default useGetAirports;