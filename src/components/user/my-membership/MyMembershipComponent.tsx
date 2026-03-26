import { Col, Row } from "antd";
import style from "./styles/myMemberShip.module.scss";
import { MembershipType_section } from "./sections/MembershipType_section";
import { AllMembershipDetails_section } from "./sections/AllMembershipDetails_section";
import { FastActions_section } from "./sections/FastActions_section";

export const MyMembershipComponent = () => {
  return (
    <main className={style.myMemberShip}>
      <div className="container my-24">
        <h1 className="font-bold text-3xl text-[#111113] mb-4">عضويتي</h1>
        <p className="text-[#B0B0B3] mb-8">إدارة عضويتك ومتابعة مزاياك</p>

        {/* <MembershipType_section /> */}
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            <AllMembershipDetails_section />
          </Col>
          <Col xs={24} lg={8}>
            <FastActions_section />
          </Col>
        </Row>
      </div>
    </main>
  );
};
