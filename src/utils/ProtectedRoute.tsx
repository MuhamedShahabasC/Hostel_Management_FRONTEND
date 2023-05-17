import { useEffect, useState } from "react";
import { getLocalData } from "./localStorage";
import { ICurrentUser, ICurrentUserDetails, ILoginResponse } from "../interfaces/auth";
import { checkAuthAPI } from "../config/api";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { currentUserActions } from "../store/currentUser";
import { useAppDispatch } from "../App";

// Protected route component for checking if the current user is valid, on every routes
function ProtectedRoute({ role, department }: Props) {
  const [auth, setAuth] = useState<ILoginResponse | ICurrentUser | null | false>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    const localData = getLocalData() as ICurrentUser | null;
    const currentUser = localData?.currentUser as ICurrentUserDetails;
    if (!localData || !currentUser) {
      dispatch(currentUserActions.logout());
      return setAuth(false);
    }
    checkAuthAPI
      .get("", {
        headers: {
          Authorization: `Bearer ${localData.token}`,
        },
      })
      .then(() => {
        if (!department) {
          dispatch(currentUserActions.login(localData));
          return setAuth(localData);
        }
        if (department !== currentUser.department) {
          dispatch(currentUserActions.login(currentUser));
          setAuth(localData);
          return navigate(`/staffs/dashboard`);
        }
        dispatch(currentUserActions.login(localData));
        return setAuth(localData);
      })
      .catch(() => {
        dispatch(currentUserActions.logout());
        return setAuth(false);
      });
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
