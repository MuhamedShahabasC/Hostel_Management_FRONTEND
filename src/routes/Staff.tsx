import { Route, Routes } from "react-router-dom";
import StaffLayout from "../layouts/Staff";
import Login from "../pages/staff/Login";

function Staff() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default Staff;
