import { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Admin Page",
};

const Adminpage = () => {
  return (
    <div>
      ADMIN <br />
      <Link href="/admin/students">Students</Link>
    </div>
  );
};

export default Adminpage;
