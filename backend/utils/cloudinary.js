import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; 
import dotenv from 'dotenv';

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImageOnCloudinary = async (filePath) => {
  if (!filePath) return null;
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);

    return response; 
  } catch (error) {
    console.log("Error while uploading to Cloudinary:", error);
  
    fs.unlinkSync(filePath);
    return null;
  }
};

export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log("Error while deleting from Cloudinary:", error);
    return null;
  }
};

