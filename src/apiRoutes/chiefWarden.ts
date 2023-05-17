import { chiefWardenAPI } from "../config/api";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { IMealPlan } from "../interfaces/staff";
import { INotice } from "../interfaces/chiefWarden";
import { IComplaintUpdate, StaffDepartment } from "../interfaces/complaint";
import { setApiHeader } from "../utils/apiHeader";

// Login chief warden
export const login = async (formData: ILogin) => await chiefWardenAPI.post("/auth", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await chiefWardenAPI.patch("/auth", passwordData, setApiHeader());

// -- NOTICES --
// Get all notices
export const getAllNotices = async () => await chiefWardenAPI.get("notices/all", setApiHeader());

// Change notice visibility
export const changeNoticeVisibility = async (_id: string, data: INotice) =>
  await chiefWardenAPI.patch(`notices/${_id}`, data, setApiHeader());

// New notice
export const newNotice = async (formData: INotice) =>
  await chiefWardenAPI.post("notices", formData, setApiHeader());

// Edit a notice
export const editNotice = async (_id: string, formData: INotice) =>
  await chiefWardenAPI.put(`notices/${_id}`, formData, setApiHeader());

// Delete a notice
export const deleteNotice = async (_id: string) =>
  await chiefWardenAPI.delete(`notices/${_id}`, setApiHeader());

// Notice statistics
export const noticeStatisticsAPI = async () =>
  await chiefWardenAPI.get("notices/statistics", setApiHeader());

// Payment Statistics
export const paymentStatisticsAPI = async () =>
  await chiefWardenAPI.get("students/paymentStatus", setApiHeader());

// Yearly payment revenue
export const yearlyRevenueAPI = async () =>
  await chiefWardenAPI.get("payments/yearlyRevenue", setApiHeader());

// Chat
export const fetchAllChatsAPI = async (role: "student" | "staff" = "student") =>
  await chiefWardenAPI.get(`/chats/${role}`, setApiHeader());

//
// -- BLOCKS AND ROOMS --
//
// Fetch all blocks
export const fetchAllBlocksAPI = async () => await chiefWardenAPI.get("blocks", setApiHeader());

// Fetch single block
export const fetchBlockAPI = async (blockName: string) =>
  await chiefWardenAPI.get(`/blocks/name/${blockName}`, setApiHeader());

// Check room availability
export const checkRoomAvailability = async (roomCode: string) =>
  await chiefWardenAPI.get(`/blocks/rooms/availability/${roomCode}`, setApiHeader());

// Fetch available rooms
export const fetchAvailableRooms = async (blockId: string) =>
  await chiefWardenAPI.get(`/blocks/rooms/availableRooms/${blockId}`, setApiHeader());

//
// -- STUDENTS --
//
// Fetch all students
export const fetchAllStudentsAPI = async (filterBy: string = "", searchInput: string = "") =>
  chiefWardenAPI.get(`students/all?status=${filterBy}&name=${searchInput}`, setApiHeader());

// Update single student
export const updateSingleStudentAPI = async (_id: string, data: any) =>
  chiefWardenAPI.patch(`students/${_id}`, data, setApiHeader());

//
// -- STAFFS --
//
// Fetch all staffs
export const fetchAllStaffsAPI = async (filterBy: string = "", searchInput: string = "") =>
  chiefWardenAPI.get(`staffs?role=${filterBy}&name=${searchInput}`, setApiHeader());

// Fetch staffs by department
export const fetchStaffsByDeptAPI = async (department: StaffDepartment) =>
  chiefWardenAPI.get(`staffs/department/${department}`, setApiHeader());

// Fetch complaint statistics by staff
export const complaintStatByStaffAPI = async (staff: string) =>
  await chiefWardenAPI.get(`staffs/${staff}`, setApiHeader());

// New staff
export const newStaffAPI = async (formData: any) =>
  await chiefWardenAPI.post(`staffs`, formData, setApiHeader());

//
// -- MEAL PLANS --
//
// Fetch all meal plans
export const fetchAllMealPlans = async () => chiefWardenAPI.get("mealPlans", setApiHeader());

// Add new meal plan
export const addNewMealPlanCW = async (formData: IMealPlan) =>
  chiefWardenAPI.post("mealPlans", formData, setApiHeader());

// Update Meal Plan
export const updateMealPlanCW = async (_id: string, formData: IMealPlan) =>
  await chiefWardenAPI.put(`mealPlans/${_id}`, formData, setApiHeader());

// Change availability of Meal plan
export const changeAvailabilityMealPlanCW = async (_id: string) =>
  await chiefWardenAPI.patch(`mealPlans/${_id}`, setApiHeader());

//
// -- COMPLAINTS --
//
// Fetch all complaints
export const fetchAllComplaintsAPI = async (filterBy: string = "") =>
  chiefWardenAPI.get(`complaints?status=${filterBy}`, setApiHeader());

// Update complaint
export const updateComplaintAPI = async (_id: string, data: IComplaintUpdate) =>
  chiefWardenAPI.patch(`complaints/${_id}`, data, setApiHeader());
