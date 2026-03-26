"use client";
import { Col, Row } from "antd";

export const AboutFeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h1 className="text-primary font-bold text-4xl mb-2">
          سافر بسهولة… كل شيء في تطبيق واحد
        </h1>
        <p className="mb-16">
          مع تطبيق وديني ، خطط رحلتك، احجزها، ووفر وقتك وجهدك بكل سهولة{" "}
        </p>
        <div className="all-features py-20 px-8">
          <Row
            align="middle"
            justify="center"
            gutter={[0, 20]}
            className="mb-24"
          >
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  حجز مباشر وسهل{" "}
                </h3>

                <p className=" w-[90%]">
                  احجز القطار، الباص، أو السيارة الخاصة بثواني ومن مكانك
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  دفع آمن وسريع{" "}
                </h3>

                <p className=" w-[90%]">
                  ادفع بكل سهولة عن طريق مدي، تابي، أو بطاقتك البنكية{" "}
                </p>
              </div>
            </Col>
          </Row>
          <Row
            align="middle"
            justify="center"
            gutter={[0, 20]}
            className="mb-24"
          >
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4  rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  قارن الأسعار بسهولة{" "}
                </h3>

                <p className=" w-[90%]">
                  شوف كل الخيارات المتاحة واختر الأنسب حسب ميزانيتك{" "}
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4 ms-auto rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  تنبيهات وتحديثات لحظية{" "}
                </h3>

                <p className=" w-[90%]">
                  استقبل إشعارات عن الرحلات والعروض الجديدة لحظة بلحظة{" "}
                </p>
              </div>
            </Col>
          </Row>

          <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
            <h3 className="font-bold text-2xl mb-4 text-white">
              تتبع رحلاتك ومواعيدك{" "}
            </h3>

            <p className=" w-[90%]">
              تابع مواعيد الرحلات بدقة وتأكد إنك دائمًا في الوقت الصح{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
