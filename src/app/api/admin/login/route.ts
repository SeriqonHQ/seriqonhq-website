import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSessionToken,
  getSessionCookieOptions,
  verifyPassword,
} from "@/lib/admin/auth";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password?.trim();

    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(
      ADMIN_SESSION_COOKIE,
      createSessionToken(),
      getSessionCookieOptions()
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
