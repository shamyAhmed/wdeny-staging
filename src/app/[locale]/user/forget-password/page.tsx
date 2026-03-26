import { ChangePasswordComponent } from "@/components/user/change-password/ChangePasswordComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "نسيت كلمة المرور",
};

const ForgetPasswordPage: React.FC = (): JSX.Element => {
    return <ChangePasswordComponent />;
};

export default ForgetPasswordPage;
