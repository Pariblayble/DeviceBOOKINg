export interface CardElement{
    title: string,
    src: string,
    description: string
}

export interface User{
    id: number,
    name: string,
    secondName: string,
    email: string,
    password: string,
    token?: string
}