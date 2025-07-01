import type { Metadata } from "next";
import { Freelancers } from "../components/Freelancers";

export default function FreelancersPage() {
  return <Freelancers />;
}

export const metadata: Metadata = {
  title: "Freelancers",
};
