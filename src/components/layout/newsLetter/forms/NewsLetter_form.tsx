import { Button, Form } from "antd";
import { Input } from "antd";

export const NewsLetter_form = () => {
  const [form] = Form.useForm();

  const handleNewsLetter = () => {
    // form.validateFields().then((values) => {
    //   becomePartnerMutation(values)
    //     .then(() => {
    //       form.resetFields();
    //       handleCancel();
    //     })
    //     .catch((errors) => {
    //       handleFormErrors(form, errors);
    //     });
    // });
  };

  return (
    <Form
      name="newsletter_form"
      form={form}
      onFinish={handleNewsLetter}
      autoComplete="off"
    >
      <div className="input-button flex align">
        <div className="inputS1 flex-1">
          <Form.Item
            label={""}
            name="full_name"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input placeholder={"ادخل بريدك الالكتروني"} />
          </Form.Item>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          //   disabled={becomePartnerLoading}
          //   loading={becomePartnerLoading}
          className="submit-btn w-full !rounded-[64px]"
        >
          اشترك
        </Button>
      </div>
    </Form>
  );
};
