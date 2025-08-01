import { BookSangeetRepository } from "@/core/repositories/IBookSangeet.repository";
import { BookSangeetUsecase } from "@/core/usecases/BookSangeet.usecase";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { NextRequest, NextResponse } from "next/server";
const booksangeetRepository = new BookSangeetRepository();
const userRepository = new UserRepository();
const bookSangeetUsecase = new BookSangeetUsecase(booksangeetRepository,userRepository);

export async function GET(request:NextRequest) {
    try {
        const getByuserId = await bookSangeetUsecase.getAll();
        return NextResponse.json(getByuserId,{status:201});
    }catch (error) {
    console.error("API get Error:", error);
    return NextResponse.json(
      { message: "Failed to get booksangeet." },
      { status: 500 }
    );
  }
}