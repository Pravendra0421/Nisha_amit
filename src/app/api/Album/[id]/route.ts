import { AlbumUsecase } from "@/core/usecases/Album.usecase";
import { AlbumDtos } from "@/core/dtos/Album.dto";
import { AlbumRepository } from "@/core/repositories/IAlbumRepository";
import { NextRequest, NextResponse } from "next/server";
const albumrepository = new AlbumRepository();
const albumusecase = new AlbumUsecase(albumrepository);
export async function PATCH(req:NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const data:AlbumDtos = await req.json();
        const {id} = await params;
        const update = await albumusecase.updateAlbum(data,id);
        return NextResponse.json(update)
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
        { message: "Failed to get updateAlbum." },
        { status: 500 }
        );
    }
}
export async function GET(req:NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const {id} = await params;
        const getAlbum = await albumusecase.getAlbum(id);
        return NextResponse.json(getAlbum);
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
        { message: "Failed to get Album." },
        { status: 500 }
        );
    }
}
export async function DELETE(req:NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const {id} = await params;
        const deleteAlbum = await albumusecase.deleteAlbum(id);
        return NextResponse.json(deleteAlbum)
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
        { message: "Failed to delete Album." },
        { status: 500 }
        );
    }
}