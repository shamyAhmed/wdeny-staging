"use client";
import { Button, Tag, Row, Col } from "antd";
import { FiCreditCard } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface SubscriptionDetailsProps {
  subscription?: {
    _id: string;
    subscriptionNumber: string;
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    plan: {
      name: string;
      duration: string;
    };
    startDate: string;
    renewalDate: string;
    status: "active" | "inactive" | "cancelled";
    paymentMethod: string;
  };
}

export const SubscriptionDetailsComponent = ({
  subscription,
}: SubscriptionDetailsProps) => {
  const router = useRouter();

  // Mock data - replace with actual subscription data
  const subscriptionData = subscription || {
    _id: "1",
    subscriptionNumber: "#3",
    customer: {
      name: "محمد العتيبي",
      email: "customer@example.com",
      phone: "0551234567",
    },
    plan: {
      name: "الذهبية",
      duration: "شهري",
    },
    startDate: "10-11-2023",
    renewalDate: "10-12-2023",
    status: "active" as const,
    paymentMethod: "Apple Pay",
  };

  const handleRenewSubscription = () => {
    console.log("Renew subscription:", subscriptionData._id);
    // Add your renewal logic here
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription:", subscriptionData._id);
    // Add your cancellation logic here
  };

  const getStatusTag = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; color: string; label: string }
    > = {
      active: { bg: "#ECFDF5", color: "#007A55", label: "نشط" },
      inactive: { bg: "#FFF4ED", color: "#FF8C42", label: "غير نشط" },
      cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "ملغي" },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Tag
        style={{
          backgroundColor: config.bg,
          color: config.color,
          border: "none",
        }}
        className="!px-6 !py-2 !rounded-xl"
      >
        {config.label}
      </Tag>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 md:w-[80%] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#F3F4F6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#101828]">
              تفاصيل الاشتراك {subscriptionData.subscriptionNumber}
            </h1>
          </div>
          <p className="text-[#6A7282]">
            مشترك منذ {subscriptionData.startDate}
          </p>
        </div>
        {getStatusTag(subscriptionData.status)}
      </div>

      {/* Main Content */}
      <Row gutter={[48, 48]}>
        {/* Right Column - Customer Information */}
        <Col xs={24} lg={12}>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">
              معلومات العميل
            </h2>
            <div className="space-y-4">
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">الاسم:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData.customer.name}
                </span>
              </div>
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">البريد:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData.customer.email}
                </span>
              </div>
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">الجوال:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData.customer.phone}
                </span>
              </div>
            </div>
          </div>
        </Col>

        {/* Left Column - Plan Information */}
        <Col xs={24} lg={12}>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">
              معلومات الخطة
            </h2>
            <div className="space-y-4">
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-900 font-medium">
                  الخطة الحالية: العضوية {subscriptionData.plan.name}
                </span>
                <span className="text-gray-600"></span>
              </div>
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">الدورة:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData.plan.duration}
                </span>
              </div>
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">التجديد القادم:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData.renewalDate}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Payment and Invoice Section */}
      <div className="mt-12 bg-[#F9FAFB] rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">
          الدفع والفوترة
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">طريقة الدفع</span>

          <div className="flex items-center gap-3">
            <FiCreditCard className="text-2xl text-gray-600" />
            <span className="text-gray-900 font-medium">
              {subscriptionData.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex items-center gap-4">
        <Button
          type="primary"
          size="large"
          onClick={handleRenewSubscription}
          className=" w-full"
        >
          تجديد الاشتراك
        </Button>
        <Button
          type="default"
          size="large"
          onClick={handleCancelSubscription}
          className="w-full"
        >
          إلغاء الاشتراك
        </Button>
      </div>
    </div>
  );
};
