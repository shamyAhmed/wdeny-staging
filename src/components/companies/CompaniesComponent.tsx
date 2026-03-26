"use client";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const CompaniesComponent = () => {
  const companies = [
    { id: 1, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
    { id: 2, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
    { id: 3, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
    { id: 3, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
  ];
  const images = [
    "/photos/blue-bus.png",
    "/photos/blue-bus.png",
    "/photos/blue-bus.png",
  ];
  return (
    <section className="bg-[#F7F7F7] py-8">
      <div className="container ">
        {/* Breadcrumb */}
        <div className="bg-white rounded-[40px] p-4 mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link
            href="/"
            className="underline font-bold text-[#333] hover:text-[#333] flex items-center gap-2"
          >
            <FaHome className="text-lg" />
            الرئيسية
          </Link>
          <span>-</span>

          <span className="text-[#89878F] font-medium">الشركات </span>
        </div>

        <div className="bg-white rounded-[40px] p-8">
          <Row gutter={[24, 24]}>
            {companies?.map((company) => (
              <Col xs={24} md={8}>
                <div className="bg-[#F7F7F7] p-4 rounded-[20px]">
                  <div className="relative h-[290px] rounded-xl overflow-hidden">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation={{
                        nextEl: `.swiper-button-next-${company.id}`,
                        prevEl: `.swiper-button-prev-${company.id}`,
                      }}
                      pagination={{
                        clickable: true,
                        bulletClass:
                          "swiper-pagination-bullet !w-2 !h-2 !bg-white !opacity-50",
                        bulletActiveClass:
                          "swiper-pagination-bullet-active !w-6 !opacity-100 !rounded-md",
                      }}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      className="w-full h-full"
                    >
                      {images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative w-full h-full">
                            <Image
                              src={image}
                              alt={`Bus ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                      className={`swiper-button-prev-${company.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors`}
                    >
                      <FiChevronLeft className="text-gray-700 text-sm" />
                    </button>
                    <button
                      className={`swiper-button-next-${company.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors`}
                    >
                      <FiChevronRight className="text-gray-700 text-sm" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex gap-4">
                      <div className="relative w-[50px] h-[50px] flex-shrink-0">
                        <Image
                          src={company.companyLogo}
                          alt={company.company}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-[#4C4C4C]">
                          {company.company}
                        </h3>
                      </div>
                    </div>
                    <Link
                      href={`/companies/${company.id}`}
                      className="text-primary font-medium flex items-center gap-2"
                    >
                      تفاصيل اكتر <FiChevronLeft className="text-sm" />
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="flex justify-center mt-12">
            <Button type="primary" className="w-[180x]">
              عرض المزيد
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
