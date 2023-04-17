import StudentDetailsForm from "../../../components/Form/StudentDetails";

// Admission form for filling student details
function DetailsForm() {
  const admissionFromHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className="admission-container justify-center md:w-8/12">
      <h2 className="text-lg font-extrabold mb-5">Admission Details</h2>
      <StudentDetailsForm
        submitHandler={admissionFromHandler}
        navigateTo={"/students/admission/blocks"}
      />
    </div>
  );
}

export default DetailsForm;
