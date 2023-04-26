export interface INotice {
  _id?: string;
  title: string;
  message: string;
  visibility: boolean;
  audience?: {
    student: boolean;
    staff: boolean;
  };
  date?: string;
}
// New notice schema interface
export interface INewNotice {
  title: string;
  message: string;
  visibility: boolean;
  student: boolean | undefined;
  staff: boolean | undefined;
}

