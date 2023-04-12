import { Routes, Route } from "react-router-dom";
import DetailsForm from "../pages/student/admission/DetailsForm";
import NewStudent from "../layouts/NewStudent";

// Student routes
function StudentRoutes() {
  return (
    <Routes>
      <Route path="admission" element={<NewStudent />}>
        <Route path="details" element={<DetailsForm />} />
      </Route>
    </Routes>
  );
}

export default StudentRoutes;
