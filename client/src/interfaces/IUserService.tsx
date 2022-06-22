import { IResponse } from "./models/IResponse";
import { IUser } from "./models/IUser";

export default interface IUserService {
    login(username: string, password: string): Promise<IResponse>;

    logout(): Promise<IResponse>;

    getSession(): Promise<IResponse>;
}