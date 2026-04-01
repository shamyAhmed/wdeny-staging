"use client";
import { Checkbox, Collapse, Slider, Select, Input } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";

const { Panel } = Collapse;
const { Option } = Select;

export const AirplaneFiltersSection = () => {
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const departureTimeOptions = ["00 - 18", "18 - 12", "12 - 06", "06 - 00"];
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(
    departureTimeOptions[0],
  );
  const [selectedReturnTime, setSelectedReturnTime] = useState(
    departureTimeOptions[0],
  );

  const tripType = searchParams.get("tripType");

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["1", "2", "3", "4", "5", "6"]}
        ghost
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <FaChevronDown
            className={`!text-primary transition-transform ${isActive ? "!rotate-180" : "!rotate-0"}`}
          />
        )}>
        {/* الدرجة */}
        <Panel
          header={
            <span className="font-medium text-base text-primary">
              درجة حجز الطيران
            </span>
          }
          key="1">
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input
                prefix={<CiSearch size={20} />}
                placeholder="بحث"
              />
            </div>
            <Checkbox checked>درجة VIP</Checkbox>
            <Checkbox>درجة ثانية</Checkbox>
            <Checkbox>درجة ثالثة</Checkbox>
          </div>
        </Panel>

        {/* نغادر مرة */}
        <Panel
          header={
            <span className="font-medium text-base text-primary">
              نغادر مرة
            </span>
          }
          key="2">
          <div className="flex flex-col gap-4">
            <div>
              <p className="time-origin-label">من القاهرة</p>
              <div className="time-segments">
                {departureTimeOptions.map((option) => (
                  <button
                    key={option}
                    className={`time-segment-btn ${
                      selectedDepartureTime === option ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedDepartureTime(option)}
                    type="button">
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {tripType !== "one" && (
              <div>
                <p className="time-origin-label">من حائل</p>
                <div className="time-segments">
                  {departureTimeOptions.map((option) => (
                    <button
                      key={`return-${option}`}
                      className={`time-segment-btn ${
                        selectedReturnTime === option ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedReturnTime(option)}
                      type="button">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Panel>

        {/* نوع السعر */}
        <Panel
          header={
            <span className="font-medium text-base text-primary">
              نوع السعر
            </span>
          }
          key="3">
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input
                placeholder="بحث"
                prefix={<CiSearch size={20} />}
              />
            </div>
            <Checkbox checked>مستردة</Checkbox>
            <Checkbox>مستردة مع الغرامة</Checkbox>
            <Checkbox>غير قابل للاسترجاع</Checkbox>
          </div>
        </Panel>

        <div className="w-full h-px bg-[#EAEAEA]" />

        {/* نطاق الأسعار */}
        <Panel
          header={
            <span className="font-medium text-base text-primary">
              نطاق الأسعار
            </span>
          }
          key="4">
          <div className="px-2">
            <Slider
              range
              min={0}
              max={1000000}
              value={priceRange}
              onChange={(val) => setPriceRange(val as [number, number])}
              styles={{
                track: {
                  backgroundColor: "#BF2629",
                  height: 5.5,
                },
                handle: {
                  height: 18,
                  width: 18,
                  transform: "translateY(-50%)",
                  top: "50%",
                },
                rail: {
                  // backgroundColor: "yellowo"
                  height: 5.5,
                },
                tracks: {
                  background: "yellow",
                },
              }}
            />
            <div className="flex gap-2 mt-5 text-base">
              <div className="flex-1">
                <p className="text-base text-gray-400 mb-1">من</p>
                <div className="inputS1 with-border">
                  <Input
                    value={priceRange[0]}
                    size="middle"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center pt-6 font-bold">-</div>
              <div className="flex-1">
                <p className="text-gray-400 mb-1">إلى</p>
                <div className="inputS1 with-border">
                  <Input
                    value={priceRange[1]}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* الخطوط الجوية */}
        <Panel
          header={
            <span className="text-primary text-base font-medium">
              الخطوط الجوية
            </span>
          }
          key="5">
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input
                placeholder="بحث"
                prefix={<CiSearch size={20} />}
              />
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
          header={
            <span className="font-medium text-base text-primary">
              مطار التوقف
            </span>
          }
          key="6">
          <div className="flex flex-col gap-3">
            <div className="inputS1">
              <Input
                placeholder="بحث"
                prefix={<CiSearch size={20} />}
              />
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
