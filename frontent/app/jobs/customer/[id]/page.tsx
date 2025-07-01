import { CustomerFindJob } from "@/app/components/CustomerFindJob";
import type { Metadata } from "next";

export default function CustomerFindJobPage({ params }: any) {
  return <CustomerFindJob id={params.id} />;
}

export const metadata: Metadata = {
  title: "CustomerFindJob",
};
