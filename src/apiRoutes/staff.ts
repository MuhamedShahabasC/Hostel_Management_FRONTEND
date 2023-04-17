import { staffAPI } from "../config/api";
import { getUserMail } from "../helpers/localStorage";
import { ILogin, IResetPassword } from "../interfaces/auth";

// Login staff
export const login = async (formData: ILogin) =>
  await staffAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await staffAPI.patch(`/auth/${getUserMail()}`, passwordData);

// -- CHEF --

export const allMealPlans = async () =>
  await staffAPI.get(`/${getUserMail()}/meals/all`);

export const fetchActiveMealPlans = async () =>
  staffAPI.get(`/${getUserMail()}/meals/activePlans`);

export const fetchmealPlansAdmission = async () =>
  staffAPI.get(`/meals/activePlans`);

export const updateMealPlan = async (_id: string, data: any) =>
  await staffAPI.put(`/${getUserMail()}/meals/${_id}`, data);

export const changeAvailabilityMealPlan = async (_id: string) =>
  await staffAPI.patch(`/${getUserMail()}/meals/${_id}`);

export const addNewPlan = async (data: any) =>
  await staffAPI.post(`/${getUserMail()}/meals`, data);
