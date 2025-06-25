import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name:'process.env.CLOUDINARY_CLOUD_KEY',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_seccret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary =  async(localFilePath) => {
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilepath, {
            resourceType: 'auto'
        })
        console.log("file is uploaded on cloudinary", response.url)
        return response
    }catch(error){
        fs.unlinkSync(localFilePath)
    }
}

