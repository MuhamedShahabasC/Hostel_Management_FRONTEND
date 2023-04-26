import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login as loginAPI } from "../../apiRoutes/staff";
import { saveLocally } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../store/currentUser";

// Staff login page
function Login() {
  const dispatch = useDispatch();
  const loginHandler = (token: string, data: any): void => {
    saveLocally(token, data, "staff");
    dispatch(currentUserActions.login(data));
  };

  return (
    <>
      <div className="parent-container lg:max-w-md">
        <h2 className="mb-6">Staff login</h2>
        <LoginForm
          loginHandler={loginHandler}
          navigateTo="/staffs/meals"
          onSubmit={loginAPI}
        />
        <div className="ml-auto text-sm pt-1 px-2 ">
          <Link to="/chief-wardens/login">Chief-Warden →</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
