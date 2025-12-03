'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FileUpload } from '@/components/ui/file-upload';
import { bookSangeetApiRepository } from '@/services/BookSangeet.api';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BookSangeetDto } from '@/core/dtos/BookSangeet.dto';
import { BookSangeetEntity } from '@/core/entities/BookSangeetEntity';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import {ToastContainer,toast} from "react-toastify";
type BookSangeetProps = {
    onSuccess: (newData: BookSangeetEntity) => void;
};
 export default function BookSangeet({onSuccess}:BookSangeetProps){
    const [detail,SetDetail] = useState({
        name:"",
        phone:"",
        Side:""
    });
    const {t}=useLanguage();
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [Song,setSong]= useState("");
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter()
    const handleFileUpload =(file:File)=>{
        setFileToUpload(file);
        console.log(file);
    }
    const changeHandler =(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        SetDetail({
            ...detail,
            [e?.target.name]: e?.target.value
        }
        )
    }
    const handleUploadClick = async () => {
        if (!fileToUpload) {
            alert(t("uploadAlert"));
            return;
        }
        setIsUploading(true);
        try {
            // Step 1: Get the signature from your backend
            const timestamp = Math.round(new Date().getTime() / 1000);
            const paramsToSign = { 
                timestamp: timestamp,
                // If you use an upload preset, add it here for signing
                // upload_preset: 'your_preset_name'
            };

            const signatureResponse = await axios.post('/api/upload', { paramsToSign });
            const { signature } = signatureResponse.data;

            // Step 2: Prepare form data for Cloudinary
            const formData = new FormData();
            formData.append('file', fileToUpload);
            // Use NEXT_PUBLIC_ variables for client-side access
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            // If you use an upload preset, add it here again
            // formData.append('upload_preset', 'your_preset_name');
            
            // Step 3: Upload file directly to Cloudinary
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`; // Use /video for audio/video

            const uploadResponse = await axios.post(uploadUrl, formData);

            // Set the song URL from Cloudinary's response
            setSong(uploadResponse.data.secure_url);
            console.log("File uploaded successfully:", uploadResponse.data.secure_url);
            toast.success(t("submitUploadAlert"));

        } catch (error) {
            console.error("File upload failed:", error);
            toast.error(t("uploadErrorAlert"));
        } finally {
            setIsUploading(false);
        }
    };
    const submitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
        if(!detail.name){
            toast.error(t("signupNameFailed"));
            return
        }
        if(!detail.Side){
            toast.error("please enter the side");
        }
        e.preventDefault();
        if (!Song) {
            toast.error(t("songuploadAlert"));
            return;
        }
        const currentUSer = auth.currentUser;
         if (!currentUSer) {
            toast.error(t("currentUserAlert"));
            return;
        }
        const token = await currentUSer.getIdToken();
        const finalData:BookSangeetDto = { ...detail, Song };
        const submitData = await bookSangeetApiRepository.create(finalData,token);
        toast.success(t("submitDataAlert"));
        console.log("data saved successfully",submitData);
        onSuccess(submitData);
    }

  return (
    <ScrollArea className='h-[100vh]'>
        <div className=' max-w-2xl mx-auto text-center mt-30 bg-white p-5 shadow-2xl shadow-gray-400'>
        <form  onSubmit={submitHandler}>
            <label htmlFor='fullName'
            className='block text-left text-lg font-medium text-gray-800'
            >
                {t("inputName")}
            </label>
            <input
            type='text'
            name='name'
            id='fullName'
            placeholder={t("inputNamePlaceHolder")}
            required
            onChange={changeHandler}
            // value={detail.name}
            className=' mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <label htmlFor='number'
            className=' mt-3 block text-left text-lg font-medium text-gray-800'
            >
               {t("inputPhone")}
            </label>
            <input
            type='text'
            name='phone'
            id='fullName'
            required
            onChange={changeHandler}
            placeholder={t("inputPhonePlaceHolder")}
            // value={detail.name}
            className=' mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />

            <label htmlFor='side'
            className=' mt-3 block text-left text-lg font-medium text-gray-800'
            >
               {t("inputPerforming")}
            </label>
            <select id='side' name='Side' value={detail.Side} required onChange={changeHandler}
            className='w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
                <option >{t("selectOption1")}</option>
                <option value="Bride">{t("selectOption2")}</option>
                <option value="Groom">{t("selectOption3")}</option>

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
                    {isUploading ? t("localUploadButton") : t("localUploadButton2")}
                </button>
                {Song && <p className="text-green-600">{t("songUpload")}</p>}
            </div>
            <div>{Song}</div>
            <button 
                    type='submit' 
                    disabled={isUploading || !Song} 
                    className='w-full p-2 mt-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400'
                >
                    {t("submitButton")}
                </button>
            
        </form>

    </div>
    <ToastContainer position='top-center' autoClose={3000}/>
    </ScrollArea>
  )
}
