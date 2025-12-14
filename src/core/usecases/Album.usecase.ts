import { IAlbumRepository } from "../repositories/IAlbumRepository";
import { AlbumDtos } from "../dtos/Album.dto";
import { AlbumEntity } from "../entities/AlbumEntity";
interface Total{
    totalPhotos:number
}
export class AlbumUsecase{
    constructor(private albumRepository:IAlbumRepository){}

    async createAlbum(data:AlbumDtos):Promise<AlbumEntity>{
        const create = await this.albumRepository.createAlbum(data);
        return create
    }
    async updateAlbum(data:Partial<AlbumDtos>,albumId:string):Promise<AlbumEntity>{
        const update = await this.albumRepository.updateAlbum(data,albumId);
        return update
    }
    async getAllAlbum():Promise<AlbumEntity[]>{
        const getAll = await this.albumRepository.getAllAlbum();
        return getAll
    }
    async getAlbum(albumId:string):Promise<AlbumEntity>{
        const getAlbum = await this.albumRepository.getAlbum(albumId);
        return getAlbum
    }
    async deleteAlbum(albumId:string):Promise<void>{
        const deleteAlbum = await this.albumRepository.deleteAlbum(albumId);
        return deleteAlbum
    }
    async TotalPhoto():Promise<Total| null>{
        const totalPhoto = await this.albumRepository.totalPhoto();
        return totalPhoto
    }
}