import { Navigate, Route, Routes } from "react-router-dom";
import StaffLayout from "../layouts/Staff";
import Login from "../pages/staff/Login";
import MealsChef from "../pages/staff/Meals.chef";
import Profile from "../pages/staff/Profile";
import ProtectedRoute from "../utils/ProtectedRoute";
import Chat from "../pages/staff/Chat";
import Complaints from "../pages/staff/Complaints";
import Dashboard from "../pages/staff/Dashboard";
import Payments from "../pages/staff/Payments.warden";
import Students from "../pages/staff/Students";
import Maintenance from "../pages/staff/Maintenance";
import { getLocalData } from "../utils/localStorage";
import NotFound from "../pages/NotFound";

// Staff routes
function Staff() {
  const currentStaff = getLocalData();

  return (
    <Routes>
      <Route element={<StaffLayout />}>
        <Route
          path="login"
          element={
            currentStaff?.role !== "chiefWarden" ? (
              <Login />
            ) : (
              <Navigate to="/chief-wardens/dashboard" />
            )
          }
        />
        <Route element={<ProtectedRoute role="staff" />}>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="chat" element={<Chat />} />
          <Route element={<ProtectedRoute role="staff" department="chef" />}>
            <Route path="meals" element={<MealsChef />} />
          </Route>
          <Route element={<ProtectedRoute role="staff" department="maintenance" />}>
            <Route path="maintenance" element={<Maintenance />} />
          </Route>
          <Route element={<ProtectedRoute role="staff" department="warden" />}>
            <Route path="payments" element={<Payments />} />
            <Route path="students" element={<Students />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Staff;
