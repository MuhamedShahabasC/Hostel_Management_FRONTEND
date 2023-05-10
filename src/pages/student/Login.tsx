import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apiRoutes/student";
import { studentBgImg } from "../../assets/icons/images";
import LoginForm from "../../components/Form/LoginForm";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { ILoginResponse } from "../../interfaces/auth";
import { saveLocally } from "../../utils/localStorage";
import { useAppDispatch } from "../../App";
import { currentUserActions } from "../../store/currentUser";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginHandler = (token: string, data: ILoginResponse) => {
    saveLocally(token, data, "student");
    dispatch(
      currentUserActions.login({
        token,
        currentUser: data,
        role: "student",
      })
    );
    navigate("/students/dashboard");
  };

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
        <div className="parent-container lg:max-w-md">
          <h2 className="mb-6">Student login</h2>
          <LoginForm loginHandler={loginHandler} onSubmit={login} />
          <div className="ml-auto text-sm pt-1 px-2 ">
            <Link to="/students/admission/details">New Admission →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
