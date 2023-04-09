export interface ILogin {
  email: string;
  password: string;
}

export interface IResetPassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
