import { unauthorizedStudentAPI } from "../config/api";
import { IStudent } from "../interfaces/student";

// New student admission API
export const newAdmissionAPI = async (studentData: IStudent) =>
  await unauthorizedStudentAPI.post("/newAdmission", studentData);

// Active meal plans
export const fetchmealPlansAdmission = async () =>
  await unauthorizedStudentAPI.get("/newAdmisison/mealPlans");
