"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useUserLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { handleFormErrors } from "@/utils/handleFormError";
import { FcGoogle } from "react-icons/fc";
import "react-phone-input-2/lib/style.css";
import { PhoneInput } from "@/components/contact-us/PhoneInput";
import { useTranslations } from "next-intl";

type FieldType = {
  phonecode: string;
  mobile: string;
  password: string;
};

export const Login_form = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { loginMutation, loginLoading, error } = useUserLogin();
  const t = useTranslations("auth.login.form");

  const handleLogin = () => {
    form.validateFields().then((values) => {
      loginMutation(values)
        .then(() => form.resetFields())
        .catch((errors) => {
          handleFormErrors(form, errors);
          if (
            errors?.response?.status === 301 ||
            errors?.response?.data?.message === "Account not verified"
          ) {
            router.push(
              `/user/verify-otp?mobile=${values.mobile}&phonecode=${values.phonecode}`
            );
          }
        });
    });
  };

  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: "mobile",
          errors: error?.response?.data?.message
            ? [error?.response?.data?.message]
            : [],
        },
      ]);
    }
  }, [error, form]);

  return (
    <>
      <Form
        name="login_form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={handleLogin}
        autoComplete="off"
      >
        {/* Hidden fields to store parsed values */}
        <Form.Item name="phonecode" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="mobile" hidden>
          <Input />
        </Form.Item>

        <div className="formS1 sectionS1 !border-none !p-0">
          <Row gutter={[28, 28]}>
            <Col xs={24} md={24}>
              <PhoneInput />
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                <Form.Item<FieldType>
                  label={t("password.label")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("password.required"),
                    },
                  ]}
                >
                  <Input.Password placeholder={t("password.placeholder")} />
                </Form.Item>
              </div>
            </Col>

            <Link
              className="text-primary hover:text-primary ps-2 font-bold block w-full"
              href="/user/forget-password"
            >
              {t("forgotPassword")}
            </Link>

            <Col xs={24}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={loginLoading}
                loading={loginLoading}
                className="w-full"
              >
                {t("submit")}
              </Button>
            </Col>
          </Row>
        </div>
      </Form>

      <div className="flex items-center gap-4 my-8 w-full">
        <div className="flex-1 h-px bg-[#888]"></div>
        <span className="text-[#888] text-lg font-medium whitespace-nowrap">
          {t("or")}
        </span>
        <div className="flex-1 h-px bg-[#888]"></div>
      </div>

      <button className="w-full rounded-2xl bg-[#F4F8FE] py-4 flex items-center gap-3 justify-center font-bold">
        {t("googleLogin")} <FcGoogle className="text-xl" />
      </button>
    </>
  );
};
