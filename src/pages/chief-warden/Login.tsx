import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login } from "../../apiRoutes/chiefWarden";
import { saveLocally } from "../../utils/localStorage";
import { currentUserActions } from "../../store/currentUser";
import { useAppDispatch } from "../../App";
import { ILoginResponse } from "../../interfaces/auth";

// Login Page - Chief warden
function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = (token: string, data: ILoginResponse): void => {
    saveLocally(token, data, "chiefWarden");
    dispatch(
      currentUserActions.login({
        token,
        currentUser: data,
        role: "chiefWarden",
      })
    );
    navigate("/chief-wardens/dashboard");
  };

  return (
    <div className="parent-container lg:max-w-md">
      <h2 className="mb-6">Chief Warden login</h2>
      <LoginForm onSubmit={login} loginHandler={loginHandler} />
      <div className="ml-auto text-sm pt-1 px-2 ">
        <Link to="/staffs/login">Staff Login →</Link>
      </div>
    </div>
  );
}

export default Login;
