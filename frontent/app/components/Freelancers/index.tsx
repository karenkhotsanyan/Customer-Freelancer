"use client"

import { useGetFreelancersQuery } from "@/lib/features/freelancerRTK/rtkQuery"
import { Card } from "react-bootstrap";

export const Freelancers = ()=>{
    const {data:freelancer}= useGetFreelancersQuery("")
    console.log(freelancer);
    
    return(
        <div>
            {
                freelancer?.map(elm=>(
                            <Card style={{ width: "18rem" }} key={elm.id}>
                              <Card.Body>
                                <Card.Title>{elm.profession
                                    }</Card.Title>
                                <Card.Text>{elm.salary}</Card.Text>
                    
                                <Card.Text></Card.Text>
                                {/* <Button variant="danger" onClick={() => handleDelete(elm.id)}>
                                  deleteUser
                                </Button> */}
                              </Card.Body>
                              </Card>
                ))
            }
        </div>
    )
}