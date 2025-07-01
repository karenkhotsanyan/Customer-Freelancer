import type { Metadata } from "next";
import { AddJob } from "../components/AddJob";

export default function AddJobPage() {
  return <AddJob />;
}

export const metadata: Metadata = {
  title: "Add job",
};
