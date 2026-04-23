"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { FlightTicketsContent } from "@/components/user/flight-tickets/FlightTicketsContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const MyTripsPage = () => {
  const getLink = useLocalizedLink();

  return (
    <ProfileLayout
      title="رحلاتي"
      currentPage="رحلاتي"
      currentLink={getLink("/user/my-trips")}
    >
      <FlightTicketsContent />
    </ProfileLayout>
  );
};

export default MyTripsPage;
