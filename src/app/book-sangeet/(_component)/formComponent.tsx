'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { bookSangeetApiRepository } from '@/services/BookSangeet.api';
import axios from 'axios';
import { BookSangeetDto } from '@/core/dtos/BookSangeet.dto';
import { BookSangeetEntity } from '@/core/entities/BookSangeetEntity';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToastContainer, toast } from 'react-toastify';

type BookSangeetProps = {
  onSuccess: (newData: BookSangeetEntity) => void;
};

export default function BookSangeet({ onSuccess }: BookSangeetProps) {
  const [detail, setDetail] = useState({
    name: '',
    phone: '',
    Side: '',
  });

  const { t } = useLanguage();
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [Song, setSong] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const truncateName = (name: string, max: number = 16) => {
    return name.length > max ? name.slice(0, max) + '…' : name;
  };

  const handleUploadClick = async () => {
    if (!fileToUpload) {
      toast.error(t('uploadAlert'));
      return;
    }

    setIsUploading(true);
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = { timestamp };

      const signatureResponse = await axios.post('/api/upload', { paramsToSign });
      const { signature } = signatureResponse.data;

      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

      const uploadResponse = await axios.post(uploadUrl, formData);

      setSong(uploadResponse.data.secure_url);
      toast.success(t('submitUploadAlert'));
    } catch (error) {
      console.error('File upload failed:', error);
      toast.error(t('uploadErrorAlert'));
    } finally {
      setIsUploading(false);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!detail.name) {
      toast.error(t('signupNameFailed'));
      return;
    }

    if (!detail.Side) {
      toast.error('Please select the side');
      return;
    }

    if (!Song) {
      toast.error(t('songuploadAlert'));
      return;
    }

    const finalData: BookSangeetDto = { ...detail, Song };
    const submitData = await bookSangeetApiRepository.create(finalData);
    toast.success(t('submitDataAlert'));
    onSuccess(submitData);
  };

  return (
    <ScrollArea className="h-[100vh]">
      <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg shadow-gray-300 p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-4 sm:mb-6">
            {t('book_a_Sangeet')}
          </h2>

          <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm sm:text-base font-medium text-gray-800"
              >
                {t('inputName')}
              </label>
              <input
                type="text"
                name="name"
                id="fullName"
                placeholder={t('inputNamePlaceHolder')}
                required
                onChange={changeHandler}
                className="mt-2 w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm sm:text-base font-medium text-gray-800"
              >
                {t('inputPhone')}
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                onChange={changeHandler}
                placeholder={t('inputPhonePlaceHolder')}
                className="mt-2 w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="side"
                className="block text-sm sm:text-base font-medium text-gray-800"
              >
                {t('inputPerforming')}
              </label>
              <select
                id="side"
                name="Side"
                value={detail.Side}
                required
                onChange={changeHandler}
                className="mt-2 w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg bg-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">{t('selectOption1')}</option>
                <option value="Bride">{t('selectOption2')}</option>
                <option value="Groom">{t('selectOption3')}</option>
              </select>
            </div>
            <div className="mt-3 sm:mt-4 border border-dashed border-neutral-200 rounded-lg bg-white">
              <div className="p-3 sm:p-4">
                <FileUpload onChange={(files) => setFileToUpload(files[0])} />

                {/* {fileToUpload && !Song && (
                  <p className="mt-2 text-xs sm:text-sm text-blue-600">
                    {t('fileSelectedLabel') ?? 'File selected:'}{' '}
                    <span className="font-medium">
                      {truncateName(fileToUpload.name)}
                    </span>
                  </p>
                )} */}

                <button
                  type="button"
                  onClick={handleUploadClick}
                  disabled={!fileToUpload || isUploading || !!Song}
                  className="mt-3 w-full px-3 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg text-sm sm:text-base font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isUploading ? t('localUploadButton') : t('localUploadButton2')}
                </button>

                {Song && (
                  <p className="mt-2 text-xs sm:text-sm text-green-600">
                    {t('songUpload')}
                  </p>
                )}
              </div>
            </div>
            {Song && (
              <div className="mt-2 text-xs sm:text-sm break-words text-gray-600">
                {Song}
              </div>
            )}
            <button
              type="submit"
              disabled={isUploading || !Song}
              className="mt-3 w-full px-3 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg text-sm sm:text-base font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {t('submitButton')}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </ScrollArea>
  );
}
