import * as yup from "yup";

// Update complaint
export const updateComplaintSchema = yup.object().shape({
  staff: yup.string().trim().required("Staff is required"),
  status: yup
    .string()
    .trim()
    .required("Complaint status is required")
    .oneOf(["initiated", "rejected", "approval", "issued", "resolved"], "Invalid Complaint status"),
  oldStatus: yup
    .string()
    .trim()
    .required("Complaint status is required")
    .oneOf(["initiated", "rejected", "approval", "issued", "resolved"], "Invalid Complaint status"),
  remarks: yup
    .string()
    .trim()
    .min(4, "Remarks must be longer than 4 characters")
    .max(250, "Remarks must be shorter than 250 characters"),
});

// Update complaint by staff
export const updateComplaintByStaff = yup.object().shape({
  status: yup
    .string()
    .trim()
    .required("Complaint status is required")
    .oneOf(["approval"], "Invalid Complaint status"),
  remarks: yup
    .string()
    .trim()
    .min(4, "Remarks must be longer than 4 characters")
    .max(250, "Remarks must be shorter than 250 characters"),
});

// Post a complaint by student
export const newComplaintSchema = yup.object().shape({
  department: yup
    .string()
    .trim()
    .required("Complaint status is required")
    .oneOf(["maintenance", "chef", "warden"], "Invalid Complaint status"),
  message: yup
    .string()
    .trim()
    .min(10, "Remarks must be longer than 10 characters")
    .max(250, "Remarks must be shorter than 250 characters"),
});
