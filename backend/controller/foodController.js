import food from "../models/foodmdels.js";
import fs from "fs";

export const addFood = async (req, res) => {
  let image_filename = req.file.filename;
  const { name, description, price, category } = req.body;

  const foodobj = new food({
    name,
    description,
    price,
    category,
    image: image_filename,
  })

  try {
    await foodobj.save();
    return res.json({
      success:true,
      message:"food item added"
    })
  } catch (error) {
    console.log(error);
    return res.json({
      success:false,
      message:"error in adding food item"
    })
  }
};

export const getFood = async(req,res) =>{
  try {
    const fooditem = await food.find({});
    return res.json({
      success:true,
      data:fooditem
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}

export const removeFood = async(req,res) => {
  // console.log(req.body);
  try {
    const fooditem = await food.findById(req.body.id);
    fs.unlink(`uploads/${fooditem.image}`,()=>{});
    await food.findByIdAndDelete(req.body.id);
    res.json({
      success:true,
      message:"Food removed"
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message,
      problem:"issue in removing food",
      data:req.body,
    })
  }
}