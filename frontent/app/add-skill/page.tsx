import type { Metadata } from "next";
import { AddSkill } from "../components/AddSkill";

export default function AddskillPage() {
  return <AddSkill />;
}

export const metadata: Metadata = {
  title: "Add Skill",
};
