"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { DangerActionCard } from "@/components/user/profile/DangerActionCard";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useRouter } from "@/i18n/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteAccountPage = () => {
    const getLink = useLocalizedLink();
    const router = useRouter();

    const handleDelete = () => {
        // placeholder — wire up to API later
    };

    return (
        <ProfileLayout
            title="حذف الحساب"
            currentPage="حذف الحساب"
            currentLink={getLink("/user/delete-account")}
        >
            <DangerActionCard
                title="حذف الحساب؟"
                subtitle="هل أنت متأكد أنك تريد حذف حسابك نهائياً؟ لا يمكن التراجع عن هذا الإجراء."
                confirmLabel="احذف حسابي"
                confirmIcon={<RiDeleteBin6Line className="text-base" />}
                onConfirm={handleDelete}
                onBack={() => router.back()}
            />
        </ProfileLayout>
    );
};

export default DeleteAccountPage;
