import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login as loginAPI } from "../../apiRoutes/staff";
import { saveLocally } from "../../utils/localStorage";
import { currentUserActions } from "../../store/currentUser";
import { useAppDispatch } from "../../App";
import { ILoginResponse } from "../../interfaces/auth";

// Staff login page
function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = (token: string, data: ILoginResponse): void => {
    saveLocally(token, data, "staff");
    dispatch(
      currentUserActions.login({
        token,
        currentUser: data,
        role: "staff",
      })
    );
    navigate("/staffs/dashboard");
  };

  return (
    <>
      <div className="parent-container lg:max-w-md">
        <h2 className="mb-6">Staff login</h2>
        <LoginForm loginHandler={loginHandler} onSubmit={loginAPI} />
        <div className="ml-auto text-sm pt-1 px-2 ">
          <Link to="/chief-wardens/login">Chief-Warden →</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
