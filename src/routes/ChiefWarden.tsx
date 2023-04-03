import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ChiefWardenRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>skjdfhsdf</h1>
            <Outlet />
          </div>
        }
      >
        <Route path="l" element={<h2>lllllllll</h2>} />
      </Route>
    </Routes>
  );
}

export default ChiefWardenRoutes;
