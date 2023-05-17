import { Routes, Route } from "react-router-dom";
import Login from "../pages/chief-warden/Login";
import ChiefWarden from "../layouts/ChiefWarden";
import Notices from "../pages/chief-warden/Notices";
import Profile from "../pages/chief-warden/Profile";
import ProtectedRoute from "../utils/ProtectedRoute";
import Students from "../pages/chief-warden/Students";
import MealPlans from "../pages/chief-warden/MealPlans";
import Chat from "../pages/chief-warden/Chat";
import Dashboard from "../pages/chief-warden/Dashboard";
import Complaints from "../pages/chief-warden/Complaints";
import Staffs from "../pages/chief-warden/Staffs";
import Blocks from "../pages/chief-warden/Blocks";

// Chief warden routes
function ChiefWardenRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChiefWarden />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute role="chiefWarden" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notices" element={<Notices />} />
          <Route path="students" element={<Students />} />
          <Route path="staffs" element={<Staffs />} />
          <Route path="mealPlans" element={<MealPlans />} />
          <Route path="chat" element={<Chat />} />
          <Route path="blocks" element={<Blocks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ChiefWardenRoutes;
