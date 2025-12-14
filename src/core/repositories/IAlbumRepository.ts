import { AlbumDtos } from "../dtos/Album.dto";
import { AlbumEntity } from "../entities/AlbumEntity";
import prisma from "@/lib/prisma";
interface Total{
    totalPhotos:number
}
export interface IAlbumRepository{
    createAlbum(data:AlbumDtos):Promise<AlbumEntity>;
    updateAlbum(data:Partial<AlbumDtos>,albumId:string):Promise<AlbumEntity>;
    getAllAlbum():Promise<AlbumEntity[]>;
    getAlbum(albumId:string):Promise<AlbumEntity>;
    deleteAlbum(albumId:string):Promise<void>;
    totalPhoto():Promise<Total | null>
}
export class AlbumRepository implements IAlbumRepository{
    async createAlbum(data: AlbumDtos): Promise<AlbumEntity> {
        const createAlbum = await prisma.album.create({
            data:{
                name:data.name,
                url:data.url,
                CoverImage:data.CoverImage,
            }
        })
        return createAlbum as AlbumEntity
    }
    async updateAlbum(data: Partial<AlbumDtos>,albumId:string): Promise<AlbumEntity> {
        const updateAlbum = await prisma.album.update({
            where:{id:albumId},
            data:{
                name:data.name,
                url:{push:data.url},
                CoverImage:data.CoverImage
            }
        });
        return updateAlbum as AlbumEntity
    }
    async getAllAlbum(): Promise<AlbumEntity[]> {
        const getAll = await prisma.album.findMany({

        });
        return getAll as AlbumEntity[];
    }
    async getAlbum(albumId: string): Promise<AlbumEntity> {
        const getAlbum = await prisma.album.findFirst({
            where:{id:albumId}
        });
        return getAlbum as AlbumEntity
    }
    async deleteAlbum(albumId: string): Promise<void> {
        await prisma.album.delete({
            where:{id:albumId}
        })
    }
    async totalPhoto(): Promise<Total | null> {
        const result = await prisma.album.aggregateRaw({
            pipeline: [
                {
                    $project: {
                        count: { $size: { $ifNull: ["$url", []] } } 
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalPhotos: { $sum: "$count" }
                    }
                }
            ]
        });
        const data = result as unknown as any[];
        const count = data.length > 0 ? data[0].totalPhotos : 0;
        return{
            totalPhotos:count
        }
    }
}