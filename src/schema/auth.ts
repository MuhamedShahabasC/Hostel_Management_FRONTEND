import * as yup from "yup";

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
