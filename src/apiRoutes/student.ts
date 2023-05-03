import { studentAPI, unauthorizedStudentAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { IStudent } from "../interfaces/student";

// New student admission API
export const newAdmissionAPI = async (studentData: IStudent) =>
  await unauthorizedStudentAPI.post("/newAdmission", studentData);

// Block details
export const blocksForAdmissionAPI = async () =>
  await unauthorizedStudentAPI.get("/newAdmission/blocks");

// Login
export const login = async (formData: ILogin) =>
  await unauthorizedStudentAPI.post("/auth", formData);

// Reset password
export const resetPassword = async (passwordData: IResetPassword) =>
  await studentAPI.patch(`/auth`, passwordData);

// Update profile image
export const changeProfileImageAPI = async (imageAsBase64: string) =>
  await studentAPI.patch("/", { profilePic: imageAsBase64 });

// Update student details
export const updateStudentAPI = async (data: object) => await studentAPI.post("/", data);

// Active meal plans
export const fetchActiveMealPlans = async () =>
  await unauthorizedStudentAPI.get("/newAdmission/mealPlans");

// Selected meal plan
export const mealPlanAPI = async () => await studentAPI.get("/mealPlan");

// Notices
export const fetchNoticesAPI = async () => await studentAPI.get("/notices");
