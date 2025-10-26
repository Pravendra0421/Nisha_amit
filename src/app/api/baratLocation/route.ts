import { BaratRepository } from "@/core/repositories/IBaratLocationRepository";
import { baratLocationUsecase } from "@/core/usecases/IBaratLocation.usecase";
import { baratLocationDto } from "@/core/dtos/baratLocation.dto";
import { NextRequest, NextResponse } from "next/server";
const baratRepo = new BaratRepository();
const baratusecase= new baratLocationUsecase(baratRepo);
export async function POST(req:NextRequest) {
    try {
        const data :baratLocationDto=await req.json();
        const baratlocation = await baratusecase.createBaratUsecase(data);
        return NextResponse.json(baratlocation,{status:201});
    } catch (error) {
        console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to ." },
      { status: 500 }
    );
    }
}

export async function GET(req:NextRequest) {
    try {
        const baratlocation = await baratusecase.get();
        return NextResponse.json(baratlocation,{status:201})
    } catch (error) {
          console.error("API get Error:", error);
    return NextResponse.json(
      { message: "Failed to ." },
      { status: 500 }
    );
    }
}