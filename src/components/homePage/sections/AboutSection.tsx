"use client";
import { Row, Col, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const SLIDES = [
  {
    id: 1,
    // Replace with real image URLs
    src: "/images/login.png",
    alt: "highway with trains",
  },
  {
    id: 2,
    src: "/images/contact-us.png",
    alt: "bus interior",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=80",
    alt: "travel road",
  },
];

export default function AboutSection() {
  const router = useRouter();
  return (
    <section className="pt-16 pb-20 bg-[#FBFBFD]">
      <div className="container">
        <Row gutter={[48, 32]} align="middle">
          {/* ── Text Column ── */}
          <Col xs={24} md={12}>
            <div className="text-right space-y-5">
              <h2 className="text-4xl font-black text-primary">
                عن منصة وديني؟
              </h2>

              <p className="text-gray-500 text-base leading-8">
                وديني منصة وموقع يسهّل عليك تخطيط رحلاتك بكل سلاسة، من خلال حجز
                الإقامة بسهولة عبر منصتنا. قارن بين خيارات النقل، الأسعار،
                والتواريخ، واحجز رحلتك كاملة وأنت مرتاح من بيتك ✈️
              </p>

              <p className="text-gray-500 text-base leading-8">
                تتميّز وديني بتقديم مقارنة دقيقة، توصيات مخصصة حسب احتياجك،
                وواجهة استخدام سهلة تضمن لك تجربة حجز بدون تعقيد.
              </p>

              <Button type="primary" size="large" className="min-w-40">
                تواصل معنا
              </Button>
            </div>
          </Col>

          {/* ── Swiper Column ── */}
          <Col xs={24} md={12}>
            <div className="relative rounded-2xl overflow-hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                navigation={{
                  prevEl: ".swiper-prev",
                  nextEl: ".swiper-next",
                }}
                loop
                className="rounded-2xl gap-2"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 15,
                    slidesOffsetAfter: 15,
                  },
                  768: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 15,
                    slidesOffsetAfter: 15,
                  },
                  1024: {
                    slidesPerView: 1.5,
                    //   slidesOffsetBefore: 15,
                    //   slidesOffsetAfter: 15,
                  },
                }}
              >
                {SLIDES.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full object-cover rounded-2xl"
                      style={{ height: 420 }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="swiper-prev absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg transition-colors">
                <RightOutlined />
              </button>
              <button className="swiper-next absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg  transition-colors">
                <LeftOutlined />
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
