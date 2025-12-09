import axios from "axios";
import { User } from "@/core/dtos/User.dto";
import { UserEntity } from "@/core/entities/User.entity";
export class UserRepositoryApi{
    async create(data: User): Promise<UserEntity> {
        const response = await axios.post("/api/user",data);
        if(!response){
            throw new Error( 'Failed to create book sangeet via API.');
        }
        return response.data;
    }
    async findUser(){
        const response = await axios.get('/api/me');
        if(!response){
            throw new Error('failed to find user');
        }
        return response.data
    }

}
export const userApi = new UserRepositoryApi();