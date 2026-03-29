import { useTranslations } from "next-intl";
import { IoMdNotificationsOutline } from "react-icons/io";

const NotificationButton = () => {
  const t = useTranslations();
  return (
    <div
      className="w-[42px] h-[42px] bg-[#F9F9F9] relative rounded-xl flex items-center justify-center"
      aria-label={t("header.notifications")}
      title={t("header.notifications")}>
      <div className="size-4 absolute -top-0 flex justify-center items-center text-sm end-0 rounded-full bg-primary text-white ">
        4
      </div>
      <IoMdNotificationsOutline
        size={30}
        className="text-[#333] block"
      />
    </div>
  );
};

export default NotificationButton;
