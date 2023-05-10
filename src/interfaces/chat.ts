export interface IMessageChat {
  userName: string;
  message: string;
  profilePic: string;
  date: number | string;
  self?: boolean;
}

export interface IMessage {
  userId: string;
  userName: string;
  role: string;
  message: string;
  profilePic: string;
  date: number;
}
