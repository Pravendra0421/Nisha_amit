import axios from "axios";
import { AlbumDtos } from "@/core/dtos/Album.dto";
import { AlbumEntity } from "@/core/entities/AlbumEntity";
import { IAlbumRepository } from "@/core/repositories/IAlbumRepository";
export class AlbumApiRepository implements IAlbumRepository{
    async createAlbum(data: AlbumDtos): Promise<AlbumEntity> {
        try {
            const result = await axios.post('/api/Album',data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return result.data
        } catch (error) {
            console.error("AlbumApiRepository error");
            throw Error;
        }
    }
    async getAllAlbum(): Promise<AlbumEntity[]> {
        try {
            const result = await axios.get<AlbumEntity[]>('/api/Album');
            if(!result){
                throw new Error("failed the get All Album")
            }
            return result.data
        } catch (error) {
            console.error("AlbumApiRepository error");
            throw error;
        }
    }
    async updateAlbum(data: Partial<AlbumDtos>, albumId: string): Promise<AlbumEntity> {
        try {
            const result = await axios.patch(`/api/Album/${albumId}`,data,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            return result.data
        } catch (error) {
            console.error("AlbumApiRepository error");
            throw Error;
        }
    }
    async getAlbum(albumId: string): Promise<AlbumEntity> {
        try {
            const result = await axios.get(`/api/Album/${albumId}`);
            return result.data
        } catch (error) {
            console.log(error)
            throw Error
        }
    }
    async deleteAlbum(albumId: string): Promise<void> {
        try {
            const result = await axios.delete(`/api/Album/${albumId}`);
            return result.data
        } catch (error) {
            console.log(error);
        }
    }
}
export const albumApi = new AlbumApiRepository();