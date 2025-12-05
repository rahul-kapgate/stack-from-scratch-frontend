import { apiClient } from "./apiClient";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export function login(email: string, password: string) {
  return apiClient.post<LoginResponse>("/api/auth/login", { email, password });
}
