"use client";

import { useRegisterMutation } from "@/lib/features/authRTK/rtkQuery";
import { UserRole } from "@/type/type";
import { Formik } from "formik";
import Link from "next/link";
import "./style.scss";

export const Register = () => {
  const [registerData] = useRegisterMutation();
  return (
    <div style={{ display: "flex" }}>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          profession: "",
          role: 0,
          salary: 0,
          description: "",
        }}
        validate={(values) => {
          //   const errors: ICreateUser = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);

            registerData(values).then(res=>{
                console.log(res);
                
            }).catch(console.warn);
            
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
              placeholder="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />{" "}
            <input
              placeholder="suname"
              name="surname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.surname}
            />
            <input
              placeholder="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              placeholder="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
      <select
        name="role"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.role}
      >
        <option value="" hidden>rols</option>
        <option value={UserRole.CUSTOMER}>customer</option>
        <option value={UserRole.FREELANCER}>freelancer</option>
      </select>
            {errors.role && touched.role && errors.role}
            <input
              placeholder="profession"
              type="profession"
              name="profession"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profession}
            />
            {errors.profession && touched.profession && errors.profession}
            <input
              placeholder="salary"
              type="salary"
              name="salary"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.salary}
            />
            {errors.salary && touched.salary && errors.salary}
            <input
              placeholder="description"
              type="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {errors.description && touched.description && errors.description}
            <button type="submit" >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href={"/login"}>Login</Link>
    </div>
  );
};
