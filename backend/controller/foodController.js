import  {imageKit}  from "../config/imagekit.js";
import food from "../models/foodModels.js";
import fs from "fs";

export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageFile = req.file;


    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    //  Read the uploaded file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const uploadResponse = await imageKit.files.upload({
      file: fileBuffer.toString("base64"),
      fileName: imageFile.originalname,
      folder: "/foods",
    });



    // ✅ Save to database
    await food.create({
      name,
      description,
      price,
      category,
      image: uploadResponse.url,
    });

    // ✅ Remove temp file from local storage
    fs.unlink(imageFile.path, () => {});

    return res.json({
      success: true,
      message: "Food added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getFood = async (req, res) => {
  try {
    const fooditem = await food.find({});
    return res.json({
      success: true,
      data: fooditem,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFood = async (req, res) => {
  // console.log(req.body);
  try {
    const fooditem = await food.findById(req.body.id);
    fs.unlink(`uploads/${fooditem.image}`, () => {});
    await food.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food removed",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      problem: "issue in removing food",
      data: req.body,
    });
  }
};
