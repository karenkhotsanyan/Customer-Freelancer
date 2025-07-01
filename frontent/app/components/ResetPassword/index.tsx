"use client";

import { useResetPasswordMutation } from "@/lib/features/userRTK/rtkQuery";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

export const ResetPassword = ({ email }: { email: string }) => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter()
  return (
    <div>
      <Formik
        initialValues={{
          code: 0,
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            console.log("=>", values);
            
            resetPassword({ email, data: values })
              .then((res) => {
                console.log(res);
                router.push("/login")
              })
              .catch(console.warn);

            resetForm();
          } catch (error) {
            console.error("Error:", error);
            // setErrors()
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="code" type="code" placeholder="Enter your code" />
              <ErrorMessage name="code" component="div" />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Field
                name="confirm_password"
                type="password"
                placeholder="Enter your confirm_password"
              />
              <ErrorMessage name="confirm_password" component="div" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: 10 }}
            >
              {isSubmitting ? "Updating..." : "enter"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
