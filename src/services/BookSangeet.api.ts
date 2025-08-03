import axios from "axios";
import { BookSangeetDto } from "@/core/dtos/BookSangeet.dto";
import { BookSangeetEntity } from "@/core/entities/BookSangeetEntity";
import { IBookSangeetRepository } from "@/core/repositories/IBookSangeet.repository";

export class BookSangeetApiRepository implements IBookSangeetRepository {
    async create(data: BookSangeetDto, token:string): Promise<BookSangeetEntity> {
        const response = await axios.post("/api/book-sangeet",
            data,
        {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if(!response){
            throw new Error( 'Failed to create book sangeet via API.');
        }
        return response.data;
    }

    async get(token:string): Promise<BookSangeetEntity[]> {
        const getByUSerId = await axios.get("/api/book-sangeet",
            {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }
        );
        if(!getByUSerId){
            throw new Error("failed to get the data from the backend");
        }
        return getByUSerId.data;
        
    }
    async update(data: BookSangeetDto, Id: string): Promise<BookSangeetEntity> {
        const update = await axios.put(`/api/book-sangeet/${Id}`,data);
        if(!update){
            throw new Error("failed to update the data");
        }
        return update.data;
    }
    async delete(id: string): Promise<void> {
        const deleteSangeet =await axios.delete(`/api/book-sangeet/${id}`);
        if(!deleteSangeet){
            throw new Error("failed to delete");
        }
        return deleteSangeet.data;
    }
    async getAll(): Promise<BookSangeetEntity[]> {
        const getAll = await axios.get(`/api/book-sangeet`);
        if(!getAll){
            throw new Error("failed to get all the error");
        }
        return getAll.data;
    }
}

export const bookSangeetApiRepository = new BookSangeetApiRepository();