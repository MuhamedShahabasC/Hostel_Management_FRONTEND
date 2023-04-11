import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import PasswordInput from "../../components/Form/PasswordInput";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { resetPasswordSchema } from "../../schema/staff";
import { resetPassword } from "../../apiRoutes/chiefWarden";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import { defaultAvatarImg } from "../../assets/icons/images";

function Profile() {
  const [message, setMessage] = useState<string | null>(null);
  const chiefWardenData = useAppSelector<ICurrentUser | null>(
    (state) => state.currentUser
  );

  return (
    <div className="profile-container">
      <div className="flex flex-col mx-auto md:mx-0 text-center justify-center p-5 border-b-2 border-b-gray-400 md:border-b-0 lg:border-r md:border-r-gray-400">
        <img className="w-40 mb-5" src={defaultAvatarImg} alt="chief warden avatar" />
        <h1 className="normal-case">{chiefWardenData?.currentUser.name}</h1>
        <h3>Chief Warden</h3>
      </div>
      <div className="flex flex-col my-4 px-5 grow">
        <div className=" flex justify-between gap-2 pb-3 border-b border-b-gray-400">
          <div>
            <h4>Mail</h4>
            <p className="text-sm">{chiefWardenData?.currentUser.email}</p>
          </div>
          <div>
            <h4>Mobile</h4>
            <p className="text-sm">{chiefWardenData?.currentUser.mobile}</p>
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
