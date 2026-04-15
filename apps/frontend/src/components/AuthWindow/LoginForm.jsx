import useLogin from "../../features/auth/hooks/useLogin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function LoginForm() {
  const { login } = useLogin();

  const validationSchema = yup.object({
    name: yup.string().max(15, "15 characters or less").required("Required"),
    pwd: yup.string().required("Required"),
  });
  return (
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{ name: "Teddy", pwd: "a123" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          login(values);
        }}
      >
        <Form>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="text" name="pwd" />
          <ErrorMessage name="pwd" component="div" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
export default LoginForm;
