"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { AddEditLoyaltyReward_modal } from "./modal/AddEditLoyaltyReward_modal";
import { LoyaltyRewardsCards } from "./sections/LoyaltyRewardsCards_section";

export const AdminLoyaltyRewardsComponent = () => {
  const handleAddRule = async (values: any) => {
    console.log("New rule values:", values);
    // Add your API call here to create the new loyalty rule
    // Example:
    // await createLoyaltyRule(values);
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            قواعد النقاط
          </h1>
          <p className="text-lg text-primary">إدارة مكافآت نظام الولاء </p>
        </div>

        <AddEditLoyaltyReward_modal onSubmit={handleAddRule}>
          <Button type="primary">
            <FiPlus />
            إضافة مكافأه جديد{" "}
          </Button>
        </AddEditLoyaltyReward_modal>
      </div>

      <LoyaltyRewardsCards />
    </main>
  );
};
