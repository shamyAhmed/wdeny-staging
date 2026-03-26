import React from "react";
import style from "./styles/affiliateProgram.module.scss";
import { AffiliateProgramBanner_section } from "./sections/AffiliateProgramBanner_section";
import { HowAffiliateProgramWorks_section } from "./sections/HowAffiliateProgramWorks_section";
import { StartYourJourny_section } from "./sections/StartYourJourny_section";
import { AffiliateProgramFeatures_section } from "./sections/AffiliateProgramFeatures_section";

export const AffiliateProgramComponent = () => {
  return (
    <main className={style.affiliateProgram}>
      <AffiliateProgramBanner_section />
      <HowAffiliateProgramWorks_section />
      <AffiliateProgramFeatures_section />
      <StartYourJourny_section />
    </main>
  );
};
