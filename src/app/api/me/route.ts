import { NextRequest,NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { UserUsecase } from "@/core/usecases/User.usecase";
import { User } from "@/core/dtos/User.dto";

const userRepository = new UserRepository();
const userusecase = new UserUsecase(userRepository);
export async function GET(req:NextRequest) {
    try {
        let userId:string ;
        try {
            userId=getUserIdFromRequest(req);
            
        } catch (error) {
            return NextResponse.json({ user: null }, { status: 200 });
        }
        const user = await userusecase.findById(userId);
        if (!user) {
            return NextResponse.json({ user: null }, { status: 400 });
        }
        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        console.error("API /me error:", error);
        return NextResponse.json({ user: null }, { status: 400 });
    }
}