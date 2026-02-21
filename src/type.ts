export interface IUser {
    id: number
    name: string
    email: string
    company: string
}

export interface IPost {
    userId: number
    id: number
    title: string
    body: string
}