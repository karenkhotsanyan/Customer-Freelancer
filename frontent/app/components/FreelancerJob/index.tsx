"use client";

import { useProfileQuery } from "@/lib/features/authRTK/rtkQuery";
import { useFindJobByFreelanceerIdQuery } from "@/lib/features/jobRTK/rtkQuery";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import "./style.scss";

export const FreelancerJob = () => {
  const { data: user, isError, isLoading } = useProfileQuery();

  const { data: freelancerJob,refetch } = useFindJobByFreelanceerIdQuery({id:user?.freelancer.id});
  console.log(freelancerJob);
  
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);
  
  return(
    <div>
        
                {
                    freelancerJob?.map(elm=>(
                      <Card style={{ width: "18rem" }} key={elm.id}>
            <Card.Body>
              <Card.Title>{elm.title}</Card.Title>
              
          
              <Card.Text>{elm.description}</Card.Text>
            </Card.Body>
          </Card>
                    ))
                }
        
    </div>
  )
};
