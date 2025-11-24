'use client'
import { AlbumEntity } from "@/core/entities/AlbumEntity";
import { albumApi } from "@/services/Album.api";
import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const AlbumCollection =()=>{
    const [AlbumData,setAlbumData] =useState<AlbumEntity[]>([]);
    const getAll = async()=>{
        const response = await albumApi.getAllAlbum();
        setAlbumData(response);
    }
    useEffect(()=>{
        getAll();
    },[])
    return (
        <section className="p-4 md:p-8 max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mt-20">Album Folders</h2>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {AlbumData.map((album) => (
            <Link key={album.id} href={`/gallery/${album.id}`}>
                <div
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                    >
                    <div className="aspect-[4/5] w-full bg-gray-100 relative">
                    <Image
                    src={album.CoverImage || ""}
                    alt={`${album.name} cover`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                    </div>


                    <div className="px-3 py-3 flex items-center justify-between">
                    <div>
                    <p className="font-medium text-sm md:text-base text-gray-900 truncate" title={album.name}>
                    {album.name}
                    </p>
                    </div>


                    {/* simple folder icon */}
                    <div className="ml-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                    </div>
                    </div>
                    </div>
            </Link>
        ))}
        </div>
        </section>
    );
}
export default AlbumCollection;