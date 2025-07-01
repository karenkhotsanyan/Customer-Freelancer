import type { Metadata } from "next";
import { Users } from "../components/Users";

export default function UsersPage() {
  return <Users />;
}

export const metadata: Metadata = {
  title: "Users",
};
