"use client";

import React, { useState } from "react";
import { Button, Input, Select, message } from "antd";
import { FiPlus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";

interface CustomLinkFormData {
  product: string;
  customText?: string;
}

export function CreateCustomLink_section() {
  const [formData, setFormData] = useState<CustomLinkFormData>({
    product: "",
    customText: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCreateLink = async () => {
    if (!formData.product) {
      message.error("يرجى اختيار منتج");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("تم إنشاء الرابط بنجاح");
      setFormData({ product: "", customText: "" });
    } catch (error) {
      message.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cardS1 my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaPlus className="text-xl text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">إنشاء رابط مخصص</h2>
        </div>
      </div>
      <p className="text-[#B0B0B3] text-sm mb-6">
        أنشئ رابط تسويق مخصص لأي منتج في المتجر واحصل على عمولات على كل عملية
        بيع
      </p>
      {/* Form */}
      <div className="flex items-center gap-4 sm:flex-col">
        <div className="inputS1 flex-1  !pb-0 !mb-0 sm:w-full">
          <Input
            value={formData.customText}
            type="link"
            placeholder="أدخل رابط المنتج..."
            className="bg-[#F1F1F1] !mb-0"
            onChange={(e) =>
              setFormData({ ...formData, customText: e.target.value })
            }
          />
        </div>

        {/* Create Button */}
        <Button
          type="primary"
          size="large"
          icon={<FiPlus size={18} />}
          onClick={handleCreateLink}
          loading={loading}
          className="border w-fit  sm:w-full"
        >
          إنشاء الرابط
        </Button>
      </div>
    </div>
  );
}
