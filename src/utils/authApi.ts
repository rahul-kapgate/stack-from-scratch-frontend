// ─────────────────────────────────────────────────────────
// utils/authApi.ts — real backend auth
// Matches FastAPI schemas exactly
// ─────────────────────────────────────────────────────────
import { api, tokenStorage } from "./apiClient";

// ── Types (match FastAPI schemas exactly) ─────────────────

export type UserType = "student" | "professional";

export type AuthUser = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  user_type: UserType;
};

// POST /auth/send-otp
export type SendOtpPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  user_type: UserType;
};

// POST /auth/verify-otp
export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

// POST /auth/login
export type LoginPayload = {
  identifier: string; // email or phone
  password: string;
};

// Response from /auth/send-otp
export type SendOtpResponse = {
  message: string;
  email: string;
};

// Response from /auth/verify-otp
export type VerifyOtpResponse = {
  message: string;
  user_id: number;
  email: string;
};

// Response from /auth/login and /auth/refresh-token
export type TokenResponse = {
  message: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  user_type: UserType;
};

// ── Send OTP — step 1 of signup ───────────────────────────
// Sends ALL user details upfront, backend stores temporarily + sends OTP
export async function sendOtp(
  payload: SendOtpPayload,
): Promise<SendOtpResponse> {
  return api.post("/auth/send-otp", payload);
}

// ── Verify OTP — step 2 of signup ────────────────────────
// Only needs email + otp — backend already has rest from step 1
export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  return api.post("/auth/verify-otp", payload);
}

// ── Login ─────────────────────────────────────────────────
// identifier = email or phone number
export async function login(payload: LoginPayload): Promise<TokenResponse> {
  const data = await api.post<TokenResponse>("/auth/login", payload);
  tokenStorage.setAccess(data.access_token);
  tokenStorage.setRefresh(data.refresh_token);
  saveCurrentUser(data);
  return data;
}

// ── Refresh token ─────────────────────────────────────────
export async function refreshToken(): Promise<TokenResponse> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) throw new Error("No refresh token available");
  const data = await api.post<TokenResponse>("/auth/refresh-token", {
    refresh_token: refresh,
  });
  tokenStorage.setAccess(data.access_token);
  tokenStorage.setRefresh(data.refresh_token);
  saveCurrentUser(data);
  return data;
}

// ── Logout (client-side only) ─────────────────────────────
export async function logout(): Promise<void> {
  tokenStorage.clearAll();
  clearCurrentUser();
}

// ── Get stored user from localStorage ────────────────────
export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("auth_user");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

// ── Save user to localStorage after login ─────────────────
export function saveCurrentUser(data: TokenResponse): void {
  const user: AuthUser = {
    user_id: data.user_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    user_type: data.user_type,
  };
  localStorage.setItem("auth_user", JSON.stringify(user));
}

// ── Clear user ────────────────────────────────────────────
export function clearCurrentUser(): void {
  localStorage.removeItem("auth_user");
}
