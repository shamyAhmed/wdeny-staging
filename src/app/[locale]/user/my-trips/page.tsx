"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const MyTripsPage = () => {
    const getLink = useLocalizedLink();

    return (
        <ProfileLayout
            title="رحلاتي"
            currentPage="رحلاتي"
            currentLink={getLink("/user/my-trips")}
        >
            <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                <h2 className="text-2xl font-bold mb-4">قريباً</h2>
                <p>هذه الصفحة تحت التطوير</p>
            </div>
        </ProfileLayout>
    );
};

export default MyTripsPage;
