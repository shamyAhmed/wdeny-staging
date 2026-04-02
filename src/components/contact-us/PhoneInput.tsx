"use client";

import React from "react";
import { Form, Input } from "antd";
import { CountryCodeSelect } from "./CountryCodeSelect";

export function PhoneInput() {
  const form = Form.useFormInstance();
  const [selectedCountry, setSelectedCountry] = React.useState("sa");

  React.useEffect(() => {
    form.setFieldsValue({
      phonecode: "966",
    });
  }, [form]);

  const handleMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    form.setFieldsValue({ mobile: value });
  };

  return (
    <div className="inputS1 phone">
      <Form.Item
        name="mobile"
        label="رقم الهاتف"
        rules={[
          {
            required: true,
            message: "الرجاء إدخال رقم الهاتف",
          },
          {
            min: 8,
            message: "رقم الهاتف غير صحيح",
          },
        ]}
      >
        <Input
          placeholder="5xxxxxxxx"
          onChange={handleMobileChange}
          suffix={
            <CountryCodeSelect
              value={selectedCountry}
              onChange={(countryValue, dialCode) => {
                setSelectedCountry(countryValue);
                form.setFieldsValue({
                  phonecode: dialCode,
                });
              }}
            />
          }
        />
      </Form.Item>
      <Form.Item name="phonecode" hidden>
        <Input />
      </Form.Item>
    </div>
  );
}
