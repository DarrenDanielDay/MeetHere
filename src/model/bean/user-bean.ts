import { Bean } from "./bean";

export interface UserBean extends Bean {
  nickname: string;
  isAdmin: boolean;
  avatar: string;
  email: string;
  mobilephone: string;
  isLoggedIn: boolean;
}

export const defaultUserBean: UserBean = {
  id: -1,
  nickname: "default-user",
  isAdmin: false,
  avatar: "",
  email: "someone@example.com",
  mobilephone: "12345678901",
  isLoggedIn: false
};

export const defaultAdminBean: UserBean = {
  id: -1,
  nickname: "default-admin",
  isAdmin: true,
  avatar: "",
  email: "someone@example.com",
  mobilephone: "12345678901",
  isLoggedIn: false
};

export const emptyUserBean: UserBean = {
  id: 0,
  nickname: "",
  isAdmin: false,
  avatar: "",
  email: "",
  mobilephone: "",
  isLoggedIn: false
};

export const emptyAdminBean: UserBean = {
  id: 0,
  nickname: "",
  isAdmin: true,
  avatar: "",
  email: "",
  mobilephone: "",
  isLoggedIn: false
};
