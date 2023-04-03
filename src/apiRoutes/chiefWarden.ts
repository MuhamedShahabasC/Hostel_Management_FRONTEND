import { chiefWardenAPI } from "../config/api";

// Login chief warden
export const login = async (formData: loginCW) =>
  await chiefWardenAPI.post("/login", formData);
interface loginCW {
  email: string;
  password: string;
}
