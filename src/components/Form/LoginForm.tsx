/* eslint-disable no-restricted-globals */
import { Form, Formik } from "formik";
import Input from "./Input";
import Button from "../UI/Button";
import PasswordInput from "./PasswordInput";
import * as yup from "yup";
import LoadingButton from "../UI/LoadingButton";
import { login } from "../../apiRoutes/chiefWarden";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <div className="parent-container">
      <h2 className="mb-6">Chief Warden login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .trim()
            .required("Required")
            .matches(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              "Invalid e-Mail"
            ),
          password: yup
            .string()
            .trim()
            .required("Required")
            .min(8, "Invalid Password")
            .max(16, "Invalid Password"),
        })}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          login(formData)
            .then(
              ({
                data: {
                  token,
                  data: { name },
                },
              }) => {
                console.log(token);
                toast.success(`Welcome ${name}`);
                navigate("/chief-warden/dashboard");
              }
            )
            .catch(
              ({
                response: {
                  data: { message },
                },
              }) => setMessage(message)
            )
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center gap-4 px-1 mb-3">
            <Input
              type="email"
              placeholder="College mail"
              name="email"
              id="email"
            />
            <PasswordInput
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />

            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Login</Button>
            )}
          </Form>
        )}
      </Formik>
      <div className="lg:ml-auto text-sm pt-1 px-2 ">
        <button>Warden Login</button>
      </div>
      {message && (
        <span className="text-center text-md font-semibold text-red-700">
          {message}
        </span>
      )}
    </div>
  );
}

export default LoginForm;
