import style from "./styles/aboutUs.module.scss";
import { AboutStarterSection } from "./sections/AboutStarterSection";
import { OurVisionSection } from "./sections/OurMissionSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { AboutFeaturesSection } from "./sections/AboutFeaturesSection";
import { PageBannerSection } from "../tools/sections/PageBannerSection";

export const AboutUsComponent: React.FC = async () => {
  return (
    <main className={style.aboutUs}>
      <PageBannerSection
        title="تعرف على وديني"
        currentLink="/about-us"
        currentPage="عن المنصة"
      />
      <AboutUsSection />
      <OurVisionSection />
      <AboutFeaturesSection />
    </main>
  );
};
