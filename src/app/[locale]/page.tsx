import { IndexComponent } from "@/components/homePage/IndexComponent";
import { HeroSection } from "@/components/homePage/sections/HeroSection";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import style from "@/components/homePage/styles/homePage.module.scss";

export const metadata: Metadata = {
  title: "Wdeny Travel",
};

const HomePage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <main className={style.homePage}>
        <HeroSection />
        <IndexComponent />
      </main>
    </Suspense>
  );
};

export default HomePage;
