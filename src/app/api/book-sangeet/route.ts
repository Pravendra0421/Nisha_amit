import { BookSangeetDto } from "@/core/dtos/BookSangeet.dto";
import { BookSangeetRepository } from "@/core/repositories/IBookSangeet.repository";
import { BookSangeetUsecase } from "@/core/usecases/BookSangeet.usecase";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
const booksangeetRepository = new BookSangeetRepository();
const userRepository = new UserRepository();
const bookSangeetUsecase = new BookSangeetUsecase(booksangeetRepository,userRepository);

export async function POST
(request:NextRequest) {
    try {
        const data:BookSangeetDto = await request.json();
        const userId = await getUserIdFromRequest(request);
        const createSangeet =await bookSangeetUsecase.createSangeetUseCase(data,userId);
        return NextResponse.json(createSangeet,{status:201});
    }catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to get book sangeet." },
      { status: 500 }
    );
  }
}

export async function GET(request:NextRequest) {
    try {
        const userId = await getUserIdFromRequest(request);
        const getByuserId = await bookSangeetUsecase.get(userId);
        return NextResponse.json(getByuserId,{status:201});
    }catch (error) {
    console.error("API get Error:", error);
    return NextResponse.json(
      { message: "Failed to get booksangeet." },
      { status: 500 }
    );
  }
}