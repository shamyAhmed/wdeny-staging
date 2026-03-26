"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const DeleteAccountPage = () => {
    const getLink = useLocalizedLink();

    return (
        <ProfileLayout
            title="حذف الحساب"
            currentPage="حذف الحساب"
            currentLink={getLink("/user/delete-account")}
        >
            <div className="flex flex-col items-center justify-center h-full py-20 text-red-400">
                <h2 className="text-2xl font-bold mb-4">تحذير</h2>
                <p>هذه الصفحة تحت التطوير</p>
            </div>
        </ProfileLayout>
    );
};

export default DeleteAccountPage;
