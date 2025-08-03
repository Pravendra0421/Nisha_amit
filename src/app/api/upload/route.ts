// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('audio') as File | null; 

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const response = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // --- THIS IS THE KEY CHANGE ---
          // Tell Cloudinary it's an audio/video file
          resource_type: 'video', 
          // You can also specify the folder
          // folder: 'audio_uploads', 
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadedFileUrl = (response as any).secure_url;

    return NextResponse.json({
      message: 'Audio uploaded successfully!',
      url: uploadedFileUrl, // This is the string URL for your MP3
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Upload Error:', error);
    return NextResponse.json({ error: 'File upload failed.' }, { status: 500 });
  }
}