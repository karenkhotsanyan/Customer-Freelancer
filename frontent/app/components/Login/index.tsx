"use client";

import { useLoginMutation } from "@/lib/features/authRTK/rtkQuery";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import Cookies from "js-cookie";
import "./style.scss";
export const Login = () => {
  const [login] = useLoginMutation();

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {};
          if (!values.username) {
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await login(values).unwrap();

            Cookies.set("token", response.access_token, { expires: 7 });

            window.location.href = "/";
          } catch (error: any) {
            console.error("Login failed", error);
            setErrors({ username: "Invalid credentials" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="username" type="username" placeholder="username" />
            <ErrorMessage name="username" />

            <Field name="password" type="password" placeholder="password" />
            <ErrorMessage name="password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <Link href={"/register"}>Register</Link>
      <div>
        <Link href={"/forgotPassword"}>ForgotPassword</Link>
      </div>
    </div>
  );
};
