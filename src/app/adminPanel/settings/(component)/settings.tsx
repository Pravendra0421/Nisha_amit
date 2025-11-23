'use client'
import React, { useState } from 'react'
import { BaratApiRepository } from '@/services/baratLocation.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { baratLocationDto } from '@/core/dtos/baratLocation.dto';
const barat = new BaratApiRepository();
const Settings = ({data}) => {
  console.log(data);
  const [loading,setLoading]= useState(false);
  const [input,setInput] = useState(data?.baratLocation || "");
  const submitHandle =async(e:React.FormEvent)=>{
    const payload: baratLocationDto = {
    baratLocation: input // 'input' is now the string from your state
  };
    e.preventDefault();
    try {
       const createLuri = await barat.create(payload);
       console.log("Success:", createLuri);
    } catch (error) {
    console.error("Submission failed:", error);
    }
  }
  return (
    <div className='lg:w-6xl p-2 lg:m-10 md:m-6 sm:m-2 md:w-3xl sm:w-2xl h-full text-center bg-amber-700'>
      {data.baratLocation}
      <div className='mt-10'>
        <div><Input
        placeholder='please enter the barat link here'
        className='text-black'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      /></div>
        <div className='mt-10' onClick={submitHandle}><Button>
          Submit
          </Button>
          </div>
      </div>
    </div>
  )
}

export default Settings