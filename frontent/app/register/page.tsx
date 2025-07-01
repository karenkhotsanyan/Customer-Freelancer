import type { Metadata } from "next";
import { Register } from "../components/Register";

export default function RegisterPage() {
  return <Register />;
}

export const metadata: Metadata = {
  title: "Profile",
};
