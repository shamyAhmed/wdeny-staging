"use client";
import { Button, Col, DatePicker, Form, Input, Radio, Row, TimePicker } from "antd";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdOutlineLocationOn } from "react-icons/md";
import { useTranslations } from "next-intl";

export const PrivetTripsForm = () => {
  const [form] = Form.useForm();
  const t = useTranslations("homePage.privateTripsForm");

  const handleAddProduct = () => {
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddProduct}
      autoComplete="off"
      name="addEditCategoryForm"
    >
      <Row gutter={[16, 16]} align="stretch">
        {/* محطة التحرك */}
        <Col xs={24} lg={5}>
          <div className="inputS1">
            <Form.Item label={t("fields.departure.label")} name="departure">
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
        <Col xs={24} lg={5}>
          <div className="inputS1">
            <Form.Item label={t("fields.arrival.label")} name="arrival">
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
        <Col xs={24} lg={3}>
          <div className="inputS1">
            <Form.Item label={t("fields.departureDate.label")} name="departureDate">
              <DatePicker
                placeholder={t("fields.departureDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
              />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24} lg={2}>
          <div className="inputS1">
            <Form.Item label={t("fields.departureTime.label")} name="departureTime">
              <TimePicker format="HH:mm" placeholder={t("fields.departureTime.placeholder")} />
            </Form.Item>
          </div>
        </Col>
        {/* تاريخ العودة */}
        <Col xs={24} lg={3}>
          <div className="inputS1">
            <Form.Item label={t("fields.returnDate.label")} name="returnDate">
              <DatePicker
                placeholder={t("fields.returnDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
              />
            </Form.Item>
          </div>
        </Col>

        <Col xs={24} lg={2}>
          <div className="inputS1">
            <Form.Item label={t("fields.returnTime.label")} name="returnTime">
              <TimePicker format="HH:mm" placeholder={t("fields.returnTime.placeholder")} />
            </Form.Item>
          </div>
        </Col>
        {/* زر البحث */}
        <Col xs={24} lg={3}>
          <div className="h-full  flex items-center justify-end">
            <Button type="primary" className="w-full mt-[19px] min-h-[49px]">
              <FaSearch />
              {t("actions.search")}
            </Button>
          </div>
        </Col>
      </Row>

      <Form.Item name="tripType" initialValue="one">
        <Radio.Group>
          <Radio value="one">{t("tripTypes.one")}</Radio>
          <Radio value="round">{t("tripTypes.round")}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
