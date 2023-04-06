import { chiefWardenAPI } from "../config/api";
import { ILogin } from "../interfaces/auth";

// Login chief warden
export const login = async (formData: ILogin) =>
  await chiefWardenAPI.post("/login", formData);

// -- NOTICES --
// Get all notices
export const getAllNotices = async () => await chiefWardenAPI.get('notices/all')