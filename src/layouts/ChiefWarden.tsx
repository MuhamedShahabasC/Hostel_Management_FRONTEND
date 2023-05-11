import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { chiefWardenBgImg } from "../assets/icons/images";

function ChiefWarden() {
  return (
    <div
      style={{
        backgroundImage: `url(${chiefWardenBgImg})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col bg-[top_right_-20rem] md:bg-center bg-fixed"
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
