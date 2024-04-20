export interface IError {
  reason: string;
}

export interface ISignUpResponse {
  id: number;
}

export interface ICreateChat {
  title: string;
}

export interface IChangeUser {
  users: number[];
  chatId: number;
}

export interface IChatToken {
  token: string;
}

export interface IApiResponse {
  status: number;
  statusText: string;
  response: Record<string, any>;
}

export type EntityResponse<T> = Promise<T | IApiResponse> | never;


export type TSignin = {
  login: string;
  password: string;
}

export type TSignup = {
  email: string;
  first_name: string;
  login: string;
  password: string;
  phone: string;
  second_name: string;
}

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  login: string;
  password: string;
  phone: string;
  second_name: string;
  avatar: string;
}

export type TPassword = {
  oldPassword: string;
  newPassword: string;
}

export interface IUserMessage {
  first_name: string,
  second_name: string,
  display_name?: string,
  login: string,
  avatar: string | null
}

interface ILastMessage {
  user: IUserMessage | null,
  time: string,
  content: string,
  id: number

}

export interface IChatItem {
  id: number;
  title: string,
  avatar: string | null,
  created_by: number;
  unread_count: number;
  last_message: ILastMessage | null
}

export type TCreateChat = {
  title: string
}

export type TDeleteChat = {
  chatId: number
}

export type TAddUsers = {
  users: Array<number>
  chatId: number
}

export type TDeleteUsers = {
  users: Array<number>
  chatId: number
}

export type TChatUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
}
