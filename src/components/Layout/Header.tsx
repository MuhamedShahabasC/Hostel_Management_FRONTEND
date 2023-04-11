import { Link } from "react-router-dom";
import { headerIcon } from "../../assets/icons/icons";
import LoggedOutHeaderButton from "../UI/LoggedOutHeaderButton";

function Header({ role, links, loggedIn = false }: Props) {

  return (
    <header className="h-16 bg-white flex shadow-lg">
      <div className="container flex my-auto content-center justify-between gap-1 items-center">
        <Link to="/">
          <span className="flex items-center gap-2">
            <img className="w-9" src={headerIcon} alt="Hostel Management" />
            <h1 className="text-sm lg:text-base">Hostel Management</h1>
          </span>
        </Link>
        {!loggedIn && <LoggedOutHeaderButton role={role} />}
      </div>
    </header>
  );
}

type Role = "student" | "staff";

interface Props {
  role: Role;
  links?: any[];
  loggedIn?: boolean;
}

export default Header;
