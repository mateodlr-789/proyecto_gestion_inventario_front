import { ILogin } from "./use-login";

export interface IRegister extends ILogin {
    name: string;
    lastName:string
}