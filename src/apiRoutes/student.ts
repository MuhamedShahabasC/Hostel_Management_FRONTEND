import { studentAPI } from "../config/api";
import { IStudent } from "../interfaces/student";

// New student admission API
export const newAdmissionAPI = async (studentData: IStudent) =>
  await studentAPI.post("/", studentData);
