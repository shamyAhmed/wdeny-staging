"use client";

import React from "react";
import { Form, Input } from "antd";
import { CountryCodeSelect } from "./CountryCodeSelect";
import useGetCountries from "@/app/[locale]/_hooks/useGetCountries";

interface Props {
 disabled?: boolean;
 className?: string;
}

export function PhoneInput({ disabled, className="" }: Props) {
  const form = Form.useFormInstance();
  const [selectedCountry, setSelectedCountry] = React.useState("SA");
  const { data: countries } = useGetCountries();

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
    <div className={`inputS1 with-border phone ${disabled ? "disabled" : ""}`}>
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
          disabled={disabled}
          placeholder="5xxxxxxxx"
          onChange={handleMobileChange}
          className={className}
          suffix={
            <CountryCodeSelect
              disabled={disabled}
              value={selectedCountry}
              countries={countries}
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
