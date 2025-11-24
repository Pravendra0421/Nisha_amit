"use client"
import React, { useEffect, useState } from 'react';
import { albumApi } from '@/services/Album.api';
import { AlbumEntity } from '@/core/entities/AlbumEntity';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Loader2,X } from 'lucide-react';
import Link from 'next/link';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
const Photographer = () => {
  const [allAlbum,setAllAlbum] = useState<AlbumEntity[]>([]);
  const [showCreateAlbum,setCreateAlbum] = useState(false);
  const [showUpdatePhoto,setShowUpdatePhoto]=useState(false);
  const [nameAlbum,setNameAlbum] = useState("");
  const [coverImage,setCoverImage] = useState<File | null>(null);
  const [albumFile,setAlbumFile] = useState<File[]>([]);
  const [isUploading,setUploading] = useState(false);
  const [selectedAlbum,setSelectedAlbum] = useState<AlbumEntity | null>(null);
  const getAll =async()=>{
      try {
        const response = await albumApi.getAllAlbum();
        setAllAlbum(response);
      } catch (error) {
        console.log("error during getAll data",error);
      }
    }
  useEffect(()=>{
    getAll();
  },[]);
  const handleCoverChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files[0]){
      setCoverImage(e.target.files[0]);
    }
  }
  const handleAlbumImageChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files){
      const filesArray = Array.from(e.target.files);
      setAlbumFile(filesArray);
    }
  }
  const handleUploadImage =async ()=>{
    try {
      if(!albumFile){
      alert("please select the image");
      return;
    }
    setUploading(true);
    const uploadPromise = albumFile.map(async (file)=>{
      const fileRef =ref(storage,`album/${selectedAlbum?.name}/${uuidv4()}_${file.name}`);
      await uploadBytes(fileRef,file);
      return getDownloadURL(fileRef);
    });
    const albumurls = await Promise.all(uploadPromise);
    console.log("All Album Images Uploaded:", albumurls);
    const payload={
      url:albumurls
    }
    if(!selectedAlbum?.id){
      throw new Error('id is not selected');
    }
    await albumApi.updateAlbum(payload,selectedAlbum?.id);
    alert("Photo upload successfully");
    setAlbumFile([]);
    setSelectedAlbum(null);
    getAll();
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Failed to upload photos");
    }finally{
      setUploading(false);
    }
  }
  const handleCreateNewAlbum = async()=>{
    if(!nameAlbum || !coverImage || !albumFile){
      alert("please fill all the detail");
      return;
    }
    try {
      setUploading(true);
      const coverRef = ref(storage, `covers/${uuidv4()}_${coverImage.name}`);
      await uploadBytes(coverRef,coverImage);
      const coverUrl = await getDownloadURL(coverRef);
      console.log("Cover Uploaded:", coverUrl);
      const uploadedPromises = albumFile.map(async (file)=>{
        const fileRef = ref(storage,`album/${nameAlbum}/${uuidv4()}_${file.name}`);
        await uploadBytes(fileRef,file);
        return getDownloadURL(fileRef);
      });
      const albumUrls= await Promise.all(uploadedPromises);
      console.log("All Album Images Uploaded:", albumUrls);
      const payLoad ={
        name:nameAlbum,
        CoverImage:coverUrl,
        url:albumUrls
      }
      await albumApi.createAlbum(payLoad);
      alert("Album created Successfully");
      setCreateAlbum(false);
      setNameAlbum("");
      setCoverImage(null);
      setAlbumFile([]);
      getAll();
    } catch (error) {
      console.error("Error creating album:", error);
      alert("Failed to create album");
    }finally {
      setUploading(false)
    }
  }
  const ShowCreateAlbum =()=>{
    setCreateAlbum(true);
  }
  const handleDelete=async(id)=>{
    const isConfirmed = window.confirm("Are you want to delete the album ");
    if(!isConfirmed){
      return;
    }
    try {
      await albumApi.deleteAlbum(id);
      getAll();
      alert("Album deleted Successfully");
    } catch (error) {
      console.error("Error deleting album:", error);
      alert("Failed to delete album");
    }
  }
  console.log(allAlbum);
  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen mt-25">
      <div className="w-full max-w-6xl">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Photo Albums
          </h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Total: {allAlbum.length}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4">Album Name</th>
                  <th className="px-6 py-4 text-center">Total Images</th>
                  <th className="px-6 py-4 text-center">Upload</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allAlbum.map((data) => (
                  <tr 
                    key={data.id} 
                    className="hover:bg-gray-50 transition duration-200 ease-in-out group"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {data.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                        {data.url.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={()=>{setSelectedAlbum(data),setShowUpdatePhoto(true)}} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-all transform active:scale-95 flex items-center justify-center mx-auto gap-2">
                        <Upload size={16} /> 
                        Upload
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={()=>handleDelete(data.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors">
                         <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allAlbum.length === 0 && (
                <div className="text-center p-10 text-gray-500">
                    No albums found.
                </div>
            )}
          </div>
        </div>
        <div className="mb-6 flex justify-between items-center">
          <Button onClick={ShowCreateAlbum} className="text-2xl mt-5 w-full">
            Create New Album
          </Button>
        </div>
        {showCreateAlbum && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
              <button 
                onClick={() => setCreateAlbum(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-6 text-gray-800">Create New Album</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Album Name</label>
                  <Input 
                    type="text" 
                    placeholder="e.g. Wedding 2025" 
                    value={nameAlbum}
                    onChange={(e) => setNameAlbum(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (Single)</label>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                  {coverImage && <p className="text-xs text-green-600 mt-1">Selected: {coverImage.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Album Images (Multiple)</label>
                  <Input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={handleAlbumImageChange}
                  />
                  {albumFile.length > 0 && <p className="text-xs text-green-600 mt-1">{albumFile.length} files selected</p>}
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={handleCreateNewAlbum} 
                    disabled={isUploading} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                      </>
                    ) : (
                      "Create Album"
                    )}
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}
        {showUpdatePhoto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                  <button 
                  onClick={() => setShowUpdatePhoto(false)} 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload image</label>
                  <Input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={handleAlbumImageChange}
                  />
                  {albumFile.length > 0 && <p className="text-xs text-green-600 mt-1">{albumFile.length} files selected</p>}
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={()=>handleUploadImage()} 
                    disabled={isUploading} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Photographer