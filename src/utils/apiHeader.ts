import { getToken } from "./localStorage";

// Set header for API calls
export const setApiHeader = (token?: string) => {
  token = !token ? getToken() : token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
