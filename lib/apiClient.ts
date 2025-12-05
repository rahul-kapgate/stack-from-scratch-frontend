const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  query?: Record<string, string | number | boolean | null | undefined>;
};

// ---- Token helpers (browser-safe) ----

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function isBrowser() {
  return typeof window !== "undefined";
}

function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function saveTokens(accessToken: string, refreshToken?: string) {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

function clearTokens() {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ---- URL helper ----

function buildUrl(path: string, query?: RequestOptions["query"]) {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  const url = new URL(path, BASE_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

// ---- Refresh token call ----
// Adjust the path/body according to your backend.
async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const url = buildUrl("/api/auth/refresh-token");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await res.json().catch(() => null);

  const newAccessToken = data?.accessToken as string | undefined;
  const newRefreshToken = data?.refreshToken as string | undefined;

  if (!newAccessToken) {
    throw new Error("No access token returned from refresh");
  }

  saveTokens(newAccessToken, newRefreshToken);
}

// ---- Core request with "interceptor"-like behavior ----

async function request<TResponse = unknown>(
  path: string,
  options: RequestOptions = {},
  isRetry = false
): Promise<TResponse> {
  const { method = "GET", body, headers, query } = options;

  const url = buildUrl(path, query);

  const accessToken = getAccessToken();

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  // If unauthorized, try refresh once (client-side only)
  if (res.status === 401 && !isRetry && isBrowser() && path !== "/auth/refresh-token") {
    try {
      await refreshAccessToken();
      // Retry original request with new token
      return request<TResponse>(path, options, true);
    } catch (err) {
      clearTokens();
      throw new Error("Session expired. Please log in again.");
    }
  }

  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as TResponse;
}

export const apiClient = {
  get: <T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "GET" }),

  post: <T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "POST", body }),

  put: <T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "PUT", body }),

  patch: <T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "DELETE" }),
};
