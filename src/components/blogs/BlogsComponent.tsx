import React from "react";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import style from "./styles/blogs.module.scss";
import { Button, Col, Row } from "antd";
import { BlogCard } from "./cards/BlogCard";

export const BlogsComponent = () => {
  return (
    <main className={style.blogs}>
      <PageBannerSection
        title="المدونة"
        currentLink="/blogs"
        currentPage="المدونة"
      />
      <div className="bg-primary py-20">
        <div className="container">
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

          <div className="flex items-center justify-center mt-12 ">
            <Button
              type="primary"
              className="w-[180px] !bg-white !border-white !text-primary"
            >
              المزيد
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
