import { staffAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { IComplaintUpdateByStaff } from "../interfaces/complaint";
import { setApiHeader } from "../utils/apiHeader";

// Login staff
export const login = async (formData: ILogin) => await staffAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await staffAPI.patch(`/auth`, passwordData, setApiHeader());

export const changeProfileImageAPI = async (imageAsBase64: string) =>
  await staffAPI.patch("/", { profilePic: imageAsBase64 }, setApiHeader());

//
// -- WARDEN --
//
export const fetchAllStudentsAPI = (filterBy: string = "", searchInput: string = "") =>
  staffAPI.get(`/students?status=${filterBy}&name=${searchInput}`, setApiHeader());

export const updateStudentPaymentAPI = (
  studentId: string,
  formData: { additionalAmount: number }
) => staffAPI.patch(`/students/${studentId}`, formData, setApiHeader());

export const fetchPaymentsAPI = (searchInput: string = "") =>
  staffAPI.get(`/payments?refId=${searchInput}`, setApiHeader());

//
// -- CHEF --
//
export const allMealPlans = async () => await staffAPI.get(`/meals/all`, setApiHeader());

export const fetchActiveMealPlans = async () => staffAPI.get(`/meals/activePlans`, setApiHeader());

export const updateMealPlan = async (_id: string, data: any) =>
  await staffAPI.put(`/meals/${_id}`, data, setApiHeader());

export const changeAvailabilityMealPlanAPI = async (_id: string) =>
  await staffAPI.patch(`/meals/${_id}`, {}, setApiHeader());

export const addNewPlan = async (data: any) => await staffAPI.post(`/meals`, data, setApiHeader());

// -- COMPLAINTS --
export const complaintsByStaffAPI = async (filterBy: string = "") =>
  await staffAPI.get(`/complaints/?status=${filterBy}`, setApiHeader());

export const updateComplaintAPI = async (_id: string, formData: IComplaintUpdateByStaff) =>
  await staffAPI.patch(`/complaints/${_id}`, formData, setApiHeader());

// -- NOTICES --
export const fetchNoticesAPI = async () => await staffAPI.get("/notices", setApiHeader());

// -- DASHBOARD --
export const fetchDashboardAPI = async () => await staffAPI.get("/dashboard", setApiHeader());

// -- CHAT --
export const fetchAllChatsAPI = async () => await staffAPI.get("/chats", setApiHeader());

//
// -- MAINTENANCE --
//

export const fetchAllBlocksAPI = async () => await staffAPI.get("/maintenance", setApiHeader());

export const fetchBlockAPI = async (blockName: string) =>
  await staffAPI.get(`/maintenance/${blockName}`, setApiHeader());

export const changeRoomAvailabilityAPI = async (roomCode: string) =>
  staffAPI.patch(`/maintenance/room/${roomCode}`, setApiHeader());
