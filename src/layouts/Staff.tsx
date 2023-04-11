import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";

function Staff() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dqrnskj2b/image/upload/q_95/v1680587492/Hostel%20Management%20Project/UI/backgroundImages/staff-bg_x2ywxi.webp')",
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col "
    >
      <Header role="staff" />
      <div className="flex justify-center items-center grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Staff;
