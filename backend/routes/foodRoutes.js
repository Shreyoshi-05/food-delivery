import express from 'express'
import food from '../models/foodmdels.js'
import { addFood, getFood, removeFood } from '../controller/foodController.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const foodRouter = express.Router();

//image storage /middleware
// const storeage = multer.diskStorage({
//   destination:"uploads",
//   filename:(req,file,cb)=>{
//     return cb(null,`${Date.now()}${file.originalname}`)
//   }
// })

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"food_img_uploader",
    allowed_formats:["jpg", "png", "jpeg", "webp"]
  }
})


const upload = multer({storage})


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/get",getFood)
foodRouter.put("/remove",removeFood);



export default foodRouter;