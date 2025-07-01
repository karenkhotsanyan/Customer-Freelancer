"use client";

import { useProfileQuery } from "@/lib/features/authRTK/rtkQuery";
import { useGetUsersQuery } from "@/lib/features/userRTK/rtkQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./style.scss";

export const Dashboard = () => {
  const { data: user, isError, isLoading, error } = useProfileQuery();
  const router = useRouter();
  const { data: results } = useGetUsersQuery("");

  const [users, setUsers] = useState<any>(results);
  console.log(users, results);
  useEffect(() => {
    setUsers(results);
  }, [results]);
useEffect(() => {
  if (!isLoading && !user) {
    router.push("/login");
  }
}, [isLoading, user, router]);

  if (isLoading) return <div>Loading profile...</div>;
  if (isError) return <div>Error loading user data.</div>;
  if (!user) return null;

  return (
    <section style={styles.container}>
      <h1>User Profile</h1>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </section>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
};
