// import { NextRequest } from "next/server";
// export async function getUserIdFromRequest(request:NextRequest):Promise<string> {
//     const authHeader= request.headers.get("authorization");
//     if(!authHeader || !authHeader.startsWith("Bearer")){
//         throw new Error("unauthorized")
//     }
//     const token =authHeader.split("Bearer ")[1];
//     return token
// }
// lib/auth.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getUserIdFromRequest(req: NextRequest): string {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: string };

    return decoded.id;
  } catch (error) {
    console.error("Auth error:", error);
    throw new Error("Unauthorized");
  }
}
