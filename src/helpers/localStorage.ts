import { ICurrentUser, ILoginResponse, IRole } from "../interfaces/auth";

// Saving locally in the browser
export const saveLocally = (token: string, data: ILoginResponse, role: IRole): void => {
  const saveData = {
    token: token,
    currentUser: data,
    role,
  };
  localStorage.setItem(`Hostel Management`, JSON.stringify(saveData));
};

// Fetching from local storage
export const getLocalData = (): ICurrentUser | null => {
  const localData: string | null = localStorage.getItem(`Hostel Management`);
  if (!localData) return null;
  return JSON.parse(localData);
};

// Remove from local Storage
export const removeLocalData = (): void => {
  localStorage.removeItem("Hostel Management");
};

// Fetch email of current user
export const getUserMail = (): string | undefined => {
  const currentUserData = getLocalData();
  return currentUserData?.currentUser.email;
};

// Fetch token of current user
export const getToken = (): string | undefined => getLocalData()?.token;
