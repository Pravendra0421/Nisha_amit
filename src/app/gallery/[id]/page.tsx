import React from 'react'
import AlbumDetailCollection from '../(component)/AlbumDetailCollection'
import { HighQualityGallery } from '../(component)/HighQualityGallery';
import { albumApi } from '@/services/Album.api';
import { AlbumEntity } from '@/core/entities/AlbumEntity';
export const dynamic = 'force-dynamic';
const page = async({ params }: { params:Promise<{ id: string }> }) => {
    const {id} = await params;
    let albumData:AlbumEntity | null=null;
    try {
      albumData = await albumApi.getAlbum(id);
    } catch (error) {
      console.error("Error fetching album detail:", error);
    }
    if (!albumData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Album Not Found</h2>
                    <p className="text-gray-500">This album might have been deleted or doesn't exist.</p>
                </div>
            </div>
        );
    }
  return (
    <div className="min-h-screen bg-white">
            <HighQualityGallery 
                images={albumData.url || []} 
                albumName={albumData.name || "Gallery"} 
            />
        </div>
  )
}

export default page