import { NextRequest } from "next/server";
import { admin } from "./firebaseAdmin";
export async function getUserIdFromRequest(request:NextRequest):Promise<string> {
    const authHeader= request.headers.get("authorization");
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new Error("unauthorized")
    }
    const token =authHeader.split("Bearer ")[1];
    const decodeToken = await admin.auth().verifyIdToken(token);
    return decodeToken.uid;
}