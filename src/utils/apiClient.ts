// ─────────────────────────────────────────────────────────
// utils/apiClient.ts — base HTTP client
// All API calls go through this so auth headers + base URL
// are handled in one place.
// ─────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://stack-from-scratch-backend.onrender.com"

// ── Token helpers ─────────────────────────────────────────
export const tokenStorage = {
  getAccess:     ()          => localStorage.getItem("access_token"),
  getRefresh:    ()          => localStorage.getItem("refresh_token"),
  setAccess:     (t: string) => localStorage.setItem("access_token", t),
  setRefresh:    (t: string) => localStorage.setItem("refresh_token", t),
  clearAll:      ()          => { localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token") },
}

// ── Core fetch wrapper ────────────────────────────────────
async function request<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
  auth = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (auth) {
    const token = tokenStorage.getAccess()
    if (token) headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  // Try token refresh on 401
  if (res.status === 401 && auth) {
    const refreshed = await tryRefreshToken()
    if (refreshed) {
      headers["Authorization"] = `Bearer ${tokenStorage.getAccess()}`
      const retryRes = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!retryRes.ok) throw await extractError(retryRes)
      return retryRes.json() as Promise<T>
    }
    // Refresh failed — clear tokens
    tokenStorage.clearAll()
    window.location.href = "/auth"
    throw new Error("Session expired. Please log in again.")
  }

  if (!res.ok) throw await extractError(res)
  return res.json() as Promise<T>
}

// ── Try to refresh access token ───────────────────────────
async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = tokenStorage.getRefresh()
  if (!refreshToken) return false

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    if (!res.ok) return false
    const data = await res.json()
    if (data.access_token) {
      tokenStorage.setAccess(data.access_token)
      return true
    }
    return false
  } catch {
    return false
  }
}

// ── Extract readable error message ────────────────────────
async function extractError(res: Response): Promise<Error> {
  try {
    const data = await res.json()
    return new Error(data.detail ?? data.message ?? data.error ?? `Request failed (${res.status})`)
  } catch {
    return new Error(`Request failed (${res.status})`)
  }
}

// ── Exported HTTP methods ─────────────────────────────────
export const api = {
  get:    <T>(path: string, auth = true)                    => request<T>("GET",    path, undefined, auth),
  post:   <T>(path: string, body: unknown, auth = false)    => request<T>("POST",   path, body,      auth),
  put:    <T>(path: string, body: unknown, auth = true)     => request<T>("PUT",    path, body,      auth),
  patch:  <T>(path: string, body: unknown, auth = true)     => request<T>("PATCH",  path, body,      auth),
  delete: <T>(path: string, auth = true)                    => request<T>("DELETE", path, undefined, auth),
}