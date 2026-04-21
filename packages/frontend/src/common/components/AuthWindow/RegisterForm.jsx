import useRegister from "../../features/auth/hooks/useRegister";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import { motion, scale } from "motion/react";
function RegisterForm() {
  const { register } = useRegister();

  const validationSchema = yup.object({
    username: yup.string().max(15, "15 characters or less").required("Required"),
    password: yup.string().required("Required"),
  });
  return (
    <Formik
      initialValues={{ username: "Teddy", password: "a123" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        register(values);
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
          name="password"
        />
        <ErrorMessage name="password" component="div" />
        <motion.button
          className="bg-amber-500 hover:bg-amber-700 rounded-md text-gray-900 font-bold"
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.05 }}
        >
          Register
        </motion.button>
      </Form>
    </Formik>
  );
}
export default RegisterForm;
