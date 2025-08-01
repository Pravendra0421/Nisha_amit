import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../dtos/User.dto";
import { admin } from "@/lib/firebaseAdmin";

export class UserUsecase{
    constructor(private userRepository:IUserRepository){}
    async createUserUsecase(data:User,token:string){
        const decode = await admin.auth().verifyIdToken(token);
        const firebaseId = decode.uid;
        const email=decode.email ?? data.email;
        const phone = decode.phone_number ?? data.phone;
        const name = decode.name ?? data.name;
        
    let user = await this.userRepository.findbyFirebaseId(firebaseId);
    if(!user){
        user = await this.userRepository.create({
            name,phone,email,firebaseId
        });
    }
    return user;
    }
}