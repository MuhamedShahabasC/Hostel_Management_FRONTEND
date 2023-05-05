import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import PasswordInput from "../../components/Form/PasswordInput";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { resetPasswordSchema } from "../../schema/auth";
import { changeProfileImageAPI, resetPassword } from "../../apiRoutes/staff";
import { useAppDispatch, useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import { getBase64 } from "../../utils/getBase64";
import { currentUserActions } from "../../store/currentUser";

// Staff Profile Page
function Profile() {
  const [message, setMessage] = useState<string | null>(null);
  const staffData = useAppSelector<ICurrentUser | null>((state) => state.currentUser);
  const dispatch = useAppDispatch();

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const image = files && files[0];
    if (
      !/(\.jpg|\.jpeg|\.png|\.webp)$/.exec(image?.name!) ||
      image!["type"].split("/")[0] !== "image"
    )
      return toast.error("Only upload images");

    const updateProfileImage = () =>
      getBase64(image!)
        .then((imageInBase64) => {
          ("Uploading image");
          return changeProfileImageAPI(imageInBase64);
        })
        .then(
          ({
            data: {
              data: { url },
            },
          }) => {
            dispatch(currentUserActions.updateProfilePic(url));
            toast.success(message);
          }
        );

    toast.promise(updateProfileImage, {
      pending: "Uploading Image",
      success: "Image updated",
      error: "Please try again",
    });
  };

  return (
    <div className="profile-container">
      <div className="flex flex-col mx-auto md:mx-0 text-center justify-center p-5 border-b-2 border-b-gray-400 md:border-b-0 md:border-r md:border-r-gray-400">
        <div className="w-40 mb-5 rounded-full border-1 mx-auto">
          <label className="relative" htmlFor="uploadImage">
            <img
              src={staffData?.currentUser?.profilePic}
              className="rounded-full p-1"
              alt="staff avatar"
            />
            <span className="text-xs absolute bottom-3 rounded shadow-sm text-white bg-black bg-opacity-30 px-1 -left-7 max-w-max">
              Change
            </span>
          </label>
          <input
            className="w-full hidden"
            type="file"
            name="uploadImage"
            id="uploadImage"
            onChange={uploadImageHandler}
          />
        </div>
        <div className="hidden md:block">
          {staffData?.currentUser?.name.split(" ").map((name) => (
            <h1 key={name} className="normal-case">
              {name}
            </h1>
          ))}
        </div>
        <h1 className="normal-case md:hidden">{staffData?.currentUser?.name}</h1>
        <h3>{staffData?.currentUser?.department}</h3>
      </div>
      <div className="flex flex-col my-4 px-5 grow">
        <div className="flex flex-col md:flex-row justify-between gap-2 pb-3 border-b border-b-gray-400">
          <div>
            <h4>Mail</h4>
            <p className="text-sm">{staffData?.currentUser?.email}</p>
          </div>
          <div>
            <h4>Mobile</h4>
            <p className="text-sm">{staffData?.currentUser?.mobile}</p>
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
                  placeholder="Current Password"
                  name="currentPassword"
                  id="currentPassword"
                />
                <PasswordInput placeholder="New Password" name="newPassword" id="newPassword" />
                <PasswordInput
                  placeholder="Confirm Password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                />

                {isSubmitting ? <LoadingButton /> : <Button type="submit">Reset Password</Button>}
              </Form>
            )}
          </Formik>
          {message && (
            <span className="text-center text-md font-semibold text-red-700">{message}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
