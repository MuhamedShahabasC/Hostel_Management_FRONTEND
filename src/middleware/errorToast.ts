import { toast } from "react-toastify";
export const errorToast = (message: string): void => {
  toast.error(message);
};
