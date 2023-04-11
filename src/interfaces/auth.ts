export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status?: string;
  data: {
    _id: string;
    email: string;
    name: string;
    mobile: string;
    department?: "maintenance" | "warden" | "chef";
  };
  token: string;
  role: "staff" | "chiefWarden" | "student";
}

export interface ICurrentUser {
  currentUser: {
    _id: string;
    email: string;
    name: string;
    mobile: string;
    department?: "maintenance" | "warden" | "chef";
    profilePic?: string
  };
  token: string;
  role: "staff" | "chiefWarden" | "student";
}

export interface IResetPassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type IRole = "student" | "chiefWarden" | "staff";
