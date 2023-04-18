import axios from "axios";

// Student API
export const studentAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}students`,
});

// Chief Warden API
export const chiefWardenAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}chief-warden`,
});

// Staff API
export const staffAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}staffs`,
});

// Check Authorization API
export const checkAuthAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}checkAuth`,
});