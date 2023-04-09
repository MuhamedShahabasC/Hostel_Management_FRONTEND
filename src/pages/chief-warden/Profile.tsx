import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import PasswordInput from "../../components/Form/PasswordInput";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { resetPasswordSchema } from "../../schema/staff";
import { resetPassword } from "../../apiRoutes/chiefWarden";

function Profile() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="profile-container">
      <div className="flex flex-col mx-auto md:mx-0 text-center justify-center p-5 border-b-2 border-b-gray-400 md:border-b-0 lg:border-r md:border-r-gray-400">
        <img
          className="w-40"
          src="https://s3-alpha-sig.figma.com/img/f3ed/d01f/2fb82582947c4fa87c521938f9406e47?Expires=1681689600&Signature=qZCI1SsibMCHnm4YnltqkGJqnmHz-OKCFxWVM-8rCABygWVtoeJW2uY1rKuVk1kbWUq~~R6yuHP4Izl8p3DH864C1EBHm22U64Bm2j49RIIHdz-hb9zLoPzib~X8auZnnTwfgiiChDw8Pjiopsc3jbWrDnkSNHRfyT0lINDHuPqkoV5iXZYIWpT26p9TOZTWoEnqiE2nrk4xPhvJxsew6LDcb3Tw8zzI5Z3hZY6oBw9OudNlfo8v7irAXnL1IIDfuQJpgCO6Y0lpS364esLwIQ76HNFxDdL3-8U7bhxlmPxXJG9iaTsZ7WfrAB8ICZaptl248hL-wSHmGdfVnqPsyQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt=""
        />
        <h1 className="normal-case">Shahabas c</h1>
        <h3>Chef</h3>
      </div>
      <div className="flex flex-col my-4 px-5 grow">
        <div className=" flex justify-between gap-2 pb-3 border-b border-b-gray-400">
          <div>
            <h4>Mail</h4>
            <p className="text-sm">Shahdddabas@college.com</p>
          </div>
          <div>
            <h4>Mobile</h4>
            <p className="text-sm">9998887770</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="mt-5 uppercase">Change Password</h4>
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
