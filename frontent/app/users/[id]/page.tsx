import { User } from "@/app/components/User";
import type { Metadata } from "next";

export default function UserPage() {
  return <User />;
}

export const metadata: Metadata = {
  title: "User",
};
