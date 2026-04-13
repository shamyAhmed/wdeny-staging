"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { BsAirplaneFill } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { PhoneInput } from "@/components/contact-us/PhoneInput";
import { PageBannerSection } from "@/components/tools/sections/PageBannerSection";
import { AirplaneForm } from "@/components/homePage/forms/AirplaneForm";
import { BookingHeader } from "./BookingHeader";
import { BookingStepSection } from "./BookingStepSection";
import { FlightSummaryCard } from "./FlightSummaryCard";
import { PassengerCard } from "./PassengerCard";
import { PriceSummary } from "./PriceSummary";
import { buildPassengerList, buildPassengerPayload, PassengerState, SubmitPassengersPayload } from "./types";
import style from "@/components/discover/styles/discover.module.scss";
import "../styles/airplane-discover.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { usePathname, useRouter } from "@/i18n/navigation";
import useAddPassenger from "@/app/[locale]/_hooks/useAddPassenger";

export const BookingComponent = () => {
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [membershipVisibility, setMembershipVisibility] = useState<Record<number, boolean>>({});
    const router = useRouter();

    const storedFlight = useSelector((state: RootState) => state.flight.flight);
    const confirmCode = useSelector((state: RootState) => state.flight.confirmCode);
    const isLogged = useSelector((state: RootState) => state.auth.isLogged);
    const pathname = usePathname();

    const { mutate: addPassenger, isPending: isSubmitting } = useAddPassenger(confirmCode ?? "");

    // Guard: redirect to login if not authenticated
    useEffect(() => {
        if (!isLogged) {
            const bookingUrl = `${pathname}?${searchParams.toString()}`;
            router.replace(`/auth/login?redirect=${encodeURIComponent(bookingUrl)}`);
        }
    }, [isLogged, pathname, searchParams, router]);

    // Guard: redirect to home if required booking context is missing
    useEffect(() => {
        if (isLogged && (!storedFlight || !confirmCode)) {
            router.replace("/");
        }
    }, [isLogged, storedFlight, confirmCode, router]);

    const adults   = Math.max(1, parseInt(searchParams.get("adt") || "1", 10));
    const children = Math.max(0, parseInt(searchParams.get("chd") || "0", 10));
    const infants  = Math.max(0, parseInt(searchParams.get("inf") || "0", 10));

    const [passengers, setPassengers] = useState<PassengerState[]>(() =>
        buildPassengerList(adults, children, infants)
    );

    const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const paramKey = `${adults}-${children}-${infants}`;
    useMemo(() => {
        setPassengers(buildPassengerList(adults, children, infants));
        setMembershipVisibility({});
        form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramKey]);

    const allSaved = passengers.every((p) => p.savedName !== null);

    // Only one passenger open at a time — toggle closes all others
    const togglePassenger = (id: number) =>
        setPassengers((prev) =>
            prev.map((p) => ({
                ...p,
                isExpanded: p.id === id ? !p.isExpanded : false,
            }))
        );

    const confirmPassenger = (id: number, name: string) => {
        setPassengers((prev) => {
            const idx = prev.findIndex((p) => p.id === id);
            const isLast = idx === prev.length - 1;

            if (!isLast) {
                const nextId = prev[idx + 1].id;
                setTimeout(() => {
                    const el = cardRefs.current[nextId];
                    if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 700;
                        window.scrollTo({ top, behavior: "smooth" });
                    }
                }, 100);
            }

            return prev.map((p, i) => {
                if (p.id === id) return { ...p, savedName: name, isExpanded: false };
                if (!isLast && i === idx + 1) return { ...p, isExpanded: true };
                return { ...p, isExpanded: false };
            });
        });
    };

    const editPassenger = (id: number) =>
        setPassengers((prev) =>
            prev.map((p) => (p.id === id ? { ...p, savedName: null, isExpanded: true } : { ...p, isExpanded: false }))
        );

    const handleSubmit = () => {
        if (!agreedToTerms || !allSaved) return;
        form.validateFields().then((values) => {
            const email: string = values.email ?? "";
            const phone: string = values.mobile ?? "";
            const payload: SubmitPassengersPayload = {
                passengers: passengers.map((p) =>
                    buildPassengerPayload(p.id, p.type, values, email, phone)
                ),
            };
            addPassenger(payload);
        });
    };

    return (
        <main className={style.discover}>
            <PageBannerSection
                title="احجز الان"
                currentLink="/discover-airplan"
                currentPage="احجز الان"
            />

            <div className="container py-14">
                <Row gutter={[24, 24]} className="mb-16">

                    {/* ── Right column ── */}
                    <Col xs={24} lg={17}>
                        <BookingHeader currentStep={2} totalPassengers={adults + children + infants} />

                        <BookingStepSection
                            count={1}
                            title="مراجعة الرحلة"
                            extra={<span className="text-white font-bold text-lg">14,878.16 EGP</span>}
                        >
                            <FlightSummaryCard />
                        </BookingStepSection>

                        <BookingStepSection
                            count={2}
                            title="تفاصيل الركاب"
                            extra={<p className="text-white">أدخل بيانات كما تظهر في جواز سفرك. استخدم اللغة الإنجليزية فقط</p>}
                        >
                            <Form form={form} layout="vertical" autoComplete="off" requiredMark={false}>
                                {/* ── Global contact info ── */}
                                <Row gutter={[16, 0]} className="mb-2">
                                    <Col xs={24} sm={12}>
                                        <div className="inputS1 with-border">
                                            <Form.Item
                                                label="البريد الإلكتروني"
                                                name="email"
                                                rules={[
                                                    { required: true, message: "الرجاء إدخال البريد الإلكتروني" },
                                                    { type: "email", message: "البريد الإلكتروني غير صحيح" },
                                                ]}
                                            >
                                                <Input placeholder="البريد الإلكتروني" />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                            <PhoneInput />
                                    </Col>
                                </Row>

                                <Divider className="!my-5" />

                                {passengers.map((p) => (
                                    <PassengerCard
                                        key={p.id}
                                        passenger={p}
                                        form={form}
                                        showMembership={!!membershipVisibility[p.id]}
                                        onToggle={() => togglePassenger(p.id)}
                                        onConfirm={(name) => confirmPassenger(p.id, name)}
                                        onEdit={() => editPassenger(p.id)}
                                        onToggleMembership={() =>
                                            setMembershipVisibility((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                                        }
                                        cardRef={(el) => { cardRefs.current[p.id] = el; }}
                                    />
                                ))}
                            </Form>
                        </BookingStepSection>

                        {/* Terms & Pay */}
                        <div className="bg-white rounded-[20px] px-6 py-5 border border-gray-100 shadow-sm">
                            {!allSaved && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-right">
                                    <p className="text-sm text-amber-700 flex items-center gap-2">
                                        <BsAirplaneFill size={13} className="shrink-0" />
                                        يرجى تأكيد بيانات جميع المسافرين قبل المتابعة للدفع
                                    </p>
                                </div>
                            )}
                            <div className="flex items-start gap-3 mb-5">
                                <Checkbox
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-[2px] shrink-0"
                                />
                                <p className="text-sm text-[#555] text-right leading-relaxed">
                                    لإستكمال هذا الحجز، أوافق على أنني قرأت وأوافق على القواعد والقيود.{" "}
                                    <Link href="/terms-and-conditions" className="text-primary font-bold hover:underline">
                                        شروط الاستخدام
                                    </Link>{" "}
                                    و{" "}
                                    <Link href="/privacy-policy" className="text-primary font-bold hover:underline">
                                        سياسة الخصوصية
                                    </Link>
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="primary"
                                    disabled={!agreedToTerms || !allSaved || isSubmitting}
                                    loading={isSubmitting}
                                    onClick={handleSubmit}
                                    className="!h-12 !px-14 !rounded-full !font-bold !text-base disabled:!opacity-50"
                                >
                                    ادفع الان
                                </Button>
                            </div>
                        </div>
                    </Col>

                    {/* ── Left sidebar ── */}
                    <Col xs={24} lg={7}>
                        <PriceSummary />
                    </Col>

                </Row>
            </div>
        </main>
    );
};
