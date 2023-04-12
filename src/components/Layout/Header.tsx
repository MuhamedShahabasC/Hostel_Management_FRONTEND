import { Link } from "react-router-dom";
import { emailIcon, headerIcon, mobileIcon } from "../../assets/icons/icons";
import LoggedOutHeaderButton from "../UI/LoggedOutHeaderButton";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import LoggedInHeaderButton from "../UI/LoggedInHeaderButton";
import HeaderLinks from "./HeaderLinks";

function Header({ role, newAdmission }: Props) {
  const currentUser = useAppSelector<ICurrentUser | null>(
    (state) => state.currentUser
  );

  const newAdmissionLinks = (
    <div className="flex gap-5 text-sm text-primary font-black">
      <Link to="/call">
        <div className="flex items-center gap-1 p-1 rounded hover:shadow-lg active:shadow-inner">
          <img className="h-6" src={mobileIcon} alt="contact" />
          <span>Contact</span>
        </div>
      </Link>
      <Link to="/contact">
        <div className="flex items-center gap-1 p-1 rounded hover:shadow-lg active:shadow-inner">
          <img className="h-6" src={emailIcon} alt="email" />
          <span>Mail</span>
        </div>
      </Link>
    </div>
  );

  return (
    <header className="h-16 bg-white flex shadow-lg">
      <div className="h-16 container flex my-auto content-center justify-between gap-1 items-center">
        <Link to="/">
          <span className="flex items-center gap-2">
            <img className="w-9" src={headerIcon} alt="Hostel Management" />
            <h1 className="text-sm lg:text-base">Hostel Management</h1>
          </span>
        </Link>
        <div className="flex gap-7 items-center">
          <div className="hidden lg:flex gap-7">
            {newAdmission && !currentUser && newAdmissionLinks}
            {currentUser?.currentUser && (
              <HeaderLinks currentUser={currentUser} />
            )}
          </div>
          {!currentUser ? (
            <LoggedOutHeaderButton role={role} />
          ) : (
            <LoggedInHeaderButton
              currentUser={currentUser && currentUser}
              role={currentUser.role}
            >
              {currentUser?.currentUser && (
                <HeaderLinks currentUser={currentUser} />
              )}
            </LoggedInHeaderButton>
          )}
        </div>
      </div>
    </header>
  );
}

type Role = "student" | "staff" | "chiefWarden";

interface Props {
  role: Role;
  newAdmission?: boolean;
}

export default Header;
