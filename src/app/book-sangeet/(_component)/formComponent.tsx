'use client'
import React from 'react'
import { useState } from 'react'
import { FileUpload } from '@/components/ui/file-upload';
import { bookSangeetApiRepository } from '@/services/BookSangeet.api';
import { auth } from '@/lib/firebase';
import axios from 'axios';
import { BookSangeetDto } from '@/core/dtos/BookSangeet.dto';
 export default function BookSangeet(){
    const [detail,SetDetail] = useState({
        name:"",
        phone:"",
        Side:""
    });
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [Song,setSong]= useState("");
    const [isUploading, setIsUploading] = useState(false);
    const handleFileUpload =(file:File)=>{
        setFileToUpload(file);
        console.log(file);
    }
    // const submitHandler =(event:React.FormEvent<HTMLFormElement>)=>{

    // }
    const changeHandler =(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        SetDetail({
            ...detail,
            [e?.target.name]: e?.target.value
        }
        )
    }
    const handleUploadClick = async () => {
        if (!fileToUpload) {
            alert("Please select a file first.");
            return;
        }
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('audio', fileToUpload);
            const response = await axios.post("/api/upload", formData);
            setSong(response.data.url);
        } catch (error) {
            console.error("File upload failed:", error);
            alert("File upload failed.");
        } finally {
            setIsUploading(false);
        }
    };
    const submitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!Song) {
            alert("Please upload a song first by clicking the 'Upload Song' button.");
            return;
        }
        const currentUSer = auth.currentUser;
         if (!currentUSer) {
            alert("please login your account before the submit");
            return;
        }
        const token = await currentUSer.getIdToken();
        const finalData:BookSangeetDto = { ...detail, Song };
        const submitData = await bookSangeetApiRepository.create(finalData,token);
        alert("your detail have been submitted successfull");
        console.log("data saved successfully",submitData);
    }

  return (
    <div className=' max-w-2xl mx-auto text-center mt-30 bg-white p-5 shadow-2xl shadow-gray-400'>
        <form  onSubmit={submitHandler}>
            <label htmlFor='fullName'
            className='block text-left text-lg font-medium text-gray-800'
            >
                Full Name
            </label>
            <input
            type='text'
            name='name'
            id='fullName'
            placeholder='Enter the Full Name'
            required
            onChange={changeHandler}
            // value={detail.name}
            className=' mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <label htmlFor='number'
            className=' mt-3 block text-left text-lg font-medium text-gray-800'
            >
                Phone number
            </label>
            <input
            type='text'
            name='phone'
            id='fullName'
            required
            onChange={changeHandler}
            placeholder='Enter the phone number'
            // value={detail.name}
            className=' mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />

            <label htmlFor='side'
            className=' mt-3 block text-left text-lg font-medium text-gray-800'
            >
                Performing For
            </label>
            <select id='side' name='Side' value={detail.Side} required onChange={changeHandler}
            className='w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
                <option > Select Side ....</option>
                <option value="Bride">Bride Side</option>
                <option value="Groom">Groom Side</option>

            </select>

            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload  onChange={(files)=>setFileToUpload(files[0])}/>
                    {fileToUpload && !Song && <p className="text-blue-600">File selected: {fileToUpload.name}</p>}
                <button 
                    type="button" // Use type="button" to prevent form submission
                    onClick={handleUploadClick} 
                    disabled={!fileToUpload || isUploading || !!Song}
                    className="w-full p-2 mt-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
                >
                    {isUploading ? 'Uploading...' : 'Upload Song Locally'}
                </button>
                {Song && <p className="text-green-600">✓ Song uploaded successfully!</p>}
            </div>
            <div>{Song}</div>
            <button 
                    type='submit' 
                    disabled={isUploading || !Song} 
                    className='w-full p-2 mt-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400'
                >
                    Submit Details
                </button>
            
        </form>

    </div>
  )
}
