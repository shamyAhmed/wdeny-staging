import { AffiliateWithdrawalRequests_table } from "./tables/AffiliateWithdrawalRequests_table";

export const AffiliateWithdrawalRequestsComponent = () => {
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            طلبات السحب{" "}
          </h1>
          <p className="text-lg text-primary">إدارة برنامج الأفلييت </p>
        </div>
      </div>

      <AffiliateWithdrawalRequests_table />
      {/* <LoyaltyPoints_table /> */}
    </main>
  );
};
