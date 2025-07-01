import type { Metadata } from "next";
import { Customers } from "../components/Customers";

export default function CustomersPage() {
  return <Customers />;
}

export const metadata: Metadata = {
  title: "Customers",
};
