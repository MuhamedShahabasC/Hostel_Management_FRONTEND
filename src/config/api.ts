import axios from "axios";
import { getToken } from "../helpers/localStorage";

// --- Student API ---
// Authorized
export const studentAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/students`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
// Unuthorized
export const unauthorizedStudentAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/students`,
});

// --- Chief Warden API ---
// Authorized
export const chiefWardenAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/chief-warden`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
// Unauthorized
export const unauthorizedChiefWardenAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/chief-warden`,
});

// --- Staff API ---
// Authorized
export const staffAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/staffs`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
// Unauthorized
export const unathorizedStaffAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/staffs`,
});

// Check Authorization API
export const checkAuthAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/checkAuth`,
});
