import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login } from "../../apiRoutes/chiefWarden";
import { saveLocally } from "../../helpers/localStorage";

// Login Page - Chief warden
function Login() {
  const loginHandler = (token: string, data: any): void => {
    saveLocally(token, data, "chiefWarden");
  };

  return (
    <div className="parent-container lg:max-w-md">
      <h2 className="mb-6">Chief Warden login</h2>
      <LoginForm
        onSubmit={login}
        loginHandler={loginHandler}
        navigateTo="/chief-wardens/notices"
      />
      <div className="lg:ml-auto text-sm pt-1 px-2 ">
        <Link to="/staffs/login">Staff Login →</Link>
      </div>
    </div>
  );
}

export default Login;
