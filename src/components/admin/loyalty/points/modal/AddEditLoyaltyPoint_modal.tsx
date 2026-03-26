import { ReactNode, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Form, Input, InputNumber, Select } from "antd";

type AddLoyaltyRuleModalType = {
  children: ReactNode;
  onSubmit?: (values: any) => Promise<void>;
  submitLoading?: boolean;
};

export const AddEditLoyaltyPoint_modal = ({
  children,
  onSubmit,
  submitLoading = false,
}: AddLoyaltyRuleModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (onSubmit) {
        await onSubmit(values);
        form.resetFields();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <a onClick={showModal}>{children}</a>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="600px"
        wrapClassName="mainModal"
        footer={null}
        centered
      >
        <div className="heading !border-b-[0px] align between flex mb-4">
          <h3 className="font-bold text-xl">إضافة قاعدة جديدة</h3>
          <button className="closeBtn" onClick={handleCancel}>
            <AiOutlineClose />
          </button>
        </div>

        <Form form={form} layout="vertical" className="mt-4">
          <div className="inputS1">
            <Form.Item
              label="الاسم / العنوان"
              name="name"
              rules={[{ required: true, message: "يرجى إدخال اسم القاعدة" }]}
            >
              <Input placeholder="مثال: المشتريات" size="large" />
            </Form.Item>
          </div>

          <div className="inputS1">
            <Form.Item
              label="قيمة النقاط"
              name="points"
              rules={[{ required: true, message: "يرجى إدخال قيمة النقاط" }]}
            >
              <Input
                type="number"
                placeholder="قيمة النقاط"
                className="w-full"
                min={1}
              />
            </Form.Item>
          </div>
          <div className="inputS1">
            <Form.Item
              label="الشرط"
              name="minAmount"
              tooltip="مثال: إذا كانت القاعدة تعتمد على المشتريات، يمكنك وضع الحد الأدنى لقيمة المشتريات التي يجب أن يحققها العميل للحصول على النقاط."
            >
              <Input
                type="number"
                placeholder="الشرط"
                className="w-full"
                min={0}
              />
            </Form.Item>
          </div>
          <div className="selectS1">
            <Form.Item label="الحالة" name="status" initialValue="active">
              <Select size="large">
                <Select.Option value="active">نشط</Select.Option>
                <Select.Option value="inactive">غير نشط</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>

        <div className="flex items-center justify-end mt-6 gap-2">
          <Button type="default" onClick={handleCancel} size="large">
            إلغاء
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            loading={submitLoading}
            size="large"
          >
            حفظ{" "}
          </Button>
        </div>
      </Modal>
    </>
  );
};
