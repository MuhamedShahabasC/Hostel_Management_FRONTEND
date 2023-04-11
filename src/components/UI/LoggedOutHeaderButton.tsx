import { Link } from "react-router-dom";
import { staffIcon, studentIcon } from "../../assets/icons/icons";

interface Props {
  role: "staff" | "student" | "chiefWarden";
}

function LoggedOutHeaderButton({ role }: Props) {
  
  return (
    <Link
      to={role === "student" ? "/staffs/login" : "/students/login"}
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
