import prisma from "@/lib/prisma";
import { baratLocationEntity } from "../entities/BaratLocationEntity";
import { baratLocationDto } from "../dtos/baratLocation.dto";
export interface IBaratLocationRepo{
    create(data:baratLocationDto):Promise<baratLocationEntity>;
    // update(baratLocation:string):Promise<baratLocationEntity>;
    get():Promise<baratLocationEntity>;
}
export class BaratRepository implements IBaratLocationRepo{
    async create(data: baratLocationDto): Promise<baratLocationEntity> {
        const create= await prisma.baratLocation.create({
            data:{
                baratLocation:data.baratLocation
            }
        })
        return create;
    }
    async get(): Promise<baratLocationEntity> {
        const getLocation = await prisma.baratLocation.findFirst({
        });
        return getLocation as baratLocationEntity;
    }
}