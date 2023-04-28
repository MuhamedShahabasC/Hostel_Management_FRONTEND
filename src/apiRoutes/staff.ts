import { staffAPI, unathorizedStaffAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";

// Login staff
export const login = async (formData: ILogin) => await unathorizedStaffAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await staffAPI.patch(`/auth`, passwordData);

export const changeProfileImageAPI = async (imageAsBase64: string) =>
  await staffAPI.patch("/", { profilePic: imageAsBase64 });

// -- CHEF --

export const allMealPlans = async () => await staffAPI.get(`/meals/all`);

export const fetchActiveMealPlans = async () => staffAPI.get(`/meals/activePlans`);

export const updateMealPlan = async (_id: string, data: any) =>
  await staffAPI.put(`/meals/${_id}`, data);

export const changeAvailabilityMealPlan = async (_id: string) =>
  await staffAPI.patch(`/meals/${_id}`);

export const addNewPlan = async (data: any) => await staffAPI.post(`/meals`, data);
