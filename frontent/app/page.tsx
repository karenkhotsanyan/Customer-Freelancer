import type { Metadata } from "next";
import { Dashboard } from "./components/Dashboard";

export default function IndexPage() {
  return <Dashboard />;
}

export const metadata: Metadata = {
  title: "Dashboard",
};
/**
 * login 
 * register
 * verify
 * profile
 * settings
 * jobs+
 * add-job
 * jobs/[id]+
 * skills+
 * skills/[id]+
 * add-skill+
 * costumers+
 * costumers/[id]+
 * freelancers+
 * freelancers/[id]+
 * users
 * users/[id]
 * 
 */