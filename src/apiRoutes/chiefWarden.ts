import { chiefWardenAPI } from "../config/api";
import { getUserMail } from "../helpers/localStorage";
import { ILogin, IResetPassword } from "../interfaces/auth";
import { INotice } from "../interfaces/chiefWarden";

// Login chief warden
export const login = async (formData: ILogin) =>
  await chiefWardenAPI.post("/login", formData);

export const resetPassword = async (passwordData: IResetPassword) =>
  await chiefWardenAPI.patch(`/auth/${getUserMail()}`, passwordData);

// -- NOTICES --
// Get all notices
export const getAllNotices = async () =>
  await chiefWardenAPI.get("notices/all");

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
export const deleteNotice = async (_id: string) =>
  await chiefWardenAPI.delete(`notices/${_id}`);

// -- BLOCKS AND ROOMS --
// Fetch all blocks
export const fetchAllBlocks = async () => await chiefWardenAPI.get("blocks");


