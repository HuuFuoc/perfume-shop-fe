// ── Auth Token Cookie Helper ──────────────────────────────────────────────────
// Stores the JWT access token in a browser cookie (not localStorage) so that
// it persists across browser restarts and can be cleared server-side if needed.

const TOKEN_KEY = "auth_token";
const TOKEN_EXPIRY_DAYS = 7;

/**
 * Persist the JWT access token in a cookie.
 * Expires after TOKEN_EXPIRY_DAYS days.
 */
export function setAuthToken(token: string): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + TOKEN_EXPIRY_DAYS);
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
}

/**
 * Read the JWT access token from the cookie.
 * Returns null if no token is stored.
 */
export function getAuthToken(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Remove the JWT access token cookie (used on logout / session expiry).
 */
export function removeAuthToken(): void {
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Decode the JWT payload (no signature verification — client-side only).
 * Returns null if no token exists or the token is malformed.
 */
export function getTokenPayload<T = Record<string, unknown>>(): T | null {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)) as T;
  } catch {
    return null;
  }
}

/** Numeric role values embedded in the JWT. */
export const TOKEN_ROLE = {
  ADMIN: 0,
  USER: 2,
} as const;

/**
 * Extract the numeric `role` field from the stored JWT payload.
 * Returns null if no token or no role claim.
 */
export function getRoleFromToken(): number | null {
  const payload = getTokenPayload<{ role?: number }>();
  return payload?.role ?? null;
}
