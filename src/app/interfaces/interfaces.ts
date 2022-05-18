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
    bookData: IBookingData;
}

export interface IDeviceSpec {
    title: string;
    details: string;
}

export interface User {
    id: number;
    name: string;
    secondName: string;
    email: string;
    password: string;
    accessToken?: string;
}
