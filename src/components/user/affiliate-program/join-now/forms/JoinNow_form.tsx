"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { Link } from "@/i18n/navigation";
import { Noto_Sans } from "next/font/google";
import Image from "next/image";

type FieldType = {
  username: string;
  password: string;
};

export const JoinNow_form = () => {
  const [form] = Form.useForm();

  //   const { loginMutation, joinNowLoading, error } = useJoinNow();

  const handleJoinNow = () => {
    form.validateFields().then((values) => {
      //   loginMutation(values)
      //     .then(() => {
      //       form.resetFields();
      //     })
      //     .catch((errors) => {
      //       handleFormErrors(form, errors);
      //     });
    });
  };

  //   useEffect(() => {
  //     if (error) {
  //       form.setFields([
  //         {
  //           name: "password",
  //           errors: error?.response?.data?.error
  //             ? [error?.response?.data?.error]
  //             : [],
  //         },
  //       ]);
  //     }
  //   }, [error, form]);

  return (
    <Form
      name="joinNow_form"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleJoinNow}
      autoComplete="off"
    >
      <div className="formS1  !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item label="" name="name">
                <Input
                  placeholder="الاسم بالكامل "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="inputS1 ">
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "ادخل رقم الجوال من فضلك" },
                  {
                    pattern: /^5\d{8}$/,
                    message:
                      "رقم الجوال السعودي يجب أن يبدأ بـ 5 ويتكون من 9 أرقام",
                  },
                ]}
              >
                <Input
                  placeholder="رقم الجوال"
                  dir="rtl"
                  type="number"
                  addonAfter={
                    <div className="flex items-center justify-center gap-1 px-2">
                      <span className="font-medium" dir="ltr">
                        +966
                      </span>

                      <Image
                        width={40}
                        height={30}
                        src="/flags/sa.svg"
                        alt="Saudi Arabia"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="email"
                rules={[
                  {
                    required: true,
                    message: "ادخل البريد الالكتروني  من فضلك!",
                  },
                ]}
              >
                <Input
                  placeholder="البريد الالكتروني "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item label="" name="bank_name">
                <Input
                  placeholder="اسم البنك "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item label="" name="iban_number">
                <Input
                  type="number"
                  placeholder="رقم الحساب البنكي ( IBAN ) "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item label="" name="iban_number">
                <Input
                  type="number"
                  placeholder="الرقم الضريبي"
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={24}>
            <p className="flex gap-2 sm:flex-col text-[#B0B0B3] bg-[#F8FAFC] p-3 w-full rounded-xl border border-primary">
              <span> بالتسجيل في برنامج الأفلييت، أنت توافق على</span>{" "}
              <Link
                className="text-primary font-bold"
                href="/tearms-and-conditions"
              >
                الشروط والاحكام
              </Link>
              <span>و</span>
              <Link className="text-primary font-bold" href="/privacy-policy">
                سياسة الخصوصية{" "}
              </Link>
            </p>
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              //   disabled={joinNowLoading}
              //   loading={joinNowLoading}
              className={`w-full`}
            >
              ارسال طلب التسجيل{" "}
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
