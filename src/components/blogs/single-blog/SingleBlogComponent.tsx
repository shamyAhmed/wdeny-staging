"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { Col, Row } from "antd";
import { BlogCard } from "../cards/BlogCard";

export function SingleBlogComponent() {
  return (
    <section className="bg-[#F7F7F7] py-8">
      <div className="container">
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
          <Link
            href="/blog"
            className="underline font-bold text-[#333] hover:text-[#333]"
          >
            المدونة
          </Link>
          <span>-</span>
          <span className="text-[#89878F] font-medium">
            أفضل وجهات السفر داخل المملكة
          </span>
        </div>

        {/* Blog Card */}
        <div className="bg-white rounded-[40px] p-6 relative">
          {/* Meta */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6  text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <AiOutlineHeart className="text-lg" />
                <span>244 إعجاب</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BsCalendar2Date className="text-lg" />
                  20 مايو 2022
                </div>
                <span className="flex items-center gap-2">
                  <AiOutlineComment className="text-lg" />4 تعليقات
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#101828]">
              <BiLike className="text-xl text-[#0E898B]" />
              أعجبني
            </button>
          </div>

          {/* Main Image */}
          <div className="flex items-center gap-4 ">
            <div className="relative w-full h-[340px] rounded-2xl overflow-hidden mb-6">
              <Image
                src="/photos/blog-main.png"
                alt="blog image"
                fill
                className="object-cover"
              />
            </div>
            {/* Social Share */}
            <div className=" hidden md:flex flex-col items-center gap-4">
              <span>مشاركة </span>
              <FiShare2 className="text-[#000]" />

              <FaFacebookF className="text-blue-600 cursor-pointer" />
              <FaInstagram className="text-pink-600 cursor-pointer" />
              <FaTwitter className="text-sky-500 cursor-pointer" />
              <FaWhatsapp className="text-green-600 cursor-pointer" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            أفضل وجهات السفر داخل المملكة
          </h1>

          {/* Content */}
          <div className="text-gray-700 leading-8 space-y-6 text-sm md:text-base">
            <p>
              اكتشف أجمل المدن والمعالم البارزة في المملكة العربية السعودية،
              واستمتع بتجربة سفر فريدة تجمع بين الأصالة والحداثة.
            </p>

            <p>
              من جدة إلى الرياض، ومن أبها إلى العلا، ستجد خيارات متنوعة تناسب
              جميع الأذواق، سواء كنت تبحث عن الهدوء أو المغامرة.
            </p>

            <p>
              سهولة التنقل، تنوع الإقامة، وتجارب ثقافية غنية تجعل رحلتك داخل
              المملكة أكثر متعة.
            </p>
          </div>

          {/* Inner Image */}
          <div className="relative w-full h-[300px] rounded-2xl overflow-hidden my-8">
            <Image
              src="/photos/blog-main.png"
              alt="inner blog image"
              fill
              className="object-cover"
            />
          </div>

          {/* More Content */}
          <div className="text-gray-700 leading-8 space-y-6 text-sm md:text-base">
            <p>
              مع تطور البنية التحتية ووسائل النقل الحديثة، أصبح السفر داخل
              المملكة أكثر راحة وسلاسة.
            </p>

            <p>استمتع بتجارب لا تُنسى واجعل كل رحلة ذكرى جميلة.</p>
          </div>
        </div>
        <div className="bg-white rounded-[40px] p-8 mt-10">
          <h4 className="text-primary font-bold text-3xl mb-8 ">
            مقالات ذات صلة
          </h4>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <BlogCard
                title="أفضل وجهات السفر داخل المملكة"
                description="اكتشف أجمل المدن والأماكن اللي لازم تزورها في المملكة، من جدة المدينة المنورة، وجدس تجربة سفر متكاملة وممتعة"
                buttonText="تفاصيل أكثر"
                backgroundImage="/images/contact-us.png"
              />
            </Col>
            <Col xs={24} md={8}>
              <BlogCard
                title="أفضل وجهات السفر داخل المملكة"
                description="اكتشف أجمل المدن والأماكن اللي لازم تزورها في المملكة، من جدة المدينة المنورة، وجدس تجربة سفر متكاملة وممتعة"
                buttonText="تفاصيل أكثر"
                backgroundImage="/images/contact-us.png"
              />
            </Col>
            <Col xs={24} md={8}>
              <BlogCard
                title="أفضل وجهات السفر داخل المملكة"
                description="اكتشف أجمل المدن والأماكن اللي لازم تزورها في المملكة، من جدة المدينة المنورة، وجدس تجربة سفر متكاملة وممتعة"
                buttonText="تفاصيل أكثر"
                backgroundImage="/images/contact-us.png"
              />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
