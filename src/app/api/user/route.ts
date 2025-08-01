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
        const token = request.headers.get("authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - no token" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const data:User = body;
    const newUSer = await userusecase.createUserUsecase(data,token);
    return NextResponse.json(newUSer,{status:201});
    } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create user." },
      { status: 500 }
    );
  }
}