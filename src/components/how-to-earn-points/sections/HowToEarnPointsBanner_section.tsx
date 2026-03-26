import { BsDatabase } from "react-icons/bs";

export const HowToEarnPointsBanner_section = () => {
  return (
    <section className="how-earn-points-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#FFF0CD] text-[#B59819] px-4 py-2 rounded-[9999px]">
            <BsDatabase className="text-lg" /> طرق كسب النقاط
          </div>
          <h1 className="text-secondary text-6xl font-bold">
            كيفية كسب <span className="text-[#096748]">النقاط</span>
          </h1>
          <p className="text-secondary text-xl">
            اكتشف جميع الطرق التي يمكنك من خلالها كسب نقاط الولاء{" "}
          </p>
        </div>
      </div>
    </section>
  );
};
