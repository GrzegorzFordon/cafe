import useRegister from "../../features/auth/hooks/useRegister";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function RegisterForm() {
  const { register } = useRegister();

  const validationSchema = yup.object({
    name: yup.string().max(15, "15 characters or less").required("Required"),
    pwd: yup.string().required("Required"),
  });
  return (
    <div>
      <h1>Register</h1>

      <Formik
        initialValues={{ name: "Teddy", pwd: "a123" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          register(values);
        }}
      >
        <Form>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="text" name="pwd" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
export default RegisterForm;
