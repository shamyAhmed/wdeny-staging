"use client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Select,
} from "antd";
import { AirportSelectInput } from "./AirportSelectInput";
import { TripType } from "@/app/[locale]/_types/SearchFlight";
import { Airport } from "@/app/[locale]/_types/Airport";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { IoPersonOutline, IoCloseCircleOutline } from "react-icons/io5";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

const { Option } = Select;

type Segment = { id: number };

export const AirplaneForm = ({ readonly = false }: { readonly?: boolean }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const [passengers, setPassengers] = useState({
    adt: 1,
    chd: 0,
    inf: 0,
  });
  const locale = params?.locale || "ar";
  const t = useTranslations("homePage.airplaneForm");
  const [tripType, setTripType] = useState<TripType>("one_way");
  const [segments, setSegments] = useState<Segment[]>([{ id: 1 }, { id: 2 }]);
  const [selectedAirports, setSelectedAirports] = useState<Record<string, Airport>>({});

  const MAX_PASSENGERS = 9;

  const totalPassengers = Object.values(passengers).reduce(
    (sum, n) => sum + n,
    0,
  );

  const handlePassengersChange = (
    key: keyof typeof passengers,
    value: (typeof passengers)[typeof key],
  ) => {
    const newPassengers = {
      ...passengers,
      inf:
        key === "adt" && value < passengers.inf
          ? value
          : passengers.inf,
      [key]: value,
    };

    form.setFieldValue(
      "passengers",
      Object.values(newPassengers).reduce((curr, next) => curr + next, 0),
    );
    setPassengers(newPassengers);
  };
 
  useEffect(() => {
    if (pathname.includes("/discover-airplan")) {
      const type = searchParams.get("tripType") as TripType;
      if (type) {
        setTripType(type);
        const newSegments: Segment[] = [];
        const initialValues: any = { tripType: type };

        const restoredAirports: Record<string, Airport> = {};

        if (type === "multi_city") {
          let i = 0;
          while (searchParams.get(`from_${i}`)) {
            newSegments.push({ id: i + 1 });
            initialValues[`from_${i}`] = searchParams.get(`from_${i}`);
            initialValues[`to_${i}`] = searchParams.get(`to_${i}`);
            const dateStr = searchParams.get(`date_${i}`);
            if (dateStr) initialValues[`date_${i}`] = dayjs(dateStr);
            const fromRaw = searchParams.get(`from_${i}_airport`);
            const toRaw = searchParams.get(`to_${i}_airport`);
            if (fromRaw) restoredAirports[`from_${i}`] = JSON.parse(fromRaw);
            if (toRaw) restoredAirports[`to_${i}`] = JSON.parse(toRaw);
            i++;
          }
          setSegments(
            newSegments.length > 0 ? newSegments : [{ id: 1 }, { id: 2 }],
          );
        } else {
          initialValues["from_0"] = searchParams.get("from_0");
          initialValues["to_0"] = searchParams.get("to_0");
          const date0 = searchParams.get("date_0");
          if (date0) initialValues["date_0"] = dayjs(date0);

          if (type === "round_trip") {
            const returnDate = searchParams.get("returnDate_0");
            if (returnDate) initialValues["returnDate_0"] = dayjs(returnDate);
          }

          const fromRaw = searchParams.get("from_0_airport");
          const toRaw = searchParams.get("to_0_airport");
          if (fromRaw) restoredAirports["from_0"] = JSON.parse(fromRaw);
          if (toRaw) restoredAirports["to_0"] = JSON.parse(toRaw);
        }

        setSelectedAirports(restoredAirports);

        const restoredAdt = Number(searchParams.get("adt") ?? 1);
        const restoredChd = Number(searchParams.get("chd") ?? 0);
        const restoredInf = Number(searchParams.get("inf") ?? 0);
        setPassengers({ adt: restoredAdt, chd: restoredChd, inf: restoredInf });
        initialValues["passengers"] = restoredAdt + restoredChd + restoredInf;
        initialValues["class"] = searchParams.get("class") ?? "CABIN_CLASS_ECONOMY";

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

      if (tripType === "multi_city") {
        segments.forEach((_, idx) => {
          if (values[`from_${idx}`])
            query.set(`from_${idx}`, values[`from_${idx}`]);
          if (values[`to_${idx}`]) query.set(`to_${idx}`, values[`to_${idx}`]);
          if (values[`date_${idx}`])
            query.set(
              `date_${idx}`,
              dayjs(values[`date_${idx}`]).format("YYYY-MM-DD"),
            );
          const fromAirport = selectedAirports[`from_${idx}`];
          const toAirport = selectedAirports[`to_${idx}`];
          if (fromAirport) query.set(`from_${idx}_airport`, JSON.stringify(fromAirport));
          if (toAirport) query.set(`to_${idx}_airport`, JSON.stringify(toAirport));
        });
      } else {
        if (values["from_0"]) query.set("from_0", values["from_0"]);
        if (values["to_0"]) query.set("to_0", values["to_0"]);
        if (values["date_0"])
          query.set("date_0", dayjs(values["date_0"]).format("YYYY-MM-DD"));
        if (tripType === "round_trip" && values["returnDate_0"])
          query.set("returnDate_0", dayjs(values["returnDate_0"]).format("YYYY-MM-DD"));
        const fromAirport = selectedAirports["from_0"];
        const toAirport = selectedAirports["to_0"];
        if (fromAirport) query.set("from_0_airport", JSON.stringify(fromAirport));
        if (toAirport) query.set("to_0_airport", JSON.stringify(toAirport));
      }

      query.set("adt", String(passengers.adt));
      query.set("chd", String(passengers.chd));
      query.set("inf", String(passengers.inf));
      if (values["class"]) query.set("class", values["class"]);

      router.push(`/${locale}/discover-airplan?${query.toString()}`);
    });
  };

  // Rows to show: one / round = 1 row, multi = all segments
  const visibleSegments = tripType === "multi_city" ? segments : [segments[0]];
  const isLastSegment = (idx: number) => idx === visibleSegments.length - 1;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      autoComplete="off"
      className="airplane-form">
      <div>
        {/* Segment Rows */}
        {visibleSegments.map((seg, idx) => {
          const isSingleTrip = tripType === "one_way";
          return (
            <Row
              key={seg.id}
              gutter={[12, 12]}
              className="mb-2">
              <Col
                xs={24}
                md={12}
                lg={4}>
                <AirportSelectInput
                  name={`from_${idx}`}
                  label={t("fields.from.label")}
                  placeholder={t("fields.from.placeholder")}
                  form={form}
                  initialAirport={selectedAirports[`from_${idx}`]}
                  onAirportSelect={(airport) =>
                    setSelectedAirports((prev) => ({
                      ...prev,
                      [`from_${idx}`]: airport as Airport,
                    }))
                  }
                  readonly={readonly}
                />
              </Col>

              <Col
                xs={24}
                md={12}
                lg={4}>
                <AirportSelectInput
                  name={`to_${idx}`}
                  label={t("fields.to.label")}
                  placeholder={t("fields.to.placeholder")}
                  iconRotation="rotate(-135deg)"
                  form={form}
                  initialAirport={selectedAirports[`to_${idx}`]}
                  onAirportSelect={(airport) =>
                    setSelectedAirports((prev) => ({
                      ...prev,
                      [`to_${idx}`]: airport as Airport,
                    }))
                  }
                  readonly={readonly}
                />
              </Col>

              {/* تاريخ السفر */}
              <Col
                xs={24}
                md={12}
                lg={4}>
                <div className="inputS1">
                  <Form.Item
                    label={t("fields.departureDate.label")}
                    name={`date_${idx}`}>
                    <DatePicker
                      className="w-full"
                      placeholder={t("fields.departureDate.placeholder")}
                      suffixIcon={<DatePickerIcon />}
                      disabled={readonly}
                      inputReadOnly={readonly}
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* تاريخ العودة - only for Round Trip */}
              {tripType !== "multi_city" && <Col
                xs={24}
                md={12}
                lg={4}>
                <div
                  className={`inputS1 ${isSingleTrip ? "disabled" : ""}`}
                  onClick={() => {
                    if (!readonly && tripType === "one_way") {
                      form.setFieldValue("tripType", "round_trip");
                      setTripType("round_trip");
                    }
                  }}>
                  <Form.Item
                    label={t("fields.returnDate.label")}
                    name={`returnDate_${idx}`}>
                    <DatePicker
                      className="w-full"
                      placeholder={t("fields.returnDate.placeholder")}
                      suffixIcon={<DatePickerIcon />}
                      disabled={readonly}
                      inputReadOnly={readonly}
                    />
                  </Form.Item>
                </div>
              </Col>}

              {/* عدد المسافرين - only on first row */}
              {idx === 0 && (
                <Col
                  xs={24}
                  md={12}
                  lg={4}>
                  <Popover
                    trigger={readonly ? [] : "click"}
                    placement="bottom"
                    content={
                      <div className="w-64 flex flex-col gap-1 py-1">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-400">
                            {t("fields.passengers.label")}
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            {totalPassengers} / {MAX_PASSENGERS}
                          </span>
                        </div>
                        {(
                          [
                            { key: "adt", subtitle: t("passengersSubtitles.adt") },
                            { key: "chd", subtitle: t("passengersSubtitles.chd") },
                            { key: "inf", subtitle: t("passengersSubtitles.inf") },
                          ] as { key: keyof typeof passengers; subtitle: string }[]
                        ).map(({ key, subtitle }) => {
                          const current = passengers[key];
                          const atMax = totalPassengers >= MAX_PASSENGERS;
                          const atInfantMax = key === "inf" && current === passengers["adt"];
                          const atAdultMin = key === "adt" && current === 1;
                          return (
                            <div
                              key={key}
                              className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-100">
                              <div>
                                <p className="font-semibold text-sm text-gray-800">
                                  {t(key)}
                                </p>
                                <p className="text-xs text-gray-400">{subtitle}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  disabled={current === 0 || atAdultMin}
                                  onClick={() =>
                                    handlePassengersChange(key, current - 1)
                                  }
                                  className="disabled:opacity-40 disabled:cursor-not-allowed size-8 border border-primary text-primary rounded-full flex justify-center items-center text-lg font-light hover:bg-primary hover:text-white transition-colors">
                                  −
                                </button>
                                <span className="w-4 text-center font-semibold text-sm">
                                  {current}
                                </span>
                                <button
                                  type="button"
                                  disabled={atMax || atInfantMax}
                                  onClick={() =>
                                    handlePassengersChange(key, current + 1)
                                  }
                                  className="disabled:opacity-40 disabled:cursor-not-allowed size-8 border border-primary text-primary rounded-full flex justify-center items-center text-lg font-light hover:bg-primary hover:text-white transition-colors">
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {totalPassengers >= MAX_PASSENGERS && (
                          <p className="text-xs text-amber-500 mt-2 text-center">
                            {t("fields.passengers.maxReached")}
                          </p>
                        )}
                      </div>
                    }>
                    <div className="inputS1">
                      <Form.Item
                        label={t("fields.passengers.label")}
                        name="passengers">
                        <Input
                          placeholder={t("fields.passengers.placeholder")}
                          prefix={
                            <IoPersonOutline className="text-xl text-[#819DAF]" />
                          }
                          readOnly
                        />
                      </Form.Item>
                    </div>
                  </Popover>
                </Col>
              )}

              {/* الدرجة - only on first row */}
              {idx === 0 && (
                <Col
                  xs={24}
                  md={12}
                  lg={4}>
                  <div className="selectS1">
                    <Form.Item
                      label={t("fields.class.label")}
                      name="class">
                      <Select
                        placeholder={t("fields.class.placeholder")}
                        allowClear
                        disabled={readonly}>
                        <Option value="CABIN_CLASS_ECONOMY">
                          {t("classOptions.economy")}
                        </Option>
                        <Option value="CABIN_CLASS_PREMIUM_ECONOMY">
                          {t("classOptions.premiumEconomy")}
                        </Option>
                        <Option value="CABIN_CLASS_BUSINESS">
                          {t("classOptions.business")}
                        </Option>
                        <Option value="CABIN_CLASS_FIRST">
                          {t("classOptions.first")}
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              )}

              {/* Remove + Add City — shown on non-first rows in multi mode */}
              {!readonly && tripType === "multi_city" && idx > 0 && (
                <Col
                  xs={24}
                  lg={5}>
                  <div className="flex items-center gap-3 mb-[24px]">
                    {/* Remove row button — only if more than 2 segments */}
                    {segments.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeSegment(seg.id)}
                        className="flex items-center gap-1 text-red-400 hover:text-primary transition-colors text-sm font-medium  mt-[55px]">
                        <IoCloseCircleOutline size={20} />
                        {t("actions.remove")}
                      </button>
                    )}

                    {/* Add city — only on the last row */}
                    {isLastSegment(idx) && (
                      <button
                        type="button"
                        onClick={addSegment}
                        className="text-primary font-bold text-sm underline underline-offset-2 hover:opacity-75 transition-opacity mt-[55px]">
                        {t("actions.addCity")}
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
            <Form.Item
              name="tripType"
              initialValue="one_way"
              className="!mb-0">
              <Radio.Group
                onChange={(e) => setTripType(e.target.value)}
                value={tripType}
                disabled={readonly}
                className="airplane-radio-group">
                <Radio value="one_way">{t("tripTypes.one")}</Radio>
                <Radio value="round_trip">{t("tripTypes.round")}</Radio>
                <Radio value="multi_city">{t("tripTypes.multi")}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Left: Search button */}
          {!readonly && (
            <Button
              type="primary"
              htmlType="submit"
              className="flex items-center gap-2 px-8 min-h-[46px] min-w-[180px] rounded-xl">
              <FaSearch />
              {t("actions.search")}
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};
