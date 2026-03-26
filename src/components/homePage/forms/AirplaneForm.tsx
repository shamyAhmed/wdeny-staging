"use client";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { BsAirplaneFill } from "react-icons/bs";
import { IoPersonOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";
import dayjs from "dayjs";

const { Option } = Select;

type Segment = { id: number };

export const AirplaneForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || "ar";

  const [tripType, setTripType] = useState<"one" | "round" | "multi">("one");
  const [segments, setSegments] = useState<Segment[]>([{ id: 1 }, { id: 2 }]);

  // Sync form with URL params on mount
  useEffect(() => {
    if (pathname.includes("/discover-airplan")) {
      const type = searchParams.get("tripType") as "one" | "round" | "multi";
      if (type) {
        setTripType(type);
        const newSegments: Segment[] = [];
        const initialValues: any = { tripType: type };

        if (type === "multi") {
          let i = 0;
          while (searchParams.get(`from_${i}`)) {
            newSegments.push({ id: i + 1 });
            initialValues[`from_${i}`] = searchParams.get(`from_${i}`);
            initialValues[`to_${i}`] = searchParams.get(`to_${i}`);
            const dateStr = searchParams.get(`date_${i}`);
            if (dateStr) initialValues[`date_${i}`] = dayjs(dateStr);
            i++;
          }
          setSegments(newSegments.length > 0 ? newSegments : [{ id: 1 }, { id: 2 }]);
        } else {
          initialValues["from_0"] = searchParams.get("from_0");
          initialValues["to_0"] = searchParams.get("to_0");
          const date0 = searchParams.get("date_0");
          if (date0) initialValues["date_0"] = dayjs(date0);

          if (type === "round") {
            const returnDate = searchParams.get("returnDate_0");
            if (returnDate) initialValues["returnDate_0"] = dayjs(returnDate);
          }
        }

        initialValues["passengers"] = searchParams.get("passengers");
        initialValues["class"] = searchParams.get("class");

        form.setFieldsValue(initialValues);
      }
    }
  }, [searchParams, pathname, form]);

  const addSegment = () => {
    setSegments((prev) => [...prev, { id: Date.now() }]);
  };

  const removeSegment = (id: number) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      const query = new URLSearchParams();
      query.set("tripType", tripType);

      if (tripType === "multi") {
        segments.forEach((_, idx) => {
          if (values[`from_${idx}`]) query.set(`from_${idx}`, values[`from_${idx}`]);
          if (values[`to_${idx}`]) query.set(`to_${idx}`, values[`to_${idx}`]);
          if (values[`date_${idx}`])
            query.set(`date_${idx}`, dayjs(values[`date_${idx}`]).format("YYYY-MM-DD"));
        });
      } else {
        if (values["from_0"]) query.set("from_0", values["from_0"]);
        if (values["to_0"]) query.set("to_0", values["to_0"]);
        if (values["date_0"])
          query.set("date_0", dayjs(values["date_0"]).format("YYYY-MM-DD"));

        if (tripType === "round" && values["returnDate_0"]) {
          query.set("returnDate_0", dayjs(values["returnDate_0"]).format("YYYY-MM-DD"));
        }
      }

      if (values["passengers"]) query.set("passengers", values["passengers"]);
      if (values["class"]) query.set("class", values["class"]);

      router.push(`/${locale}/discover-airplan?${query.toString()}`);
    });
  };

  // Rows to show: one / round = 1 row, multi = all segments
  const visibleSegments = tripType === "multi" ? segments : [segments[0]];
  const isLastSegment = (idx: number) => idx === visibleSegments.length - 1;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      autoComplete="off"
      className="airplane-form"
    >
      <div>
        {/* Segment Rows */}
        {visibleSegments.map((seg, idx) => {
          const isRoundTrip = tripType === "round";
          const colSpan = isRoundTrip ? 4 : 5;
          const dateColSpan = isRoundTrip ? 4 : 4;

          return (
            <Row key={seg.id} gutter={[12, 12]} className="mb-2">
              {/* السفر من */}
              <Col xs={24} md={12} lg={4}>
                <div className="inputS1">
                  <Form.Item label="السفر من" name={`from_${idx}`}>
                    <Input
                      placeholder="اختر المطار او المدينة"
                      prefix={
                        <BsAirplaneFill
                          className="text-lg text-[#819DAF]"
                          style={{ transform: "rotate(45deg)" }}
                        />
                      }
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* الذهاب الي */}
              <Col xs={24} md={12} lg={4}>
                <div className="inputS1">
                  <Form.Item label="الذهاب الي" name={`to_${idx}`}>
                    <Input
                      placeholder="اختر المطار او المدينة"
                      prefix={
                        <BsAirplaneFill
                          className="text-lg text-[#819DAF]"
                          style={{ transform: "rotate(-45deg)" }}
                        />
                      }
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* تاريخ السفر */}
              <Col xs={24} md={12} lg={4}>
                <div className="inputS1">
                  <Form.Item label="تاريخ السفر" name={`date_${idx}`}>
                    <DatePicker
                      className="w-full"
                      placeholder="تاريخ السفر"
                      suffixIcon={<DatePickerIcon />}
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* تاريخ العودة - only for Round Trip */}
              {isRoundTrip && (
                <Col xs={24} md={12} lg={4}>
                  <div className="inputS1">
                    <Form.Item label="تاريخ العودة" name={`returnDate_${idx}`}>
                      <DatePicker
                        className="w-full"
                        placeholder="تاريخ العودة"
                        suffixIcon={<DatePickerIcon />}
                      />
                    </Form.Item>
                  </div>
                </Col>
              )}

              {/* عدد المسافرين - only on first row */}
              {idx === 0 && (
                <Col xs={24} md={12} lg={isRoundTrip ? 4 : 6}>
                  <div className="inputS1">
                    <Form.Item label="عدد المسافرين" name="passengers">
                      <Input
                        placeholder="بالغ, طفل"
                        prefix={
                          <IoPersonOutline className="text-xl text-[#819DAF]" />
                        }
                      />
                    </Form.Item>
                  </div>
                </Col>
              )}

              {/* الدرجة - only on first row */}
              {idx === 0 && (
                <Col xs={24} md={12} lg={isRoundTrip ? 4 : 6}>
                  <div className="selectS1">
                    <Form.Item label="الدرجة" name="class">
                      <Select placeholder="الدرجة">
                        <Option value="economy">اقتصادية</Option>
                        <Option value="business">رجال الأعمال</Option>
                        <Option value="first">الدرجة الأولى</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              )}

              {/* Remove + Add City — shown on non-first rows in multi mode */}
              {tripType === "multi" && idx > 0 && (
                <Col xs={24} lg={5}>
                  <div className="flex items-center gap-3 mb-[24px]">
                    {/* Remove row button — only if more than 2 segments */}
                    {segments.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeSegment(seg.id)}
                        className="flex items-center gap-1 text-red-400 hover:text-primary transition-colors text-sm font-medium  mt-[55px]"
                      >
                        <IoCloseCircleOutline size={20} />
                        حذف
                      </button>
                    )}

                    {/* Add city — only on the last row */}
                    {isLastSegment(idx) && (
                      <button
                        type="button"
                        onClick={addSegment}
                        className="text-primary font-bold text-sm underline underline-offset-2 hover:opacity-75 transition-opacity mt-[55px]"
                      >
                        اضافة مدينة اخري
                      </button>
                    )}
                  </div>
                </Col>
              )}
            </Row>
          );
        })}

        {/* Bottom Row: Search button + Trip Type radios */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
          {/* Right: Trip type radios */}
          <div className="flex flex-wrap items-center gap-6">
            <Form.Item name="tripType" initialValue="one" className="!mb-0">
              <Radio.Group
                onChange={(e) => setTripType(e.target.value)}
                value={tripType}
                className="airplane-radio-group"
              >
                <Radio value="one">ذهاب فقط</Radio>
                <Radio value="round">ذهاب وعودة</Radio>
                <Radio value="multi">متعددة الواجهات</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Left: Search button */}
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center gap-2 px-8 min-h-[46px] min-w-[180px] rounded-xl"
          >
            <FaSearch />
            ابحث
          </Button>
        </div>
      </div>
    </Form>
  );
};
