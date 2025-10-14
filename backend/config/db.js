import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://shreayoshi:shreefooddel@cluster0.dfkwx1v.mongodb.net/food_del"
      )
      .then(() => console.log("database connected"));
  } catch (error) {
    console.log(error.message);
  }
};
