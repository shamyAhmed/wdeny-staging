"use client";
import { Button, Col, Form, Input, Row, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

const { Option } = Select;
const { TextArea } = Input;

interface AddEditMembershipPlanFormProps {
  planData?: any;
  isEdit?: boolean;
}

export const AddEditMembershipPlanForm = ({
  planData,
  isEdit = false,
}: AddEditMembershipPlanFormProps) => {
  const [form] = Form.useForm();
  const [nameLanguage, setNameLanguage] = useState<"ar" | "en">("ar");
  const [features, setFeatures] = useState<string[]>([]);

  // Replace with your actual hook
  // const { addEditPlanMutation, addEditPlanLoading } = useAddEditMembershipPlan();

  const router = useRouter();
  const addEditPlanLoading = false; // Replace with actual loading state

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const filteredFeatures = features.filter((f) => f.trim() !== "");
        const planData = {
          name: {
            ar: values.nameAr,
            en: values.nameEn,
          },
          price: values.price,
          duration: values.duration,
          featureName: values.featureName,
          status: values.status,
          features: filteredFeatures,
          pointsTitle: values.pointsTitle,
          pointsDescription: values.pointsDescription,
          pointsExample: values.pointsExample,
        };

        console.log("Plan data:", planData);

        // Replace with your actual API call
        // addEditPlanMutation(planData)
        //   .then(() => {
        //     form.resetFields();
        //     setFeatures([]);
        //     toast.success(isEdit ? "تم تحديث الخطة بنجاح" : "تم إضافة الخطة بنجاح");
        //     router.push("/admin/memberships/plans");
        //   })
        //   .catch((errors) => {
        //     handleFormErrors(form, errors);
        //   });

        // Mock success
        toast.success(isEdit ? "تم تحديث الخطة بنجاح" : "تم إضافة الخطة بنجاح");
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  useEffect(() => {
    if (!planData) return;

    const formValues = {
      ...planData,
      nameAr: planData.name?.ar || planData.name,
      nameEn: planData.name?.en || "",
    };

    form.setFieldsValue(formValues);

    if (planData.features && Array.isArray(planData.features)) {
      setFeatures(planData.features);
    }
  }, [planData, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
      name="addEditMembershipPlanForm"
    >
      {/* Basic Plan Information Section */}
      <div className="bg-white border border-[#DCE3E5] rounded-xl p-6 mb-6">
        <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold text-lg">
          بيانات الخطة الأساسية
        </h4>

        <Row gutter={[16, 16]}>
          {/* Price */}
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                name="nameAr"
                rules={[{ required: true, message: "ادخل اسم الخطة بالعربية" }]}
              >
                <Input placeholder="مثال: الذهبية" size="large" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                name="nameEn"
                rules={[
                  { required: true, message: "Enter plan name in English" },
                ]}
              >
                <Input placeholder="e.g., Gold" size="large" dir="ltr" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="السعر"
                name="price"
                rules={[{ required: true, message: "ادخل السعر" }]}
              >
                <Input placeholder="السعر" size="large" />
              </Form.Item>
            </div>
          </Col>

          {/* Duration */}
          <Col xs={24} md={12}>
            <div className="selectS1">
              <Form.Item
                label="الفترة"
                name="duration"
                rules={[{ required: true, message: "اختر الفترة" }]}
              >
                <Select placeholder="شهرية" size="large">
                  <Option value="monthly">شهرية</Option>
                  <Option value="yearly">سنوية</Option>
                  <Option value="quarterly">ربع سنوية</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          {/* Feature Name */}
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item label="اسم الميزة" name="featureName">
                <Input placeholder="الميزة" size="large" />
              </Form.Item>
            </div>
          </Col>

          {/* Status */}
          <Col xs={24} md={12}>
            <div className="selectS1">
              <Form.Item
                label="الحالة"
                name="status"
                initialValue="active"
                rules={[{ required: true, message: "اختر الحالة" }]}
              >
                <Select placeholder="نعم" size="large">
                  <Option value="active">نعم</Option>
                  <Option value="inactive">لا</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/* Add Feature Button */}
        <div className="mb-6">
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={handleAddFeature}
            className="!bg-[#385B66] w-16 h-16 flex items-center justify-center"
            size="large"
          ></Button>
        </div>

        {/* Dynamic Feature Inputs */}
        {features.length > 0 && (
          <div className="mb-6 space-y-4">
            {features.map((feature, index) => (
              <Row gutter={[16, 16]} key={index}>
                <Col xs={20}>
                  <div className="inputS1">
                    <Input
                      placeholder={`ميزة ${index + 1}`}
                      size="large"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Button
                    danger
                    size="large"
                    onClick={() => handleRemoveFeature(index)}
                    className="w-full"
                  >
                    حذف
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-start gap-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={addEditPlanLoading}
            className="!bg-[#385B66] px-8"
            size="large"
          >
            حفظ
          </Button>
          <Button
            type="default"
            className="px-8"
            size="large"
            onClick={() => router.push("/admin/memberships/plans")}
          >
            إلغاء
          </Button>
        </div>
      </div>

      {/* Membership Points System Section */}
      <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
        <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold text-lg">
          نظام النقاط مع عضويتك
        </h4>

        <Row gutter={[16, 16]}>
          {/* Title */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="العنوان"
                name="pointsTitle"
                rules={[{ required: true, message: "ادخل العنوان" }]}
              >
                <Input placeholder="نظام النقاط مع عضويتك" size="large" />
              </Form.Item>
            </div>
          </Col>

          {/* Description */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item label="الوصف" name="pointsDescription">
                <Input
                  placeholder="للعضوية الذهبية، ستحصل على 1.5x نقاط عند كل عملية شراء. كل 10 ريال = 15 نقطة"
                  size="large"
                />
              </Form.Item>
            </div>
          </Col>

          {/* Example */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item label="مثال" name="pointsExample">
                <TextArea
                  rows={5}
                  placeholder="ميزات هذه الخطة...."
                  className="resize-none"
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="flex items-center justify-start gap-4 mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={addEditPlanLoading}
            className="!bg-[#385B66] px-8"
            size="large"
          >
            حفظ
          </Button>
          <Button
            type="default"
            className="px-8"
            size="large"
            onClick={() => router.push("/admin/memberships/plans")}
          >
            إلغاء
          </Button>
        </div>
      </div>
    </Form>
  );
};
