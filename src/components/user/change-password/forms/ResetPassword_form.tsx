"use client";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useForgetPassword } from "@/hooks/auth/useForgetPassword";
import { useSearchParams } from "next/navigation";
import { handleFormErrors } from "@/utils/handleFormError";

export const ResetPassword_form = () => {
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const { resetPasswordMutation, resetPasswordLoading } = useForgetPassword();

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
            className="w-full max-w-[450px] mx-auto"
        >
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Form.Item
                        label="كلمة المرور الجديدة"
                        name="password"
                        rules={[
                            { required: true, message: "يرجى إدخال كلمة المرور الجديدة" },
                            { min: 8, message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" },
                        ]}
                    >
                        <Input.Password
                            placeholder="********"
                            className="h-12 rounded-xl"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24}>
                    <Form.Item
                        label="تأكيد كلمة المرور"
                        name="password_confirmation"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "يرجى تأكيد كلمة المرور" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("كلمات المرور غير متطابقة"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="********"
                            className="h-12 rounded-xl"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={resetPasswordLoading}
                        className="w-full h-12 rounded-xl text-lg font-bold"
                    >
                        حفظ كلمة المرور
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
