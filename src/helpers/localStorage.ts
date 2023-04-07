// Saving token locally in the browser
export const saveToken = (token: string): void => {
  localStorage.setItem(`Hostel Management`, token);
};

// Fetching token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem(`Hostel Management`);
};
