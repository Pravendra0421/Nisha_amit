import { BookSangeetDto } from "@/core/dtos/BookSangeet.dto";
import { BookSangeetRepository } from "@/core/repositories/IBookSangeet.repository";
import { BookSangeetUsecase } from "@/core/usecases/BookSangeet.usecase";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { NextRequest, NextResponse } from "next/server";
const booksangeetRepository = new BookSangeetRepository();
const userRepository = new UserRepository();
const bookSangeetUsecase = new BookSangeetUsecase(booksangeetRepository,userRepository);


export async function PUT(
    request:NextRequest,
    {params}:{params:Promise<{sangeetId:string}>}
) {
    try {
        const {sangeetId} = await params;
        const data:BookSangeetDto = await request.json();
        const update = await bookSangeetUsecase.updateSangeetUsecase(data,sangeetId);
        return NextResponse.json(update,{status:201});
    }catch (error) {
    console.error("API update Error:", error);
    return NextResponse.json(
      { message: "Failed to update book sangeet." },
      { status: 500 }
    );
  }
}
export async function DELETE(
    request:NextRequest,
    {params}:{params:Promise<{sangeetId:string}>}
) {
    try {
        const {sangeetId} = await params;
        await bookSangeetUsecase.deleteBookSangeet(sangeetId);
        return NextResponse.json(null,{status:201});
    }catch (error) {
    console.error("API delete Error:", error);
    return NextResponse.json(
      { message: "Failed to delete book sangeet." },
      { status: 500 }
    );
  }
}