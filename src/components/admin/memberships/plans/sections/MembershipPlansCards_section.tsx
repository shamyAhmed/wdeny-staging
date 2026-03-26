"use client";
import { Button, Row, Col, Tag } from "antd";
import { useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";

interface MembershipPlan {
  _id: string;
  name: string;
  price: number;
  duration: string; // e.g., "شهري" or "سنوي"
  features: string[];
  status: "active" | "inactive";
}

interface MembershipPlansCardsProps {
  plans?: MembershipPlan[];
  onEdit?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export const MembershipPlansCards = ({
  plans,
  onEdit,
  onToggleStatus,
}: MembershipPlansCardsProps) => {
  const router = useRouter();
  // Mock data - replace with actual plans data
  const defaultPlans: MembershipPlan[] = [
    {
      _id: "1",
      name: "العضوية الذهبية",
      price: 99,
      duration: "شهري",
      features: ["شحن مجاني", "نقاط مضاعفة x2", "أولوية الدعم"],
      status: "active",
    },
    {
      _id: "2",
      name: "العضوية الفضية",
      price: 49,
      duration: "شهري",
      features: ["خصم 5% على المشتريات", "نقاط عادية"],
      status: "active",
    },
    {
      _id: "3",
      name: "عضوية VIP",
      price: 999,
      duration: "سنوي",
      features: ["كل ميزات الذهبية", "هدية سنوية", "مدخل 💎💎 حساب خاص"],
      status: "inactive",
    },
  ];

  const plansList = plans || defaultPlans;

  const handleToggleStatus = (id: string) => {
    if (onToggleStatus) {
      onToggleStatus(id);
    } else {
      console.log("Toggle status for plan:", id);
    }
  };

  return (
    <Row gutter={[24, 24]}>
      {plansList.map((plan) => (
        <Col key={plan._id} xs={24} sm={12} lg={8}>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="w-full flex items-center justify-between mb-3">
              <div className="w-full flex items-center justify-end">
                {/* Plan Name */}
                <h3 className="flex-1 text-2xl font-bold text-gray-900 text-center">
                  {plan.name}
                </h3>
                {plan.status === "active" ? (
                  <Tag className="!m-0 bg-[#D0FAE5] text-[#007A55] !px-3 !rounded-xl">
                    نشط
                  </Tag>
                ) : (
                  <Tag color="red" className="!m-0 !px-3 !rounded-xl">
                    غير نشط
                  </Tag>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="text-sm text-[##6A7282]">
                  ر.س / {plan.duration}
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="flex-1 mb-6 border-t border-[#F3F4F6] pt-6">
              <ul className="space-y-3 ">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheck className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A5565] text-right flex-1">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 border-t border-[#F3F4F6] pt-6">
              <Button
                size="large"
                block
                onClick={() => router.push(`/admin/memberships/plans/id/edit`)}
              >
                تعديل
              </Button>
              <Button
                size="large"
                block
                onClick={() => handleToggleStatus(plan._id)}
              >
                {plan.status === "active" ? "إيقاف" : "تفعيل"}
              </Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
