import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { studentBgImg } from "../assets/icons/images";
import { getLocalData } from "../utils/localStorage";

// Layout for all student admission pages
function NewStudent() {
  const currentStudent = getLocalData();
  return currentStudent?.role === "student" ? (
    <Navigate to="/students/login" />
  ) : (
    <div
      style={{
        backgroundImage: `url(${studentBgImg})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col bg-[top_right_-20rem] md:bg-center bg-fixed"
    >
      <Header role="student" newAdmission />
      <div className="flex justify-center items-center grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default NewStudent;
