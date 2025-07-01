import type { Metadata } from "next";
import { Jobs } from "../components/Jobs";

export default function JobsPage() {
  return <Jobs />;
}

export const metadata: Metadata = {
  title: "Jobs",
};
