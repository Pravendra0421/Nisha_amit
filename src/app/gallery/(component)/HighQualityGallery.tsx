"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { Download, X, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

interface GalleryProps {
  images: string[];
  albumName: string;
}

export function HighQualityGallery({ images, albumName }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const CHUNK_SIZE = 8; 

  useEffect(() => {
    if(images && images.length > 0) {
        setVisibleImages(images.slice(0, CHUNK_SIZE));
    }
  }, [images]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = visibleImages.length;
      const nextChunk = images.slice(0, currentLength + CHUNK_SIZE);
      setVisibleImages(nextChunk);
      setLoadingMore(false);
    }, 500);
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Album-${albumName}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <Link href="/gallery" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
            <ArrowLeft size={20} /> Back to Albums
        </Link>
        <h2 className="text-3xl font-bold text-center text-gray-800">
            {albumName} <span className="text-gray-500 text-lg">({images.length})</span>
        </h2>
        <div className="w-24 hidden md:block"></div> 
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {visibleImages.map((url, index) => (
          <div key={index} className="mb-4">
            <div 
              className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-zoom-in bg-gray-200"
              onClick={() => setSelectedImage(url)}
            >
              <Image
                src={url}
                alt={`Gallery Photo ${index}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized={true}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">View Full</span>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
      {visibleImages.length < images.length && (
        <div className="flex justify-center mt-12 mb-8">
          <button 
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg"
          >
            {loadingMore && <Loader2 className="animate-spin" size={18} />}
            {loadingMore ? "Loading..." : "Load More Photos"}
          </button>
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition z-[110]"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[85vh]">
             <Image 
               src={selectedImage} 
               alt="Full View" 
               fill 
               className="object-contain"
               unoptimized={true} 
               priority
             />
          </div>

          <button 
            onClick={() => handleDownload(selectedImage)}
            className="absolute bottom-8 bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg"
          >
            <Download size={20} /> Download Original
          </button>
        </div>
      )}
    </div>
  );
}