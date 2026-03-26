"use client";

import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { FiCalendar } from "react-icons/fi";

export const AffiliateDashboardMontlyProfits_section = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Monthly data in Arabic
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
    const profitData = [2500, 3100, 2900, 3600, 4000, 4600];

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "الأرباح (SAR)",
            data: profitData,
            borderColor: "#374151",
            backgroundColor: "rgba(55, 65, 81, 0.05)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: "#374151",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: 12,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            borderColor: "#e5e7eb",
            borderWidth: 1,
            cornerRadius: 8,
            // callbacks: {
            //   label: function (context) {
            //     return `الأرباح: ${context.parsed.y.toLocaleString("ar-SA")} ريال`;
            //   },
            // },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 6000,
            ticks: {
              stepSize: 1500,
              font: { size: 12, weight: "bold" },
              color: "#9ca3af",
              padding: 8,
            },
            grid: {
              color: "rgba(229, 231, 235, 0.5)",
            },
            border: {
              display: false,
            },
          },
          x: {
            ticks: {
              font: { size: 12, weight: "bold" },
              color: "#9ca3af",
              padding: 8,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="cardS1 my-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-right mb-2">
            الأرباح الشهرية
          </h2>
          <p className="text-[#B0B0B3] text-sm md:text-base text-right">
            تتبع أرباحك على مدار الأشهر
          </p>
        </div>
        <p className="ml-4 p-3 text-[#B0B0B3]  flex items-center gap-3">
          <FiCalendar size={20} />
          آخر 6 أشهر
        </p>
      </div>

      {/* Chart Container */}
      <div
        className="w-full"
        style={{
          minHeight: "320px",
          height: "40vh", // optional responsive height
          position: "relative",
        }}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};
