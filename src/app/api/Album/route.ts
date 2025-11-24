import { AlbumUsecase } from "@/core/usecases/Album.usecase";
import { AlbumDtos } from "@/core/dtos/Album.dto";
import { AlbumRepository } from "@/core/repositories/IAlbumRepository";
import { NextRequest, NextResponse } from "next/server";
const albumrepository = new AlbumRepository();
const albumusecase = new AlbumUsecase(albumrepository);
export async function POST(req:NextRequest) {
    try {
        const data:AlbumDtos = await req.json();
        const createAlbum = await albumusecase.createAlbum(data);
        return NextResponse.json(createAlbum);
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
        { message: "Failed to Create Album." },
        { status: 500 }
        );
    }
}
export async function GET() {
    try {
        const getAll = await albumusecase.getAllAlbum();
        return NextResponse.json(getAll);
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
        { message: "Failed to get GetAll Album." },
        { status: 500 }
        );
    }
}