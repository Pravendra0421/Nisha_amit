"use client";
import React, { useState, useEffect } from 'react';
import { albumApi } from '@/services/Album.api';
import { AlbumEntity } from '@/core/entities/AlbumEntity';
import { HighQualityGallery } from './HighQualityGallery';
import { Loader2 } from 'lucide-react';

const AlbumDetailCollection =({id}) => {
  const [data, setData] = useState<AlbumEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const getAllDetailImage = async () => {
    try {
      setLoading(true);
      const response = await albumApi.getAlbum(id);
      console.log("Response Data:", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching album details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(id) {
        getAllDetailImage();
    }
  }, [id]);
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading your beautiful memories...</p>
        </div>
      </div>
    );
  }
  if (!data) {
    return <div className="text-center mt-20 text-red-500">Album not found or deleted.</div>;
  }
  return (
    <div className="min-h-screen bg-white">
        <HighQualityGallery 
            images={data.url || []} 
            albumName={data.name || "Album"} 
        />
    </div>
  );
};

export default AlbumDetailCollection;