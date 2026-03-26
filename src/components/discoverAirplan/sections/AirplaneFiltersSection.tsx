"use client";
import { Checkbox, Collapse, Slider, Select, Input } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const { Panel } = Collapse;
const { Option } = Select;

export const AirplaneFiltersSection = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["1", "2", "3", "4", "5", "6"]}
        ghost
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <FaChevronDown
            className={`transition-transform ${isActive ? "rotate-180" : ""}`}
          />
        )}
      >
        {/* الدرجة */}
        <Panel
          header={
            <span className="font-bold text-[#333]">درجة حجز الطيران</span>
          }
          key="1"
        >
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input placeholder="بحث" className="mb-2" />
            </div>
            <Checkbox checked>درجة VIP</Checkbox>
            <Checkbox>درجة ثانية</Checkbox>
            <Checkbox>درجة ثالثة</Checkbox>
          </div>
        </Panel>

        {/* نغادر مرة */}
        <Panel
          header={<span className="font-bold text-[#333]">نغادر مرة</span>}
          key="2"
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm mb-2 text-gray-500">من القاهرة</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="border rounded-lg py-1 text-xs hover:border-primary">
                  00 - 06
                </button>
                <button className="border rounded-lg py-1 text-xs hover:border-primary">
                  06 - 12
                </button>
                <button className="border rounded-lg py-1 text-xs hover:border-primary">
                  12 - 18
                </button>
                <button className="border rounded-lg py-1 text-xs hover:border-primary text-white bg-primary border-primary">
                  18 - 00
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm mb-2 text-gray-500">من حائل</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="border rounded-lg py-1 text-xs">
                  00 - 06
                </button>
                <button className="border rounded-lg py-1 text-xs">
                  06 - 12
                </button>
                <button className="border rounded-lg py-1 text-xs">
                  12 - 18
                </button>
                <button className="border rounded-lg py-1 text-xs">
                  18 - 00
                </button>
              </div>
            </div>
          </div>
        </Panel>

        {/* نوع السعر */}
        <Panel
          header={<span className="font-bold text-[#333]">نوع السعر</span>}
          key="3"
        >
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input placeholder="بحث" className="mb-2" />
            </div>
            <Checkbox checked>مستردة</Checkbox>
            <Checkbox>مستردة مع الغرامة</Checkbox>
            <Checkbox>غير قابل للاسترجاع</Checkbox>
          </div>
        </Panel>

        {/* نطاق الأسعار */}
        <Panel
          header={<span className="font-bold text-[#333]">نطاق الأسعار</span>}
          key="4"
        >
          <div className="px-2">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{priceRange[0]} ر.س</span>
              <span>{priceRange[1]} ر.س</span>
            </div>
            <Slider
              range
              min={0}
              max={1000000}
              value={priceRange}
              onChange={(val) => setPriceRange(val as [number, number])}
              trackStyle={[{ backgroundColor: "#BF2629" }]}
              handleStyle={[
                { borderColor: "#BF2629" },
                { borderColor: "#BF2629" },
              ]}
            />
            <div className="flex gap-2 mt-4">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">من</p>
                <Input value={priceRange[0]} size="small" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">إلى</p>
                <Input value={priceRange[1]} size="small" />
              </div>
            </div>
          </div>
        </Panel>

        {/* الخطوط الجوية */}
        <Panel
          header={<span className="font-bold text-[#333]">الخطوط الجوية</span>}
          key="5"
        >
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input placeholder="بحث" className="mb-2" />
            </div>
            <div className="flex items-center justify-between">
              <Checkbox checked>Saudi Arabian Airlines</Checkbox>
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>Flynas</Checkbox>
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>Jazeera Airways</Checkbox>
            </div>
          </div>
        </Panel>

        {/* مطار التوقف */}
        <Panel
          header={<span className="font-bold text-[#333]">مطار التوقف</span>}
          key="6"
        >
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input placeholder="بحث" className="mb-2" />
            </div>
            <Checkbox checked>Cairo International Airport</Checkbox>
            <Checkbox>Hail Airport</Checkbox>
            <Checkbox>King Fahad Airport</Checkbox>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
