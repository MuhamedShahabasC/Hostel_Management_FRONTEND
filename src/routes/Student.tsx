import { Routes, Route } from "react-router-dom";
import Heading from "../components/Heading";

function StudentRoutes() {
  return (
    <Routes>
      <Route path="a" element={<Heading />} />
    </Routes>
  );
}

export default StudentRoutes;
