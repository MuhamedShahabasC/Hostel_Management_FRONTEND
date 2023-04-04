import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login } from "../../apiRoutes/chiefWarden";

// Login Page
function Login() {
  const tokenHandler = (token: string): void => {
    console.log(token);
  };

  return (
    <div className="parent-container lg:max-w-md">
      <h2 className="mb-6">Chief Warden login</h2>
      <LoginForm
        onSubmit={login}
        tokenHandler={tokenHandler}
        navigateTo="/chief-wardens/dashboard"
      />
      <div className="lg:ml-auto text-sm pt-1 px-2 ">
        <Link to="/staffs/login">Staff Login →</Link>
      </div>
    </div>
  );
}

export default Login;
