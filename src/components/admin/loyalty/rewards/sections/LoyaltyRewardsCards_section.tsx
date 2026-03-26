"use client";
import DeleteModal from "@/components/tools/modal/DeleteModal";
import { Button, Row, Col, Tag } from "antd";
import { FiGift } from "react-icons/fi";
import { useDeleteLoyaltyReward } from "../hooks/useDeleteLoyaltyReward";
import { AddEditLoyaltyReward_modal } from "../modal/AddEditLoyaltyReward_modal";

interface Reward {
  _id: string;
  title: string;
  description: string;
  points: number;
  status: "active" | "inactive";
}

interface LoyaltyRewardsCardsProps {
  rewards?: Reward[];
}

export const LoyaltyRewardsCards = ({ rewards }: LoyaltyRewardsCardsProps) => {
  // Mock data - replace with actual rewards data
  const defaultRewards: Reward[] = [
    {
      _id: "1",
      title: "خصم 10%",
      description: "احصل على خصم 10% على طلبك التالي",
      points: 500,
      status: "active",
    },
    {
      _id: "2",
      title: "شحن مجاني",
      description: "شحن مجاني إلى مكان داخل المملكة",
      points: 1000,
      status: "active",
    },
    {
      _id: "3",
      title: "هدية حصرية",
      description: "منتج هدية مفاجئ",
      points: 600,
      status: "inactive",
    },
  ];

  const { deleteLoyaltyRewardMutation, deleteLoyaltyRewardLoading } =
    useDeleteLoyaltyReward();

  const rewardsList = rewards || defaultRewards;

  const handleEditRule = async (values: any) => {
    console.log("New rule values:", values);
    // Add your API call here to create the new loyalty rule
    // Example:
    // await createLoyaltyRule(values);
  };

  const handleDelete = (id: string) => {
    deleteLoyaltyRewardMutation(id);
  };

  return (
    <Row gutter={[24, 24]}>
      {rewardsList.map((reward) => (
        <Col key={reward._id} xs={24} sm={12} lg={8}>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-md transition-shadow">
            {/* Status Badge */}
            <div className="flex justify-end mb-3">
              {reward.status === "active" ? (
                <Tag className="!m-0 bg-[#D0FAE5] !px-3 !rounded-2xl">نشط</Tag>
              ) : (
                <Tag color="red" className="!m-0  !px-3 !rounded-2xl">
                  متوقف
                </Tag>
              )}
            </div>

            {/* Gift Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <FiGift className="text-3xl text-orange-500" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {reward.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mb-4 min-h-[40px]">
              {reward.description}
            </p>

            {/* Points */}
            <div className="text-center mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {reward.points}
              </span>
              <span className="text-sm text-gray-600 mr-2">نقطة</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F3F4F6]">
              <AddEditLoyaltyReward_modal onSubmit={handleEditRule}>
                <Button
                  size="large"
                  className="!border-[#E5E7EB] text-[#364153]"
                  block
                >
                  تعديل
                </Button>
              </AddEditLoyaltyReward_modal>

              <DeleteModal
                heading="حذف المكافأه "
                description="هل أنت متأكد من حذف المكافأه ؟ لا يمكن التراجع عن هذا الإجراء."
                handleDelete={async () => handleDelete(reward._id)}
                deleteLoading={deleteLoyaltyRewardLoading}
              >
                <Button
                  size="large"
                  className="!border-[#E5E7EB] text-[#364153]"
                  block
                >
                  إيقاف
                </Button>
              </DeleteModal>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
