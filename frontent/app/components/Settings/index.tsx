"use client";

import React, { useEffect } from "react";
import { useProfileQuery } from "@/lib/features/authRTK/rtkQuery";
import {
  useAddUserSkillMutation,
  useDeleteUserSkillMutation,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateUserDataMutation,
  useUserSkillIsFreelancerIdQuery,
} from "@/lib/features/userRTK/rtkQuery";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { useGetSkillsQuery } from "@/lib/features/skillsRTK/rtkQuery";
import "./style.scss";

const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 ")
    .required("New password is required"),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your new password"),
});

const userValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
});

export const Settings = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  console.log(search, "search");
  const [updatePassword] = useUpdatePasswordMutation();
  const [updateUserData] = useUpdateUserDataMutation();
  const { data: user, isError, isLoading } = useProfileQuery();
  const { data: skills } = useGetSkillsQuery("");
  const [addUserSkill] = useAddUserSkillMutation();

  const { data: skillUser, refetch } = useUserSkillIsFreelancerIdQuery(
    user?.freelancer?.id
  );
  const [deleteUserSkill]= useDeleteUserSkillMutation()
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);
  console.log(skillUser, "skillUser");

  console.log(user);
  console.log(skills, "skills");

  if (isLoading) return <div>Loading user data...</div>;
  if (isError) return <div>Failed to load user data</div>;
  if (!user) return <div>User data not available</div>;

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Update User Password</h2>
      <Formik
        initialValues={{
          currentPassword: "",
          password: "",
          confirmationPassword: "",
        }}
        validationSchema={passwordValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await updatePassword(values).unwrap();
            resetForm();
          } catch (error) {
            console.error(error);
            setErrors({ password: "Failed to update password" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="currentPassword">Current Password</label>
              <Field
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Current Password"
              />
              <ErrorMessage name="currentPassword" component="div" />
            </div>

            <div>
              <label htmlFor="password">New Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="New Password"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="confirmationPassword">Confirm New Password</label>
              <Field
                id="confirmationPassword"
                name="confirmationPassword"
                type="password"
                placeholder="Confirm New Password"
              />
              <ErrorMessage name="confirmationPassword" component="div" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: 10 }}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </Form>
        )}
      </Formik>

      <h2 style={{ marginTop: 40 }}>Update User Data</h2>
      <Formik
        initialValues={{ name: user.name || "", surname: user.surname || "" }}
        validationSchema={userValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const updatedUser = await updateUserData({
              id: user.id,
              data: values,
            }).unwrap();
            alert("User data updated successfully!");
            console.log("User updated:", updatedUser);
          } catch (error: any) {
            console.warn("Update failed:", error);
            if (error?.data?.errors) {
              setErrors(error.data.errors);
            } else {
              setErrors({ name: "Update failed. Please try again." });
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field id="name" name="name" placeholder="First Name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="surname">Surname:</label>
              <Field id="surname" name="surname" placeholder="Last Name" />
              <ErrorMessage name="surname" component="div" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: 10 }}
            >
              {isSubmitting ? "Updating..." : "Update User"}
            </button>
          </Form>
        )}
      </Formik>

      {user.role == 2 ? (
        <div>
          <Formik
            initialValues={{ skillId: 0 }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                console.log(values);

                const addUserSkilldata = await addUserSkill(values).unwrap();
              } catch (error: any) {
                console.warn("Update failed:", error);
                if (error?.data?.errors) {
                  setErrors(error.data.errors);
                } else {
                  setErrors({ skillId: "Update failed. Please try again." });
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field as="select" name="skillId">
                  {skills?.map((elm) => (
                    <option value={elm.id}>{elm.name}</option>
                  ))}
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: 10 }}
                >
                  {isSubmitting ? "Updating..." : "Add Skill"}
                </button>
              </Form>
            )}
          </Formik>
          {
            <ul>
              {skillUser?.map((elm) => (
                <div  key={elm.id}>
                  <li >{elm.skill.name}</li>
                  <button onClick={()=>deleteUserSkill(elm.id)}>deleteUserSkill</button>
                </div>
                
              ))}
            </ul>
          }
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
