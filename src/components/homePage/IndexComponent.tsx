// components/home/IndexComponent.tsx
import { HeroSection } from "./sections/HeroSection";
import style from "./styles/homePage.module.scss";
import TestimonialSlider from "./sections/testimonialSliderSection";
import AllMainProducts from "./sections/AllMainProducts";
import { Suspense } from "react";
import Loader from "@/app/[locale]/admin/loader";
import { getLimitedProductsData } from "@/apiCalls/products/getAllProductsData";
import { getAllCategoriesData } from "@/apiCalls/categories/getAllCategoriesData";
import { getBannerOffersData } from "@/apiCalls/home/getBannerOffersData";
import StatsSection from "./sections/StatsSection";
import AboutSection from "./sections/AboutSection";
import Image from "next/image";
import { WhyWodiniSection } from "./sections/WhyWodiniSection";
import { PaymentMethodsSection } from "./sections/PaymentMethodsSection";
import { AllInOneAppSection } from "./sections/AllInOneAppSection";
import { HowToBookSection } from "./sections/HowToBookSection";

export const IndexComponent: React.FC = async () => {
  try {
    return (
      <main className={style.homePage}>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <WhyWodiniSection />

        <div className="container">
          <div className="flex items-center justify-center relative h-[550px] rounded-[40px] overflow-hidden">
            <Image
              src="/images/home-banner.png"
              fill
              objectFit="cover"
              alt=""
            />
          </div>
        </div>

        <PaymentMethodsSection />
        <AllInOneAppSection />
        <HowToBookSection />
      </main>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return (
      <main className={style.homePage}>
        <div className="container py-20 text-center">
          <p className="text-red-500">حدث خطأ في تحميل الصفحة</p>
        </div>
      </main>
    );
  }
};
