"use client";

import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Image from "next/image";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { PhoneInput } from "./PhoneInput";

export function ContactUsComponent() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  return (
    <main>
      <PageBannerSection
        title="تواصل معنا"
        currentLink="/contact-us"
        currentPage="تواصل معنا"
      />
      <div className="container cardS1 !rounded-[40px] my-20">
        <Row gutter={[32, 32]}>
          {/* Contact Form */}
          <Col xs={24} md={12}>
            <div className="!h-fit py-10 max-w-lg justify-self-center">
              <h2 className="font-bold text-3xl xl:text-4xl text-primary mb-10">
                احصل على الدعم فورًا
              </h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="formS1 !border-none"
              >
                {/* Name and Email */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={24}>
                    <div className="inputS1">
                      <Form.Item
                        name="fullName"
                        label="الاسم الكامل"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء إدخال الاسم",
                          },
                        ]}
                      >
                        <Input placeholder="الاسم بالكامل" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24}>
                    <div className="inputS1">
                      <Form.Item
                        name="email"
                        label="عنوان البريد الإلكترونى"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "الرجاء إدخال بريد صحيح",
                          },
                        ]}
                      >
                        <Input placeholder="البريد الالكتروني" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24}>
                    <PhoneInput />
                  </Col>

                  <Col xs={24}>
                  <div className="inputS1">
                    <Form.Item
                      name="message"
                      label="سؤال / رسالة"
                      rules={[
                        {
                          required: true,
                          message: "الرجاء إدخال الرسالة",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="اكتب رسالتك هنا"
                        rows={5}
                        className="!rounded-lg"
                        
                      />
                    </Form.Item>
                  </div>
                  </Col>

                  <Col xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                      >
                        إرسال
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="flex items-center justify-center relative h-full rounded-[40px] overflow-hidden">
              <Image
                src="/images/logo-white.png"
                width={200}
                height={100}
                className="z-10"
                alt=""
              />
              <Image
                src="/images/contact-us.png"
                fill
                objectFit="cover"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
