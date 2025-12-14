import { BookSangeetDto } from "../dtos/BookSangeet.dto";
import { BookSangeetEntity } from "../entities/BookSangeetEntity";
import prisma from "@/lib/prisma";

interface Total{
    totalSangeet:number
}
export interface IBookSangeetRepository{
    create(data:BookSangeetDto,userId:string):Promise<BookSangeetEntity>;
    update(data:BookSangeetDto,Id:string):Promise<BookSangeetEntity>;
    get(userId:string):Promise<BookSangeetEntity[]>;
    getAll():Promise<BookSangeetEntity[]>;
    delete(id:string):Promise<void>;
    totalSangeet():Promise<Total | null>;
}

export class BookSangeetRepository implements IBookSangeetRepository{
    async create(data: BookSangeetDto, userId: string): Promise<BookSangeetEntity> {
        const newBook = await prisma.bookSangeet.create({
            data:{
                name:data.name,
                phone:data.phone,
                Side:data.Side,
                Song:data.Song,
                userId:userId
            }
        });
        return newBook as unknown as BookSangeetEntity;
    }

    async update(data: BookSangeetDto, id:string): Promise<BookSangeetEntity> {
        const update = await prisma.bookSangeet.update({
            where:{id},
            data:{
                name:data.name,
                phone:data.phone,
                Side:data.Side,
                Song:data.Song
            }
        })
        return update as unknown as BookSangeetEntity;
    }
    async get(userId: string): Promise<BookSangeetEntity[]> {
        const getBook = await prisma.bookSangeet.findMany({
            where:{userId},
            include:{user:true}
        });
        return getBook as unknown as BookSangeetEntity[];
    }
    async getAll(): Promise<BookSangeetEntity[]> {
        const getAll = await prisma.bookSangeet.findMany({
            include:{user:true}
        });
        return getAll as unknown as BookSangeetEntity[];
    }
    async delete(id: string): Promise<void> {
        await prisma.bookSangeet.delete({
            where:{id}
        });
    }
    async totalSangeet(): Promise<Total | null> {
        const total = await prisma.bookSangeet.count();
        return {
            totalSangeet:total
        }
    }
}