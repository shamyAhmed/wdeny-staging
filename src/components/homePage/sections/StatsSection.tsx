import { Col, Row } from "antd";
import { FaPlaneDeparture, FaUsers, FaCity } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { getTranslations } from "next-intl/server";

export default async function StatsSection() {
  const t = await getTranslations("homePage.stats");

  const stats = [
    {
      key: "bookedTrips",
      icon: FaPlaneDeparture,
      value: t("items.bookedTrips.value"),
      label: t("items.bookedTrips.label"),
    },
    {
      key: "coveredCities",
      icon: FaCity,
      value: t("items.coveredCities.value"),
      label: t("items.coveredCities.label"),
    },
    {
      key: "satisfactionRate",
      icon: MdStarRate,
      value: t("items.satisfactionRate.value"),
      label: t("items.satisfactionRate.label"),
    },
    {
      key: "customers",
      icon: FaUsers,
      value: t("items.customers.value"),
      label: t("items.customers.label"),
    },
  ];

  return (
    <div className="container pt-[87px] pb-[62px]">
      <div className="flex flex-col items-center md:items-stretch md:flex-row gap-4 md:gap-0 md:justify-around">
        {stats.map(({ key, icon: Icon, value, label }) => (
          <div key={key} className="w-full max-w-[420px] md:w-auto">
            <div className="grid grid-cols-[80px_1fr] items-center gap-6">
              <div className="relative h-[80px] w-[80px] flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-red-100" />
                <div className="absolute h-[56px] w-[56px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 flex items-center justify-center">
                  <Icon size={20} color="white" />
                </div>
              </div>
              <div className="py-[8.5px]">
                <p className="text-3xl font-black text-gray-900">{value}</p>
                <p className="text-sm text-gray-400 mt-1">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
