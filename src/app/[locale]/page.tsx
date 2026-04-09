import { IndexComponent } from "@/components/homePage/IndexComponent";
import { HeroSection } from "@/components/homePage/sections/HeroSection";
import { Metadata } from "next";
import style from "@/components/homePage/styles/homePage.module.scss";

export const metadata: Metadata = {
  title: "Wdeny Travel",
};

const HomePage: React.FC = (): JSX.Element => {
  return (
    <main className={style.homePage}>
      <HeroSection />
      <IndexComponent />
    </main>
  );
};

export default HomePage;
