import * as yup from "yup";

// Login Request
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Required")
    .test("isvalidEmail", "Invalid e-Mail", (arg) => /[a-z0-9]+@[a-z0-9]+/i.test(arg)),
  password: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
});

// Reset password 
export const resetPasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
  newPassword: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
  confirmNewPassword: yup
    .string()
    .trim()
    .required("Required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
})