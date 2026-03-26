import style from "./styles/singlePricePlan.module.scss";
import { Col, Row } from "antd";
import { OrderPlanSummary_section } from "./sections/OrderPlanSummary_section";
import { SinglePricePlanDetails_section } from "./sections/SinglePricePlanDetails_section";
import { getSingleMembershipPricePlanData } from "@/apiCalls/membersip/getMembershipPricePlansData";
import { MembershipPlan } from "@/types/types";

interface SinglePricePlanProps {
  singlePricePlan: {
    tier: MembershipPlan;
  }; // Replace 'any' with the actual type of singlePricePlan if known
}

export const SinglePricePlanComponent: React.FC<SinglePricePlanProps> = ({
  singlePricePlan,
}) => {
  console.log("singlePricePlan", singlePricePlan);
  return (
    <main className={style.singlePricePlan}>
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col span={24} lg={16}>
            <SinglePricePlanDetails_section
              membership={singlePricePlan?.tier}
              details={{
                name: "",
                displayName: "",
                displayNameAr: "",
                price: 0,
                period: "",
                currency: "",
                discountRate: 0,
                pointsMultiplier: 0,
                duration: 0,
              }}
            />
          </Col>
          <Col span={24} lg={8}>
            <OrderPlanSummary_section details={singlePricePlan?.tier} />
          </Col>
        </Row>
      </div>
    </main>
  );
};
