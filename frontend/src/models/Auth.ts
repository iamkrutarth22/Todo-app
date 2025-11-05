import type { IUser } from "./User";

export interface IAuth {
    accessToken:string|null,
    user:IUser
}