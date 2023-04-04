import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

function ChiefWarden() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dqrnskj2b/image/upload/q_95/v1680582321/Hostel%20Management%20Project/UI/backgroundImages/cw-bg_soo604.webp')",
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col"
    >
      <Header />
      <div className="flex justify-center items-center grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default ChiefWarden;
