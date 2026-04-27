import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  sendOtp,
  verifyOtp,
  login,
  logout,
  getCurrentUser,
  type SendOtpPayload,
  type VerifyOtpPayload,
  type LoginPayload,
} from "@/utils/authApi";

const USER_KEY = ["authUser"] as const;

// ── Get current user (from localStorage) ─────────────────
export function useCurrentUser() {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: async () => getCurrentUser(),
    staleTime: Infinity,
    retry: false,
  });
}

// ── Check if logged in ────────────────────────────────────
export function useIsLoggedIn() {
  const { data, isLoading } = useCurrentUser();
  return { isLoggedIn: !!data, isLoading };
}

// ── Step 1: Send OTP ──────────────────────────────────────
export function useSendOtp() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => sendOtp(payload),
  });
}

// ── Step 2: Verify OTP ────────────────────────────────────
// No navigation here — component handles tab switch directly
export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
  });
}

// ── Login ─────────────────────────────────────────────────
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(USER_KEY, {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        user_type: data.user_type,
      });
      navigate("/dashboard");
    },
  });
}

// ── Logout ────────────────────────────────────────────────
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/auth");
    },
  });
}
