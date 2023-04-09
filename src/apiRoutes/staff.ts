import { staffAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";

// Login staff
export const login = async (formData: ILogin) =>
  await staffAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await staffAPI.patch("/auth/jango@gmail.com", passwordData);

// -- CHEF --

export const allMealPlans = async () =>
  await staffAPI.get("/jango@gmail.com/meals/all");

export const updateMealPlan = async (_id: string, data: any) =>
  await staffAPI.put(`/jango@gmail.com/meals/${_id}`, data);

export const changeAvailabilityMealPlan = async (_id: string) =>
  await staffAPI.patch(`/jango@gmail.com/meals/${_id}`);

export const addNewPlan = async (data: any) =>
  await staffAPI.post("/jango@gmail.com/meals", data);
