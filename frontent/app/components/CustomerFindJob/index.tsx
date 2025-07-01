"use client";

import {
  useDeleteFreelancerHaytMutation,
  useDeleteJobSkilMutation,
  useGetJobByIdQuery,
  useJobUserFindByJobIdQuery,
  useJobUserHaytMutation,
  useSaveFreelancerHaytMutation,
} from "@/lib/features/jobRTK/rtkQuery";
import { Button, Card } from "react-bootstrap";

export const CustomerFindJob = ({ id }: { id: number }) => {
  const { data: job, isLoading } = useGetJobByIdQuery(id);
  const { data: jobUser } = useJobUserFindByJobIdQuery(id);
  const [deleteFreelancerHayt] = useDeleteFreelancerHaytMutation();
  const [saveFreelancer] = useSaveFreelancerHaytMutation();
  const [deleteJobSkil] = useDeleteJobSkilMutation();

  console.log(jobUser);
  console.log(job, "job");

  if (isLoading) return <div>Loading job data...</div>;

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <h2>
            <Card.Title>{job?.title || "No title"}</Card.Title>
          </h2>
          <Card.Text>
            {job?.description || "No description available"}
          </Card.Text>
          <Card.Text>{job?.rate ?? "No rate specified"}</Card.Text>
          <Card.Text>{job?.price ?? "No price specified"}</Card.Text>
          <Card.Text>{job?.status || "No status"}</Card.Text>
          <ul>
            {job?.jobSkills.map((elm) => (
              <li key={elm.id}>{elm.skill.name}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
      {jobUser?.map((elm) => (
        <div key={elm.id}>
          <span>{elm.freelancer.user.name}</span>
          <button onClick={() => deleteFreelancerHayt(elm.id)}>declien</button>
          <button
            onClick={() =>
              saveFreelancer({
                jobId: elm.jobId,
                freelancerId: elm.freelancerId,
              })
                .then(console.warn)
                .catch(console.error)
            }
          >
            accept
          </button>
        </div>
      ))}
      {job?.jobSkills?.map((elm) => (
        <div key={elm.id}>
          <p>{elm.skill.name}</p>
          <button onClick={() => deleteJobSkil(elm.id).then(console.warn).catch(console.error)}>deleteJobSkil</button>
        </div>
      ))}
      <p>{job?.freelancer?.user.name}</p>
    </div>
  );
};
