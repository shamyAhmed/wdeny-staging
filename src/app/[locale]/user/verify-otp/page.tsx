import VerifyOtpComponent from "@/components/user/verify-otp/VerifyOtpComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تحقق من رمز التأكيد",
};

const VerifyOtpPage = () => {
    return <VerifyOtpComponent />;
};

export default VerifyOtpPage;
