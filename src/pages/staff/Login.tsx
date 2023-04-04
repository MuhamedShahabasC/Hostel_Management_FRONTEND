import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login } from "../../apiRoutes/staff";

function Login() {
  const tokenHandler = (token: string): void => {
    console.log(token);
  };

  return (
    <>
      <div className="parent-container">
        <h2 className="mb-6">Staff login</h2>
        <LoginForm
          tokenHandler={tokenHandler}
          navigateTo="/staffs/dashboard"
          onSubmit={login}
        />
        <div className="lg:ml-auto text-sm pt-1 px-2 ">
          <Link to="/chief-wardens/login">Chief-Warden →</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
