import { Routes, Route } from "react-router-dom";
import DetailsForm from "../pages/student/admission/DetailsForm";
import NewStudent from "../layouts/NewStudent";
import Blocks from "../pages/student/admission/Blocks";
import Rooms from "../pages/student/admission/Rooms";
import MealPlans from "../pages/student/admission/MealPlans";

// Student routes
function StudentRoutes() {
  return (
    <Routes>
      <Route path="admission" element={<NewStudent />}>
        <Route path="details" element={<DetailsForm />} />
        <Route path="blocks" element={<Blocks />} />
        <Route path="rooms" element={<Rooms/>} />
        <Route path="mealplans" element={<MealPlans/>} />
      </Route>
    </Routes>
  );
}

export default StudentRoutes;
