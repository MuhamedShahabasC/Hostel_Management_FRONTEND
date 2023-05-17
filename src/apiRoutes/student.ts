import { studentAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { SuccessfulPayment } from "../interfaces/payment";
import { IStudent } from "../interfaces/student";
import { setApiHeader } from "../utils/apiHeader";

// New student admission API
export const newAdmissionAPI = async (studentData: IStudent) =>
  await studentAPI.post("/newAdmission", studentData);

// Block details
export const blocksForAdmissionAPI = async () => await studentAPI.get("/newAdmission/blocks");

// Login
export const login = async (formData: ILogin) => await studentAPI.post("/auth", formData);

// Current student data
export const currentStudentAPI = async () => await studentAPI.get("/", setApiHeader());

// Reset password
export const resetPassword = async (passwordData: IResetPassword) =>
  await studentAPI.patch(`/auth`, passwordData, setApiHeader());

// Update profile image
export const changeProfileImageAPI = async (imageAsBase64: string) =>
  await studentAPI.patch("/", { profilePic: imageAsBase64 }, setApiHeader());

// Update student details
export const updateStudentAPI = async (data: object) =>
  await studentAPI.post("/", data, setApiHeader());

// Active meal plans
export const fetchActiveMealPlans = async () => await studentAPI.get("/newAdmission/mealPlans");

// Selected meal plan
export const mealPlanAPI = async () => await studentAPI.get("/mealPlan", setApiHeader());

// Notices
export const fetchNoticesAPI = async () => await studentAPI.get("/notices", setApiHeader());

// Complaints
export const fetchComplaintsAPI = async (filterBy: string = "") =>
  await studentAPI.get(`/complaints?status=${filterBy}`, setApiHeader());

export const postNewComplaintAPI = async (data: {
  department: "maintenance" | "chef" | "warden";
  message: string;
}) => await studentAPI.post("/complaints", data, setApiHeader());

// Payments
export const fetchPaymentsAPI = async () => await studentAPI.get("/payments", setApiHeader());

export const initiatePaymentAPI = async (amount: number) =>
  await studentAPI.patch(`/payments`, { amount }, setApiHeader());

export const successfulPaymentAPI = async (data: SuccessfulPayment) =>
  await studentAPI.post("/payments", data, setApiHeader());

// Chats
export const fetchAllChatsAPI = async () => await studentAPI.get("/chats", setApiHeader());
