import { MembershipBanner_section } from "./sections/MembershipBanner_section";
import { MembershipFeatures_section } from "./sections/MembershipFeatures_section";
import { MembershipReadytoJoin_section } from "./sections/MembershipReadytoJoin_section";
import style from "./styles/membership.module.scss";

export const MembershipComponent = () => {
  return (
    <main className={style.membership}>
      <MembershipBanner_section />
      <MembershipFeatures_section />
      <MembershipReadytoJoin_section />
    </main>
  );
};
