import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { chiefWardenBgImg } from "../assets/icons/images";

function ChiefWarden() {
  return (
    <div
      style={{
        backgroundImage: `url(${chiefWardenBgImg})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col"
    >
      <Header role="chiefWarden" />
      <div className="flex justify-center items-center grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default ChiefWarden;
