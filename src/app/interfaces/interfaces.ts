import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface IBookingData {
  userId?: number;
  fromDate?: NgbDate;
  toDate?: NgbDate | null;
  needCharge?: boolean;
  comments?: string;
}
export interface IDevice {
  title: string;
  src: string;
  description: string;
  id: number;
  isBooked: boolean;
  bookData: IBookingData;
}

export interface User {
  id: number;
  name: string;
  secondName: string;
  email: string;
  password: string;
  token?: string;
}
