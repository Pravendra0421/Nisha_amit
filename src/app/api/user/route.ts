import { NextRequest,NextResponse } from "next/server";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { UserUsecase } from "@/core/usecases/User.usecase";
import { User } from "@/core/dtos/User.dto";

const userRepository = new UserRepository();
const userusecase = new UserUsecase(userRepository);
export async function POST(
    request:NextRequest
) {
    try {
    const body = await request.json();
    const data:User = body;
    const newUSer = await userusecase.LoginandSignup(data);
    const res = NextResponse.json({
      success:true,
      newUSer
    })
    res.cookies.set("token",newUSer.token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds

    })
    return res;
    } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create user." },
      { status: 500 }
    );
  }
}
export async function GET(req:NextRequest,res:NextResponse) {
  try {
    const total = await userusecase.TotalUser();
    return NextResponse.json(total,{status:201});
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to get total user." },
      { status: 500 }
    );
  }
}