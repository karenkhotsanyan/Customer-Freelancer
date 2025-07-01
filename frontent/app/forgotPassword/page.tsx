import type { Metadata } from "next";
import { ForgotPassword } from "../components/ForgotPassword";

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}

export const metadata: Metadata = {
  title: "ForgotPassword",
};
