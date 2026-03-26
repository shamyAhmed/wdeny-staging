"use client";

import { useParams } from "next/navigation";
import { AddEditMembershipPlanForm } from "./forms/AddEditMembershipPlan_form";

export const AdminMembershipAddEditPlanComponent = () => {
  const { planId } = useParams();
  return (
    <main>
      <h1 className="mb-12 text-3xl font-bold text-[#111113] ">
        {planId ? "تعديل خطة" : " اضافة خطة جديد"}
      </h1>

      <AddEditMembershipPlanForm />
    </main>
  );
};
