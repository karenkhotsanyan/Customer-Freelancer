import type { Metadata } from "next";
import { ResetPassword } from "../../components/ResetPassword";

export default function ResetPasswordPage({ params }: any) {
  return <ResetPassword email={params.email}/>;
}

export const metadata: Metadata = {
  title: "ResetPassword",
};
