import { MembershipPlan } from "@/types/types";
import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { FaCheck, FaRegStar } from "react-icons/fa6";
import { FiPercent } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";

interface PricePlansSectionProps {
  membershipPlans: MembershipPlan[];
}

export const PricePlans_section = ({
  membershipPlans,
}: PricePlansSectionProps) => {
  return (
    <section className="price-plans my-24">
      <div className="container">
        <Row gutter={[32, 32]}>
          {membershipPlans?.map((plan) => (
            <Col xs={24} lg={8} key={plan._id}>
              <div
                className={`plan ${plan.name}-plan ${
                  plan.isPopular ? "popular" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="most-popular">⭐ الأكثر شعبية</div>
                )}
                {/* TOP */}
                <div className="top">
                  <div className="icon">
                    {plan.name === "gold" ? (
                      <LuCrown />
                    ) : plan.name === "silver" ? (
                      <FaRegStar />
                    ) : (
                      <IoDiamondOutline />
                    )}
                  </div>

                  <h3 className="font-bold text-2xl text-white mt-4 mb-2">
                    {plan.displayNameAr}
                  </h3>

                  <p className="text-white text-md mb-4">{plan.displayName}</p>

                  <div className="flex items-center gap-2 text-white">
                    <span className="font-bold text-6xl">{plan.price}</span>
                    <span>
                      {plan.currency} <br />
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* BODY */}
                <div className="body">
                  <div className="flex items-center gap-3 border-b border-[#F3F4F6] pb-6 mb-6">
                    <div className="flex flex-col flex-1 items-center">
                      <span className="text-primary font-bold text-2xl flex items-center">
                        <FiPercent className="text-xl" />
                        {plan.discountRate}
                      </span>
                      <span className="text-[#B0B0B3]">خصم دائم</span>
                    </div>

                    <div className="flex flex-col flex-1 items-center">
                      <span className="text-[#4BA246] text-2xl">
                        {plan.pointsMultiplier}x
                      </span>
                      <span className="text-[#B0B0B3]">مضاعف النقاط</span>
                    </div>
                  </div>

                  {/* FEATURES */}
                  {/* <ul className="flex flex-col gap-3 mb-6">
                    {plan.benefits.map((feature, index) => (
                      <li
                        key={index}
                        className="text-[#B0B0B3] text-lg flex items-center gap-3"
                      >
                        <FaCheck className="text-[#4BA246]" />
                        {feature}
                      </li>
                    ))}
                  </ul> */}

                  <Link
                    href={`/membership/price-plans/${plan._id}`}
                    className={`block text-center mt-8 w-full bg-primary  text-white py-4 rounded-xl text-lg font-semibold border border-primary hover:!bg-white hover:text-primary transition ${plan.name === "gold" && "!bg-[#4BA246] !border-[#4BA246] hover:!text-[#4BA246]"}`}
                  >
                    اختيار العضوية{" "}
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};
