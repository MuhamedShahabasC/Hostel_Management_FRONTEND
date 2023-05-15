import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../App";
import StudentDetailsForm from "../../../components/Form/StudentDetails";
import { admissionActions } from "../../../store/admission";
import { addHistory } from "../../../store/history";

// Admission form for filling student details
function DetailsForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const admissionFromHandler = (formData: any) => {
    dispatch(admissionActions.studentDetails(formData));
    navigate("/students/admission/mealPlans");
    dispatch(addHistory(pathname));
  };

  return (
    <div className="admission-container justify-center md:w-8/12">
      <h2 className="text-lg font-extrabold mb-5">Admission Details</h2>
      <StudentDetailsForm
        submitHandler={admissionFromHandler}
      />
    </div>
  );
}

export default DetailsForm;
