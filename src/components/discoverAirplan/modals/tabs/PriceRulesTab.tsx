"use client";
import { Divider } from "antd";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";

export const PriceRulesTab = ({ flight }: { flight: any }) => {
  const t = useTranslations("flightModal.priceRules");
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const baseAmount: number = flight?.baseAmount ?? 0;
  const taxesAmount: number = flight?.taxesAmount ?? 0;
  const totalAmount: number = flight?.price ?? 0;
  const refundability: string = flight?.refundability ?? "NotRefundable";

  const fmt = (val: number) =>
    <>{val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <CurrencyLabel currency={currency} /></>;

  const refundabilityLabel =
    refundability === "Refundable"
      ? "قابل للاسترجاع"
      : refundability === "PartiallyRefundable"
        ? "قابل للاسترجاع جزئيًا"
        : "غير قابل للاسترجاع";

  const refundabilityColor =
    refundability === "Refundable"
      ? "text-green-600"
      : refundability === "PartiallyRefundable"
        ? "text-yellow-600"
        : "text-red-500";

  const routes = (flight?.legs ?? []).map(
    (leg: any) => `${leg.departureCity} - ${leg.arrivalCity}`,
  );

  return (
    <div className="price-rules">
      <div className="price-rules-grid">
        {/* Price breakdown */}
        <section className="price-rules-breakdown">
          <h4 className="price-rules-heading">تقسيمة السعر</h4>
          <div className="breakdown-title">تقسيمة السعر</div>

          <div className="breakdown-row muted">
            <span>الأجرة الأساسية</span>
            <span>{fmt(baseAmount)}</span>
          </div>

          <div className="breakdown-row muted">
            <span>الضرائب والرسوم</span>
            <span>{fmt(taxesAmount)}</span>
          </div>

          <Divider className="breakdown-divider" />

          <div className="breakdown-row total-row">
            <span className="total-label">السعر الكلي</span>
            <span className="total-value">{fmt(totalAmount)}</span>
          </div>
        </section>

        {/* Cancellation rules */}
        <section className="price-rules-cancel">
          <h4 className="price-rules-heading">رسوم الالغاء</h4>
          <div className="cancel-card">
            <h5 className="cancel-card-title">حالة الاسترجاع</h5>

            {routes.map((route: any) => (
              <div key={route} className="cancel-row">
                <span className="cancel-route">{route}</span>
                <span className={`cancel-note font-medium ${refundabilityColor}`}>
                  {refundabilityLabel}
                </span>
              </div>
            ))}

            <Divider className="card-divider" />

            <div className="cancel-row center-row">
              <span className="cancel-note">رسوم تغيير التاريخ</span>
            </div>

            <Divider className="card-divider" />

            {routes.map((route: any) => (
              <div key={`change-${route}`} className="cancel-row">
                <span className="cancel-route">{route}</span>
                <span className="cancel-note">لا توجد معلومات متاحة</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="price-rules-disclaimer">
        <p className="disclaimer-text">
          تتوقف شركات الطيران عن قبول طلبات الإلغاء أو التغيير قبل 4 - 72 ساعة من مغادرة الرحلة
          حسب شركة الطيران. تعتبر رسوم شركة الطيران إرشادية بناءً على التفسير الآلي لقواعد أسعار
          تذاكر الطيران. {t("companyName")} لا يضمن دقة هذه المعلومات. قد تختلف رسوم التغيير أو الإلغاء
          أيضًا بناءً على التقلبات في أسعار تحويل العملات. لمعرفة رسوم الإلغاء أو التغيير بالضبط،
          يرجى الاتصال بنا على رقم خدمة العملاء لدينا.
        </p>
        <p className="disclaimer-note">ملاحظة: رسوم الغاء الحجز الغير الراجعة ستكون اضافية</p>
        <button className="details-link">للمزيد من التفاصيل ، انقر هنا</button>
      </div>
    </div>
  );
};
