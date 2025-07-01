"use client";

import { useGetAllJobsQuery } from "@/lib/features/jobRTK/rtkQuery";
import Link from "next/link";
import { Card } from "react-bootstrap";
import "./style.scss";

export const Jobs = () => {
  const { data: jobs } = useGetAllJobsQuery("");
  console.log(jobs);

  return (
    <div>
      {jobs?.map((elm) => (
          <Card style={{ width: "18rem" }} key={elm.id}>
            <Card.Body>
              <h2>
                <Link href={"/jobs/" + elm.id}>{elm.title}</Link>
              </h2>
          
              <Card.Text>{elm.description}</Card.Text>
            </Card.Body>
          </Card>
      ))}
    </div>
  );
};
