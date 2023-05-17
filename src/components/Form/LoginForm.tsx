/* eslint-disable no-restricted-globals */
import { Form, Formik } from "formik";
import Input from "./Input";
import Button from "../UI/Button";
import PasswordInput from "./PasswordInput";
import LoadingButton from "../UI/LoadingButton";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { loginSchema } from "../../schema/auth";
import { getLocalData } from "../../utils/localStorage";
import { Navigate } from "react-router-dom";

// Login form
function LoginForm({ loginHandler, onSubmit }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const currentUser = getLocalData();

  const routeTo = useCallback((role: string): string | undefined => {
    switch (role) {
      case "chiefWarden":
        return "chief-wardens";
      case "staff":
        return "staffs";
      case "student":
        return "students";
      default:
        break;
    }
  }, []);

  if (currentUser) return <Navigate to={`/${routeTo(currentUser.role)}/dashboard`} />;

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setMessage(null);
          setSubmitting(true);
          onSubmit(formData)
            .then(({ data: { token, data } }) => {
              loginHandler(token, data);
              toast.success(`Welcome, ${data.name}`, {
                style: { background: "rgb(0, 0, 0,0.9)", color: "white" },
              });
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
            <Input type="email" placeholder="School mail" name="email" />
            <PasswordInput placeholder="Password" name="password" id="password" />
            {isSubmitting ? <LoadingButton /> : <Button type="submit">Login</Button>}
          </Form>
        )}
      </Formik>
      {message && <span className="text-center text-md font-semibold text-red-700">{message}</span>}
    </>
  );
}

interface Props {
  loginHandler: (token: string, data: any) => void;
  onSubmit: (formData: { email: string; password: string }) => Promise<any>;
}

export default LoginForm;
