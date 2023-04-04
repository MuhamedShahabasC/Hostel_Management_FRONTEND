import { Route, Routes } from "react-router-dom";
import StaffLayout from "../layouts/Staff";
import Login from "../pages/staff/Login";
import MealsChef from "../pages/staff/Meals.chef";

function Staff() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="chef">
          <Route path="meals" element={<MealsChef />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Staff;
