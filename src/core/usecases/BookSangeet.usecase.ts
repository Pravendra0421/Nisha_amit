import { BookSangeetDto } from "../dtos/BookSangeet.dto";
import { BookSangeetEntity } from "../entities/BookSangeetEntity";
import { IBookSangeetRepository } from "../repositories/IBookSangeet.repository";
import { IUserRepository } from "../repositories/IUserRepository";
export class BookSangeetUsecase {
    constructor(private booksangeetRepository:IBookSangeetRepository, private userRepository:IUserRepository){}

    async createSangeetUseCase(data:BookSangeetDto,userId:string):Promise<BookSangeetEntity>{
        console.log("step1 data",data);
        const existingUser = await this.userRepository.findbyFirebaseId(userId);
        console.log(existingUser);
        if(!existingUser){
            throw new Error("userId doesnot exists");
        }
        const dbuserId = existingUser.id
        const createsangeet = await this.booksangeetRepository.create(data,dbuserId);
        return createsangeet;
    }
    async updateSangeetUsecase(data:BookSangeetDto,id:string):Promise<BookSangeetEntity>{
        const update = await this.booksangeetRepository.update(data,id);
        return update;
    }
    async get(userId:string):Promise<BookSangeetEntity[]>{
        const existingUser = await this.userRepository.findbyFirebaseId(userId);
        if(!existingUser){
            throw new Error("userId doesnot exists");
        }
        const dbuserId = existingUser.id
        const getByuserId = await this.booksangeetRepository.get(dbuserId);
        return getByuserId;
    }
    async getAll():Promise<BookSangeetEntity[]>{
        const getAll = await this.booksangeetRepository.getAll();
        return getAll;
    }
    async deleteBookSangeet(id:string):Promise<void>{
        await this.booksangeetRepository.delete(id);
    }
}