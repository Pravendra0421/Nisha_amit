import { User } from "../dtos/User.dto";
import { UserEntity } from "../entities/User.entity";
import prisma from "@/lib/prisma";
export interface IUserRepository{
    create(data:User):Promise<UserEntity>;
    findByPhone(phone:string):Promise<UserEntity | null>;
    findByuserId(userId:string):Promise<UserEntity | null>
}
export class UserRepository implements IUserRepository{
    async create(data: User): Promise<UserEntity> {
        const create = await prisma.user.create({
            data:{
                name:data.name,
                phone:data.phone
            }
        });
        return create;
    }
    async findByPhone(phone: string): Promise<UserEntity | null> {
        const findByPhone = await prisma.user.findUnique({
            where:{phone}
        })
        return findByPhone;
    }
    async findByuserId(userId:string):Promise<UserEntity | null>{
        const findById = await prisma.user.findUnique({
            where:{id:userId}
        });
        return findById
    }

}