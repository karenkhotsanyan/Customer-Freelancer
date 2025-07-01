"use client";

import {
  useGetJobByIdQuery,
  useJobUserHaytMutation,
} from "@/lib/features/jobRTK/rtkQuery";
import { Button, Card } from "react-bootstrap";

export const Job = ({ id }: { id: number }) => {
  const { data: job, isLoading } = useGetJobByIdQuery(id);
  const [jobUserHayt] = useJobUserHaytMutation();
  console.log(job);

  if (isLoading) return <div>Loading job data...</div>;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <h2>
          <Card.Title>{job?.title || "No title"}</Card.Title>
        </h2>
        <Card.Text>{job?.description || "No description available"}</Card.Text>
        <Card.Text>{job?.rate ?? "No rate specified"}</Card.Text>
        <Card.Text>{job?.price ?? "No price specified"}</Card.Text>
        <Card.Text>{job?.status || "No status"}</Card.Text>
        <ul>
          {job?.jobSkills.map((elm) => (
            <li key={elm.id}>{elm.skill.name}</li>
          ))}
        </ul>
        <Button
          onClick={() =>
            jobUserHayt({ jobId: id })
              .then((res) => {
                console.log(res);
              })
              .catch(console.warn)
          }
        >
          hayt
        </Button>
      </Card.Body>
    </Card>
  );
};
