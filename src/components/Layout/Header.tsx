import { Link } from "react-router-dom";
import { headerIcon } from "../../assets/icons/icons";
import LoggedOutHeaderButton from "../UI/LoggedOutHeaderButton";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import LoggedInHeaderButton from "../UI/LoggedInHeaderButton";
import HeaderLinks from "./HeaderLinks";

function Header({ role }: Props) {
  const currentUser = useAppSelector<ICurrentUser | null>(
    (state) => state.currentUser
  );

  return (
    <header className="h-16 bg-white flex shadow-lg">
      <div className="container flex my-auto content-center justify-between gap-1 items-center">
        <Link to="/">
          <span className="flex items-center gap-2">
            <img className="w-9" src={headerIcon} alt="Hostel Management" />
            <h1 className="text-sm lg:text-base">Hostel Management</h1>
          </span>
        </Link>
        <div className="flex gap-7 items-center">
          <div className="hidden lg:flex gap-7">
            {currentUser?.currentUser && <HeaderLinks currentUser={currentUser} />}
          </div>
          {!currentUser ? (
            <LoggedOutHeaderButton role={role} />
          ) : (
            <LoggedInHeaderButton
              currentUser={currentUser}
              role={currentUser.role}
            />
          )}
        </div>
      </div>
    </header>
  );
}

type Role = "student" | "staff" | "chiefWarden";

interface Props {
  role: Role;
}

export default Header;
