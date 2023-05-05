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
