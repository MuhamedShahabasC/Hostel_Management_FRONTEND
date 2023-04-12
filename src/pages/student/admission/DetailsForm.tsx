import StudentDetailsForm from "../../../components/Form/StudentDetails";

// Admission form for filling student details
function DetailsForm() {

  

  return (
    <div className="admission-container justify-center md:w-8/12">
      <h2 className="text-lg font-extrabold mb-5">Admission Details</h2>
      <StudentDetailsForm />
    </div>
  );
}

export default DetailsForm;
