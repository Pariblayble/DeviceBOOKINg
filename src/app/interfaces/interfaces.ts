export interface IBookingData {
  fromDate: number | null;
  toDate?: number | null;
  needCharge: boolean;
  comments: string;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  devices: IDevice[];
}

export interface IDevice {
  title: string;
  src: string;
  userId: number | null;
  description: string;
  id: number;
  bookData: IBookingData;
}

export interface User {
  id: number;
  name: string;
  secondName: string;
  email: string;
  password: string;
  accessToken?: string;
}
