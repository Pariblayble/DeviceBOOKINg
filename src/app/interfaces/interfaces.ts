import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface IBookingData {
  fromDate: NgbDate | null;
  toDate?: NgbDate | null;
  needCharge: boolean;
  comments: string;
}
export interface IDevice {
  title: string;
  src: string;
  ownerId: number | null;
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
