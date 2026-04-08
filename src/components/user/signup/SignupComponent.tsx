"use client";
import { Signup_form } from "./forms/Signup_form";
import { Suspense } from "react";
import style from "./styles/login.module.scss";
import { Link } from "@/i18n/navigation";
import { Col, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const RegisterComponent = () => {
  const t = useTranslations("auth.register");

  return (
    <main className={`${style.login}  min-h-screen w-full p-16 bg-[#F4F8FE]`}>
      <div className="login-card bg-white p-8 rounded-[40px] h-full">
        <Row gutter={[60, 60]}>
          <Col xs={24} md={12}>
            <div className="w-full flex flex-col justify-center">
              <h2 className="text-3xl mb-6 font-bold">{t("title")}</h2>
              <p className="text-[#888] mb-10">
                {t("hasAccount")}{" "}
                <Link
                  href="/user/login"
                  className="mb-6 text-primary font-bold"
                >
                  {t("login")}{" "}
                </Link>
              </p>

              <Suspense>
                <Signup_form />
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
                className=""
              />
              <Link href="/" className=" absolute top-4 left-4">
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
