import { staffAPI, unathorizedStaffAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { IComplaintUpdateByStaff } from "../interfaces/complaint";

// Login staff
export const login = async (formData: ILogin) => await unathorizedStaffAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await staffAPI.patch(`/auth`, passwordData);

export const changeProfileImageAPI = async (imageAsBase64: string) =>
  await staffAPI.patch("/", { profilePic: imageAsBase64 });

//
// -- WARDEN --
//
export const fetchAllStudentsAPI = (filterBy: string = "", searchInput: string = "") =>
  staffAPI.get(`/students?status=${filterBy}&name=${searchInput}`);

export const updateStudentPaymentAPI = (
  studentId: string,
  formData: { additionalAmount: number }
) => staffAPI.patch(`/students/${studentId}`, formData);

export const fetchPaymentsAPI = (searchInput: string = "") =>
  staffAPI.get(`/payments?student=${searchInput}`);

//
// -- CHEF --
//
export const allMealPlans = async () => await staffAPI.get(`/meals/all`);

export const fetchActiveMealPlans = async () => staffAPI.get(`/meals/activePlans`);

export const updateMealPlan = async (_id: string, data: any) =>
  await staffAPI.put(`/meals/${_id}`, data);

export const changeAvailabilityMealPlan = async (_id: string) =>
  await staffAPI.patch(`/meals/${_id}`);

export const addNewPlan = async (data: any) => await staffAPI.post(`/meals`, data);

//
// -- COMPLAINTS
//

export const complaintsByStaffAPI = async (filterBy: string = "") =>
  await staffAPI.get(`/complaints/?status=${filterBy}`);

export const updateComplaintAPI = async (_id: string, formData: IComplaintUpdateByStaff) =>
  await staffAPI.patch(`/complaints/${_id}`, formData);

// -- NOTICES --
export const fetchNoticesAPI = async () => await staffAPI.get("/notices");

// -- DASHBOARD --
export const fetchDashboardAPI = async () => await staffAPI.get("/dashboard");

// -- CHAT --
export const fetchAllChatsAPI = async () => await staffAPI.get("/chats");
