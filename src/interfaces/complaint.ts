export interface IComplaint extends IComplaintInput {
  _id: string;
  remarks: string;
  createdAt?: string;
  updatedAt?: string;
}

export type StaffDepartment = "maintenance" | "chef" | "warden";

export type ComplaintStatus = "initiated" | "rejected" | "issued" | "approval" | "resolved";

export interface IComplaintInput {
  student: {
    name: string;
    _id: string;
    email: string;
  };
  message: string;
  status: ComplaintStatus;
  staff: {
    name: string;
    _id: string;
    email: string;
  };
  department: StaffDepartment;
}

export interface IComplaintUpdate {
  oldStatus: string;
  staff: string;
  status: string;
}