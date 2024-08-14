export interface ITokenPayload {
  id: string;
  exp?: any;
}

export const tokenVoid: ITokenPayload = {
  id: "",
};
