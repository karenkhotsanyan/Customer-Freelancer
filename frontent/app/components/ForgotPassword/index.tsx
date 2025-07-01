"use client";

import { useForgotPasswordMutation } from "@/lib/features/userRTK/rtkQuery";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await forgotPassword(values).unwrap();
            router.push("/resetPassword/" + values.email);
            resetForm();
          } catch (error) {
            console.error("Error:", error);
            setErrors({ email: "Something went wrong. Please try again." });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: 10 }}
            >
              {isSubmitting ? "Updating..." : "Update email"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
