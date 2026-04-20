"use client";
import { Button, Col, DatePicker, Form, Radio, Row, Select, TimePicker } from "antd";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdOutlineLocationOn } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useWatch } from "antd/es/form/Form";
import { useRouter } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import useGetBusLocations from "@/app/[locale]/_hooks/useGetBusLocations";
import dayjs from "dayjs";

export const PrivetTripsForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("homePage.privateTripsForm");

  const { data: locations, isLoading: locationsLoading } = useGetBusLocations();

  const locationOptions = (locations ?? []).map((loc) => ({
    value: loc.id,
    label: loc.name_en,
    name_ar: loc.name_ar,
  }));

  const renderLocationOption = (option: { data: { label: string; name_ar: string } }) => (
    <div className="py-1">
      <p className="text-base leading-tight">{option.data.label}</p>
      <p className="text-xs text-gray-400 leading-tight">{option.data.name_ar}</p>
    </div>
  );

  const tripType      = useWatch("tripType",      form);
  const departure     = useWatch("departure",     form);
  const arrival       = useWatch("arrival",       form);
  const departureDate = useWatch("departureDate", form);
  const departureTime = useWatch("departureTime", form);
  const returnDate    = useWatch("returnDate",    form);
  const returnTime    = useWatch("returnTime",    form);

  const isRound = tripType === "round";

  const isFormValid =
    !!departure &&
    !!arrival &&
    !!departureDate &&
    !!departureTime &&
    (!isRound || (!!returnDate && !!returnTime));

  const toggleTripType = () => {
    if (tripType === "one") form.setFieldValue("tripType", "round");
  };

  const handleSearch = () => {
    const values = form.getFieldsValue();
    const query = new URLSearchParams();

    query.set("from_location_id", String(values.departure));
    query.set("to_location_id",   String(values.arrival));
    query.set("date",             dayjs(values.departureDate).format("YYYY-MM-DD"));
    query.set("time",             dayjs(values.departureTime).format("HH:mm"));
    query.set("trip_type",        isRound ? "round-trip" : "one-way");

    if (isRound && values.returnDate) {
      query.set("return_date", dayjs(values.returnDate).format("YYYY-MM-DD"));
    }
    if (isRound && values.returnTime) {
      query.set("return_time", dayjs(values.returnTime).format("HH:mm"));
    }

    router.push(`/discover-private?${query.toString()}`);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      autoComplete="off"
      name="privateTripsForm"
    >
      <Row gutter={[16, 16]} align="stretch">
        {/* محطة التحرك */}
        <Col xs={24} md={6} lg={5}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.departure.label")}
              name="departure"
              rules={[{ required: true, message: "" }]}>
              <Select
                showSearch
                loading={locationsLoading}
                options={locationOptions}
                notFoundContent={locationsLoading ? t("fields.loading") : t("fields.noOptions")}
                placeholder={t("fields.departure.placeholder")}
                filterOption={(input, option) =>
                  String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                optionRender={renderLocationOption}
                dropdownAlign={{ points: ["tc", "bc"], offset: [0, 4] }}
                listHeight={128}
                suffixIcon={<MdOutlineLocationOn className="text-2xl text-[#819DAF]" />}
                onSelect={() => {
                  const instance = form.getFieldInstance("arrival");
                  setTimeout(() => instance?.focus());
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* محطة الوصول */}
        <Col xs={24} md={6} lg={5}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.arrival.label")}
              name="arrival"
              rules={[{ required: true, message: "" }]}>
              <Select
                showSearch
                showAction={["focus"]}
                loading={locationsLoading}
                options={locationOptions}
                notFoundContent={locationsLoading ? t("fields.loading") : t("fields.noOptions")}
                placeholder={t("fields.arrival.placeholder")}
                filterOption={(input, option) =>
                  String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                optionRender={renderLocationOption}
                placement="bottomLeft"
                listHeight={128}
                suffixIcon={<MdOutlineLocationOn className="text-2xl text-[#819DAF]" />}
                onSelect={() => {
                  const instance = form.getFieldInstance("departureDate");
                  if (instance?.nativeElement) setTimeout(() => instance.nativeElement.click());
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ التحرك */}
        <Col xs={24} md={6} lg={4}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.departureDate.label")}
              name="departureDate"
              rules={[{ required: true, message: "" }]}>
              <DatePicker
                placeholder={t("fields.departureDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
                onChange={(val) => {
                  if (val) {
                    if (isRound) {
                      const ret = form.getFieldValue("returnDate");
                      if (ret && dayjs(ret).isBefore(dayjs(val), "day")) {
                        form.setFieldValue("returnDate", undefined);
                      }
                    }
                    const timeInstance = form.getFieldInstance("departureTime");
                    if (timeInstance?.nativeElement) setTimeout(() => timeInstance.nativeElement.click());
                    else if (timeInstance?.input) setTimeout(() => timeInstance.input.click());
                  }
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* وقت التحرك */}
        <Col xs={24} md={6} lg={3}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.departureTime.label")}
              name="departureTime"
              rules={[{ required: true, message: "" }]}>
              <TimePicker
                format="HH:mm"
                placeholder={t("fields.departureTime.placeholder")}
                onOk={() => {
                  if (isRound) {
                    const returnDateInstance = form.getFieldInstance("returnDate");
                    if (returnDateInstance?.nativeElement) setTimeout(() => returnDateInstance.nativeElement.click());
                    else if (returnDateInstance?.input) setTimeout(() => returnDateInstance.input.click());
                  } else {
                    setTimeout(() => (document.activeElement as HTMLElement)?.blur());
                  }
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ العودة */}
        <Col xs={24} md={12} lg={4}>
          <div onClick={toggleTripType} className={`inputS1 ${!isRound ? "disabled" : ""}`}>
            <Form.Item
              label={t("fields.returnDate.label")}
              name="returnDate"
              rules={[{ required: isRound, message: "" }]}>
              <DatePicker
                placeholder={t("fields.returnDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
                disabled={!isRound}
                disabledDate={(current) => {
                  const dep = form.getFieldValue("departureDate");
                  const min = dep ? dayjs(dep).startOf("day") : dayjs().startOf("day");
                  return current && current < min;
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* وقت العودة */}
        <Col xs={24} md={12} lg={3}>
          <div onClick={toggleTripType} className={`inputS1 ${!isRound ? "disabled" : ""}`}>
            <Form.Item
              label={t("fields.returnTime.label")}
              name="returnTime"
              rules={[{ required: isRound, message: "" }]}>
              <TimePicker
                format="HH:mm"
                placeholder={t("fields.returnTime.placeholder")}
                disabled={!isRound}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <div className="flex flex-col md:flex-row sm:items-center justify-between mt-4 gap-4">
        <Form.Item name="tripType" initialValue="one" className="!mb-0">
          <Radio.Group
            className="airplane-radio-group !flex flex-col items-start gap-2 sm:flex-row"
            onChange={(e) => {
              if (e.target.value === "one") {
                form.setFieldValue("returnTime", undefined);
                form.setFieldValue("returnDate", undefined);
              }
            }}>
            <Radio value="one">{t("tripTypes.one")}</Radio>
            <Radio value="round">{t("tripTypes.round")}</Radio>
          </Radio.Group>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={!isFormValid}
          className="flex items-center gap-2 px-8 min-h-[46px] min-w-[180px] rounded-xl">
          <FaSearch />
          {t("actions.search")}
        </Button>
      </div>
    </Form>
  );
};
