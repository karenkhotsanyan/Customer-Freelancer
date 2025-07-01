import type { Metadata } from "next";
import { Skills } from "../components/Skills";

export default function SkillsPage() {
  return <Skills />;
}

export const metadata: Metadata = {
  title: "Skills",
};
