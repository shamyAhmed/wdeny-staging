"use client";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useForgetPassword } from "@/hooks/auth/useForgetPassword";
import { useSearchParams } from "next/navigation";
import { handleFormErrors } from "@/utils/handleFormError";
import { useTranslations } from "next-intl";

export const ResetPassword_form = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const { resetPasswordMutation, resetPasswordLoading } = useForgetPassword();
  const t = useTranslations("auth.resetPassword.form");

  const mobile = searchParams.get("mobile");
  const phonecode = searchParams.get("phonecode");
  const code = searchParams.get("code");

  const onFinish = (values: any) => {
    const payload = {
      mobile: Number(mobile),
      phonecode: Number(phonecode),
      code,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    resetPasswordMutation(payload).catch((errors) => {
      handleFormErrors(form, errors);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full mx-auto">
      <div className="formS1 sectionS1 !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("newPassword.label")}
                name="password"
                rules={[
                  { required: true, message: t("newPassword.required") },
                  {
                    min: 8,
                    message: t("newPassword.minLength"),
                  },
                ]}>
                <Input.Password
                  placeholder="********"
                  className="h-12 rounded-xl"
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("confirmPassword.label")}
                name="password_confirmation"
                dependencies={["password"]}
                rules={[
                  { required: true, message: t("confirmPassword.required") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t("confirmPassword.mismatch")),
                      );
                    },
                  }),
                ]}>
                <Input.Password
                  placeholder="********"
                  className="h-12 rounded-xl"
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <Button
              type="primary"
              htmlType="submit"
              loading={resetPasswordLoading}
              className="w-full h-12 rounded-xl text-lg font-bold">
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
