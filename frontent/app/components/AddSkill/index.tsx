"use client";

import { useAddAdminSkillMutation } from "@/lib/features/skillsRTK/rtkQuery";
import { Formik } from "formik";
import { Button } from "react-bootstrap";

export const AddSkill = () => {
  const [addSkill] = useAddAdminSkillMutation();
  return (
    <div>
      <Formik
        initialValues={{ name: "" }}
        // validate={(values) => {
        //   const errors: any = {};
        //   if (!values.name) {
        //     errors.name = "Required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.name)
        //   ) {
        //     errors.name = "Invalid name address";
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          addSkill(values);

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

            <Button type="submit" disabled={isSubmitting} variant="success">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
