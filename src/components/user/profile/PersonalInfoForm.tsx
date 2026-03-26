"use client";

import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import { useUpdateProfile } from "@/hooks/auth/useUpdateProfile";
import { handleFormErrors } from "@/utils/handleFormError";
import { Button, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PersonalInfoForm = () => {
  const [form] = Form.useForm();
  const { user, isLoading } = useGetUserProfile();
  const { updateProfileMutation, updateProfileLoading } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        phonecode: user.phonecode,
      });
    }
  }, [user, form]);

  const onFinish = (values: any) => {
    const payload = {
      name: values.name,
      email: values.email,
    };

    updateProfileMutation(payload).catch((errors) => {
      handleFormErrors(form, errors);
    });
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        المعلومات الشخصية
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
              <Form.Item label="رقم الهاتف" name="name">
                <PhoneInput
                  country={"sa"}
                  value={`${form.getFieldValue("phonecode")}${form.getFieldValue("mobile")}`}
                  disabled
                  inputStyle={{ maxWidth: "360px", width: "100%" }}
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="الاسم بالكامل"
                name="name"
                rules={[
                  { required: true, message: "يرجى إدخال الاسم بالكامل" },
                ]}
              >
                <Input placeholder="الاسم بالكامل" className="max-w-[360px]" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="البريد الإلكتروني"
                name="email"
                rules={[
                  { required: true, message: "يرجى إدخال البريد الإلكتروني" },
                  { type: "email", message: "البريد الإلكتروني غير صحيح" },
                ]}
              >
                <Input
                  placeholder="البريد الإلكتروني"
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
              loading={updateProfileLoading}
              disabled={updateProfileLoading || isLoading}
            >
              تحديث
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
