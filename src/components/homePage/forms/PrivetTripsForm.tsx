"use client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { BiCalendarAlt } from "react-icons/bi";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdOutlineLocationOn } from "react-icons/md";

const { Option } = Select;

export const PrivetTripsForm = () => {
  const [form] = Form.useForm();
  //   const { addEditCategoryMutation, addEditCategoryLoading } =
  //     useAddEditCategory();

  const router = useRouter();

  const handleAddProduct = () => {
    //     form.validateFields().then((values) => {
    //       addEditCategoryMutation({
    //         ...values,
    //       })
    //         .then(() => {
    //           form.resetFields();
    //           toast.success("تم نشر الصنف بنجاح");
    //           router.push("/admin/categories");
    //         })
    //         .catch((errors) => {
    //           handleFormErrors(form, errors);
    //         });
    //     });
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
            <Form.Item label="محطة التحرك" name="departure">
              <Input
                placeholder="مكان التحرك"
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
            <Form.Item label="محطة الوصول" name="arrival">
              <Input
                placeholder="مكان الوصول"
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
            <Form.Item label="تاريخ التحرك" name="departureDate">
              <DatePicker
                placeholder="25 نوفمبر 2025"
                suffixIcon={<DatePickerIcon />}
              />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24} lg={2}>
          <div className="inputS1">
            <Form.Item label="تاريخ التحرك" name="departureTime">
              <TimePicker format="HH:mm" placeholder="12:20" />
            </Form.Item>
          </div>
        </Col>
        {/* تاريخ العودة */}
        <Col xs={24} lg={3}>
          <div className="inputS1">
            <Form.Item label="تاريخ العودة" name="returnDate">
              <DatePicker
                placeholder="اختيار تاريخ العودة"
                suffixIcon={<DatePickerIcon />}
              />
            </Form.Item>
          </div>
        </Col>

        <Col xs={24} lg={2}>
          <div className="inputS1">
            <Form.Item label="تاريخ العودة" name="departureTime">
              <TimePicker format="HH:mm" placeholder="12:20" />
            </Form.Item>
          </div>
        </Col>
        {/* زر البحث */}
        <Col xs={24} lg={3}>
          <div className="h-full  flex items-center justify-end">
            <Button type="primary" className="w-full mt-[19px] min-h-[49px]">
              <FaSearch />
              ابحث
            </Button>
          </div>
        </Col>
      </Row>

      <Form.Item name="tripType" initialValue="one">
        <Radio.Group>
          <Radio value="one">ذهاب فقط</Radio>
          <Radio value="round">ذهاب وعودة</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
