import { RegisterComponent } from "@/components/user/signup/SignupComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اكمل بياناتك ",
};

const RegisterPage: React.FC = (): JSX.Element => {
  return <RegisterComponent />;
};

export default RegisterPage;
