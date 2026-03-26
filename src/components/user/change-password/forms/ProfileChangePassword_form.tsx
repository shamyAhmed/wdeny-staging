"use client";

import { Button, Col, Form, Input, Row } from "antd";
import { useChangePassword } from "../hooks/useChangePassword";
import { handleFormErrors } from "@/utils/handleFormError";
import { z, ZodError } from "zod";

export const ProfileChangePassword_form = () => {
    const [form] = Form.useForm();
    const { changePasswordMutation, changePasswordLoading } = useChangePassword();

    const passwordSchema = z
        .string()
        .min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
        .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
        .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
        .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل");

    const zodPasswordValidator = async (_: any, value: string) => {
        if (!value) return Promise.resolve();
        try {
            passwordSchema.parse(value);
            return Promise.resolve();
        } catch (error: any) {
            if (error instanceof ZodError) {
                return Promise.reject(new Error(error.issues[0]?.message));
            }
            return Promise.reject(new Error("كلمة السر غير صالحة"));
        }
    };

    const onFinish = (values: any) => {
        changePasswordMutation(values)
            .then(() => {
                form.resetFields();
            })
            .catch((errors) => {
                const apiErrors = errors?.response?.data?.errors;
                handleFormErrors(form, apiErrors);
            });
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
                تغيير كلمة المرور
            </h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24}>
                        <div className="inputS1">
                            <Form.Item
                                label="كلمة المرور الحالية"
                                name="current_password"
                                rules={[{ required: true, message: "يرجى إدخال كلمة المرور الحالية" }]}
                            >
                                <Input.Password
                                    placeholder="ادخل كلمة المرور"
                                    className="max-w-[360px]"
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col xs={24}>
                        <div className="inputS1">
                            <Form.Item
                                label="كلمة المرور الجديدة"
                                name="password"
                                rules={[
                                    { required: true, message: "يرجى إدخال كلمة المرور الجديدة" },
                                    { validator: zodPasswordValidator }
                                ]}
                            >
                                <Input.Password
                                    placeholder="ادخل كلمة المرور"
                                    className="max-w-[360px]"
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col xs={24}>
                        <div className="inputS1">
                            <Form.Item
                                label="تأكيد كلمة المرور"
                                name="password_confirmation"
                                rules={[
                                    { required: true, message: "يرجى تأكيد كلمة المرور الجديدة" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("كلمتا المرور غير متطابقتين"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="ادخل كلمة المرور"
                                    className="max-w-[360px]"
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col xs={24} className="flex justify-center lg:justify-end mt-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-[180px]"
                            loading={changePasswordLoading}
                            disabled={changePasswordLoading}
                        >
                            تحديث
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
