"use client";

import React from "react";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import style from "./styles/blogs.module.scss";
import { Button, Col, Row } from "antd";
import { BlogCard } from "./cards/BlogCard";
import { BlogCardSkeleton } from "./cards/BlogCardSkeleton";
import useGetBlogs from "@/app/[locale]/_hooks/useGetBlogs";

export const BlogsComponent = () => {
  const { data: blogs = [], isLoading } = useGetBlogs();

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
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Col key={i} xs={24} md={8}>
                    <BlogCardSkeleton />
                  </Col>
                ))
              : blogs.map((blog) => (
                  <Col key={blog.id} xs={24} md={8}>
                    <BlogCard
                      id={blog.id}
                      title={blog.title}
                      description={blog.seo_description ?? undefined}
                      buttonText="تفاصيل أكثر"
                      backgroundImage={blog.image.url}
                    />
                  </Col>
                ))}
          </Row>

          <div className="flex items-center justify-center mt-12">
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
