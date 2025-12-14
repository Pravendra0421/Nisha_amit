import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../dtos/User.dto";
import { UserEntity } from "../entities/User.entity";
import jwt from "jsonwebtoken";
interface LoginSignupResult {
  user: UserEntity;
  token: string;
  isNewUser: boolean;
}
interface Total{
    totalUser:number
}
export class UserUsecase{
    constructor(private userRepository:IUserRepository){}
    async LoginandSignup(data:User):Promise<LoginSignupResult>{
        let user = await this.userRepository.findByPhone(data.phone);
        let isNewUser = false;
        if(!user){
            user = await this.userRepository.create(data);
            isNewUser=true
        }
        const secret = process.env.JWT_SECRET
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
         }
        const token = jwt.sign(
            {
                id:user.id,
                phone:user.phone,
                name:user.name
            },
            secret,
            {
                expiresIn:"7d"
            }
        );
        return{
            user,
            token,
            isNewUser
        }
    }
    async findById(userId:string):Promise<UserEntity | null>{
        const findByUSer = await this.userRepository.findByuserId(userId);
        return findByUSer;
    }
    async TotalUser():Promise<Total | null>{
        const count = await this.userRepository.totalUser();
        return count;
    }
}