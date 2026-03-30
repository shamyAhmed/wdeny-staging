"use client";
import { Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdOutlineLocationOn } from "react-icons/md";
import { useTranslations } from "next-intl";

export const BussForm = () => {
  const [form] = Form.useForm();
  const tripType = Form.useWatch("tripType", form);
  const t = useTranslations("homePage.busForm");

  const handleAddProduct = () => {};

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddProduct}
      autoComplete="off"
      name="addEditCategoryForm">
      <Row
        gutter={[16, 16]}
        align="stretch">
        {/* محطة التحرك */}
        <Col
          xs={24}
          lg={6}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.departure.label")}
              name="departure">
              <Input
                placeholder={t("fields.departure.placeholder")}
                prefix={
                  <MdOutlineLocationOn className="text-2xl text-[#819DAF]" />
                }
              />
            </Form.Item>
          </div>
        </Col>

        {/* محطة الوصول */}
        <Col
          xs={24}
          lg={6}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.arrival.label")}
              name="arrival">
              <Input
                placeholder={t("fields.arrival.placeholder")}
                prefix={
                  <MdOutlineLocationOn className="text-2xl text-[#819DAF]" />
                }
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ التحرك */}
        <Col
          xs={24}
          lg={4}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.departureDate.label")}
              name="departureDate">
              <DatePicker
                placeholder={t("fields.departureDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
              />
            </Form.Item>
          </div>
        </Col>

        <Col
          xs={24}
          lg={4}>
          <div
            className={`inputS1 ${tripType === "one" ? "disabled" : ""}`}
            onClick={() => {
              if (tripType === "one") form.setFieldValue("tripType", "round");
            }}
          >
            <Form.Item
              label={t("fields.returnDate.label")}
              name="returnDate">
              <DatePicker
                placeholder={t("fields.returnDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
              />
            </Form.Item>
          </div>
        </Col>

        {/* زر البحث */}
        <Col
          xs={24}
          lg={4}>
          <div className="h-full  flex items-center justify-end">
            <Button
              type="primary"
              className="w-full mt-[19px] min-h-[49px] flex items-center gap-4">
              <FaSearch />
              {t("actions.search")}
            </Button>
          </div>
        </Col>
      </Row>

      <Form.Item
        name="tripType"
        initialValue="one"
        className="!mb-0">
        <Radio.Group>
          <Radio value="one">{t("tripTypes.one")}</Radio>
          <Radio value="round">{t("tripTypes.round")}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
