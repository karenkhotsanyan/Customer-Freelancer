"use client";

import { useCustomerByIdQuery } from "@/lib/features/customerRTK/trkQuery";
import { Card } from "react-bootstrap";

export const Customer = ({ id }: { id: number }) => {
  const { data: customer } = useCustomerByIdQuery(id);
  console.log(customer);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <h2>
            <Card.Title>{customer?.user.name || "No name"}</Card.Title>
          </h2>
          <h2>
            <Card.Title>{customer?.user.surname || "No surname"}</Card.Title>
          </h2>

          <Card.Text>{customer?.user.email || "No email"}</Card.Text>
          <Card.Text>Role:{customer?.user.role ?? "No role specified"}</Card.Text>
          {customer?.jobs.map((elm) => (
            <ul key={elm.id}>
              <li>{elm.title}</li>
            </ul>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};
