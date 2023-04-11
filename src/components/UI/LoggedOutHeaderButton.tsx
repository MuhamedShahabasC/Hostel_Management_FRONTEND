import { Link } from "react-router-dom";
import { staffIcon, studentIcon } from "../../assets/icons/icons";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../store/currentUser";

interface Props {
  role: "staff" | "student";
}

function LoggedOutHeaderButton({ role }: Props) {
  const dispatch = useDispatch();
  return (
    <Link
    //   to={role === "staff" ? "/students/login" : "/staffs/login"}
      to={role === "staff" ? "/staffs/login" : "/staffs/login"}
      onClick={() => dispatch(currentUserActions.logout())} // remove
    >
      <div className="flex gap-6">
        <button className="header-btn">
          <img
            className="h-7 mr-1"
            src={role === "staff" ? studentIcon : staffIcon}
            alt="icon"
          />
          <span className="text-xs lg:text-base lg:block">
            {role === "staff" ? "Student" : "Staff"}
          </span>
        </button>
      </div>
    </Link>
  );
}

export default LoggedOutHeaderButton;
