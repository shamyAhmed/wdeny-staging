import { ResetPassword_form } from "@/components/user/change-password/forms/ResetPassword_form";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import style from "@/components/user/change-password/styles/changePassword.module.scss";
import { Col, Row } from "antd";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaLock } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "إعادة تعيين كلمة المرور",
};

const ResetPasswordPage: React.FC = async (): Promise<JSX.Element> => {
    const t = await getTranslations("auth.resetPassword");

    return (
        <main className={`${style.login} min-h-screen w-full p-16 bg-[#F4F8FE]`}>
            <div className="login-card bg-white p-8 rounded-[40px] h-full">
                <Row gutter={[60, 60]} align="middle">
                    <Col xs={24} md={12}>
                        <div>
                            <div className="bg-primary w-[100px] h-[100px] rounded-full flex items-center text-4xl justify-center mb-6">
                                <FaLock className="text-white" />
                            </div>
                            <h1 className="text-[#111113] font-bold mb-4 text-xl">
                                {t("title")}
                            </h1>
                            <p className="text-[#B0B0B3] mb-10">
                                {t("description")}
                            </p>
                            <Suspense fallback={<LoaderS1 />}>
                                <ResetPassword_form />
                            </Suspense>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div className="text-[#111113] min-h-[600px] relative !rounded-[40px] h-full w-full overflow-hidden">
                            <Image
                                src={"/images/login.png"}
                                objectFit="cover"
                                fill
                                alt="login"
                            />
                            <Link href={"/"} className=" absolute top-4 left-4">
                                <Image
                                    src={"/images/logo.png"}
                                    width={67}
                                    height={68}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </main>
    );
};

export default ResetPasswordPage;
