"use client";

import React from "react";
import { Form, Input, Button, Row, Col, Card, Checkbox } from "antd";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import PhoneInput from "react-phone-input-2";

export function ContactUsComponent() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: "اتصل بنا",
      subtitle: "نحن متاحون من السبت إلى الخميس",
      contact: "920000000",
    },
    {
      icon: FiMail,
      title: "راسلنا عبر البريد",
      subtitle: "سنرد عليك خلال 24 ساعة",
      contact: "info@altaieclub.sa",
    },
    {
      icon: FiMapPin,
      title: "عنواننا",
      subtitle: "نادي الطائي الرياضي، المملكة العربية السعودية",
      contact: "",
    },
    {
      icon: FiClock,
      title: "أوقات العمل",
      subtitle: "السبت - الخميس",
      contact: "9:00 - 10:00 م",
    },
  ];

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
            <div className=" !h-fit">
              <h2 className="font-bold text-2xl text-primary mb-10">
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
                    <div className="inputS1">
                      {/* Label manually since PhoneInput is outside Form.Item */}
                      <label className="block mb-1 font-medium">
                        رقم الهاتف
                      </label>
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

                  <Col xs={24}>
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
