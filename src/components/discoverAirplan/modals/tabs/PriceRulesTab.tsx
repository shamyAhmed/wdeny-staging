"use client";
import { Divider } from "antd";

export const PriceRulesTab = ({ flight }: { flight: any }) => {
    return (
        <div className="price-rules">
            <div className="price-rules-grid">

                <section className="price-rules-breakdown">
                    <h4 className="price-rules-heading">تقسيمة السعر</h4>
                    <div className="breakdown-title">تقسيمة السعر</div>

                    <div className="breakdown-row muted">
                        <span>بالغ x 1</span>
                        <span>1147.85 ر.س</span>
                    </div>

                    <div className="breakdown-row muted">
                        <span>الضرائب والرسوم</span>
                        <span>1147.85 ر.س</span>
                    </div>

                    <Divider className="breakdown-divider" />

                    <div className="breakdown-row total-row">
                        <span className="total-label">السعر الكلي</span>
                        <span className="total-value">2285.85 ر.س</span>
                    </div>
                </section>
                <section className="price-rules-cancel">
                    <h4 className="price-rules-heading">رسوم الالغاء</h4>
                    <div className="cancel-card">
                        <h5 className="cancel-card-title">السعر الكلي</h5>

                        <div className="cancel-row">
                            <span className="cancel-route">CAI -HAS<br />HAS -CAI</span>
                            <span className="cancel-note">قابل للاسترجاع</span>
                        </div>

                        <Divider className="card-divider" />

                        <div className="cancel-row center-row">
                            <span className="cancel-note">رسوم تغيير التاريخ</span>
                        </div>

                        <Divider className="card-divider" />

                        <div className="cancel-row">
                            <span className="cancel-route">CAI -HAS<br />HAS -CAI</span>
                            <span className="cancel-note">لا توجد معلومات متاحة</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="price-rules-disclaimer">
                <p className="disclaimer-text">
                    تتوقف شركات الطيران عن قبول طلبات الإلغاء أو التغيير قبل 4 - 72 ساعة من مغادرة الرحلة حسب شركة الطيران. تعتبر رسوم شركة الطيران إرشادية بناءً على التفسير الآلي لقواعد أسعار تذاكر الطيران. Wonder Travel لا يضمن دقة هذه المعلومات. قد تختلف رسوم التغيير أو الإلغاء أيضًا بناءً على التقلبات في أسعار تحويل العملات. لمعرفة رسوم الإلغاء أو التغيير بالضبط، يرجى الاتصال بنا على رقم خدمة العملاء لدينا.
                </p>
                <p className="disclaimer-note">ملاحظة: رسوم الغاء الحجز الغير الراجعة ستكون اضافية</p>
                <button className="details-link">للمزيد من التفاصيل ، انقر هنا</button>
            </div>
        </div>
    );
};
