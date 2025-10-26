'use client'
import { BookSangeetEntity } from '@/core/entities/BookSangeetEntity';
import React from 'react'
import ColourfulText from "@/components/ui/colourful-text";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
type YourComponentProps = {
  fetchdata: BookSangeetEntity[];
};
const GetSangeet = ({fetchdata}:YourComponentProps) => {
    const [playingSongUrl,setPlayingsongUrl]= useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter()
    const [progress, setProgress] = useState(0);
    const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
    }
};
    const handlePlayClick =(songUrl:string)=>{
        if(playingSongUrl === songUrl){
            setPlayingsongUrl(null);
        }else{
            setPlayingsongUrl(songUrl);
        }
    }
    useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
        if (playingSongUrl) {
            if (audio.src !== playingSongUrl) {
                audio.src = playingSongUrl;
            }
            audio.play();
        } else {
            audio.pause();
            audio.src = ''; 
        }
    }
}, [playingSongUrl]); 
const handleUpdate =(id)=>{
    router.push(`/book-sangeet/${id}`);
}

  return (
    <div className=' max-w-3xl mx-auto text-center mt-30 bg-white p-5 shadow-2xl shadow-gray-400'>
        <h1 className='text-4xl font-bold'>WE ARE SO <ColourfulText text="HAPPY"/> TO HAVE YOU HERE</h1>
        <div>
            <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlayingsongUrl(null)} 
    />
            {fetchdata.map(item=>(
                
            <div key={item.id} className='text-3xl mt-4'><ColourfulText text='WELCOME'/> {item.name}
                <div>
                    <div className="relative w-[300px] h-[300px] flex max-w-2xl mt-20 bg-gray-300 p-5 shadow-2xl shadow-gray-700">
                    <Image 
                        src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1754217990/Gemini_Generated_Image_n5dop5n5dop5n5do_zrjoqw.png"
                        alt="nisha"
                        fill
                        quality={80}
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                        
                        <button 
                        onClick={() => handlePlayClick(item.Song)}
                        className=' text-white font-bold py-2 px-4 rounded-full'
                        >
                        {playingSongUrl === item.Song ? <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="80" 
                                height="80" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="10" y1="15" x2="10" y2="9" />
                                <line x1="14" y1="15" x2="14" y2="9" />
                            </svg> : <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="80" 
                            height="80" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                        </svg>}
                        </button>
                    </div>
                    </div>
                    {playingSongUrl === item.Song && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
                className="bg-pink-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )}
                </div>
                <button className='p-1 mt-4 px-8 rounded-full bg-black text-white' onClick={()=>handleUpdate(item.id)}>Edit</button>

            </div>
            ))}
        </div>

    </div>
  )
}

export default GetSangeet;