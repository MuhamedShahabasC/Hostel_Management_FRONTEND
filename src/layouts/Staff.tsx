import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";

function Staff() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dqrnskj2b/image/upload/q_95/v1680587492/Hostel%20Management%20Project/UI/backgroundImages/staff-bg_x2ywxi.webp')",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col bg-[top_right_-20rem] md:bg-center bg-fixed"
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
