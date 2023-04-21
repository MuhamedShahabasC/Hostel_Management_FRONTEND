import { chiefWardenAPI, unauthorizedChiefWardenAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { IMealPlan } from "../interfaces/chef";
import { INotice } from "../interfaces/chiefWarden";

// Login chief warden
export const login = async (formData: ILogin) =>
  await unauthorizedChiefWardenAPI.post("/login", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await chiefWardenAPI.patch("auth", passwordData);

// -- NOTICES --
// Get all notices
export const getAllNotices = async () => await chiefWardenAPI.get("notices/all");

// Change notice visibility
export const changeNoticeVisibility = async (_id: string, data: INotice) =>
  await chiefWardenAPI.patch(`notices/${_id}`, data);

// New notice
export const newNotice = async (formData: INotice) =>
  await chiefWardenAPI.post("notices", formData);

// Edit a notice
export const editNotice = async (_id: string, formData: INotice) =>
  await chiefWardenAPI.put(`notices/${_id}`, formData);

// Delete a notice
export const deleteNotice = async (_id: string) => await chiefWardenAPI.delete(`notices/${_id}`);

// -- BLOCKS AND ROOMS --
// Fetch all blocks
export const fetchAllBlocks = async () => await chiefWardenAPI.get("blocks");

// -- STUDENTS --
// Fetch all students
export const fetchAllStudents = async () => chiefWardenAPI.get("students");

// -- MEAL PLANS --
// Fetch all meal plans
export const fetchAllMealPlans = async () => chiefWardenAPI.get("mealPlans");

// Add new meal plan
export const addNewMealPlanCW = async (formData: IMealPlan) =>
  chiefWardenAPI.post("mealPlans", formData);

// Update Meal Plan
export const updateMealPlanCW = async (_id: string, formData: IMealPlan) =>
  await chiefWardenAPI.put(`mealPlans/${_id}`, formData);

// Change availability of Meal plan
export const changeAvailabilityMealPlanCW = async (_id: string) =>
  await chiefWardenAPI.patch(`mealPlans/${_id}`);
