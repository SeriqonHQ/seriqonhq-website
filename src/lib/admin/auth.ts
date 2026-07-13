import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/types";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    ""
  );
}

export function createSessionToken(): string {
  const secret = getSessionSecret();

  return createHmac("sha256", secret)
    .update("seriqon-admin-authenticated")
    .digest("hex");
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !password) {
    return false;
  }

  return password === adminPassword;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !getSessionSecret()) {
    return false;
  }

  const expected = createSessionToken();

  try {
    const tokenBuffer = Buffer.from(token);
    const expectedBuffer = Buffer.from(expected);

    if (tokenBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(tokenBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return verifySessionToken(token);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function requireAdminApi(): Promise<boolean> {
  return isAdminAuthenticated();
}
