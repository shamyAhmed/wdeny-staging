"use client";

import { Col, Row } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SalesDashboard_section() {
  const chartData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"],
    datasets: [
      {
        label: "المستخدمين",
        data: [2500, 1500, 10000, 4000, 4800, 3900, 4400],
        borderColor: "#0DA2E7",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(13,162,231,0.15)",
        pointRadius: 0, // remove dots on line
      },
      {
        label: "المبيعات",
        data: [4200, 3100, 2100, 2900, 2000, 2500, 3600],
        borderColor: "#385B66",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(56,91,102,0.12)",
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: false, // removes the circle indicators
          boxWidth: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2500 },
      },
    },
  };
  const products = [
    {
      id: 1,
      name: "منتج بريميوم",
      sales: 1250,
      price: "45,000",
      change: "+12%",
    },
    { id: 2, name: "منتج ذهبي", sales: 980, price: "35,200", change: "+8%" },
    { id: 3, name: "منتج فضي", sales: 750, price: "22,500", change: "-3%" },
    { id: 4, name: "منتج برونزي", sales: 520, price: "15,600", change: "+5%" },
  ];

  return (
    <div className=" mb-12">
      {/* Top Products */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-[#DCE3E5] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-right mb-4">
                تحليلات المبيعات
              </h3>
              <div className="flex gap-6 justify-end mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0DA2E7]" />
                  المستخدمين
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#385B66]" />
                  المبيعات
                </div>
              </div>
            </div>

            <Line data={chartData} options={chartOptions} />
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="bg-white border border-[#DCE3E5] rounded-xl p-6 space-y-6 h-full">
            <h3 className="text-lg font-bold text-right">
              المنتجات الأكثر مبيعًا
            </h3>

            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between  pb-3 last:border-0"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-semibold">
                  {p.id}
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.sales} مبيعة</p>
                </div>

                <div className=" space-y-1">
                  <p className="font-bold">ر.س {p.price}</p>
                  <p
                    className={`text-sm ${
                      p.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {p.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
