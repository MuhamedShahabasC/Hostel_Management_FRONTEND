import { useEffect, useState } from "react";
import { getLocalData, removeLocalData } from "./localStorage";
import { ILoginResponse } from "../interfaces/auth";
import { checkAuthAPI } from "../config/api";
import { setApiHeader } from "./apiHeader";
import { Navigate, Outlet } from "react-router-dom";

// Protected route component for checking if the current user is valid, on every routes
function ProtectedRoute({ role }: Props) {
  const [auth, setAuth] = useState<ILoginResponse | null | false>(null);

  const routeTo = (role: string): string | undefined => {
    switch (role) {
      case "chiefWarden":
        return "chief-wardens";
      case "staff":
        return "staffs";
      case "student":
        return "students";
      default:
        break;
    }
  };

  useEffect(() => {
    const currentUser = getLocalData() as ILoginResponse | null;
    if (currentUser) {
      if (currentUser.role !== role) return setAuth(false);
      checkAuthAPI
        .get("", setApiHeader(currentUser?.token as string))
        .then(() => setAuth(currentUser))
        .catch(() => {
          removeLocalData();
          setAuth(false);
        });
    } else setAuth(false);
    // eslint-disable-next-line
  }, []);
  if (auth === null) return null;

  return auth ? <Outlet /> : <Navigate to={`/${routeTo(role)}/login`} />;
}

interface Props {
  role: "chiefWarden" | "staff" | "student";
}

export default ProtectedRoute;
