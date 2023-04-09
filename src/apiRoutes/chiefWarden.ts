import { chiefWardenAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";

// Login chief warden
export const login = async (formData: ILogin) =>
  await chiefWardenAPI.post("/login", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await chiefWardenAPI.patch("/auth/chiefwarden@college.com", passwordData);

// -- NOTICES --
// Get all notices
export const getAllNotices = async () =>
  await chiefWardenAPI.get("notices/all");
