import express from 'express'
import food from '../models/foodmdels.js'
import { addFood, getFood, removeFood } from '../controller/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage /middleware
const storeage = multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
  }
})
const upload = multer({storage:storeage})


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/get",getFood)
foodRouter.put("/remove",removeFood);



export default foodRouter;