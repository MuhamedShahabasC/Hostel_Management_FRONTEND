import { useAppSelector } from "../App";
import { ICurrentUser } from "../interfaces/auth";

function useCurrentEmail() {
  const currentUser = useAppSelector<ICurrentUser | null>(
    (state) => state.currentUser
  );
  return currentUser?.currentUser.email;
}

export default useCurrentEmail;
