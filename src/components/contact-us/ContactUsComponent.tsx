"use client";

import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Image from "next/image";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { PhoneInput } from "./PhoneInput";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";

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

      {/* Main Contact Section */}
      <section className="container py-[100px]">
        <Row gutter={[30, 30]}>
          <Col span={24} lg={14}>
            <div className="border border-[#e1d6d6] rounded-[30px] p-8 bg-[#faeeee] h-full">
              <div className="flex items-center gap-4 border-b border-[#e1d6d6] pb-6 mb-8">
                <div className="bg-white border border-[#e1d6d6] rounded-full text-primary w-[68px] h-[68px] flex items-center justify-center text-3xl">
                  <MdContactSupport />
                </div>
                <h2 className="text-primary font-bold text-3xl">
                  احصل على الدعم فورًا
                </h2>
              </div>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="formS1 !border-none !p-0"
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <div className="inputS1">
                      <Form.Item
                        name="fullName"
                        label="الاسم الكامل"
                        rules={[
                          { required: true, message: "الرجاء إدخال الاسم" },
                        ]}
                      >
                        <Input placeholder="الاسم بالكامل" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24}>
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
                  <Col xs={24}>
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
                          className="!rounded-2xl"
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

          <Col span={24} lg={10}>
            <div
              className="relative rounded-[30px] overflow-hidden"
              style={{ minHeight: "450px", height: "100%" }}
            >
              <Image
                src="/images/contact-us.png"
                fill
                objectFit="cover"
                alt=""
              />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center z-10">
                <Image
                  src="/images/logo-white.png"
                  width={180}
                  height={90}
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-[#fbfbfd]">
        <div className="container">
          <h1 className="text-primary font-bold text-4xl mb-2">
            نحن هنا لمساعدتك
          </h1>
          <p className="mb-16 text-gray-500">
            تواصل معنا عبر أي من القنوات التالية
          </p>
          <div
            className="py-20 px-8 rounded-[40px] overflow-hidden"
            style={{
              backgroundImage: "url('/photos/features.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Row align="middle" justify="center" gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <div className="bg-white/15 text-white p-6 rounded-xl text-center">
                  <div className="flex justify-center mb-4">
                    <FaPhone className="text-3xl" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 text-white">
                    الهاتف
                  </h3>
                  <p className="text-white/80">+966 xx xxx xxxx</p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="bg-white/15 text-white p-6 rounded-xl text-center">
                  <div className="flex justify-center mb-4">
                    <FaEnvelope className="text-3xl" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 text-white">
                    البريد الإلكتروني
                  </h3>
                  <p className="text-white/80">info@wdeny.com</p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="bg-white/15 text-white p-6 rounded-xl text-center">
                  <div className="flex justify-center mb-4">
                    <FaLocationDot className="text-3xl" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 text-white">
                    العنوان
                  </h3>
                  <p className="text-white/80">المملكة العربية السعودية</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </main>
  );
}
