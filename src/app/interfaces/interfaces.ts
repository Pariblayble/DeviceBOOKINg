export interface IBookingData {
  userId: number | null;
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
  slug: string;
  croppedImage: string;
  fullImage: string;
  description: string;
  specs: IDeviceSpec[];
  category?: ICategory;
  id: number;
  bookedDevices?: IBookedDevice[];
  bookData: IBookingData;
}

export interface IBookedDevice {
  id: number;
  userId: number;
  deviceId: number;
  device: IDevice;
  comments: string;
  needCharge: boolean;
  isEnded: boolean | undefined;
  fromDate: number;
  toDate: number;
}

export interface IDeviceSpec {
  title: string;
  details: string;
}

export interface IUserCredentials {
  accessToken: string;
}

export interface IUser {
  id: number;
  name: string;
  secondName: string;
  email: string;
  avatarUrl: string;
}
