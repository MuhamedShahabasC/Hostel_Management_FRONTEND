import { Link } from "react-router-dom";
import { notFoundImg, studentBgImg } from "../assets/icons/images";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

function NotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${studentBgImg})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col bg-[top_right_-20rem] md:bg-center bg-fixed"
    >
      <Header role="student" />
      <div className="flex justify-center items-center grow">
        <div className="parent-container">
          <img className="w-1/2 md:w-1/3 mx-auto mt-10" src={notFoundImg} alt="404 not found" />
          <h2 className="mt-10">Oops! Page not found.</h2>
          <Link className="font-bold text-primary mx-auto mb-5" to={"/"}>
            ← Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
