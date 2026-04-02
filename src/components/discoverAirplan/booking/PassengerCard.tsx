"use client";
import { Ref } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { FaChevronDown, FaMinus, FaUserCheck } from "react-icons/fa6";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { PassengerState } from "./types";
import { LOCATION_OPTIONS, TITLE_OPTIONS } from "./options";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

// ─── Per-passenger form fields ────────────────────────────────────────────────

const PassengerFields = ({
    id,
    disabled,
    showMembership,
    onToggleMembership,
}: {
    id: number;
    disabled: boolean;
    showMembership: boolean;
    onToggleMembership: () => void;
}) => {
    const prefix = `p_${id}`;
    const [form] = useForm();

    useEffect(() => {
        form.setFieldValue(`${prefix}_airlineName`, "Saudi airlines")
        form.setFieldValue(`${prefix}_airlineCode`, "xy")

    }, []);

    return (
        <div className={`pt-5 pb-1 ${disabled ? "opacity-60 pointer-events-none select-none" : ""}`}>
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={8} md={4}>
                    <div className="selectS1">
                        <Form.Item label="اللقب" name={`${prefix}_title`} rules={[{ required: true, message: "مطلوب" }]}>
                            <Select placeholder="اللقب" disabled={disabled}>
                                {TITLE_OPTIONS.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={8} md={10}>
                    <div className="inputS1">
                        <Form.Item
                            label="الاسم الأول"
                            name={`${prefix}_firstName`}
                            rules={[
                                { required: true, message: "الرجاء إدخال الاسم الأول" },
                                { pattern: /^[a-zA-Z\s]+$/, message: "الإنجليزية فقط" },
                            ]}
                        >
                            <Input placeholder="الاسم الأول" disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={8} md={10}>
                    <div className="inputS1">
                        <Form.Item
                            label="الاسم الأخير"
                            name={`${prefix}_lastName`}
                            rules={[
                                { required: true, message: "الرجاء إدخال الاسم الأخير" },
                                { pattern: /^[a-zA-Z\s]+$/, message: "الإنجليزية فقط" },
                            ]}
                        >
                            <Input placeholder="الاسم الأخير" disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="inputS1">
                        <Form.Item
                            label="تاريخ الميلاد"
                            name={`${prefix}_dob`}
                            rules={[{ required: true, message: "الرجاء اختيار تاريخ الميلاد" }]}
                        >
                            <DatePicker
                                className="w-full"
                                placeholder="تاريخ الميلاد"
                                format="DD/MM/YYYY"
                                disabled={disabled}
                                disabledDate={(d) => d && d.isAfter(new Date())}
                            />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="selectS1">
                        <Form.Item
                            label="الجنسية"
                            name={`${prefix}_nationality`}
                            rules={[{ required: true, message: "الرجاء اختيار الجنسية" }]}
                        >
                            <Select placeholder="الجنسية" showSearch optionFilterProp="label" disabled={disabled}>
                                {LOCATION_OPTIONS.map((o) => <Option key={o.value} value={o.value} label={o.label}>{o.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="selectS1">
                        <Form.Item
                            label="بلد الإقامة"
                            name={`${prefix}_residenceCountry`}
                            rules={[{ required: true, message: "الرجاء اختيار بلد الإقامة" }]}
                        >
                            <Select placeholder="بلد الإقامة" showSearch optionFilterProp="label" disabled={disabled}>
                                {LOCATION_OPTIONS.map((o) => <Option key={o.value} value={o.value} label={o.label}>{o.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="inputS1">
                        <Form.Item
                            label="رقم جواز السفر"
                            name={`${prefix}_passportNumber`}
                            rules={[{ required: true, message: "الرجاء إدخال رقم جواز السفر" }]}
                        >
                            <Input placeholder="رقم جواز السفر" disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="selectS1">
                        <Form.Item
                            label="بلد اصدار جواز السفر"
                            name={`${prefix}_passportCountry`}
                            initialValue="EG"
                            rules={[{ required: true, message: "الرجاء اختيار بلد الإصدار" }]}
                        >
                            <Select placeholder="بلد الإصدار" showSearch optionFilterProp="label" disabled={disabled}>
                                {LOCATION_OPTIONS.map((o) => <Option key={o.value} value={o.value} label={o.label}>{o.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="inputS1">
                        <Form.Item
                            label="تاريخ انتهاء صلاحية جواز السفر"
                            name={`${prefix}_passportExpiry`}
                            rules={[{ required: true, message: "الرجاء اختيار تاريخ الانتهاء" }]}
                        >
                            <DatePicker
                                className="w-full"
                                placeholder="تاريخ الانتهاء"
                                format="DD/MM/YYYY"
                                disabled={disabled}
                                disabledDate={(d) => d && d.isBefore(new Date())}
                            />
                        </Form.Item>
                    </div>
                </Col>
            </Row>

            {!disabled && (
                <div className="mt-4 rounded-xl overflow-hidden">
                    <button
                        type="button"
                        onClick={onToggleMembership}
                        className="w-full flex items-center gap-2 px-4 py-3 transition-colors text-right"
                    >
                        <span className="text-primary font-bold text-sm">
                            {showMembership ? <FaMinus className="inline me-1" /> : <FiPlus size={14} className="inline me-1" />}
                            اضافة رقم عضوية الطيران (اختياري)
                        </span>
                    </button>

                    <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ maxHeight: showMembership ? "200px" : "0px" }}
                    >
                        <div className="px-4 py-4 bg-[#f0f7ff]">
                            <Row gutter={[12, 0]}>
                                <Col xs={24} sm={8}>
                                    <div className="inputS1">
                                        <Form.Item label="شركة الطيران" initialValue={"Saudi Airline"} name={`${prefix}_airlineName`}>
                                            <Input readOnly value={"Saudi Airline"} className="!bg-white !cursor-default" />
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div className="inputS1">
                                        <Form.Item label="الرمز" name={`${prefix}_airlineCode`} initialValue={"XY"}>
                                            <Input readOnly className="!bg-white !cursor-default" />
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div className="inputS1">
                                        <Form.Item label="رقم عضوية المسافر الدائم" name={`${prefix}_membershipNumber`}>
                                            <Input placeholder="رقم عضوية المسافر الدائم" />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Passenger accordion card ─────────────────────────────────────────────────

export const PassengerCard = ({
    passenger,
    form,
    showMembership,
    onToggle,
    onConfirm,
    onEdit,
    onToggleMembership,
    cardRef,
}: {
    passenger: PassengerState;
    form: ReturnType<typeof Form.useForm>[0];
    showMembership: boolean;
    onToggle: () => void;
    onConfirm: (name: string) => void;
    onEdit: () => void;
    onToggleMembership: () => void;
    cardRef?: Ref<HTMLDivElement>;
}) => {
    const t = useTranslations("bookingPage.passengerTypes");
    const { id, displayNum, type, isExpanded, savedName } = passenger;
    const isSaved = savedName !== null;

    const requiredFields = [
        `p_${id}_title`, `p_${id}_firstName`, `p_${id}_lastName`,
        `p_${id}_dob`, `p_${id}_nationality`, `p_${id}_residenceCountry`,
        `p_${id}_passportNumber`, `p_${id}_passportCountry`, `p_${id}_passportExpiry`,
    ];

    const handleConfirm = () => {
        form.validateFields(requiredFields).then(() => {
            const first = (form.getFieldValue(`p_${id}_firstName`) as string) || "";
            const last = (form.getFieldValue(`p_${id}_lastName`) as string) || "";
            onConfirm(`${first} ${last}`.trim() || `مسافر ${displayNum}`);
        });
    };

    return (
        <div
            ref={cardRef}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 mb-4
            ${isSaved ? "border-green-200" : "border-primary/30"}`}
        >

            {/* Header */}
            <button
                type="button"
                onClick={onToggle}
                className={`w-full flex items-center gap-3 px-5 py-4 text-right transition-colors
                    ${isExpanded
                        ? "bg-primary/5 border-b border-primary/15"
                        : isSaved ? "bg-[#F6FFF6] hover:bg-[#eefaee]" : "bg-[#F5F5F7] hover:bg-gray-100"
                    }`}
            >
                <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm
                    ${isSaved ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
                    {isSaved ? <FaUserCheck size={15} /> : displayNum}
                </div>

                <div className="flex-1 text-right min-w-0">
                    <p className="font-bold text-[#333] text-sm leading-tight">
                        المسافر {displayNum}
                        <span className="font-normal text-gray-400 ms-2">({t(type)})</span>
                    </p>
                    {isSaved && !isExpanded && (
                        <p className="text-xs text-green-600 mt-0.5 font-medium truncate">{savedName}</p>
                    )}
                    {!isSaved && !isExpanded && (
                        <p className="text-xs text-gray-400 mt-0.5">لم يتم إدخال البيانات بعد</p>
                    )}
                </div>

                <FaChevronDown
                    size={13}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
            </button>

            {/* Body */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isExpanded ? "1200px" : "0px" }}
            >
                <div className="px-5 pb-5">
                    <PassengerFields
                        id={id}
                        disabled={isSaved}
                        showMembership={showMembership}
                        onToggleMembership={onToggleMembership}
                    />
                    <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                        {isSaved ? (
                            <Button
                                onClick={onEdit}
                                className="!h-10 !px-10 !rounded-full !font-bold !border-primary !text-primary hover:!bg-primary hover:!text-white"
                            >
                                تعديل البيانات
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={handleConfirm}
                                className="!h-10 !px-10 !rounded-full !font-bold"
                            >
                                تأكيد بيانات المسافر
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
