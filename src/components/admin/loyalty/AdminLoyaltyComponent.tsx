"use client";
import { Button, Table, Tag } from "antd";
import { Row, Col } from "antd";
import type { TableProps } from "antd";
import { FiPlus, FiGift, FiRefreshCw } from "react-icons/fi";
import { TbMedal } from "react-icons/tb";
import { useRouter } from "@/i18n/navigation";

interface RedemptionRequest {
  _id: string;
  userName: string;
  points: number;
  size: string;
  status: "pending" | "approved" | "rejected";
}

export const AdminLoyaltyComponent = () => {
  const router = useRouter();

  // Mock data - replace with actual data
  const stats = {
    totalPoints: 125000,
    redemptions: 450,
    pendingRequests: 15,
  };

  const loyaltyRules = [
    {
      title: "المشتريات",
      description: "لكل 10 ريس مشتريات",
      points: "1 نقطة",
    },
    {
      title: "التسجيل الجديد",
      description: "عند إنشاء حساب جديد",
      points: "50 نقطة",
    },
  ];

  const redemptionRequests: RedemptionRequest[] = [
    {
      _id: "1",
      userName: "محمد علي",
      points: 500,
      size: "حجم 10%",
      status: "pending",
    },
    {
      _id: "2",
      userName: "سارة أحمد",
      points: 1000,
      size: "شحن مجاني",
      status: "approved",
    },
  ];

  const columns: TableProps<RedemptionRequest>["columns"] = [
    {
      title: "المستخدم",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "النقاط",
      dataIndex: "points",
      key: "points",
      render: (points: number) => <span>{points} نقطة</span>,
    },
    {
      title: "الحجم",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "الحالة",
      key: "status",
      render: (_, record) => {
        const statusConfig: Record<
          string,
          { color: string; text: string; bg: string }
        > = {
          pending: {
            color: "text-orange-600",
            bg: "bg-orange-100",
            text: "قيد الانتظار",
          },
          approved: {
            color: "text-green-600",
            bg: "bg-green-100",
            text: "مقبول",
          },
          rejected: {
            color: "text-red-600",
            bg: "bg-red-100",
            text: "مرفوض",
          },
        };

        const config = statusConfig[record.status];
        return (
          <span
            className={`px-3 py-1 text-xs rounded-full ${config.bg} ${config.color}`}
          >
            {config.text}
          </span>
        );
      },
    },
  ];

  return (
    <main>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[#111113]">
          برنامج الولاء
        </h1>
        <p className="text-lg text-gray-600">
          نظرة عامة على برنامج الولاء والمكافآت
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={8}>
          <div className="bg-white border border-[#eaeef0] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9D9DA1] text-sm mb-1">
                  مجموع النقاط الموزعة
                </p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.totalPoints.toLocaleString()}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#E7F3F8] flex items-center justify-center">
                <TbMedal className="text-2xl text-primary" />
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <div className="bg-white border border-[#eaeef0] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9D9DA1] text-sm mb-1">عمليات الاستبدال</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.redemptions}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#E7F3F8] flex items-center justify-center">
                <FiGift className="text-2xl text-primary" />
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <div className="bg-white border border-[#eaeef0] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9D9DA1] text-sm mb-1">طلبات معلقة</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.pendingRequests}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#E7F3F8] flex items-center justify-center">
                <FiRefreshCw className="text-2xl text-primary" />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Two Column Layout */}
      <Row gutter={[24, 24]}>
        {/* Right Column - Redemption Requests */}
        <Col xs={24} lg={12}>
          <div className="bg-white border border-[#eaeef0] rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              آخر طلبات الاستبدال
            </h2>
            <Table
              columns={columns}
              dataSource={redemptionRequests}
              rowKey="_id"
              pagination={false}
            />
            <div className="mt-4">
              <Button type="default" className="w-full !border-[#E5E7EB]">
                عرض كل الطلبات
              </Button>
            </div>
          </div>
        </Col>

        {/* Left Column - Loyalty Rules */}
        <Col xs={24} lg={12}>
          <div className="bg-white border border-[#eaeef0] rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              قواعد النقاط النشطة
            </h2>
            <div className="space-y-6">
              {loyaltyRules.map((rule, index) => (
                <div
                  key={index}
                  className="bg-[#F9FAFB] p-6 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                  </div>

                  <span className="text-xl font-bold text-primary">
                    {rule.points}
                  </span>
                </div>
              ))}
            </div>
            <Button type="default" className="w-full !border-[#E5E7EB] mt-6">
              إدارة القواعد
            </Button>
          </div>
        </Col>
      </Row>
    </main>
  );
};
