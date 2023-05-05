export interface IStudent {
  _id?: string;
  name: string;
  email: string;
  department: string;
  gender: "male" | "female";
  password: string;
  mobile: number;
  guardianName: string;
  guardianMobile: number;
  profilePic?: string;
  address?: {
    building: string;
    city: string;
    pin: number;
    state: string;
    country: string;
  };
  country?: string;
  building?: string;
  city?: string;
  pin?: number;
  state?: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  status: StudentStatus;
  remarks?: string;
  mealPlan?: {
    _id: string;
    title: string
  }
  block?: {
    _id: string;
    name: string
  }
  room: string
}

export type StudentStatus = "pending" | "resident" | "rejected" | "departed";

export interface IMealPlanResponse {
  _id: string;
  title: string;
  price: number;
  breakfast: string;
  lunch: string;
  evening: string;
  dinner: string;
  active: true;
  subscribers: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
