import { Routes, Route } from "react-router-dom";
import Login from "../pages/chief-warden/Login";
import ChiefWarden from "../layouts/ChiefWarden";
import Notices from "../pages/chief-warden/Notices";
import Profile from "../pages/chief-warden/Profile";
import ProtectedRoute from "../helpers/ProtectedRoute";

function ChiefWardenRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChiefWarden />}>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute role="chiefWarden" />
          }
        >
          <Route path="notices" element={<Notices />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ChiefWardenRoutes;
