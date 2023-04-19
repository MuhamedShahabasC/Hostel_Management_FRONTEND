import { Form, Formik } from "formik";
import { useState, useMemo } from "react";
import LoadingButton from "../UI/LoadingButton";
import Button from "../UI/Button";
import Input from "./Input";
import SelectInput from "./SelectInput";
import PasswordInput from "./PasswordInput";
import { studentAdmissionSchema } from "../../schema/student";

function StudentDetails({ studentData, submitHandler }: any) {
  // eslint-disable-next-line
  const [message, setMessage] = useState<string | null>(null);

  const departmentOptions = useMemo(
    () => [
      {
        text: "Science",
        value: "science",
      },
      {
        text: "Commerce",
        value: "commerce",
      },
      {
        text: "Humanities",
        value: "humanities",
      },
    ],
    []
  );

  const genderOptions = useMemo(
    () => [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    []
  );

  const bloodGroupOptions = useMemo(
    () => [
      {
        text: "A+",
        value: "A+",
      },
      {
        text: "A-",
        value: "A-",
      },
      {
        text: "B+",
        value: "B+",
      },
      {
        text: "AB+",
        value: "AB+",
      },
      {
        text: "AB-",
        value: "AB-",
      },
      {
        text: "B-",
        value: "B-",
      },
      {
        text: "O+",
        value: "O+",
      },
      {
        text: "O-",
        value: "O-",
      },
    ],
    []
  );

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          email: studentData?.email || "",
          name: studentData?.name || "",
          department: studentData?.department || "",
          gender: studentData?.gender || "",
          password: studentData?.password || "",
          confirmPassword: studentData?.confirmPassword || "",
          mobile: studentData?.mobile || "",
          guardianName: studentData?.guardianName || "",
          guardianMobile: studentData?.guardianMobile || "",
          building: studentData?.address?.building || "",
          city: studentData?.address?.city || "",
          pin: studentData?.address?.pin || "",
          state: studentData?.address?.state || "",
          country: studentData?.address?.country || "",
          bloodGroup: studentData?.bloodGroup || "",
          remarks: studentData?.remarks || "",
        }}
        validationSchema={studentAdmissionSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          submitHandler(formData);
          setSubmitting(false);
          // submitHandler(formData, studentData._id)
          //   .then(({ data: { message } }: any) => {
          //     fetchAllMeals();
          //     toast.success(message);
          //   })
          //   .catch(
          //     ({
          //       response: {
          //         data: { message },
          //       },
          //     }) => setMessage(message)
          //   )
          //   .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="m-2 text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-8 lg:mx-10">
            <Input
              type="email"
              placeholder="School Mail"
              className="md:col-span-full lg:col-span-1"
              name="email"
            />
            <Input type="text" placeholder="Name" name="name" />
            <SelectInput name="department" label="Department" options={departmentOptions} />
            <SelectInput name="gender" label="Gender" options={genderOptions} />
            <PasswordInput placeholder="Password" name="password" id="password" />
            <PasswordInput
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
            <Input type="number" placeholder="Mobile" name="mobile" />
            <Input type="text" placeholder="Guardian Name" name="guardianName" />
            <Input type="number" placeholder="Guardian Mobile" name="guardianMobile" />
            <Input type="text" placeholder="Building Name/No." name="building" />
            <Input type="text" placeholder="City" name="city" />
            <Input type="number" placeholder="Pin Code" name="pin" />
            <Input type="text" placeholder="State" name="state" />
            <Input type="text" placeholder="Country" name="country" />
            <SelectInput label="Blood Group" name="bloodGroup" options={bloodGroupOptions} />
            <Input className="col-span-full" type="text" placeholder="Remarks" name="remarks" />
            <div className="col-span-full flex justify-center">
              {isSubmitting ? (
                <LoadingButton className="w-1/3" />
              ) : (
                <Button className=" mx-auto px-4" type="submit">
                  Save and Continue
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {message && (
        <span className="text-center text-md mt-2 font-semibold text-red-700">{message}</span>
      )}
    </>
  );
}

export default StudentDetails;
