import { Customer } from "@/app/components/Customer";
import type { Metadata } from "next";

export default function CostomerPage({ params }: any) {
  return <Customer id={params.id} />;
}

export const metadata: Metadata = {
  title: "Costomer",
};
