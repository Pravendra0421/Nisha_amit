import { User } from "../dtos/User.dto";
import { UserEntity } from "../entities/User.entity";

import prisma from "@/lib/prisma";

export interface IUserRepository{
    create(data:User):Promise<UserEntity>;
    findbyFirebaseId(firebaseId:string):Promise<UserEntity | null>;
    findByEmail(email:string):Promise<UserEntity | null>;
}
export class UserRepository implements IUserRepository{
    async create(data: User): Promise<UserEntity> {
        const create = await prisma.user.create({
            data:{
                name:data.name,
                phone:data.phone,
                email:data.email,
                firebaseId:data.firebaseId
            }
        });
        return create;
    }
    async findbyFirebaseId(firebaseId: string): Promise<UserEntity | null> {
        const fetchByFirebaseId = await prisma.user.findUnique({
            where:{firebaseId:firebaseId},
        });
        return fetchByFirebaseId;
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        const findByEmail = await prisma.user.findUnique({
            where:{email:email}
        })
        return findByEmail;
    }

}