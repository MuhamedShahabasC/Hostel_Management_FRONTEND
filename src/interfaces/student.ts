
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
  remarks?: string;
}
