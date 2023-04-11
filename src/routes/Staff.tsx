import { Route, Routes } from "react-router-dom";
import StaffLayout from "../layouts/Staff";
import Login from "../pages/staff/Login";
import MealsChef from "../pages/staff/Meals.chef";
import Profile from "../pages/staff/Profile";
import ProtectedRoute from "../helpers/ProtectedRoute";

// Staff routes
// check department of staff also
function Staff() {
  return (
    <Routes>
      <Route element={<StaffLayout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute role="staff" />}>
          <Route path="profile" element={<Profile />} />
          <Route>
            <Route path="meals" element={<MealsChef />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={`NOT FOUND`} />
    </Routes>
  );
}

export default Staff;
