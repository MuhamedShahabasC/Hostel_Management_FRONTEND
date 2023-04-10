import { useState } from "react";
import Input from "../../components/Form/Input";
import { Form, Formik } from "formik";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { editNotice, newNotice } from "../../apiRoutes/chiefWarden";
import { INewNotice, INotice } from "../../interfaces/chiefWarden";
import { newNoticeSchema } from "../../schema/chiefWarden";
import CheckBoxInput from "./Checkbox";

function NoticeForm({ modalData, role, fetchAllNotices, setModal }: FormRole) {
  const [message, setMessage] = useState<string | null>(null);

  const submitHandler = async (formData: INewNotice, _id?: string) => {
    const formattedData: INotice = {
      title: formData.title,
      message: formData.message,
      visibility: formData.visibility,
      audience: {
        staff: formData.staff ? formData.staff : false,
        student: formData.student ? formData.student : false,
      },
    };
    if (role === "edit" && _id) {
      return await editNotice(_id, formattedData);
    } else if (role === "new") {
      return await newNotice(formattedData);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: modalData?.title,
          message: modalData?.message,
          student: modalData?.audience?.student,
          staff: modalData?.audience?.staff,
          visibility: modalData?.visibility,
        }}
        validationSchema={newNoticeSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          submitHandler(formData, modalData._id)
            .then((res) => {
              fetchAllNotices();
              toast.success(res?.data.message);
              setModal(false);
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
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              edit
            />
            <Input
              type="text"
              placeholder="Message"
              name="message"
              id="message"
              edit
            />
            <div className="pb-4 border-b-2">
              <h4 className="mb-3">Audience</h4>
              <CheckBoxInput
                placeholder="Student"
                name="student"
                id="student"
              />
              <CheckBoxInput placeholder="Staff" name="staff" id="staff" />
            </div>
            <CheckBoxInput
              placeholder="Visibility"
              name="visibility"
              id="visibility"
            />
            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button className="max-w-fit mx-auto" type="submit">
                Save Changes
              </Button>
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

export default NoticeForm;

interface FormRole {
  modalData: INotice;
  role: "edit" | "new";
  fetchAllNotices: () => any;
  setModal: (state: boolean) => void;
}