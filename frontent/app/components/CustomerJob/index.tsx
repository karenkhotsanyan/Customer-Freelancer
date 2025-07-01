"use client";

import { useProfileQuery } from "@/lib/features/authRTK/rtkQuery";
import {
  useDeleteJobMutation,
  useDeleteJobSkilMutation,
  useFindJobsByCustomerIdQuery,
} from "@/lib/features/jobRTK/rtkQuery";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import "./style.scss";

export const CustomerJob = () => {
  const { data: user, isError, isLoading, error } = useProfileQuery();

  const { data: customerJob } = useFindJobsByCustomerIdQuery({
    id: user?.customer.id,
  });
  const [deleteJob]= useDeleteJobMutation()
  console.log(customerJob);

  return (
    <div>
      {customerJob?.map((elm) => (
        <Card style={{ width: "18rem" }} key={elm.id}>
          <Card.Body>
            <h2>
              <Card.Title>{elm?.title || "No title"}</Card.Title>
            </h2>
            <Card.Text>
              {elm?.description || "No description available"}
            </Card.Text>
            <Card.Text>{elm?.rate ?? "No rate specified"}</Card.Text>
            <Card.Text>{elm?.price ?? "No price specified"}</Card.Text>
            <Card.Text>{elm?.status || "No status"}</Card.Text>
            <ul>
              {elm?.jobSkills.map((elm) => (
                <li key={elm.id}>{elm.skill.name}</li>
              ))}
            </ul>
            <Link href={"/jobs/customer/"+elm.id}>see more</Link>
            <Button onClick={() => deleteJob(elm.id)} variant="danger">
              deleteJob
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
