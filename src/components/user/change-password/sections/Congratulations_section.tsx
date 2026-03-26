import Image from "next/image";

export const Congratulations = () => {
  return (
    <div className="text-center py-10">
      <Image
        src={"/images/congratulations.svg"}
        width={456}
        height={456}
        alt="congratulations"
      />
      <h2 className="text-2xl font-bold mb-6"> تهانينا!</h2>
      <p className="text-[#B0B0B3] text-xl">تم تغيير كلمة المرور بنجاح</p>
    </div>
  );
};
