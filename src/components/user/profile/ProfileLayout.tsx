"use client";

import { PageBannerSection } from "@/components/tools/sections/PageBannerSection";
import { ProfileSidebar } from "./ProfileSidebar";
import { Col, Row } from "antd";

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPage: string;
  currentLink: string;
}

export const ProfileLayout = ({
  children,
  title,
  currentPage,
  currentLink,
}: ProfileLayoutProps) => {
  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-20">
      <PageBannerSection
        title={title}
        currentPage={currentPage}
        currentLink={currentLink}
      />

      <div className="container py-20 ">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8} xl={6}>
            <ProfileSidebar />
          </Col>
          <Col xs={24} lg={16} xl={18}>
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-[#F3F4F6] min-h-[600px]">
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};
