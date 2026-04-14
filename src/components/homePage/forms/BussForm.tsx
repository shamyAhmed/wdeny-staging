"use client";
import { Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdOutlineLocationOn } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import dayjs from "dayjs";

export const BussForm = () => {
  const [form] = Form.useForm();
  const tripType = Form.useWatch("tripType", form);
  const t = useTranslations("homePage.busForm");
  const [isFormValid, setIsFormValid] = useState(false);

  const arrivalRef = useRef<any>(null);

  const checkValidity = () => {
    const values = form.getFieldsValue();
    const isRound = values.tripType === "round";
    const base = !!(values.departure?.trim() && values.arrival?.trim() && values.departureDate);
    setIsFormValid(isRound ? base && !!values.returnDate : base);
  };

  const focusDepartureDatePicker = () => {
    const field = form.getFieldInstance("departureDate");
    if (field?.nativeElement) field.nativeElement.click();
  };

  const focusReturnDatePicker = () => {
    const field = form.getFieldInstance("returnDate");
    if (field?.nativeElement) field.nativeElement.click();
  };

  const handleAddProduct = () => {};

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddProduct}
      onValuesChange={checkValidity}
      autoComplete="off"
      initialValues={{ tripType: "one" }}
      name="addEditCategoryForm">
      <Row gutter={[16, 16]} align="stretch">
        {/* محطة التحرك */}
        <Col xs={24} lg={6}>
          <div className="inputS1">
            <Form.Item label={t("fields.departure.label")} name="departure">
              <Input
                placeholder={t("fields.departure.placeholder")}
                prefix={<MdOutlineLocationOn className="text-2xl text-[#819DAF]" />}
                onPressEnter={() => arrivalRef.current?.focus()}
              />
            </Form.Item>
          </div>
        </Col>

        {/* محطة الوصول */}
        <Col xs={24} lg={6}>
          <div className="inputS1">
            <Form.Item label={t("fields.arrival.label")} name="arrival">
              <Input
                ref={arrivalRef}
                placeholder={t("fields.arrival.placeholder")}
                prefix={<MdOutlineLocationOn className="text-2xl text-[#819DAF]" />}
                onPressEnter={focusDepartureDatePicker}
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ التحرك */}
        <Col xs={24} lg={4}>
          <div className="inputS1">
            <Form.Item label={t("fields.departureDate.label")} name="departureDate">
              <DatePicker
                placeholder={t("fields.departureDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
                onChange={(val) => {
                  if (!val) {
                    setTimeout(focusDepartureDatePicker);
                  } else if (tripType === "round") {
                    setTimeout(focusReturnDatePicker);
                  }
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ العودة */}
        <Col xs={24} lg={4}>
          <div
            className={`inputS1 ${tripType === "one" ? "disabled" : ""}`}
            onClick={() => {
              if (tripType === "one") form.setFieldValue("tripType", "round");
            }}>
            <Form.Item label={t("fields.returnDate.label")} name="returnDate">
              <DatePicker
                placeholder={t("fields.returnDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
                disabledDate={(current) => {
                  const dep = form.getFieldValue("departureDate");
                  const min = dep ? dayjs(dep).startOf("day") : dayjs().startOf("day");
                  return current && current < min;
                }}
                onChange={(val) => {
                  if (!val) setTimeout(focusReturnDatePicker);
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* زر البحث */}
        <Col xs={24} lg={4}>
          <div className="h-full flex items-center justify-end">
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormValid}
              className="w-full mt-[19px] min-h-[49px] flex items-center gap-4">
              <FaSearch />
              {t("actions.search")}
            </Button>
          </div>
        </Col>
      </Row>

      <Form.Item name="tripType" initialValue="one" className="!mb-0">
        <Radio.Group
          className="airplane-radio-group !flex flex-col items-start gap-2 sm:flex-row"
          onChange={(e) => {
            if (e.target.value === "one") form.setFieldValue("returnDate", undefined);
          }}>
          <Radio value="one">{t("tripTypes.one")}</Radio>
          <Radio value="round">{t("tripTypes.round")}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
