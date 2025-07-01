import { Job } from "@/app/components/Job";
import type { Metadata } from "next";

export default function JobPage({ params }: any) {
  return <Job id={params.id} />;
}

export const metadata: Metadata = {
  title: "Job",
};
