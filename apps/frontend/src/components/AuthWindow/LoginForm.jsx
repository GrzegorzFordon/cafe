import useLogin from "../../features/auth/hooks/useLogin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import { motion, scale } from "motion/react";
function LoginForm() {
  const { login } = useLogin();

  const validationSchema = yup.object({
    name: yup.string().max(15, "15 characters or less").required("Required"),
    pwd: yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{ name: "Teddy", pwd: "a123" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // console.log(values);
        login(values);
      }}
    >
      <Form className="flex flex-col size-full justify-evenly gap-4 p-2 ">
        <label htmlFor="name">Username</label>
        <Field
          className="shadow-2xl appearance-none border leading-tight  rounded w-full py-2 px-4 focus:outline-none"
          type="text"
          name="name"
        />
        <ErrorMessage name="name" component="div" />
        <label htmlFor="name">Password</label>
        <Field
          className="shadow-2xl appearance-none border leading-tight  rounded w-full py-2 px-4 focus:outline-none"
          type="password"
          name="pwd"
        />
        <ErrorMessage name="pwd" component="div" />
        <motion.button
          className="bg-purple-500 hover:bg-purple-700 rounded-md text-gray-900 font-bold"
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{scale:1.05}}
        >
          Login
        </motion.button>
      </Form>
    </Formik>
  );
}
export default LoginForm;
