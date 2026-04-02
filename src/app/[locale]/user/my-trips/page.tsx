"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { MyTripsContent } from "@/components/user/my-trips/MyTripsContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const MyTripsPage = () => {
    const getLink = useLocalizedLink();

    return (
        <ProfileLayout
            title="رحلاتي"
            currentPage="رحلاتي"
            currentLink={getLink("/user/my-trips")}
        >
            <MyTripsContent />
        </ProfileLayout>
    );
};

export default MyTripsPage;
