import { Link } from "@/i18n/navigation";

export const MembershipBanner_section = () => {
  return (
    <section className="membership-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#ffffff33] text-white px-4 py-2 rounded-[9999px]">
            ✨ انضم لعائلة نادي الطائي
          </div>
          <h1 className="text-white text-5xl font-bold">عضوية نادي الطائي </h1>
          <p className="text-white/90 text-xl">
            كن جزءاً من عائلة الطائي واستمتع بمزايا حصرية وخصومات مميزة{" "}
          </p>
          <div className="flex gap-4 sm:flex-col mb-6 max-w-[500px]">
            <Link
              href="/membership/price-plans"
              className="flex flex-1 items-center gap-4 justify-center bg-[#22C55E] hover:bg-transparent border-[#22C55E] border-2 hover:text-white text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
            >
              اشترك الآن{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
