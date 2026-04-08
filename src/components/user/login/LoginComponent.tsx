"use client";
import { Login_form } from "./forms/Login_form";
import { Suspense } from "react";
import style from "./styles/login.module.scss";
import { FcGoogle } from "react-icons/fc";
import { Link } from "@/i18n/navigation";
import { Col, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const LoginComponent = () => {
  const t = useTranslations("auth.login");
  const tAuth = useTranslations("auth.imageAlts");

  return (
    <main className={`${style.login}  min-h-screen w-full p-16 bg-[#F4F8FE]`}>
      <div className="login-card bg-white p-8 rounded-[40px] h-full">
        <Row gutter={[60, 60]} align="middle">
          <Col xs={24} md={12}>
            <div className="w-full flex flex-col justify-center">
              <h2 className="text-3xl mb-6 font-bold">{t("title")}</h2>
              <p className="text-[#888] mb-10">
                {t("noAccount")}
                <Link
                  href="/user/register"
                  className="mb-6 text-primary font-bold"
                >
                  {" "}
                  {t("createAccount")}
                </Link>
              </p>

              <Suspense>
                <Login_form />
              </Suspense>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="text-[#111113] min-h-[600px] relative !rounded-[40px] h-full w-full overflow-hidden">
              <Image
                src={"/images/login.png"}
                objectFit="cover"
                fill
                alt={tAuth("sideImage")}
                className=""
              />
              <Link href="/" className=" absolute top-4 left-4">
                <Image
                  src={"/images/logo.png"}
                  width={67}
                  height={68}
                  alt={tAuth("logo")}
                />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};
