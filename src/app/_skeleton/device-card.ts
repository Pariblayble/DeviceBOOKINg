import { IDevice } from "../interfaces/interfaces";

export const fakeDevice: IDevice = {
    id: 1,
    title: "Xiaomi Redmi 10",
    slug: "xiaomi-redmi-10",
    croppedImage: "/assets/skeleton.png",
    fullImage: "/assets/skeleton.png",
    specs: [],
    bookedDevices: [],
    description: " Смартфон Xiaomi Redmi 10 4+64GB Carbon Gray ",
    bookData: {
        userId: null,
        comments: "",
        toDate: null,
        needCharge: false,
        fromDate: null
    }
};
