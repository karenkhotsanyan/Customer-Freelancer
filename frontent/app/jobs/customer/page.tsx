import { CustomerJob } from "@/app/components/CustomerJob";
import type { Metadata } from "next";

export default function CustomerJobPage() {
  return <CustomerJob />;
}

export const metadata: Metadata = {
  title: "CustomerJob",
};
