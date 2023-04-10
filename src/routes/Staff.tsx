import { Route, Routes } from "react-router-dom";
import StaffLayout from "../layouts/Staff";
import Login from "../pages/staff/Login";
import MealsChef from "../pages/staff/Meals.chef";
import Profile from "../pages/staff/Profile";
import ProtectedRoute from "../helpers/ProtectedRoute";

function Staff() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute role="staff" />}>
          <Route path="profile" element={<Profile />} />
          <Route path="chef">
            <Route path="meals" element={<MealsChef />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Staff;
