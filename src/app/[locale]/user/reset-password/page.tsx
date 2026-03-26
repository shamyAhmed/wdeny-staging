import { ResetPassword_form } from "@/components/user/change-password/forms/ResetPassword_form";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import style from "@/components/user/change-password/styles/changePassword.module.scss";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "إعادة تعيين كلمة المرور",
};

const ResetPasswordPage: React.FC = (): JSX.Element => {
    return (
        <main className={`${style.login} min-h-screen w-full p-16 bg-[#F4F8FE]`}>
            <div className="login-card bg-white p-8 rounded-[40px] h-full">
                <Row gutter={[60, 60]} align="middle">
                    <Col xs={24} md={12}>
                        <div>
                            <div className="bg-primary w-[100px] h-[100px] rounded-full flex items-center justify-center mb-6">
                                <svg
                                    width="44"
                                    height="44"
                                    viewBox="0 0 44 44"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.8333 19.2468C22.3153 19.2468 21.0833 18.015 21.0833 16.4972C21.0833 14.9795 22.3153 13.7477 23.8333 13.7477C25.3513 13.7477 26.5833 14.9795 26.5833 16.4972C26.5833 18.015 25.3513 19.2468 23.8333 19.2468ZM29.3333 9.50242V5.49908C29.3333 2.46176 26.8712 0 23.8333 0C20.7955 0 18.3333 2.46176 18.3333 5.49908V9.50242C16.2012 10.2595 14.6667 12.274 14.6667 14.6642V18.3303C14.6667 21.3676 17.1288 23.8294 20.1667 23.8294H27.5C30.5378 23.8294 33 21.3676 33 18.3303V14.6642C33 12.274 31.4655 10.2595 29.3333 9.50242ZM23.8333 3.66056C25.6025 3.66056 25.6667 5.49908 25.6667 5.49908V9.16514H22V5.49908C22 5.49908 22.0642 3.66056 23.8333 3.66056Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-[#111113] font-bold mb-4 text-xl">
                                إعادة تعيين كلمة المرور
                            </h1>
                            <p className="text-[#B0B0B3] mb-10">
                                ادخل كلمة مرور جديدة لاستبدال القديمة
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
