'use client'
import BookSangeet from "./(_component)/formComponent"
import GetSangeet from "./(_component)/GetSangeet"
import { BookSangeetEntity } from "@/core/entities/BookSangeetEntity";
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { bookSangeetApiRepository } from "@/services/BookSangeet.api";
const Page = () => {
    const [data, setData] = useState<BookSangeetEntity[] | null>(null);
    useEffect(()=>{
        const GetData =async()=>{
            const currentUSer = await auth.currentUser;
            if (!currentUSer) {
            alert("please login your account before the submit");
            return;
            }
            const token = await currentUSer.getIdToken();
            const response = await bookSangeetApiRepository.get(token);
            console.log(response);
            setData(response)
        }
        GetData();
    },[]);
  return (
    <div>
        {
            data?(<div>
            <GetSangeet fetchdata={data}/>
        </div>):(<div>
            <BookSangeet/>
        </div>)
        }
    </div>
  )
}

export default Page