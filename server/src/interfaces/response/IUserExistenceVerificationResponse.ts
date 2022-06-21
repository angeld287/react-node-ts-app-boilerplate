import { IBaseResponse } from "./IBaseResponse";

export default interface IUserExistenceVerificationResponse extends IBaseResponse {
    exist?: boolean,
}