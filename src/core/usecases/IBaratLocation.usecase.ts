import { IBaratLocationRepo } from "../repositories/IBaratLocationRepository";
import { baratLocationEntity } from "../entities/BaratLocationEntity";
import { baratLocationDto } from "../dtos/baratLocation.dto";
export class baratLocationUsecase{
    constructor(private baratRepository:IBaratLocationRepo){}
    async createBaratUsecase(data:baratLocationDto):Promise<baratLocationEntity>{
        const createBaratusecase = await this.baratRepository.create(data);
        return createBaratusecase;
    }
    async get():Promise<baratLocationEntity>{
        const barat = await this.baratRepository.get();
        return barat;
    }
}