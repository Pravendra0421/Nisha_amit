'use client'
import BookSangeet from "./(_component)/formComponent"
import GetSangeet from "./(_component)/GetSangeet"
import { BookSangeetEntity } from "@/core/entities/BookSangeetEntity";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { bookSangeetApiRepository } from "@/services/BookSangeet.api";
import { LoaderOne } from "@/components/ui/loader";
const Page = () => {
    const [data, setData] = useState<BookSangeetEntity[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("User is logged in:", user.uid);
                const token = await user.getIdToken();
                const response = await bookSangeetApiRepository.get(token); 
                setData(response);
            } else {
                console.log("User is logged out.");
                setData([]);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const hasData = data && data.length>0;
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
    <LoaderOne/>
</div>;
    }

  return (
    <div>
        {
            hasData?(<div>
            <GetSangeet fetchdata={data}/>
        </div>):(<div>
            <BookSangeet/>
        </div>)
        }
    </div>
  )
}

export default Page