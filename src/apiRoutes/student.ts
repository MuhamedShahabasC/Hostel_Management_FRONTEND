import { unauthorizedStudentAPI } from "../config/api";
import { ILogin } from "../interfaces/auth";
import { IStudent } from "../interfaces/student";

// New student admission API
export const newAdmissionAPI = async (studentData: IStudent) =>
  await unauthorizedStudentAPI.post("/newAdmission", studentData);

// Login
export const login = async (formData: ILogin) =>
  await unauthorizedStudentAPI.post("/auth", formData);

// Active meal plans
export const fetchmealPlansAdmission = async () =>
  await unauthorizedStudentAPI.get("/newAdmisison/mealPlans");
