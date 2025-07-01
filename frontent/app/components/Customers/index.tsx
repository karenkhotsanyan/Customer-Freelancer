"use client"

import { useGetCustomersQuery } from "@/lib/features/customerRTK/trkQuery";
import Link from "next/link";
import { Card } from "react-bootstrap";

export const Customers = () => {
  const { data: costomers } = useGetCustomersQuery("");
  console.log(costomers, "customers");

  return (
    <div>
{
  costomers?.map(elm=>(
            <Card style={{ width: "18rem" }} key={elm.id}>
              <Card.Body>
                <Link href={"/costumers/"+elm.id}><Card.Title>{elm.user.name}</Card.Title></Link>
                <Card.Title>{elm.description}</Card.Title>
    
                <Card.Text></Card.Text>
             
              </Card.Body>
              </Card>
  ))
}
    </div>
  )
};
