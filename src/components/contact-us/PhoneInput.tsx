"use client";

import React from "react";
import { Form, Input } from "antd";
import { CountryCodeSelect } from "./CountryCodeSelect";
import useGetCountries from "@/app/[locale]/_hooks/useGetCountries";
import { useTranslations } from "next-intl";

interface Props {
 disabled?: boolean;
 className?: string;
 label?: string;
 requiredMessage?: string;
 minLengthMessage?: string;
 containerClassName?: string;
}

export function PhoneInput({ disabled, className="", label, requiredMessage, minLengthMessage, containerClassName }: Props) {
  const form = Form.useFormInstance();
  const [selectedCountry, setSelectedCountry] = React.useState("SA");
  const { data: countries } = useGetCountries();
  const t = useTranslations("contactUs.inputs");
  const phoneLabel = label ?? t("labels.phone");
  const phoneRequiredMsg = requiredMessage ?? t("validation.phoneRequired");
  const phoneMinLengthMsg = minLengthMessage ?? t("validation.phoneInvalid");

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
    <div className={`inputS1 phone-input phone ${disabled ? "disabled" : ""} ${containerClassName ? containerClassName : ""}`}>
      <Form.Item
        name="mobile"
        label={phoneLabel}
        rules={[
          {
            required: true,
            message: phoneRequiredMsg,
          },
          {
            min: 8,
            message: phoneMinLengthMsg,
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
