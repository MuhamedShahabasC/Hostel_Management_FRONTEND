import { Formik } from "formik";
import { resetPasswordSchema } from "../../schema/staff";
import { resetPassword } from "../../apiRoutes/staff";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import LoadingButton from "../UI/LoadingButton";
import Button from "../UI/Button";

function ResetPassword() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={(formData, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          resetPassword(formData)
            .then(({ data: { message } }) => {
              toast.success(message);
              resetForm();
              setMessage(null);
            })
            .catch(
              ({
                response: {
                  data: { message },
                },
              }: any) => setMessage(message)
            )
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center gap-2 px-1 mb-3 text-sm mt-5">
            <PasswordInput
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              id="currentPassword"
            />
            <PasswordInput
              type="password"
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
            />
            <PasswordInput
              type="password"
              placeholder="Confirm Password"
              name="confirmNewPassword"
              id="confirmNewPassword"
            />

            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Reset Password</Button>
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

export default ResetPassword;
