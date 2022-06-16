import { IUser } from "./models/IUser";

export default interface IUserService {
    login(username: string, password: string): Promise<IUser>
}