"use client";

import { useRef } from "react";
import { Button } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { BlogCard } from "@/components/blogs/cards/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { HomeSection } from "../HomeSection";
import "swiper/css";
import { Link } from "@/i18n/navigation";

interface HomeBlog {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const HomeBlogsSection = () => {
  const t = useTranslations("homePage.blogsShowcase");
  const swiperRef = useRef<SwiperType | null>(null);

  const blogs: HomeBlog[] = [
    {
      id: 1,
      title: t("cards.1.title"),
      description: t("cards.1.description"),
      image: "/images/domy-artical2.png",
    },
    {
      id: 2,
      title: t("cards.2.title"),
      description: t("cards.2.description"),
      image: "/images/domy-artical3.png",
    },
    {
      id: 3,
      title: t("cards.3.title"),
      description: t("cards.3.description"),
      image: "/images/domy-artical4.png",
    },
  ];

  return (
    <HomeSection
      title={t("title")}
      description={t("description")}
      className="py-16 bg-primary"
      descriptionClassName="max-w-3xl"
      light>
      <div className="container">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="home-blogs-swiper">
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard
                title={blog.title}
                description={blog.description}
                buttonText={t("cardButton")}
                backgroundImage={blog.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700"
            aria-label="Previous">
            <FiChevronLeft className="text-xl rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white"
            aria-label="Next">
            <FiChevronRight className="text-xl rtl:rotate-180" />
          </button>
        </div>

        <div className="flex items-center justify-center mt-10">
          <Link href="blogs">
            <Button
              type="primary"
              className="!bg-white !border-white !text-primary !font-bold !h-12 !px-10 !rounded-xl">
              {t("more")}
            </Button>
          </Link>
        </div>
      </div>
    </HomeSection>
  );
};
