import * as yup from "yup";
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
