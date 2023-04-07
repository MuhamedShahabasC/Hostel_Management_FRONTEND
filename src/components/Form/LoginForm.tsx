/* eslint-disable no-restricted-globals */
import { Form, Formik } from "formik";
import Input from "./Input";
import Button from "../UI/Button";
import PasswordInput from "./PasswordInput";
import * as yup from "yup";
import LoadingButton from "../UI/LoadingButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  navigateTo: string;
  loginHandler: (token: string, data: any) => void;
  onSubmit: (formData: { email: string; password: string }) => Promise<any>;
}

function LoginForm({ loginHandler, navigateTo, onSubmit }: Props) {
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  return (
    <>
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
          onSubmit(formData)
            .then(({ data: { token, data } }) => {
              loginHandler(token, data);
              toast.success(`Welcome ${data.name}`);
              navigate(navigateTo);
            })
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
      {message && (
        <span className="text-center text-md font-semibold text-red-700">
          {message}
        </span>
      )}
    </>
  );
}

export default LoginForm;
