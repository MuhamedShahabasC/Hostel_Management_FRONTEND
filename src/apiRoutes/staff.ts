import { staffAPI } from "../config/api";
import { ILogin } from "../interfaces/auth";

// Login staff
export const login = async (formData: ILogin) =>
  await staffAPI.post("/auth", formData);

// -- CHEF --
// All meal plans
export const allMealPlans = async () =>
  await staffAPI.get("/jango@gmail.com/meals/all");

export const updateMealPlan = async (_id: string, data: any) =>
  await staffAPI.put(`/jango@gmail.com/meals/${_id}`, data);
