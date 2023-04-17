import { login } from "../../apiRoutes/chiefWarden";
import { studentBgImg } from "../../assets/icons/images";
import LoginForm from "../../components/Form/LoginForm";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { ILogin } from "../../interfaces/auth";

function Login() {
  const loginHandler = (token: string, data: ILogin) => {
    console.log(token, data);
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
          <LoginForm
            loginHandler={loginHandler}
            navigateTo="/students/dashboard"
            onSubmit={login}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
