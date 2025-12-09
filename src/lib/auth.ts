
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getUserIdFromRequest(req: NextRequest): string | null {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: string };

    return decoded.id;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
