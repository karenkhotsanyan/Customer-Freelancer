"use client";

import { useAddJobMutation } from "@/lib/features/jobRTK/rtkQuery";
import { useGetSkillsQuery } from "@/lib/features/skillsRTK/rtkQuery";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./style.scss";

export const AddJob = () => {
  const [addJob] = useAddJobMutation();
  const { data: skills } = useGetSkillsQuery("");

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: 0,
          skills: [],
        }}
        // validationSchema={passwordValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await addJob(values).unwrap();
            resetForm();
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" placeholder="Title" />
              <ErrorMessage name="Title" component="div" />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" type="text" placeholder="Description" />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <label htmlFor="price">price</label>
              <Field
                id="confirmationPassword"
                name="price"
                type="number"
                placeholder="Price"
              />
              <ErrorMessage name="price" component="div" />
            </div>
            <Field as="select" name="skills" multiple>
          
              {(skills || []).map((elm) => (
                <option key={elm.id} value={elm.id}>
                  {elm.name}
                </option>
              ))}
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: 10 }}
            >
              {isSubmitting ? "Updating..." : "Add job"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
