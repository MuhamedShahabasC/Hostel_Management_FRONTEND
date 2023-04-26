import { useEffect, useState } from "react";
import { getLocalData } from "./localStorage";
import { ILoginResponse } from "../interfaces/auth";
import { checkAuthAPI } from "../config/api";
import { setApiHeader } from "./apiHeader";
import { Navigate, Outlet } from "react-router-dom";
import { currentUserActions } from "../store/currentUser";
import { useAppDispatch } from "../App";

// Protected route component for checking if the current user is valid, on every routes
function ProtectedRoute({ role, department }: Props) {
  const [auth, setAuth] = useState<ILoginResponse | null | false>(null);
  const dispatch = useAppDispatch();

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
      if (currentUser.role !== role) {
        dispatch(currentUserActions.login(currentUser));
        return setAuth(false);
      }
      checkAuthAPI
        .get("", setApiHeader(currentUser.token))
        .then(() => {
          // if (department && currentUser.data?.department === department) {
          dispatch(currentUserActions.login(currentUser));
          return setAuth(currentUser);
          // } else setAuth(false);
        })
        .catch(() => {
          dispatch(currentUserActions.logout());
          return setAuth(false);
        });
    } else {
      dispatch(currentUserActions.logout());
      return setAuth(false);
    }
    // eslint-disable-next-line
  }, []);
  if (auth === null) return null;

  return auth ? <Outlet /> : <Navigate to={`/${routeTo(role)}/login`} />;
}

interface Props {
  role: "chiefWarden" | "staff" | "student";
  department?: "maintenance" | "warden" | "chef";
}

export default ProtectedRoute;
