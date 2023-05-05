import { chiefWardenAPI, unauthorizedChiefWardenAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { IMealPlan } from "../interfaces/staff";
import { INotice } from "../interfaces/chiefWarden";
import { IComplaintUpdate, StaffDepartment } from "../interfaces/complaint";

// Login chief warden
export const login = async (formData: ILogin) =>
  await unauthorizedChiefWardenAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await chiefWardenAPI.patch("/auth", passwordData);

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

// Notice statistics
export const noticeStatisticsAPI = async () => await chiefWardenAPI.get("notices/statistics");

//
// -- BLOCKS AND ROOMS --
//
// Fetch all blocks
export const fetchAllBlocks = async () => await chiefWardenAPI.get("blocks");

// Check room availability
export const checkRoomAvailability = async (roomCode: string) =>
  await chiefWardenAPI.get(`/blocks/rooms/availability/${roomCode}`);

// Fetch available rooms
export const fetchAvailableRooms = async (blockId: string) =>
  await chiefWardenAPI.get(`/blocks/rooms/availableRooms/${blockId}`);

//
// -- STUDENTS --
//
// Fetch all students
export const fetchAllStudentsAPI = async () => chiefWardenAPI.get("students/all");

// Update single student
export const updateSingleStudentAPI = async (_id: string, data: any) =>
  chiefWardenAPI.patch(`students/${_id}`, data);

//
// -- STAFFS --
//
// Fetch staffs by department
export const fetchStaffsByDeptAPI = async (department: StaffDepartment) =>
  chiefWardenAPI.get(`staffs/department/${department}`);

//
// -- MEAL PLANS --
//
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

//
// -- COMPLAINTS --
//
// Fetch all complaints
export const fetchAllComplaintsAPI = async () => chiefWardenAPI.get("complaints");

// Update complaint
export const updateComplaintAPI = async (_id: string, data: IComplaintUpdate) =>
  chiefWardenAPI.patch(`complaints/${_id}`, data);
