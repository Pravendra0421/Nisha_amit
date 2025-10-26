import axios from "axios";
import { baratLocationDto } from "@/core/dtos/baratLocation.dto";
import { baratLocationEntity } from "@/core/entities/BaratLocationEntity";

export class BaratApiRepository{
    async create(data:baratLocationDto):Promise<baratLocationEntity>{
        const response = await axios.post("/api/baratLocation",
            data,
        )
        if(!response){
            throw new Error("failed to create the barat location");
        }
        return response.data;
    }
}