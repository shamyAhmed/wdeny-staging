"use client";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useSignup } from "../hooks/useSignup";
import { handleFormErrors } from "@/utils/handleFormError";
import Link from "next/link";
import { z, ZodError } from "zod";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FieldType = {
  firstName: string;
  phonecode: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const Signup_form = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const isAccepted = Form.useWatch("acceptPolicy", form);
  const mobileError = Form.useWatch("mobile_validator", form);

  const { signupMutation, signupLoading } = useSignup();

  const passwordSchema = z
    .string()
    .min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل");

  const zodPasswordValidator = async (_: any, value: string) => {
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

  const handleSignup = () => {
    form.validateFields().then((values) => {
      const { mobile_validator, acceptPolicy, confirmPassword, ...rest } =
        values;
      signupMutation({ ...rest, firebase_token: "010", code: "j" })
        .then(() => {
          router.push(
            `/user/verify-otp?mobile=${values.mobile}&phonecode=${values.phonecode}`
          );
          form.resetFields();
        })
        .catch((errors) => {
          const apiErrors = errors?.response?.data?.errors;
          handleFormErrors(form, apiErrors);

          // If API returns a mobile error, show it on the mobile_validator field
          if (apiErrors?.mobile) {
            form.setFields([
              {
                name: "mobile_validator",
                errors: Array.isArray(apiErrors.mobile)
                  ? apiErrors.mobile
                  : [apiErrors.mobile],
              },
            ]);
          }
        });
    });
  };

  // Get mobile field errors to display under PhoneInput
  const mobileFieldErrors = form.getFieldError("mobile_validator");

  return (
    <>
      <Form
        name="signup_form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={handleSignup}
        autoComplete="off"
      >
        {/* Hidden fields */}
        <Form.Item name="phonecode" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="mobile" hidden>
          <Input />
        </Form.Item>

        <div className="formS1 sectionS1 !border-none !p-0">
          <Row gutter={[28, 28]}>
            <Col xs={24} md={24}>
              <div className="inputS1">
                <Form.Item
                  label="الاسم بالكامل"
                  name="name"
                  rules={[
                    { required: true, message: "من فضلك ادخل الاسم بالكامل !" },
                  ]}
                >
                  <Input placeholder="الاسم بالكامل" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                {/* Label manually since PhoneInput is outside Form.Item */}
                <label className="block mb-1 font-medium">رقم الهاتف</label>
                <PhoneInput
                  country={"sa"}
                  onChange={(value, country: any) => {
                    const phoneCode = country?.dialCode; // "20"
                    const mobileNumber = value.slice(phoneCode.length); // "1090510796"

                    form.setFieldsValue({
                      phonecode: phoneCode,
                      mobile: mobileNumber,
                    });
                  }}
                  inputStyle={{ width: "100%" }}
                />
                {/* Show validation error for mobile */}
                <div className="hidden">
                  <Form.Item
                    name="mobile_validator"
                    rules={[
                      {
                        validator: () => {
                          const mobile = form.getFieldValue("mobile");
                          if (!mobile || mobile.length < 8) {
                            return Promise.reject(
                              new Error("رقم الهاتف غير صحيح")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input hidden />
                  </Form.Item>
                </div>
              </div>
            </Col>

            <Col xs={24} md={24}>
              <div className="inputS1">
                <Form.Item
                  label="البريد الإلكترونى"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "ادخل البريد الالكتروني من فضلك!",
                    },
                    {
                      type: "email",
                      message: "من فضلك أدخل بريد إلكتروني صحيح",
                    },
                  ]}
                >
                  <Input placeholder="البريد الالكتروني" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                <Form.Item<FieldType>
                  label="كلمة المرور"
                  name="password"
                  rules={[
                    { required: true, message: "ادخل كلمة السر من فضلك!" },
                    { validator: zodPasswordValidator },
                  ]}
                >
                  <Input.Password placeholder="كلمة السر" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                <Form.Item<FieldType>
                  label="تأكيد كلمة المرور"
                  name="password_confirmation"
                  rules={[
                    { required: true, message: "ادخل كلمة السر من فضلك!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("كلمتا السر غير متطابقتين")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="تاكيد كلمة السر" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="acceptPolicy"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "يجب الموافقة على سياسة الخصوصية والشروط والأحكام"
                            )
                          ),
                  },
                ]}
              >
                <Checkbox>
                  <span className="text-sm">
                    أقر على{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-primary font-medium underline"
                    >
                      سياسة الخصوصية والشروط والأحكام
                    </Link>
                  </span>
                </Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={signupLoading || !isAccepted}
                loading={signupLoading}
                className="w-full"
              >
                إنشاء حساب
              </Button>
            </Col>
          </Row>
        </div>
      </Form>

      <div className="flex items-center gap-4 my-8 w-full">
        <div className="flex-1 h-px bg-[#888]"></div>
        <span className="text-[#888] text-lg font-medium whitespace-nowrap">
          او
        </span>
        <div className="flex-1 h-px bg-[#888]"></div>
      </div>

      <button className="w-full rounded-2xl bg-[#F4F8FE] py-4 flex items-center gap-3 justify-center font-bold">
        تسجيل الدخول بحساب جوجل <FcGoogle className="text-xl" />
      </button>
    </>
  );
};
