"use client";
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import ReactCodeInput from "react-code-input";
import { useSignup } from "@/components/user/signup/hooks/useSignup";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import style from "@/components/user/signup/styles/login.module.scss";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { MdOutlineTimer } from "react-icons/md";
import { RiSmartphoneLine } from "react-icons/ri";

const VerifyOtpComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const getLink = useLocalizedLink();
  const mobile = searchParams.get("mobile") || "";
  const phonecode = searchParams.get("phonecode") || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(153); // 2:33 = 153 seconds
  const {
    verifyOtpMutation,
    resendOtpMutation,
    verifyLoading,
    resendLoading,
  } = useSignup();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    if (otp.length === 4) {
      const isReset = searchParams.get("purpose") === "reset";
      const { data } = await verifyOtpMutation({
        mobile,
        phonecode,
        code: otp,
        skipLogin: isReset,
      });

      if (isReset && data?.data) {
        router.push(
          getLink(
            `/user/reset-password?mobile=${mobile}&phonecode=${phonecode}&code=${otp}`
          )
        );
      }
    }
  };

  const handleResend = async () => {
    await resendOtpMutation({ mobile, phonecode });
    setTimer(153); // Reset timer on resend
  };

  return (
    <main className={`${style.login} min-h-screen w-full p-16 bg-[#F4F8FE]`}>
      <div className="login-card bg-white p-8 rounded-[40px] h-full overflow-hidden">
        <Row gutter={[60, 60]} align="middle">
          <Col xs={24} md={12} className="order-2 md:order-1">
            <div className="w-full flex flex-col items-center justify-center max-w-[450px] mx-auto">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 text-white text-4xl">
                <RiSmartphoneLine />
              </div>

              <h2 className="text-3xl mb-4 font-bold text-center">
                تحقق من رقم جوالك
              </h2>
              <p className="text-[#888] mb-8 text-center">
                أرسلنا رمز مكون من 4 أرقام إلى رقم جوالك
              </p>

              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-lg font-bold">{formatTime(timer)}</span>
                <label className="text-gray-400">الرمز</label>
              </div>

              <div dir="ltr" className="mb-8 w-full flex justify-center">
                <ReactCodeInput
                  fields={4}
                  type="text"
                  inputMode="numeric"
                  onChange={setOtp}
                  value={otp}
                  name="otp"
                  inputStyle={{
                    width: "70px",
                    height: "80px",
                    fontSize: "28px",
                    borderRadius: "16px",
                    border: "1px solid #F3F4F6",
                    margin: "0 10px",
                    textAlign: "center",
                    backgroundColor: "#F9FAFB",
                    color: "#111827",
                    outline: "none",
                  }}
                />
              </div>

              <p className="text-center text-gray-500 mb-8">
                في حال ما وصلك الرمز؟{" "}
                <button
                  onClick={handleResend}
                  disabled={resendLoading || timer > 0}
                  className="text-primary font-bold hover:underline"
                >
                  إعادة إرسال
                </button>
              </p>

              <Button
                type="primary"
                onClick={handleVerify}
                loading={verifyLoading}
                disabled={otp.length !== 4}
                className="w-full h-14 rounded-2xl text-xl font-bold bg-primary border-none"
              >
                تأكيد
              </Button>
            </div>
          </Col>

          <Col xs={24} md={12} className="order-1 md:order-2">
            <div className="text-[#111113] min-h-[600px] relative !rounded-[40px] h-full w-full overflow-hidden">
              <Image
                src={"/images/login.png"}
                objectFit="cover"
                fill
                alt="login"
              />
              <Link href={getLink("/")} className=" absolute top-4 left-4">
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

export default VerifyOtpComponent;
