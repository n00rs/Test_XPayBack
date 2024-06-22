import { ObjectId } from "mongodb";

export type TobjSignupParams = {
  objreqBody: TobjUser;
};

export type TobjUser = {
  _id?: ObjectId;
  strUserEmail: string;
  strPassWord: string;
  strPhone: string;
  strAccPublicKey?: string;
  strAccPrivateKey?: string;
  strRefrPublicKey?: string;
  strRefrPrivateKey?: string;
};

export type TobjReturnSignup = {
  strMessage: string;
  strUserEmail: string;
  strPhone: string;
};

export type TcreateUser = (
  objParams: TobjSignupParams
) => Promise<TobjReturnSignup>;
