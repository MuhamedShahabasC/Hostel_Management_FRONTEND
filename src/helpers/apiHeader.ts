// Set header for API calls
export const setApiHeader = (token: string) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
};
