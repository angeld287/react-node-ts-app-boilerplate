import { IUser } from "../../interfaces/models/IUser"

export interface ICredentials {
    username: string,
    password: string
}

export interface IUserSlice {
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    user: IUser
}