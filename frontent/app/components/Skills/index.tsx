"use client";

import {
  useDeleteSkillADMINMutation,
  useGetSkillsQuery,
  useUpdateSkillNameADMINMutation,
} from "@/lib/features/skillsRTK/rtkQuery";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import { IUpdateSkillDto } from "@/type/type";

export const Skills = () => {
  const { data: skills } = useGetSkillsQuery("");
  const [deleteSkill] = useDeleteSkillADMINMutation();
  const [updateSkillName] = useUpdateSkillNameADMINMutation();

  const [updateValues, setUpdateValues] = useState<{
    [id: number]: IUpdateSkillDto;
  }>({});

  const handleInputChange = (id: number, value: string) => {
    setUpdateValues((prev) => ({
      ...prev,
      [id]: { name: value },
    }));
  };

  const handleUpdate = async (id: number) => {
    const updated = updateValues[id];
    if (updated) {
      try {
        await updateSkillName({ id, obj: updated }).unwrap();
        console.log(`Skill ${id} updated`);
      } catch (error) {
        console.error(`Error updating skill ${id}:`, error);
      }
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteSkill(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  return (
    <div>
      {skills?.map((elm) => (
        <Card key={elm.id} style={{ width: "18rem", marginBottom: "1rem" }}>
          <Card.Body>
            <Card.Title>{elm.name}</Card.Title>

            <input
              type="text"
              value={updateValues[elm.id]?.name ?? elm.name}
              onChange={(e) => handleInputChange(elm.id, e.target.value)}
            />

            <Button
              variant="success"
              size="sm"
              style={{ marginLeft: "10px" }}
              onClick={() => handleUpdate(elm.id)}
            >
              Save
            </Button>

            <Button
              variant="danger"
              size="sm"
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(elm.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
