import { Routes, Route } from "react-router-dom";
import DetailsForm from "../pages/student/admission/DetailsForm";
import NewStudent from "../layouts/NewStudent";
import Blocks from "../pages/student/admission/Blocks";
import Rooms from "../pages/student/admission/Rooms";
import MealPlansAdmission from "../pages/student/admission/MealPlans";
import ProtectedRoute from "../utils/ProtectedRoute";
import Dashboard from "../pages/student/Dashboard";
import Student from "../layouts/Student";
import Profile from "../pages/student/Profile";
import Chat from "../pages/student/Chat";
import MealPlans from "../pages/student/MealPlans";
import Complaints from "../pages/student/Complaints";
import Payments from "../pages/student/Payments";
import StudentLogin from "../pages/student/Login";
import NotFound from "../pages/NotFound";

// Student routes
function StudentRoutes() {
  return (
    <Routes>
      <Route path="login" element={<StudentLogin />} />
      <Route element={<ProtectedRoute role="student" />}>
        <Route element={<Student />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="meals" element={<MealPlans />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Route>
      <Route path="admission" element={<NewStudent />}>
        <Route path="details" element={<DetailsForm />} />
        <Route path="blocks" element={<Blocks />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="mealplans" element={<MealPlansAdmission />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default StudentRoutes;
