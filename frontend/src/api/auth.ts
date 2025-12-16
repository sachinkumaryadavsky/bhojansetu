import api from "./axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "ngo" | "restaurant";
  address: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterPayload) => {
  return api.post("/register", data);
};

export const loginUser = (data: LoginPayload) => {
  return api.post("/login", data);
};
