"use client";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDataMutation,
} from "@/lib/features/userRTK/rtkQuery";
import { Formik } from "formik";
import { Button, Card } from "react-bootstrap";

export const Users = () => {
  const { data: users, refetch } = useGetUsersQuery("");

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserDataMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      {users?.map((elm) => (
        <Card style={{ width: "18rem" }} key={elm.id}>
          <Card.Body>
            <Card.Title>{elm.name}</Card.Title>
            <Card.Title>{elm.surname}</Card.Title>

            <Card.Text></Card.Text>
            <Button variant="danger" onClick={() => handleDelete(elm.id)}>
              deleteUser
            </Button>
          </Card.Body>
          <Formik
            enableReinitialize
            initialValues={{ name: elm.name || "", surname: elm.surname || "" }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await updateUser({ id: elm.id, data: values }).unwrap();
                refetch();
              } catch {
                alert("Update failed");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
                <input
                  type="surname"
                  name="surname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                />
                {errors.surname && touched.surname && errors.surname}

                <Button type="submit" disabled={isSubmitting} variant="success">
                  update
                </Button>
              </form>
            )}
          </Formik>
        </Card>
      ))}
    </div>
  );
};
