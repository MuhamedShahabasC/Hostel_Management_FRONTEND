import { getToken } from "./localStorage";

// Set header for API calls
export const setApiHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};
