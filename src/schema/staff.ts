import * as yup from "yup";

// New staff schema
export const newStaffSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) => /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)),
  name: yup.string().required().trim().min(4, "Invalid staff name").max(20, "Invalid staff name"),
  password: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
  mobile: yup
    .string()
    .required()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  gender: yup.string().required().oneOf(["female", "male"], "Invalid gender"),
  role: yup.string().required().oneOf(["maintenance", "chef", "wardenF"], "Invalid Role"),
  building: yup.string().required().trim().min(4, "Invalid building").max(16, "Invalid building"),
  city: yup.string().required().trim().min(4, "Invalid city").max(16, "Invalid city"),
  pin: yup
    .string()
    .trim()
    .required()
    .matches(/^[0-9]{6}$/, "Invalid Pin Code"),
  state: yup.string().required().trim().min(4, "Invalid state").max(16, "Invalid state"),
  country: yup.string().required().trim().min(4, "Invalid country").max(16, "Invalid country"),
});

// Meal Plan schema
export const mealPlanSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required.")
    .trim()
    .min(5, "Title must be longer than 5 characters")
    .max(15, "Title must be shorter than 15 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive()
    .min(1000, "Minimum 1K")
    .max(10000, "Maximum 10K"),
  breakfast: yup
    .string()
    .required("Breakfast is required")
    .trim()
    .min(5, "Breakfast must be longer than 10 characters")
    .max(100, "Breakfast must be shorter than 200 characters"),
  lunch: yup
    .string()
    .required("Lunch is required")
    .trim()
    .min(5, "Lunch must be longer than 10 characters")
    .max(100, "Lunch must be shorter than 200 characters"),
  evening: yup
    .string()
    .required("Evening is required")
    .trim()
    .min(5, "Evening must be longer than 10 characters")
    .max(100, "Evening must be shorter than 200 characters"),
  dinner: yup
    .string()
    .required("Dinner is required")
    .trim()
    .min(5, "Dinner must be longer than 10 characters")
    .max(100, "Dinner must be shorter than 200 characters"),
  active: yup.bool().oneOf([true, false], "Must be true or false"),
  subscribers: yup.number().positive().integer(),
});

// Payment Schema for warden
export const monthlyPaymentSchema = yup.object().shape({
  additionalAmount: yup
    .number()
    .required()
    .integer("Invalid Number")
    .moreThan(-1, "Invalid Number"),
});
