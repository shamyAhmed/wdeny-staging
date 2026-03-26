"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useForgetPassword } from "@/hooks/auth/useForgetPassword";
import { handleFormErrors } from "@/utils/handleFormError";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const ChangePassword_form = () => {
  const [form] = Form.useForm();
  const { forgetPasswordMutation, forgetPasswordLoading } = useForgetPassword();

  const handleForgetPassword = (values: any) => {
    const payload = {
      mobile: Number(values.mobile),
      phonecode: Number(values.phonecode),
    };

    forgetPasswordMutation(payload).catch((errors) => {
      handleFormErrors(form, errors);
    });
  };

  return (
    <Form
      name="changePasswordFrom"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleForgetPassword}
      autoComplete="off"
    >
      <Form.Item name="phonecode" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="mobile" hidden>
        <Input />
      </Form.Item>

      <div className="formS1 sectionS1 !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div className="inputS1">
              <label className="block mb-1 font-medium">رقم الجوال</label>
              <PhoneInput
                country={"sa"}
                onChange={(value, country: any) => {
                  const phoneCode = country?.dialCode;
                  const mobileNumber = value.slice(phoneCode.length);

                  form.setFieldsValue({
                    phonecode: phoneCode,
                    mobile: mobileNumber,
                  });
                }}
                inputStyle={{ width: "100%" }}
              />
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
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={forgetPasswordLoading}
              loading={forgetPasswordLoading}
              className={`w-full !h-12 !rounded-xl text-lg font-bold`}
            >
              إرسال كود التحقق
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};


