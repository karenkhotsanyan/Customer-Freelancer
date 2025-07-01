import { FreelancerJob } from "@/app/components/FreelancerJob";
import type { Metadata } from "next";

export default function FreelancerPage() {
  return <FreelancerJob />;
}

export const metadata: Metadata = {
  title: "Freelancer",
};